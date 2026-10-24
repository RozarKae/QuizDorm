import test, { describe } from "node:test";
import assert from "node:assert/strict";

import { signSessionPayload, verifySessionPayload } from "../lib/security/cookieSigner";
import { checkRateLimit, resetRateLimiter } from "../lib/security/rateLimiter";
import { securityHeaders } from "../lib/security/headers";
import {
  sanitizeInput,
  stripHtmlTags,
  sanitizeParticipantName,
  sanitizeUrl,
} from "../lib/security/sanitizer";
import { LiveSessionManager } from "../lib/live/liveSessionManager";

describe("Application Security Hardening & Cryptographic Integrity Suite", () => {
  describe("Phase 1 & SEC-01: Live Arena Host Sealing & Secret Protection", () => {
    test("Host action strictly requires genuine hostSecret and rejects wildcards or invalid tokens", () => {
      const { session, hostSecret } = LiveSessionManager.createSession({
        hostId: "sec-test-host-01",
        quizId: "quiz-sec-01",
        title: "Security Benchmark Arena",
      });

      assert.ok(hostSecret, "Session should issue a host secret");

      // 1. Valid hostSecret works
      const validResult = LiveSessionManager.executeHostAction(
        session.code,
        hostSecret,
        "pause"
      );
      assert.strictEqual(validResult.success, true);

      // 2. Missing/empty hostSecret is rejected
      const emptyResult = LiveSessionManager.executeHostAction(
        session.code,
        "",
        "resume"
      );
      assert.strictEqual(emptyResult.success, false);
      assert.match(emptyResult.error || "", /Unauthorized/i);

      // 3. Forged hostSecret starting with 'sec_' prefix is rejected (no wildcard bypass)
      const forgedResult = LiveSessionManager.executeHostAction(
        session.code,
        "sec_fake_unauthorized_token_12345",
        "resume"
      );
      assert.strictEqual(forgedResult.success, false);
      assert.match(forgedResult.error || "", /Unauthorized/i);

      // 4. Master bypass string is rejected
      const bypassResult = LiveSessionManager.executeHostAction(
        session.code,
        "master_bypass",
        "resume"
      );
      assert.strictEqual(bypassResult.success, false);
    });
  });

  describe("Phase 2 & SEC-02: Cryptographic Cookie Signing & Anti-Tampering", () => {
    test("Signs session payload and reproduces verified object with valid signature", async () => {
      const originalPayload = {
        id: "usr-student-01",
        email: "student@quizdorm.com",
        user_metadata: {
          name: "Test Student",
          role: "member",
        },
      };

      const signedCookie = await signSessionPayload(originalPayload);
      assert.ok(typeof signedCookie === "string");
      assert.ok(signedCookie.includes("."));

      const verified = await verifySessionPayload<typeof originalPayload>(signedCookie);
      assert.ok(verified !== null);
      assert.strictEqual(verified?.id, originalPayload.id);
      assert.strictEqual(verified?.email, originalPayload.email);
      assert.strictEqual(verified?.user_metadata.role, "member");
    });

    test("Rejects cookie if attacker tampers with payload to elevate role to admin", async () => {
      const legitimatePayload = {
        id: "usr-subscriber-01",
        email: "subscriber@quizdorm.com",
        user_metadata: {
          name: "Attacker User",
          role: "subscriber",
        },
      };

      const signedCookie = await signSessionPayload(legitimatePayload);
      const [payloadB64, signatureHex] = signedCookie.split(".");

      // Attacker attempts to modify base64 payload to role: "admin"
      const tamperedJson = JSON.stringify({
        ...legitimatePayload,
        user_metadata: { ...legitimatePayload.user_metadata, role: "admin" },
      });
      const tamperedB64 = Buffer.from(tamperedJson, "utf-8").toString("base64url");
      const forgedCookie = `${tamperedB64}.${signatureHex}`;

      const verified = await verifySessionPayload(forgedCookie);
      assert.strictEqual(verified, null, "Tampered payload must be rejected as invalid");
    });

    test("Rejects cookie if signature is modified or corrupted", async () => {
      const payload = { id: "usr-01", email: "user@quizdorm.com", user_metadata: { role: "member" } };
      const signedCookie = await signSessionPayload(payload);
      const [payloadB64, signatureHex] = signedCookie.split(".");

      // Flip the last two characters in hex signature
      const corruptedSig = signatureHex.slice(0, -2) + "00";
      const corruptedCookie = `${payloadB64}.${corruptedSig}`;

      const verified = await verifySessionPayload(corruptedCookie);
      assert.strictEqual(verified, null, "Corrupted signature must be rejected");
    });

    test("Rejects plaintext un-signed JSON strings (legacy exploit vector)", async () => {
      const plaintextJson = JSON.stringify({
        id: "usr-admin-01",
        user_metadata: { role: "admin" },
      });

      const verified = await verifySessionPayload(plaintextJson);
      assert.strictEqual(verified, null, "Unsigned plaintext JSON must never be accepted as valid");
    });

    test("Handles empty, null, or garbage tokens gracefully without crashing", async () => {
      assert.strictEqual(await verifySessionPayload(""), null);
      assert.strictEqual(await verifySessionPayload(null as any), null);
      assert.strictEqual(await verifySessionPayload("invalid.token.extra.parts"), null);
      assert.strictEqual(await verifySessionPayload("just-a-random-string"), null);
    });
  });

  describe("Phase 3 & SEC-03: Sliding Window Rate Limiting", () => {
    test("Enforces quota and sets accurate rate limit headers", () => {
      resetRateLimiter("test-limiter");

      const mockRequest = new Request("https://quizdorm.com/api/test", {
        headers: { "x-forwarded-for": "203.0.113.195" },
      });

      // Allow first 3 requests
      const r1 = checkRateLimit(mockRequest, {
        keyPrefix: "test-limiter",
        maxRequests: 3,
        windowMs: 60 * 1000,
      });
      assert.strictEqual(r1.allowed, true);
      assert.strictEqual(r1.remaining, 2);

      const r2 = checkRateLimit(mockRequest, {
        keyPrefix: "test-limiter",
        maxRequests: 3,
        windowMs: 60 * 1000,
      });
      assert.strictEqual(r2.allowed, true);
      assert.strictEqual(r2.remaining, 1);

      const r3 = checkRateLimit(mockRequest, {
        keyPrefix: "test-limiter",
        maxRequests: 3,
        windowMs: 60 * 1000,
      });
      assert.strictEqual(r3.allowed, true);
      assert.strictEqual(r3.remaining, 0);

      // 4th request must be blocked
      const r4 = checkRateLimit(mockRequest, {
        keyPrefix: "test-limiter",
        maxRequests: 3,
        windowMs: 60 * 1000,
      });
      assert.strictEqual(r4.allowed, false);
      assert.strictEqual(r4.remaining, 0);
      assert.ok(r4.retryAfterSeconds > 0);
      assert.ok(r4.headers["Retry-After"] !== undefined);

      // Request from another IP should still be allowed (independent quotas)
      const mockRequest2 = new Request("https://quizdorm.com/api/test", {
        headers: { "x-forwarded-for": "198.51.100.42" },
      });
      const rOther = checkRateLimit(mockRequest2, {
        keyPrefix: "test-limiter",
        maxRequests: 3,
        windowMs: 60 * 1000,
      });
      assert.strictEqual(rOther.allowed, true);
      assert.strictEqual(rOther.remaining, 2);
    });
  });

  describe("Phase 4 & SEC-04: Security Headers & Content-Security-Policy (CSP)", () => {
    test("Mandatory security headers are configured and properly formatted", () => {
      const headerMap = new Map(securityHeaders.map((h) => [h.key, h.value]));

      // Content-Security-Policy
      const csp = headerMap.get("Content-Security-Policy");
      assert.ok(csp, "Content-Security-Policy header must exist");
      assert.ok(csp.includes("default-src 'self'"));
      assert.ok(csp.includes("frame-ancestors 'self'"));
      assert.ok(csp.includes("object-src 'none'"));

      // HSTS
      assert.strictEqual(
        headerMap.get("Strict-Transport-Security"),
        "max-age=63072000; includeSubDomains; preload"
      );

      // Frame Options & Content Type
      assert.strictEqual(headerMap.get("X-Frame-Options"), "SAMEORIGIN");
      assert.strictEqual(headerMap.get("X-Content-Type-Options"), "nosniff");

      // X-XSS-Protection & Opener Policy
      assert.strictEqual(headerMap.get("X-XSS-Protection"), "1; mode=block");
      assert.strictEqual(headerMap.get("Cross-Origin-Opener-Policy"), "same-origin-allow-popups");
    });
  });

  describe("Phase 5 & SEC-05: Input Sanitization & XSS Defense", () => {
    test("sanitizeInput escapes dangerous HTML special characters", () => {
      const raw = '<script>alert("XSS & exploit")</script>';
      const sanitized = sanitizeInput(raw);
      assert.ok(!sanitized.includes("<"));
      assert.ok(!sanitized.includes(">"));
      assert.ok(sanitized.includes("&lt;script&gt;"));
      assert.ok(sanitized.includes("&quot;"));
      assert.ok(sanitized.includes("&amp;"));
    });

    test("stripHtmlTags eliminates script and formatting tags completely", () => {
      const raw = "<p>Hello <b>World</b> <script>steal()</script></p>";
      const stripped = stripHtmlTags(raw);
      assert.strictEqual(stripped, "Hello World steal()");
    });

    test("sanitizeParticipantName cleanses arena player names and enforces length", () => {
      const malicious = "<b>Champion<script>alert(1)</script></b>\x00\x1F";
      const clean = sanitizeParticipantName(malicious);
      assert.strictEqual(clean, "Championalert(1)");

      // Overly long name truncation
      const longName = "A".repeat(100);
      assert.strictEqual(sanitizeParticipantName(longName, 32).length, 32);

      // Empty name defaults to Contender
      assert.strictEqual(sanitizeParticipantName("   "), "Contender");
    });

    test("sanitizeUrl blocks javascript: pseudo-protocol and dangerous protocols", () => {
      assert.strictEqual(sanitizeUrl("javascript:alert(document.cookie)"), "#");
      assert.strictEqual(sanitizeUrl("data:text/html,<script>alert(1)</script>"), "#");
      assert.strictEqual(sanitizeUrl("vbscript:msgbox(1)"), "#");

      // Valid HTTP/HTTPS and relative paths pass through
      assert.strictEqual(sanitizeUrl("/dashboard/arena"), "/dashboard/arena");
      assert.strictEqual(
        sanitizeUrl("https://quizclassroom.vercel.app/live"),
        "https://quizclassroom.vercel.app/live"
      );
    });
  });
});

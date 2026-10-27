import assert from "node:assert";
import { describe,it } from "node:test";
import { NextRequest } from "next/server";
import { isDemoAuthAllowed,signInWithEmail,signUpWithEmail } from "../app/auth/actions";
import { TEST_ACCOUNTS } from "../app/auth/constants";
import { FeatureGating } from "../lib/billing/featureGating";
import { MockPaymentProvider } from "../lib/billing/providers/mockPaymentProvider";
import { RazorpayPaymentProvider } from "../lib/billing/providers/razorpayProvider";
import { StripePaymentProvider } from "../lib/billing/providers/stripeProvider";
import { DEFAULT_USER_SUBSCRIPTION,SubscriptionManager } from "../lib/billing/subscriptionManager";
import { signSessionPayload,verifySessionPayload } from "../lib/security/cookieSigner";
import { proxy } from "../proxy";

describe("Stage A: Security & Demo-State Remediation Suite", () => {
  const originalEnv = { ...process.env };

  const setNodeEnv = (val: string) => {
    (process.env as Record<string, string | undefined>).NODE_ENV = val;
  };

  const restoreEnv = () => {
    process.env = { ...originalEnv };
  };

  describe("1. Authentication Security & Production Demo Rejection", () => {
    it("isDemoAuthAllowed returns false strictly in production environment", async () => {
      setNodeEnv("production");
      process.env.ALLOW_DEMO_ACCOUNTS = "true";
      assert.strictEqual(await isDemoAuthAllowed(), false, "Production must strictly reject demo authentication");
      restoreEnv();
    });

    it("isDemoAuthAllowed returns false if explicitly disabled in non-production", async () => {
      setNodeEnv("development");
      process.env.ALLOW_DEMO_ACCOUNTS = "false";
      assert.strictEqual(await isDemoAuthAllowed(), false, "Must respect explicit ALLOW_DEMO_ACCOUNTS=false in dev");
      restoreEnv();
    });

    it("signInWithEmail in production rejects demo bypass for test accounts and routes to Supabase", async () => {
      setNodeEnv("production");
      const teacherAccount = TEST_ACCOUNTS["teacher@quizdorm.com"];

      const formData = new FormData();
      formData.set("email", teacherAccount.email);
      formData.set("password", teacherAccount.password);

      // In production, signInWithEmail will NOT take the demo bypass branch.
      // Because this test environment has no active Supabase credentials/network connection to Supabase Auth,
      // it should attempt Supabase Auth and return an AuthApiError / failure, rather than setting a demo cookie.
      const res = await signInWithEmail(formData);
      assert.ok(res?.error, "Expected auth failure or Supabase error rather than demo login");
      assert.doesNotMatch(res.error || "", /Invalid password for teacher@quizdorm\.com/, "Must not return demo test-account error");
      restoreEnv();
    });

    it("signUpWithEmail in production refuses to issue demo cookies when Supabase is unconfigured", async () => {
      setNodeEnv("production");
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      const formData = new FormData();
      formData.set("name", "Test User");
      formData.set("email", "newuser@example.com");
      formData.set("password", "Test@12345678");
      formData.set("confirmPassword", "Test@12345678");
      formData.set("role", "subscriber");

      const res = await signUpWithEmail(formData);
      assert.ok(res?.error, "Expected error when Supabase is unconfigured in production");
      assert.match(res.error || "", /Registration service is currently unavailable in production/);
      restoreEnv();
    });

    it("proxy middleware in production annihilates incoming demo session cookies", async () => {
      setNodeEnv("production");

      const validDemoPayload = {
        id: "usr-admin-prod-bypass-attempt",
        user_metadata: { role: "superadmin" },
      };
      const signedDemoCookie = await signSessionPayload(validDemoPayload);

      const req = new NextRequest("http://localhost:3000/admin", {
        headers: {
          cookie: `quizdorm_demo_session=${signedDemoCookie}`,
        },
      });

      const res = await proxy(req);

      // In production, the demo cookie must be denied authorization and cleared
      const setCookieHeader = res.headers.get("set-cookie") || "";
      assert.ok(
        setCookieHeader.includes("quizdorm_demo_session=") && setCookieHeader.includes("Max-Age=0"),
        "Production proxy must delete quizdorm_demo_session cookie"
      );
      // Because /admin is a protected route, an unauthenticated user must be redirected to /admin/login
      assert.strictEqual(res.status, 307, "Must redirect unauthorized user trying to access /admin");
      assert.ok(res.headers.get("location")?.includes("/admin/login"), "Must redirect to /admin/login");

      restoreEnv();
    });
  });

  describe("2. Cryptographic Session Anti-Tampering", () => {
    it("Signs and successfully verifies a valid session payload", async () => {
      const payload = { id: "user-123", role: "teacher" };
      const token = await signSessionPayload(payload);
      assert.ok(token.includes("."), "Signed token must contain payload and signature separated by dot");

      const verified = await verifySessionPayload<{ id: string; role: string }>(token);
      assert.ok(verified, "Legitimate session must be verified");
      assert.strictEqual(verified?.id, "user-123");
      assert.strictEqual(verified?.role, "teacher");
    });

    it("Rejects session if payload content is altered (privilege escalation attempt)", async () => {
      const payload = { id: "user-123", role: "student" };
      const token = await signSessionPayload(payload);
      const [b64Data, signature] = token.split(".");

      // Attacker decodes JSON, changes role to 'superadmin', and re-encodes
      const decoded = JSON.parse(Buffer.from(b64Data, "base64url").toString("utf-8"));
      decoded.role = "superadmin";
      const forgedB64 = Buffer.from(JSON.stringify(decoded), "utf-8").toString("base64url");
      const forgedToken = `${forgedB64}.${signature}`;

      const verified = await verifySessionPayload(forgedToken);
      assert.strictEqual(verified, null, "Tampered payload must fail cryptographic verification");
    });

    it("Rejects session if signature is modified or forged", async () => {
      const payload = { id: "user-123", role: "admin" };
      const token = await signSessionPayload(payload);
      const [b64Data, signature] = token.split(".");

      const corruptedSignature = signature.slice(0, -4) + "ffff";
      const tamperedToken = `${b64Data}.${corruptedSignature}`;

      const verified = await verifySessionPayload(tamperedToken);
      assert.strictEqual(verified, null, "Corrupted signature must return null");
    });
  });

  describe("3. Subscription Entitlements & Client Tampering Defense", () => {
    it("Defaults to the free tier with 50 AI credits and 10 OCR credits", () => {
      assert.strictEqual(DEFAULT_USER_SUBSCRIPTION.planId, "free");
      assert.strictEqual(DEFAULT_USER_SUBSCRIPTION.aiCreditsTotal, 50);
      assert.strictEqual(DEFAULT_USER_SUBSCRIPTION.ocrCreditsTotal, 10);
      assert.strictEqual(DEFAULT_USER_SUBSCRIPTION.seatsAllocated, 1);
    });

    it("Rejects client localStorage tampering attempting to self-grant enterprise entitlements", () => {
      // Mock client environment localStorage
      const mockStorage: Record<string, string> = {};
      const mockLocalStorage = {
        getItem: (key: string) => mockStorage[key] || null,
        setItem: (key: string, value: string) => {
          mockStorage[key] = value;
        },
        removeItem: (key: string) => {
          delete mockStorage[key];
        },
        clear: () => {
          for (const k in mockStorage) delete mockStorage[k];
        },
      };

      const originalWindow = (global as { window?: unknown }).window;
      (global as { window?: unknown }).window = { localStorage: mockLocalStorage };
      (global as { localStorage?: unknown }).localStorage = mockLocalStorage;

      try {
        // Attacker writes forged enterprise plan into localStorage
        mockLocalStorage.setItem(
          "quizdorm_user_subscription",
          JSON.stringify({
            planId: "enterprise",
            status: "active",
            aiCreditsTotal: 50000,
            ocrCreditsTotal: 10000,
            seatsAllocated: 100,
          })
        );

        // SubscriptionManager must reject client authority and revert to free tier
        const currentSub = SubscriptionManager.getSubscription();
        assert.strictEqual(currentSub.planId, "free", "Tampered localStorage plan must be sanitized to free");
        assert.strictEqual(currentSub.aiCreditsTotal, 50, "Tampered credits must not be granted");
        assert.strictEqual(currentSub.seatsAllocated, 1, "Tampered seats must not be granted");

        // FeatureGating must refuse to unlock enterprise features
        assert.strictEqual(
          FeatureGating.isFeatureUnlocked("team_collaboration"),
          false,
          "Gated feature must remain locked despite localStorage modification"
        );
        assert.strictEqual(
          FeatureGating.isFeatureUnlocked("api_access"),
          false,
          "API access feature must remain locked"
        );
      } finally {
        (global as { window?: unknown }).window = originalWindow;
        delete (global as { localStorage?: unknown }).localStorage;
      }
    });

    it("SubscriptionManager.updateSubscription in production throws error for non-free tiers", () => {
      setNodeEnv("production");
      assert.throws(
        () => {
          SubscriptionManager.updateSubscription("professional", "annual");
        },
        /Client-side subscription modification is forbidden in production/,
        "Production must forbid client-side paid plan activation"
      );
      restoreEnv();
    });
  });

  describe("4. Sandbox Payment Truthfulness & Provider Isolation", () => {
    it("StripePaymentProvider throws in production without live credentials", async () => {
      setNodeEnv("production");
      delete process.env.STRIPE_SECRET_KEY;

      const provider = new StripePaymentProvider();
      await assert.rejects(
        async () => {
          await provider.processPayment({
            userId: "usr-test",
            planId: "professional",
            amountUSD: 25,
            amountINR: 2490,
            currency: "USD",
            paymentMethod: "Credit Card",
          });
        },
        /Stripe live payment processing is disabled: STRIPE_SECRET_KEY is not configured/,
        "Must throw in production when live Stripe secret is missing"
      );
      restoreEnv();
    });

    it("StripePaymentProvider in sandbox returns pending status and sandbox-prefixed ID", async () => {
      setNodeEnv("development");
      const provider = new StripePaymentProvider();
      const res = await provider.processPayment({
        userId: "usr-test",
        planId: "professional",
        amountUSD: 25,
        amountINR: 2490,
        currency: "USD",
        paymentMethod: "Visa",
      });

      assert.strictEqual(res.status, "pending", "Sandbox transaction must be pending, never success");
      assert.ok(res.id.startsWith("sandbox_stripe_sim_"), "Transaction ID must be explicitly sandbox prefixed");
      assert.ok(res.invoiceNumber.startsWith("SANDBOX-STR-"), "Invoice must be sandbox prefixed");
      assert.strictEqual(await provider.refundPayment(res.id), false, "Sandbox cannot claim real refund succeeded");
      restoreEnv();
    });

    it("RazorpayPaymentProvider throws in production without live credentials", async () => {
      setNodeEnv("production");
      delete process.env.RAZORPAY_KEY_ID;

      const provider = new RazorpayPaymentProvider();
      await assert.rejects(
        async () => {
          await provider.processPayment({
            userId: "usr-test",
            planId: "professional",
            amountUSD: 25,
            amountINR: 2490,
            currency: "INR",
            paymentMethod: "UPI",
          });
        },
        /Razorpay live payment processing is disabled: RAZORPAY_KEY_ID is not configured/,
        "Must throw in production when live Razorpay key is missing"
      );
      restoreEnv();
    });

    it("RazorpayPaymentProvider in sandbox returns pending status and sandbox-prefixed ID", async () => {
      setNodeEnv("development");
      const provider = new RazorpayPaymentProvider();
      const res = await provider.processPayment({
        userId: "usr-test",
        planId: "professional",
        amountUSD: 25,
        amountINR: 2490,
        currency: "INR",
        paymentMethod: "UPI",
      });

      assert.strictEqual(res.status, "pending", "Sandbox transaction must be pending, never success");
      assert.ok(res.id.startsWith("sandbox_rzp_sim_"), "Transaction ID must be explicitly sandbox prefixed");
      assert.ok(res.invoiceNumber.startsWith("SANDBOX-RZP-"), "Invoice must be sandbox prefixed");
      assert.strictEqual(await provider.refundPayment(res.id), false, "Sandbox cannot claim real refund succeeded");
      restoreEnv();
    });

    it("MockPaymentProvider throws in production and runs sandbox simulation in dev", async () => {
      setNodeEnv("production");
      const provider = new MockPaymentProvider();

      await assert.rejects(
        async () => {
          await provider.processPayment({
            userId: "usr-test",
            planId: "professional",
            amountUSD: 25,
            amountINR: 2490,
            currency: "USD",
            paymentMethod: "Credit Card",
          });
        },
        /Mock payment gateway cannot be used in production/,
        "Mock payment provider must be rejected in production"
      );

      setNodeEnv("development");
      const res = await provider.processPayment({
        userId: "usr-test",
        planId: "professional",
        amountUSD: 25,
        amountINR: 2490,
        currency: "USD",
        paymentMethod: "Credit Card",
      });

      assert.strictEqual(res.status, "pending");
      assert.ok(res.id.startsWith("sandbox_mock_"));
      assert.strictEqual(await provider.refundPayment(res.id), false);
      restoreEnv();
    });
  });
});

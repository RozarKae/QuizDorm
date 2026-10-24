/**
 * Cryptographic Cookie Signing & Verification Utility
 *
 * Implements HMAC-SHA256 signing using the universal Web Crypto API.
 * Runs seamlessly across Node.js runtime, Edge runtime (proxy.ts), and browser.
 * Prevents client-side privilege escalation and role tampering.
 */

const SIGNING_KEY_SECRET =
  process.env.COOKIE_SIGNING_SECRET ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "quizdorm-production-hmac-sha256-signing-secret-2026";

async function getCryptoKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyData = enc.encode(SIGNING_KEY_SECRET);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function bufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function hexToBuffer(hex: string): ArrayBuffer {
  if (hex.length % 2 !== 0) return new ArrayBuffer(0);
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.substring(i, i + 2), 16);
  }
  return bytes.buffer;
}

function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  // btoa converts binary string to base64
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function fromBase64Url(base64url: string): string {
  let base64 = base64url.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4 !== 0) {
    base64 += "=";
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

/**
 * Signs an object payload and returns `base64UrlPayload.hexSignature`
 */
export async function signSessionPayload(payload: any): Promise<string> {
  const jsonString = JSON.stringify(payload);
  const enc = new TextEncoder();
  const data = enc.encode(jsonString);

  const key = await getCryptoKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, data);
  const signatureHex = bufferToHex(signatureBuffer);

  const payloadB64 = toBase64Url(jsonString);
  return `${payloadB64}.${signatureHex}`;
}

/**
 * Verifies and parses a signed session cookie. Returns null if tampered, malformed, or invalid.
 */
export async function verifySessionPayload<T = any>(token: string): Promise<T | null> {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [payloadB64, signatureHex] = parts;

  try {
    const jsonString = fromBase64Url(payloadB64);
    const enc = new TextEncoder();
    const data = enc.encode(jsonString);

    const key = await getCryptoKey();
    const expectedSigBuffer = hexToBuffer(signatureHex);
    if (expectedSigBuffer.byteLength !== 32) {
      return null;
    }

    const isValid = await crypto.subtle.verify("HMAC", key, expectedSigBuffer, data);
    if (!isValid) {
      return null;
    }

    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

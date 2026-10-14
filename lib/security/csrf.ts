/**
 * CSRF Token Protection Utilities
 */

export function generateCsrfToken(): string {
  const array = new Uint8Array(24);
  if (typeof window !== "undefined" && window.crypto) {
    window.crypto.getRandomValues(array);
  }
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function validateCsrfToken(token: string, sessionToken: string): boolean {
  if (!token || !sessionToken) return false;
  return token === sessionToken;
}

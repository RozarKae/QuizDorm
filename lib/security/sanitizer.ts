/**
 * XSS Input Sanitizer & Escaping Utility
 *
 * Protects against stored and reflected Cross-Site Scripting (XSS),
 * HTML tag injection, protocol-relative exploits, and URI pseudo-protocols.
 */

export function sanitizeInput(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function stripHtmlTags(input: string): string {
  if (!input || typeof input !== "string") return "";
  return input.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Sanitizes live participant screen names:
 * - Strips any HTML/XML tags
 * - Removes non-printable/control characters
 * - Enforces max length (32 chars)
 * - Defaults to 'Contender' if empty
 */
export function sanitizeParticipantName(name: unknown, maxLength = 32): string {
  if (typeof name !== "string") return "Contender";
  const stripped = stripHtmlTags(name)
    .replace(/[\x00-\x1F\x7F-\x9F]/g, "") // remove control characters
    .trim();

  if (!stripped) return "Contender";
  return stripped.slice(0, maxLength);
}

/**
 * Validates and sanitizes URLs to prevent javascript: or data: XSS payloads
 */
export function sanitizeUrl(url: unknown, defaultUrl = "#"): string {
  if (typeof url !== "string" || !url.trim()) return defaultUrl;
  const trimmed = url.trim();

  // Allow safe relative URLs starting with single '/'
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    // Malformed URL
  }

  return defaultUrl;
}

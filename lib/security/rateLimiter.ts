/**
 * Sliding Window In-Memory Rate Limiter
 *
 * Protects critical endpoints (e.g. AI generation, OCR PDF parsing, Auth)
 * against Denial-of-Service, credential stuffing, and LLM budget exhaustion.
 */

export interface RateLimitOptions {
  windowMs?: number; // Time window in milliseconds (default: 60,000ms = 1 minute)
  maxRequests?: number; // Max allowed requests in window (default: 20)
  keyPrefix?: string; // Endpoint identifier prefix (e.g. "ai-generate", "pdf-quiz")
}

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetMs: number;
  retryAfterSeconds: number;
  headers: Record<string, string>;
}

// In-memory sliding window bucket store
const rateLimitStore = new Map<string, number[]>();

// Periodically clean up stale keys every 5 minutes to prevent memory leaks
let lastPruneTime = Date.now();
const PRUNE_INTERVAL_MS = 5 * 60 * 1000;

function pruneStaleEntries(now: number, maxWindowMs: number) {
  if (now - lastPruneTime < PRUNE_INTERVAL_MS) return;
  lastPruneTime = now;

  for (const [key, timestamps] of rateLimitStore.entries()) {
    const fresh = timestamps.filter((t) => now - t < maxWindowMs);
    if (fresh.length === 0) {
      rateLimitStore.delete(key);
    } else {
      rateLimitStore.set(key, fresh);
    }
  }
}

/**
 * Extracts the client IP address from standard proxy headers
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const ips = forwardedFor.split(",").map((ip) => ip.trim());
    if (ips.length > 0 && ips[0]) {
      return ips[0];
    }
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = request.headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  return "127.0.0.1";
}

/**
 * Check if a request exceeds rate limit quotas
 */
export function checkRateLimit(
  request: Request,
  options: RateLimitOptions = {}
): RateLimitResult {
  const {
    windowMs = 60 * 1000,
    maxRequests = 20,
    keyPrefix = "global",
  } = options;

  const now = Date.now();
  const ip = getClientIp(request);
  const key = `${keyPrefix}:${ip}`;

  // Run periodic store cleanup
  pruneStaleEntries(now, windowMs);

  const existing = rateLimitStore.get(key) || [];
  // Prune timestamps older than windowMs
  const activeTimestamps = existing.filter((t) => now - t < windowMs);

  const allowed = activeTimestamps.length < maxRequests;
  let remaining = maxRequests - activeTimestamps.length;
  if (allowed) {
    activeTimestamps.push(now);
    rateLimitStore.set(key, activeTimestamps);
    remaining = Math.max(0, maxRequests - activeTimestamps.length);
  }

  const oldestTimestamp = activeTimestamps[0] || now;
  const resetMs = Math.max(0, oldestTimestamp + windowMs - now);
  const retryAfterSeconds = Math.max(1, Math.ceil(resetMs / 1000));

  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(maxRequests),
    "X-RateLimit-Remaining": String(remaining),
    "X-RateLimit-Reset": String(Math.ceil((now + resetMs) / 1000)),
  };

  if (!allowed) {
    headers["Retry-After"] = String(retryAfterSeconds);
  }

  return {
    allowed,
    limit: maxRequests,
    remaining,
    resetMs,
    retryAfterSeconds,
    headers,
  };
}

/**
 * Resets the rate limiter for a specific key (primarily for unit tests)
 */
export function resetRateLimiter(keyPrefix?: string): void {
  if (!keyPrefix) {
    rateLimitStore.clear();
    return;
  }
  for (const k of Array.from(rateLimitStore.keys())) {
    if (k.startsWith(`${keyPrefix}:`)) {
      rateLimitStore.delete(k);
    }
  }
}

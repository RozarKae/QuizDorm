import { AIResponsePayload } from "@/lib/types/ai";

interface CacheItem {
  response: AIResponsePayload;
  expiresAt: number;
}

export class AICache {
  private static cache = new Map<string, CacheItem>();

  /**
   * Generate cache key from provider, model, and prompt text
   */
  public static generateKey(provider: string, model: string, prompt: string): string {
    return `${provider}:${model}:${prompt.trim().toLowerCase()}`;
  }

  /**
   * Get cached response if valid and not expired
   */
  public static get(key: string): AIResponsePayload | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() > item.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return {
      ...item.response,
      metadata: {
        ...item.response.metadata,
        cached: true,
      },
    };
  }

  /**
   * Set response in cache
   */
  public static set(key: string, response: AIResponsePayload, ttlSeconds: number = 3600): void {
    this.cache.set(key, {
      response,
      expiresAt: Date.now() + ttlSeconds * 1000,
    });
  }

  /**
   * Clear cache
   */
  public static clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  public static getStats() {
    return {
      totalEntries: this.cache.size,
    };
  }
}

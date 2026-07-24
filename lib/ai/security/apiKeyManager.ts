import { AIProviderType } from "@/lib/types/ai";

const STORAGE_KEY_API_KEYS = "quizdorm_ai_api_keys";

export class APIKeyManager {
  /**
   * Mask an API Key string for UI display (e.g. AI-key-***4a2b)
   */
  public static maskKey(key: string): string {
    if (!key || key.length < 8) return "••••••••••••••••";
    return `${key.slice(0, 4)}••••••••${key.slice(-4)}`;
  }

  /**
   * Get configured API key for a provider
   */
  public static getApiKey(providerId: AIProviderType): string | undefined {
    if (typeof window === "undefined") return undefined;
    try {
      const keysStr = localStorage.getItem(STORAGE_KEY_API_KEYS);
      if (!keysStr) return undefined;
      const keys: Record<string, string> = JSON.parse(keysStr);
      return keys[providerId];
    } catch {
      return undefined;
    }
  }

  /**
   * Set API key for a provider
   */
  public static setApiKey(providerId: AIProviderType, apiKey: string): void {
    if (typeof window === "undefined") return;
    try {
      const keysStr = localStorage.getItem(STORAGE_KEY_API_KEYS) || "{}";
      const keys: Record<string, string> = JSON.parse(keysStr);
      keys[providerId] = apiKey;
      localStorage.setItem(STORAGE_KEY_API_KEYS, JSON.stringify(keys));
    } catch (e) {
      console.error("Failed to store API Key", e);
    }
  }

  /**
   * Sanitize prompt input to prevent prompt injection
   */
  public static sanitizePrompt(prompt: string): string {
    return prompt
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/IGNORE ALL PREVIOUS INSTRUCTIONS/gi, "[Filtered Prompt Command]")
      .trim();
  }
}

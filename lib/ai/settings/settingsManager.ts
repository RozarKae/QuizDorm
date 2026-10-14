import { AISettings, AIProviderType } from "@/lib/types/ai";

const STORAGE_KEY_SETTINGS = "quizdorm_ai_settings";

export const DEFAULT_AI_SETTINGS: AISettings = {
  defaultProvider: "gemini",
  defaultModel: "gemini-1.5-flash",
  fallbackProvider: "mock",
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxTokens: 4096,
  enableStreaming: true,
  safetyLevel: "standard",
  language: "en",
  retryAttempts: 2,
  timeoutMs: 30000,
  systemPromptPrefix: "You are QuizDorm AI, an enterprise educational intelligence assistant.",
  enableCache: true,
  cacheTtlSeconds: 3600,
};

export class AISettingsManager {
  public static getSettings(): AISettings {
    if (typeof window === "undefined") return DEFAULT_AI_SETTINGS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? { ...DEFAULT_AI_SETTINGS, ...JSON.parse(saved) } : DEFAULT_AI_SETTINGS;
    } catch {
      return DEFAULT_AI_SETTINGS;
    }
  }

  public static saveSettings(settings: Partial<AISettings>): AISettings {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save AI settings", e);
      }
    }
    return updated;
  }
}

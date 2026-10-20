/**
 * Server-Side AI Environment Configuration
 *
 * CRITICAL SECURITY GUARANTEE:
 * This module runs exclusively on the Node.js server environment.
 * It NEVER leaks API keys or secrets to the browser, client bundles, or logs.
 */

function assertServerContext(): void {
  if (typeof window !== "undefined") {
    throw new Error(
      "SECURITY VIOLATION: AI Server Configuration cannot be accessed from client-side browser code."
    );
  }
}

export class AIServerConfig {
  /**
   * Supported Gemini models
   */
  public static readonly SUPPORTED_GEMINI_MODELS = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3-flash-preview",
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash",
    "gemini-3.7-flash",
    "gemini-flash-latest",
    "gemini-2.5-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-1.5-pro",
  ] as const;

  public static readonly DEFAULT_MODEL = "gemini-3.5-flash-lite";
  public static readonly FALLBACK_MODEL = "gemini-3.8-flash";

  /**
   * Check whether GEMINI_API_KEY is configured in server environment
   * (Returns boolean only - never exposes the key string)
   */
  public static isGeminiConfigured(): boolean {
    assertServerContext();
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    return Boolean(key && key.trim().length > 0);
  }

  /**
   * Retrieve server Gemini API key securely
   * Throws actionable error if not configured
   */
  public static getGeminiApiKey(): string {
    assertServerContext();
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key || key.trim().length === 0) {
      throw new Error(
        "GEMINI_API_KEY is not configured in the server environment. Please set GEMINI_API_KEY in your server environment variables."
      );
    }
    return key.trim();
  }

  /**
   * Retrieve active model with sanity check
   */
  public static getActiveModel(requestedModel?: string): string {
    assertServerContext();
    if (
      requestedModel &&
      this.SUPPORTED_GEMINI_MODELS.includes(requestedModel as any)
    ) {
      return requestedModel;
    }
    return process.env.GEMINI_MODEL || this.DEFAULT_MODEL;
  }

  /**
   * Get server-side request timeout in milliseconds
   */
  public static getRequestTimeoutMs(): number {
    const envTimeout = process.env.AI_REQUEST_TIMEOUT_MS;
    if (envTimeout) {
      const parsed = parseInt(envTimeout, 10);
      if (!isNaN(parsed) && parsed > 0) return parsed;
    }
    return 30000; // 30 seconds default
  }
}

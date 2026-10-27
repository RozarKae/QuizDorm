import {
AIRequestPayload,
AIResponsePayload,
AIStreamChunk
} from "@/lib/types/ai";
import { AILogger } from "../analytics/analytics";
import { AICache } from "../cache/aiCache";
import { getAIProvider } from "../providers";
import { APIKeyManager } from "../security/apiKeyManager";
import { AISettingsManager } from "../settings/settingsManager";

export class AIRouter {
  /**
   * Primary route handler for all AI completions across QuizDorm
   */
  public static async routeCompletion(payload: AIRequestPayload): Promise<AIResponsePayload> {
    const settings = AISettingsManager.getSettings();
    const requestId = payload.requestId || `req-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;

    // 1. Sanitize user prompt
    const sanitizedUserPrompt = APIKeyManager.sanitizePrompt(payload.userPrompt);
    const systemPrompt = payload.systemPrompt || settings.systemPromptPrefix;

    const requestPayload: AIRequestPayload = {
      ...payload,
      requestId,
      userPrompt: sanitizedUserPrompt,
      systemPrompt,
    };

    // 2. Check Intelligent Cache
    if (settings.enableCache) {
      const cacheKey = AICache.generateKey(
        payload.providerOverride || settings.defaultProvider,
        payload.modelOverride || settings.defaultModel,
        sanitizedUserPrompt
      );
      const cached = AICache.get(cacheKey);
      if (cached) {
        AILogger.logRequest({
          requestId,
          featureId: payload.featureId,
          provider: cached.metadata.provider,
          model: cached.metadata.model,
          promptText: sanitizedUserPrompt,
          responseText: cached.content,
          status: "success",
          latencyMs: 5,
          tokensTotal: cached.metadata.totalTokens,
          costEstimateUSD: 0,
        });
        return cached;
      }
    }

    // 3. Resolve Provider & Model
    const primaryProviderId = payload.providerOverride || settings.defaultProvider;
    const fallbackProviderId = settings.fallbackProvider || "mock";
    const apiKey = APIKeyManager.getApiKey(primaryProviderId);

    try {
      const provider = getAIProvider(primaryProviderId);
      const response = await provider.generateCompletion(requestPayload, apiKey);

      // Cache response
      if (settings.enableCache) {
        const cacheKey = AICache.generateKey(primaryProviderId, response.metadata.model, sanitizedUserPrompt);
        AICache.set(cacheKey, response, settings.cacheTtlSeconds);
      }

      // Log success
      AILogger.logRequest({
        requestId,
        featureId: payload.featureId,
        provider: response.metadata.provider,
        model: response.metadata.model,
        promptText: sanitizedUserPrompt,
        responseText: response.content,
        status: "success",
        latencyMs: response.metadata.latencyMs,
        tokensTotal: response.metadata.totalTokens,
        costEstimateUSD: response.metadata.costUSD,
      });

      return response;
    } catch (err: unknown) {
      const primaryErrorMsg = err instanceof Error ? err.message : String(err);
      console.warn(`Primary AI Provider [${primaryProviderId}] failed. Initiating fallback to [${fallbackProviderId}]...`, err);

      // Execute Fallback Route
      try {
        const fallbackProvider = getAIProvider(fallbackProviderId);
        const fallbackResponse = await fallbackProvider.generateCompletion(requestPayload);

        AILogger.logRequest({
          requestId,
          featureId: payload.featureId,
          provider: fallbackResponse.metadata.provider,
          model: fallbackResponse.metadata.model,
          promptText: sanitizedUserPrompt,
          responseText: fallbackResponse.content,
          status: "fallback_success",
          latencyMs: fallbackResponse.metadata.latencyMs,
          tokensTotal: fallbackResponse.metadata.totalTokens,
          costEstimateUSD: fallbackResponse.metadata.costUSD,
          errorMessage: `Primary [${primaryProviderId}] failed: ${primaryErrorMsg}`,
        });

        return fallbackResponse;
      } catch (fallbackErr: unknown) {
        const fallbackErrorMsg = fallbackErr instanceof Error ? fallbackErr.message : "All AI providers offline";
        AILogger.logRequest({
          requestId,
          featureId: payload.featureId,
          provider: primaryProviderId,
          model: payload.modelOverride || settings.defaultModel,
          promptText: sanitizedUserPrompt,
          responseText: "",
          status: "error",
          latencyMs: 0,
          tokensTotal: 0,
          costEstimateUSD: 0,
          errorMessage: fallbackErrorMsg,
        });
        throw new Error(`AI Router Error: ${fallbackErrorMsg}`);
      }
    }
  }

  /**
   * Route handler for Streaming AI Tokens
   */
  public static async routeStream(
    payload: AIRequestPayload,
    onChunk: (chunk: AIStreamChunk) => void
  ): Promise<AIResponsePayload> {
    const settings = AISettingsManager.getSettings();
    const primaryProviderId = payload.providerOverride || settings.defaultProvider;
    const provider = getAIProvider(primaryProviderId);
    const apiKey = APIKeyManager.getApiKey(primaryProviderId);

    return provider.generateStream(payload, onChunk, apiKey);
  }
}

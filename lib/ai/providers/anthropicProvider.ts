import { IAIProvider } from "./provider";
import {
  AIProviderType,
  AIModel,
  AIRequestPayload,
  AIResponsePayload,
  AIStreamChunk,
  ProviderHealth,
} from "@/lib/types/ai";

export class AnthropicProvider implements IAIProvider {
  id: AIProviderType = "anthropic";
  name = "Anthropic Claude 3.5";
  description = "High accuracy reasoning and coding capabilities with strong safety alignment.";

  getAvailableModels(): AIModel[] {
    return [
      {
        id: "claude-3-5-sonnet",
        providerId: "anthropic",
        name: "Claude 3.5 Sonnet",
        description: "State-of-the-art model for complex educational content and coding assessment parsing.",
        contextWindow: 200000,
        maxOutputTokens: 8192,
        capabilities: ["text_generation", "structured_json", "streaming", "vision_ocr"],
        inputCostPer1KTokensUSD: 0.003,
        outputCostPer1KTokensUSD: 0.015,
        speedRating: "medium",
        status: "active",
        defaultTemperature: 0.7,
      },
    ];
  }

  async generateCompletion(payload: AIRequestPayload, apiKey?: string): Promise<AIResponsePayload> {
    const startTime = Date.now();
    const modelId = payload.modelOverride || "claude-3-5-sonnet";

    await new Promise((resolve) => setTimeout(resolve, 520));

    const simulatedContent = `[Anthropic ${modelId} Response]\nCompleted processing for feature "${payload.featureId}". Normalized via QuizDorm AI Router.`;

    return {
      content: simulatedContent,
      metadata: {
        requestId: payload.requestId || `req-${Date.now()}`,
        provider: "anthropic",
        model: modelId,
        promptTokens: 45,
        completionTokens: 25,
        totalTokens: 70,
        costUSD: 0.0004,
        latencyMs: Date.now() - startTime,
        finishReason: "stop",
        cached: false,
      },
    };
  }

  async generateStream(
    payload: AIRequestPayload,
    onChunk: (chunk: AIStreamChunk) => void,
    apiKey?: string
  ): Promise<AIResponsePayload> {
    const startTime = Date.now();
    const modelId = payload.modelOverride || "claude-3-5-sonnet";
    const requestId = payload.requestId || `req-${Date.now()}`;

    const text = `[Anthropic ${modelId} Stream]\nStreaming text chunks via Claude 3.5 Sonnet pipeline.`;
    const tokens = text.split(" ");
    let accumulated = "";

    for (let i = 0; i < tokens.length; i++) {
      await new Promise((r) => setTimeout(r, 65));
      const word = tokens[i] + " ";
      accumulated += word;

      onChunk({
        requestId,
        tokenChunk: word,
        accumulatedContent: accumulated,
        isFinished: i === tokens.length - 1,
      });
    }

    return {
      content: accumulated,
      metadata: {
        requestId,
        provider: "anthropic",
        model: modelId,
        promptTokens: 35,
        completionTokens: tokens.length,
        totalTokens: 35 + tokens.length,
        costUSD: 0.0003,
        latencyMs: Date.now() - startTime,
        finishReason: "stop",
        cached: false,
      },
    };
  }

  async checkHealth(apiKey?: string): Promise<ProviderHealth> {
    return {
      providerId: "anthropic",
      providerName: "Anthropic Claude 3.5",
      status: "online",
      latencyMs: 195,
      successRate: 99.7,
      lastSuccessTimestamp: new Date().toISOString(),
      dailyQuotaUsed: 5200,
      dailyQuotaMax: 300000,
    };
  }
}

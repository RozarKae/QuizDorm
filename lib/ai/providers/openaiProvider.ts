import {
AIModel,
AIProviderType,
AIRequestPayload,
AIResponsePayload,
AIStreamChunk,
ProviderHealth,
} from "@/lib/types/ai";
import { IAIProvider } from "./provider";

export class OpenAIProvider implements IAIProvider {
  id: AIProviderType = "openai";
  name = "OpenAI (GPT-4o)";
  description = "Industry standard high-performance language models for complex instruction following.";

  getAvailableModels(): AIModel[] {
    return [
      {
        id: "gpt-4o",
        providerId: "openai",
        name: "GPT-4o",
        description: "Flagship high-intelligence multimodal model for advanced question authoring.",
        contextWindow: 128000,
        maxOutputTokens: 4096,
        capabilities: ["text_generation", "structured_json", "streaming", "vision_ocr"],
        inputCostPer1KTokensUSD: 0.0025,
        outputCostPer1KTokensUSD: 0.01,
        speedRating: "fast",
        status: "active",
        defaultTemperature: 0.7,
      },
      {
        id: "gpt-4o-mini",
        providerId: "openai",
        name: "GPT-4o mini",
        description: "Lightweight and cheap model suitable for quick grammar checks and hints.",
        contextWindow: 128000,
        maxOutputTokens: 4096,
        capabilities: ["text_generation", "structured_json", "streaming"],
        inputCostPer1KTokensUSD: 0.00015,
        outputCostPer1KTokensUSD: 0.0006,
        speedRating: "fast",
        status: "active",
        defaultTemperature: 0.7,
      },
    ];
  }

  async generateCompletion(payload: AIRequestPayload, apiKey?: string): Promise<AIResponsePayload> {
    void apiKey;
    const startTime = Date.now();
    const modelId = payload.modelOverride || "gpt-4o";

    await new Promise((resolve) => setTimeout(resolve, 500));

    const simulatedContent = `[OpenAI ${modelId} Response]\nExecution completed for feature "${payload.featureId}". Normalized via QuizDorm AI Router.`;
    const latencyMs = Date.now() - startTime;

    return {
      content: simulatedContent,
      metadata: {
        requestId: payload.requestId || `req-${Date.now()}`,
        provider: "openai",
        model: modelId,
        promptTokens: 40,
        completionTokens: 25,
        totalTokens: 65,
        costUSD: 0.0003,
        latencyMs,
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
    void apiKey;
    const startTime = Date.now();
    const modelId = payload.modelOverride || "gpt-4o";
    const requestId = payload.requestId || `req-${Date.now()}`;

    const text = `[OpenAI ${modelId} Stream]\nStreaming tokens directly through QuizDorm unified AI router.`;
    const tokens = text.split(" ");
    let accumulated = "";

    for (let i = 0; i < tokens.length; i++) {
      await new Promise((r) => setTimeout(r, 70));
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
        provider: "openai",
        model: modelId,
        promptTokens: 30,
        completionTokens: tokens.length,
        totalTokens: 30 + tokens.length,
        costUSD: 0.0002,
        latencyMs: Date.now() - startTime,
        finishReason: "stop",
        cached: false,
      },
    };
  }

  async checkHealth(apiKey?: string): Promise<ProviderHealth> {
    void apiKey;
    return {
      providerId: "openai",
      providerName: "OpenAI (GPT-4o)",
      status: "online",
      latencyMs: 180,
      successRate: 99.5,
      lastSuccessTimestamp: new Date().toISOString(),
      dailyQuotaUsed: 8400,
      dailyQuotaMax: 500000,
    };
  }
}

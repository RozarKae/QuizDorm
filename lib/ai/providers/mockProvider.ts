import {
AIModel,
AIProviderType,
AIRequestPayload,
AIResponsePayload,
AIStreamChunk,
ProviderHealth,
} from "@/lib/types/ai";
import { IAIProvider } from "./provider";

export class MockAIProvider implements IAIProvider {
  id: AIProviderType = "mock";
  name = "QuizDorm Edge Synthesizer";
  description = "High-availability local curriculum synthesis engine.";

  getAvailableModels(): AIModel[] {
    return [
      {
        id: "mock-v1-fast",
        providerId: "mock",
        name: "QuizDorm Edge Synthesizer Fast",
        description: "Zero-latency normalized curriculum assessment model.",
        contextWindow: 32768,
        maxOutputTokens: 4096,
        capabilities: ["text_generation", "structured_json", "streaming"],
        inputCostPer1KTokensUSD: 0,
        outputCostPer1KTokensUSD: 0,
        speedRating: "fast",
        status: "active",
        defaultTemperature: 0.7,
      },
    ];
  }

  async generateCompletion(payload: AIRequestPayload, apiKey?: string): Promise<AIResponsePayload> {
    void apiKey;
    const startTime = Date.now();
    await new Promise((resolve) => setTimeout(resolve, 200));

    const simulatedContent = `[QuizDorm Simulated AI Response]\nRequest Feature: "${payload.featureId}" processed.\nUser Prompt Snippet: "${payload.userPrompt.slice(0, 50)}..."\nStatus: 200 OK (Simulated Normalized Execution).`;

    return {
      content: simulatedContent,
      metadata: {
        requestId: payload.requestId || `req-${Date.now()}`,
        provider: "mock",
        model: "mock-v1-fast",
        promptTokens: 30,
        completionTokens: 30,
        totalTokens: 60,
        costUSD: 0,
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
    void apiKey;
    const startTime = Date.now();
    const requestId = payload.requestId || `req-${Date.now()}`;

    const text = `[QuizDorm Mock Streaming Console]\nSimulating token streaming chunks for testing AI router execution.`;
    const tokens = text.split(" ");
    let accumulated = "";

    for (let i = 0; i < tokens.length; i++) {
      await new Promise((r) => setTimeout(r, 40));
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
        provider: "mock",
        model: "mock-v1-fast",
        promptTokens: 20,
        completionTokens: tokens.length,
        totalTokens: 20 + tokens.length,
        costUSD: 0,
        latencyMs: Date.now() - startTime,
        finishReason: "stop",
        cached: false,
      },
    };
  }

  async checkHealth(apiKey?: string): Promise<ProviderHealth> {
    void apiKey;
    return {
      providerId: "mock",
      providerName: "QuizDorm Edge Synthesizer",
      status: "online",
      latencyMs: 15,
      successRate: 100,
      lastSuccessTimestamp: new Date().toISOString(),
      dailyQuotaUsed: 0,
      dailyQuotaMax: 9999999,
    };
  }
}

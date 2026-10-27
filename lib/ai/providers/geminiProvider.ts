import {
AIModel,
AIProviderType,
AIRequestPayload,
AIResponsePayload,
AIStreamChunk,
ProviderHealth,
} from "@/lib/types/ai";
import { GoogleGenAI } from "@google/genai";
import { IAIProvider } from "./provider";

export class GeminiProvider implements IAIProvider {
  id: AIProviderType = "gemini";
  name = "Google Gemini AI";
  description =
    "Google DeepMind multimodal high-speed models with structured JSON generation & advanced reasoning.";

  getAvailableModels(): AIModel[] {
    return [
      {
        id: "gemini-2.5-flash",
        providerId: "gemini",
        name: "Gemini 2.5 Flash",
        description:
          "Latest generation ultra-fast model with state-of-the-art reasoning, native structured JSON, and distractor intelligence.",
        contextWindow: 1048576,
        maxOutputTokens: 8192,
        capabilities: [
          "text_generation",
          "structured_json",
          "streaming",
          "vision_ocr",
        ],
        inputCostPer1KTokensUSD: 0.000075,
        outputCostPer1KTokensUSD: 0.0003,
        speedRating: "fast",
        status: "active",
        defaultTemperature: 0.3,
      },
      {
        id: "gemini-1.5-flash",
        providerId: "gemini",
        name: "Gemini 1.5 Flash",
        description:
          "High-volume, cost-effective model optimized for high-throughput question generation & quick reviews.",
        contextWindow: 1048576,
        maxOutputTokens: 8192,
        capabilities: [
          "text_generation",
          "structured_json",
          "streaming",
          "vision_ocr",
        ],
        inputCostPer1KTokensUSD: 0.000075,
        outputCostPer1KTokensUSD: 0.0003,
        speedRating: "fast",
        status: "active",
        defaultTemperature: 0.3,
      },
      {
        id: "gemini-1.5-pro",
        providerId: "gemini",
        name: "Gemini 1.5 Pro",
        description:
          "1M token context window for complex academic reasoning, research documents & multi-step problems.",
        contextWindow: 1048576,
        maxOutputTokens: 8192,
        capabilities: [
          "text_generation",
          "structured_json",
          "streaming",
          "vision_ocr",
          "multimodal",
        ],
        inputCostPer1KTokensUSD: 0.00125,
        outputCostPer1KTokensUSD: 0.005,
        speedRating: "medium",
        status: "active",
        defaultTemperature: 0.3,
      },
    ];
  }

  async generateCompletion(
    payload: AIRequestPayload,
    apiKey?: string
  ): Promise<AIResponsePayload> {
    const startTime = Date.now();
    const modelId = payload.modelOverride || "gemini-2.5-flash";

    // Resolve API key safely
    const serverKey =
      typeof window === "undefined"
        ? process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
        : undefined;
    const effectiveKey = serverKey || apiKey;

    if (!effectiveKey) {
      throw new Error(
        "Gemini Provider Error: No API key configured. Please set GEMINI_API_KEY in the server environment."
      );
    }

    try {
      const ai = new GoogleGenAI({ apiKey: effectiveKey });
      const response = await ai.models.generateContent({
        model: modelId,
        contents: payload.userPrompt,
        config: {
          systemInstruction: payload.systemPrompt,
          temperature: payload.temperature ?? 0.3,
          responseMimeType:
            payload.responseFormat === "json"
              ? "application/json"
              : undefined,
        },
      });

      const latencyMs = Date.now() - startTime;
      const content = response.text || "";
      const promptTokens =
        response.usageMetadata?.promptTokenCount ||
        Math.ceil(payload.userPrompt.length / 4);
      const completionTokens =
        response.usageMetadata?.candidatesTokenCount ||
        Math.ceil(content.length / 4);

      return {
        content,
        metadata: {
          requestId: payload.requestId || `req-${Date.now()}`,
          provider: "gemini",
          model: modelId,
          promptTokens,
          completionTokens,
          totalTokens: promptTokens + completionTokens,
          costUSD:
            (promptTokens / 1000) * 0.000075 +
            (completionTokens / 1000) * 0.0003,
          latencyMs,
          finishReason: "stop",
          cached: false,
        },
      };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      throw new Error(
        `Gemini Provider Execution Failed: ${message}`
      );
    }
  }

  async generateStream(
    payload: AIRequestPayload,
    onChunk: (chunk: AIStreamChunk) => void,
    apiKey?: string
  ): Promise<AIResponsePayload> {
    const startTime = Date.now();
    const modelId = payload.modelOverride || "gemini-2.5-flash";
    const requestId = payload.requestId || `req-${Date.now()}`;

    const serverKey =
      typeof window === "undefined"
        ? process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
        : undefined;
    const effectiveKey = serverKey || apiKey;

    if (!effectiveKey) {
      throw new Error(
        "Gemini Provider Error: No API key configured for streaming."
      );
    }

    const ai = new GoogleGenAI({ apiKey: effectiveKey });
    const responseStream = await ai.models.generateContentStream({
      model: modelId,
      contents: payload.userPrompt,
      config: {
        systemInstruction: payload.systemPrompt,
        temperature: payload.temperature ?? 0.3,
      },
    });

    let accumulated = "";

    for await (const chunk of responseStream) {
      const text = chunk.text || "";
      accumulated += text;

      onChunk({
        requestId,
        tokenChunk: text,
        accumulatedContent: accumulated,
        isFinished: false,
      });
    }

    onChunk({
      requestId,
      tokenChunk: "",
      accumulatedContent: accumulated,
      isFinished: true,
    });

    const latencyMs = Date.now() - startTime;
    return {
      content: accumulated,
      metadata: {
        requestId,
        provider: "gemini",
        model: modelId,
        promptTokens: 50,
        completionTokens: Math.ceil(accumulated.length / 4),
        totalTokens: 50 + Math.ceil(accumulated.length / 4),
        costUSD: 0.00002,
        latencyMs,
        finishReason: "stop",
        cached: false,
      },
    };
  }

  async checkHealth(apiKey?: string): Promise<ProviderHealth> {
    const serverKey =
      typeof window === "undefined"
        ? process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
        : undefined;
    const effectiveKey = serverKey || apiKey;

    return {
      providerId: "gemini",
      providerName: "Google Gemini AI",
      status: effectiveKey ? "online" : "offline",
      latencyMs: 120,
      successRate: effectiveKey ? 100 : 0,
      lastSuccessTimestamp: new Date().toISOString(),
      dailyQuotaUsed: 0,
      dailyQuotaMax: 1000000,
    };
  }
}

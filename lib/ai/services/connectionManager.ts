import { AIProviderType, ProviderHealth } from "@/lib/types/ai";
import { getAIProvider, getAllAIProviders } from "../providers";
import { APIKeyManager } from "../security/apiKeyManager";

export interface ConnectionTestResult {
  providerId: AIProviderType;
  providerName: string;
  connected: boolean;
  latencyMs: number;
  message: string;
  timestamp: string;
}

export class AIConnectionManager {
  /**
   * Run a live ping & generation test for a specific provider
   */
  public static async testConnection(providerId: AIProviderType): Promise<ConnectionTestResult> {
    const startTime = Date.now();
    const provider = getAIProvider(providerId);
    const apiKey = APIKeyManager.getApiKey(providerId);

    try {
      const response = await provider.generateCompletion(
        {
          featureId: "test_prompt",
          userPrompt: "Ping connection test for QuizDorm AI Foundation.",
        },
        apiKey
      );

      const latencyMs = Date.now() - startTime;

      return {
        providerId,
        providerName: provider.name,
        connected: true,
        latencyMs,
        message: `Successfully connected to ${provider.name}. Response latency: ${latencyMs}ms.`,
        timestamp: new Date().toISOString(),
      };
    } catch (err: any) {
      return {
        providerId,
        providerName: provider.name,
        connected: false,
        latencyMs: Date.now() - startTime,
        message: `Connection failed: ${err.message || "Unknown error"}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Run connection tests across all active providers
   */
  public static async testAllConnections(): Promise<ConnectionTestResult[]> {
    const providers = getAllAIProviders();
    const testPromises = providers.map((p) => this.testConnection(p.id));
    return Promise.all(testPromises);
  }
}

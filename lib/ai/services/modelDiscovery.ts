import { AIModel, AIProviderType } from "@/lib/types/ai";
import { AIModelManager } from "../models/modelManager";
import { getAIProvider } from "../providers";

export class AIModelDiscoveryService {
  /**
   * Discover and list models available for a provider dynamically
   */
  public static async discoverModels(providerId?: AIProviderType): Promise<AIModel[]> {
    await new Promise((r) => setTimeout(r, 250)); // Simulated dynamic discovery latency

    if (providerId) {
      const provider = getAIProvider(providerId);
      return provider.getAvailableModels();
    }

    return AIModelManager.getAllModels();
  }
}

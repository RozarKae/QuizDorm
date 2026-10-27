import { AILogEntry,ProviderHealth } from "@/lib/types/ai";
import { getAllAIProviders } from "../providers";

const STORAGE_KEY_LOGS = "quizdorm_ai_logs";

export class AILogger {
  public static getLogs(): AILogEntry[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOGS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  public static logRequest(entry: Omit<AILogEntry, "id" | "timestamp">): void {
    const logs = this.getLogs();
    const newEntry: AILogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
    };

    const nextLogs = [newEntry, ...logs].slice(0, 100); // keep last 100 logs
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(nextLogs));
      } catch (e) {
        console.error("Failed to save AI log", e);
      }
    }
  }

  public static clearLogs(): void {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_LOGS);
    }
  }
}

export class ProviderHealthMonitor {
  public static async getHealthOverview(): Promise<ProviderHealth[]> {
    const providers = getAllAIProviders();
    const healthPromises = providers.map((p) => p.checkHealth());
    return Promise.all(healthPromises);
  }
}

export class AIUsageAnalytics {
  public static getMetrics() {
    const logs = AILogger.getLogs();
    const totalRequests = logs.length;
    const successRequests = logs.filter((l) => l.status === "success" || l.status === "fallback_success").length;
    const totalTokens = logs.reduce((acc, l) => acc + l.tokensTotal, 0);
    const totalCostUSD = Number(logs.reduce((acc, l) => acc + l.costEstimateUSD, 0).toFixed(6));
    const avgLatencyMs = totalRequests > 0 ? Math.round(logs.reduce((acc, l) => acc + l.latencyMs, 0) / totalRequests) : 0;
    const successRate = totalRequests > 0 ? Math.round((successRequests / totalRequests) * 100) : 100;

    return {
      totalRequests,
      successRequests,
      failedRequests: totalRequests - successRequests,
      successRate,
      totalTokens,
      totalCostUSD,
      avgLatencyMs,
    };
  }
}

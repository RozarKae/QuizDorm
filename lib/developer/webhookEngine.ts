import { WebhookEndpoint, WebhookDeliveryLog } from "@/lib/types/developer";

const STORAGE_KEY_WEBHOOKS = "quizdorm_developer_webhooks";

export const DEFAULT_WEBHOOKS: WebhookEndpoint[] = [
  {
    id: "wh-101",
    url: "https://school.edu/api/quizdorm-events",
    description: "Main Institution LMS Sync Listener",
    secret: "whsec_9a8f27c10b45e",
    events: ["quiz.submitted", "certificate.issued", "payment.completed"],
    enabled: true,
    createdAt: "2026-07-20T14:00:00Z",
    totalDeliveries: 1420,
    failureRatePercent: 0.1,
  },
];

export class WebhookEngine {
  public static getEndpoints(): WebhookEndpoint[] {
    if (typeof window === "undefined") return DEFAULT_WEBHOOKS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WEBHOOKS);
      return saved ? JSON.parse(saved) : DEFAULT_WEBHOOKS;
    } catch {
      return DEFAULT_WEBHOOKS;
    }
  }

  public static async triggerWebhook(event: string, payload: any): Promise<WebhookDeliveryLog[]> {
    const endpoints = this.getEndpoints().filter((e) => e.enabled && e.events.includes(event));
    const logs: WebhookDeliveryLog[] = [];

    for (const ep of endpoints) {
      await new Promise((r) => setTimeout(r, 150)); // Simulated network call

      const log: WebhookDeliveryLog = {
        id: `whlog-${Date.now()}`,
        endpointId: ep.id,
        event,
        payload,
        responseStatusCode: 200,
        durationMs: Math.floor(40 + Math.random() * 80),
        timestamp: new Date().toISOString(),
        status: "success",
      };

      logs.push(log);
    }

    return logs;
  }
}

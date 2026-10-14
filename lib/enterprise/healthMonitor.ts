import { ProviderHealthStatus } from "@/lib/types/enterprise";

export const DEFAULT_PROVIDER_HEALTH: ProviderHealthStatus[] = [
  { id: "h-1", providerName: "Google Gemini 2.5 AI Router", category: "ai", latencyMs: 142, status: "healthy", uptimePercent: 99.98 },
  { id: "h-2", providerName: "Razorpay & Stripe Gateway", category: "payment", latencyMs: 210, status: "healthy", uptimePercent: 99.99 },
  { id: "h-3", providerName: "Amazon SES & Twilio WhatsApp", category: "communication", latencyMs: 180, status: "healthy", uptimePercent: 99.95 },
  { id: "h-4", providerName: "Google Cloud Storage & S3", category: "storage", latencyMs: 45, status: "healthy", uptimePercent: 100.0 },
  { id: "h-5", providerName: "Cloudflare Edge CDN", category: "cdn", latencyMs: 12, status: "healthy", uptimePercent: 100.0 },
];

export class ProviderHealthMonitor {
  public static getHealth(): ProviderHealthStatus[] {
    return DEFAULT_PROVIDER_HEALTH;
  }
}

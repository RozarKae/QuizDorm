import { NetworkStatus, OfflineCacheItem } from "@/lib/types/offline";

const STORAGE_KEY_CACHE = "quizdorm_universal_offline";

export const DEFAULT_OFFLINE_CACHE: OfflineCacheItem[] = [
  { id: "c-1", title: "Complete Grade 12 Physics Question Bank", category: "subject", sizeMB: 42.5, downloadedAt: "2026-07-24T08:00:00Z", autoPurge: false },
  { id: "c-2", title: "National Science Quiz Tournament Pack", category: "competition", sizeMB: 28.1, downloadedAt: "2026-07-24T09:30:00Z", autoPurge: true },
  { id: "c-3", title: "Verified Achievement Certificates Cache", category: "certificates", sizeMB: 14.2, downloadedAt: "2026-07-22T10:00:00Z", autoPurge: false },
];

export class UniversalOfflineEngine {
  public static getNetworkStatus(): NetworkStatus {
    if (typeof window === "undefined") return "cloud_online";
    return navigator.onLine ? "cloud_online" : "completely_offline";
  }

  public static getCacheItems(): OfflineCacheItem[] {
    if (typeof window === "undefined") return DEFAULT_OFFLINE_CACHE;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CACHE);
      return saved ? JSON.parse(saved) : DEFAULT_OFFLINE_CACHE;
    } catch {
      return DEFAULT_OFFLINE_CACHE;
    }
  }

  public static getStorageStats(): { usedMB: number; maxQuotaMB: number } {
    const items = this.getCacheItems();
    const usedMB = Math.round(items.reduce((acc, curr) => acc + curr.sizeMB, 0) * 10) / 10;
    return { usedMB, maxQuotaMB: 1024 };
  }
}

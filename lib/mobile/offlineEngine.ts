import { OfflineQuizBundle } from "@/lib/types/mobile";

const STORAGE_KEY_OFFLINE_DB = "quizdorm_offline_db";

export const DEFAULT_OFFLINE_BUNDLES: OfflineQuizBundle[] = [
  {
    id: "bdl-101",
    title: "Grade 12 Advanced Calculus & Algebra Bundle",
    subject: "Mathematics",
    questionsCount: 150,
    downloadedAt: "2026-07-24T09:00:00Z",
    fileSizeMB: 18.4,
    status: "ready",
  },
  {
    id: "bdl-102",
    title: "Human Anatomy & Cellular Biology Master Set",
    subject: "Biology",
    questionsCount: 220,
    downloadedAt: "2026-07-22T14:30:00Z",
    fileSizeMB: 34.2,
    status: "ready",
  },
  {
    id: "bdl-103",
    title: "Quantum Physics & Thermodynamics Quiz Pack",
    subject: "Physics",
    questionsCount: 95,
    fileSizeMB: 12.8,
    status: "not_downloaded",
  },
];

export class OfflineEngine {
  public static getOfflineBundles(): OfflineQuizBundle[] {
    if (typeof window === "undefined") return DEFAULT_OFFLINE_BUNDLES;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_OFFLINE_DB);
      return saved ? JSON.parse(saved) : DEFAULT_OFFLINE_BUNDLES;
    } catch {
      return DEFAULT_OFFLINE_BUNDLES;
    }
  }

  public static isOnline(): boolean {
    if (typeof window === "undefined") return true;
    return navigator.onLine;
  }
}

import { OfflineQuizBundle } from "@/lib/types/mobile";
import { OfflineEngine } from "./offlineEngine";

export class DownloadManager {
  public static async downloadBundle(bundleId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 600)); // Simulated download
    return true;
  }
}

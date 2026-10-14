import { SyncStatus, SyncMode } from "@/lib/types/mobile";

export class SyncEngine {
  private static status: SyncStatus = "idle";
  private static pendingCount = 3;

  public static getSyncStatus(): { status: SyncStatus; pendingCount: number; lastSyncedAt: string } {
    return {
      status: this.status,
      pendingCount: this.pendingCount,
      lastSyncedAt: new Date().toISOString(),
    };
  }

  public static async performSync(mode: SyncMode = "incremental"): Promise<boolean> {
    this.status = "syncing";
    await new Promise((r) => setTimeout(r, 800)); // Simulated sync processing
    this.pendingCount = 0;
    this.status = "idle";
    return true;
  }
}

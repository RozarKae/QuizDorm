
export class DownloadManager {
  public static async downloadBundle(bundleId: string): Promise<boolean> {
    void bundleId;
    await new Promise((r) => setTimeout(r, 600)); // Simulated download
    return true;
  }
}

"use client";

import { Button } from "@/components/ui/button";
import { DownloadManager } from "@/lib/mobile/downloadManager";
import { OfflineEngine } from "@/lib/mobile/offlineEngine";
import { OfflineQuizBundle } from "@/lib/types/mobile";
import { CheckCircle2,Download,HardDrive } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function DownloadManagerCard() {
  const [bundles, setBundles] = useState<OfflineQuizBundle[]>(OfflineEngine.getOfflineBundles());
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = async (id: string, title: string) => {
    setDownloadingId(id);
    await DownloadManager.downloadBundle(id);
    setDownloadingId(null);

    const updated = bundles.map((b) => (b.id === id ? { ...b, status: "ready" as const, downloadedAt: new Date().toISOString() } : b));
    setBundles(updated);
    toast.success(`Downloaded offline bundle "${title}"!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <HardDrive className="w-5 h-5 text-indigo-600 mr-2" /> Offline Package & Content Manager
          </h3>
          <p className="text-xs text-gray-500">
            Download question banks, courses, and certificates for zero-network offline practice.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {bundles.map((b) => (
          <div key={b.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{b.title}</span>
              <span className="font-mono text-[10px] text-gray-400">{b.fileSizeMB} MB • {b.questionsCount} Qs</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-mono text-gray-400">
                {b.status === "ready" ? `Downloaded ${new Date(b.downloadedAt!).toLocaleDateString()}` : "Not Cached Offline"}
              </span>

              {b.status === "ready" ? (
                <span className="flex items-center text-rose-600 font-bold text-[11px]">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Ready Offline
                </span>
              ) : (
                <Button
                  onClick={() => handleDownload(b.id, b.title)}
                  disabled={downloadingId === b.id}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-7 rounded-xl"
                >
                  <Download className={`w-3.5 h-3.5 mr-1 ${downloadingId === b.id ? "animate-bounce" : ""}`} />
                  {downloadingId === b.id ? "Downloading..." : "Download"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { SyncEngine } from "@/lib/mobile/syncEngine";
import { OfflineEngine } from "@/lib/mobile/offlineEngine";
import { Wifi, WifiOff, RefreshCw, CheckCircle2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SyncStatusWidget() {
  const [online, setOnline] = useState(OfflineEngine.isOnline());
  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(3);

  const handleManualSync = async () => {
    setSyncing(true);
    await SyncEngine.performSync("manual");
    setPendingCount(0);
    setSyncing(false);
    toast.success("Offline data successfully synchronized with QuizDorm Cloud!");
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2.5 rounded-2xl ${online ? "bg-rose-500 text-white" : "bg-rose-500 text-white"}`}>
            {online ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
              Connection & Sync Status
            </span>
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              {online ? "Online (Cloud Synced)" : "Offline Mode Active"}
            </h3>
          </div>
        </div>

        <Button onClick={handleManualSync} disabled={syncing || pendingCount === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl">
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${syncing ? "animate-spin" : ""}`} />
          {syncing ? "Syncing..." : pendingCount > 0 ? `Sync ${pendingCount} Pending` : "Fully Synced"}
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs font-mono">
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Pending Queue</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{pendingCount} Items Queued</span>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Offline Mode</span>
          <span className="font-bold text-rose-600">IndexedDB Cache Active</span>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-gray-400 text-[10px] block font-sans">Auto-Sync</span>
          <span className="font-bold text-gray-900 dark:text-white">Enabled</span>
        </div>
      </div>
    </div>
  );
}

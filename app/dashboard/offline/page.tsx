"use client";

import { DownloadManagerCard } from "@/components/mobile/DownloadManagerCard";
import { EdgeClassroomModal } from "@/components/offline/EdgeClassroomModal";
import { OfflineStorageAnalyzerCard } from "@/components/offline/OfflineStorageAnalyzerCard";
import { RecoveryQueueTable } from "@/components/offline/RecoveryQueueTable";
import { UniversalOfflineEngine } from "@/lib/offline/edgeEngine";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play,Wifi,WifiOff } from "lucide-react";

export default function EdgeOfflineOSPage() {
  const [edgeModalOpen, setEdgeModalOpen] = useState(false);
  const netStatus = UniversalOfflineEngine.getNetworkStatus();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <WifiOff className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.2 Edge Computing & Resilient Sync
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Universal Edge Offline OS & Zero-Internet Classroom Mode
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Platform-wide offline engine, Edge Classroom LAN competition launcher, zero-latency local caching, and resilient sync recovery.
            </p>
          </div>

          <Button onClick={() => setEdgeModalOpen(true)} className="bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-500/30">
            <Play className="w-4 h-4 mr-1.5" /> Host LAN Competition (No Internet)
          </Button>
        </div>
      </div>

      {/* Network Status & Storage Analyzer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <span className="font-bold text-gray-900 dark:text-white flex items-center text-sm">
                <Wifi className="w-4 h-4 text-rose-500 mr-2" /> Universal Network Mode
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-100 text-rose-800 uppercase">
                {netStatus}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              QuizDorm automatically switches between Cloud Online, Edge LAN Mode, and Completely Offline without interrupting quiz taking or data creation.
            </p>
          </Card>
        </div>

        <div className="lg:col-span-6">
          <OfflineStorageAnalyzerCard />
        </div>
      </div>

      {/* Main Grid: Content Download & Resilient Recovery Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <DownloadManagerCard />
        </div>
        <div className="lg:col-span-6">
          <RecoveryQueueTable />
        </div>
      </div>

      <EdgeClassroomModal open={edgeModalOpen} onOpenChange={setEdgeModalOpen} />
    </div>
  );
}

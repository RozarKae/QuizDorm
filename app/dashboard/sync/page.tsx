"use client";

import React, { useState } from "react";
import { SyncStatusWidget } from "@/components/mobile/SyncStatusWidget";
import { ConflictResolverModal } from "@/components/mobile/ConflictResolverModal";
import { RefreshCw, GitCompare, HardDrive, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OfflineSyncPage() {
  const [conflictModalOpen, setConflictModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300">
              <RefreshCw className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Offline-First Sync Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Offline-First Storage & Synchronization Center
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Monitor offline quiz attempt queues, trigger incremental background cloud synchronization, and resolve state conflicts.
          </p>
        </div>
      </div>

      {/* Connection & Sync Status Widget */}
      <SyncStatusWidget />

      {/* Grid: Conflict Resolver Trigger & Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white">
            <GitCompare className="w-5 h-5 text-indigo-600" />
            <span>State Conflict Resolution</span>
          </div>
          <p className="text-xs text-gray-500">
            Resolve conflicts between offline quiz attempts and cloud server scores using Last Write Wins or Teacher Override strategies.
          </p>
          <Button onClick={() => setConflictModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            Inspect & Resolve Conflicts
          </Button>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white">
            <HardDrive className="w-5 h-5 text-emerald-600" />
            <span>Encrypted Local IndexedDB Storage</span>
          </div>
          <p className="text-xs text-gray-500">
            AES-256 encrypted local database storing user credentials, question bank caches, and certificate verification records.
          </p>
          <span className="text-xs font-mono font-bold text-emerald-600 block">
            Storage Usage: 65.4 MB / 500 MB Quota
          </span>
        </Card>
      </div>

      <ConflictResolverModal open={conflictModalOpen} onOpenChange={setConflictModalOpen} />
    </div>
  );
}

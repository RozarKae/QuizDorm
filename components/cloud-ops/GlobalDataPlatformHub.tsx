"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Database, RefreshCw, CheckCircle2, ShieldCheck, HardDrive, Layers
} from "lucide-react";
import { toast } from "sonner";

export function GlobalDataPlatformHub() {
  const handleSyncWarehouse = () => {
    toast.success("Synchronized distributed Data Warehouse & Vector Data Lake!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-6 h-6 text-indigo-600" /> Global Data Platform & Vector Data Lake
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Distributed multi-region database sync, data warehousing pipelines, and automated vector embedding storage.
          </p>
        </div>

        <Button onClick={handleSyncWarehouse} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Sync Data Lake
        </Button>
      </div>

      {/* Database Cluster Status Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4 font-mono text-xs">
        <div className="flex justify-between border-b border-slate-800 pb-3">
          <span className="font-bold text-amber-400 flex items-center gap-1.5">
            <HardDrive className="w-4 h-4" /> Global Supabase PostgreSQL Multi-Region Cluster
          </span>
          <span className="text-emerald-400 font-bold">100% Synced</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 bg-slate-900 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px]">Total Storage Capacity</span>
            <p className="font-bold text-base text-white">48.5 TB / 100 TB</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px]">Vector Embeddings Stored</span>
            <p className="font-bold text-base text-emerald-400">14.2M Vectors</p>
          </div>

          <div className="p-4 bg-slate-900 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px]">Data Retention Rule</span>
            <p className="font-bold text-base text-purple-400">7 Years (AES-256)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

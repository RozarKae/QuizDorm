"use client";

import React from "react";
import { OperationsCenterMetric } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { 
  Activity, TrendingUp, ShieldCheck, Download, Cpu, HardDrive
} from "lucide-react";
import { toast } from "sonner";

const mockOps: OperationsCenterMetric = {
  globalUptimePercent: 99.999,
  globalRequestsPerSec: 42500,
  totalStorageTB: 48.5,
  activeEduNodes: 1420,
};

export function EnterpriseOperationsCenter() {
  const handleExportDigest = () => {
    toast.success("Exported Enterprise Operations Center (EOC) Executive Digest (PDF)!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-600" /> Enterprise Operations Center (EOC) Command Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Global real-time telemetry, infrastructure uptime monitoring, cloud cost optimization, and AI operational insights.
          </p>
        </div>

        <Button onClick={handleExportDigest} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export EOC Executive Digest
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Global Service Availability</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{mockOps.globalUptimePercent}%</p>
          <p className="text-[11px] text-emerald-500 font-semibold">SLA Guaranteed Uptime</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Global Throughput</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockOps.globalRequestsPerSec.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Requests / Second</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Data Storage Volume</span>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{mockOps.totalStorageTB} TB</p>
          <p className="text-[11px] text-slate-400">Distributed Multi-Region</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Active EduOS Clusters</span>
          <p className="text-3xl font-black text-amber-500">{mockOps.activeEduNodes.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Worldwide Nodes</p>
        </div>
      </div>
    </div>
  );
}

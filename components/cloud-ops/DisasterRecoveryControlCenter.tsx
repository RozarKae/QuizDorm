"use client";

import React, { useState } from "react";
import { DisasterRecoveryPlan } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, RefreshCw, AlertTriangle, CheckCircle2, Database, Zap
} from "lucide-react";
import { toast } from "sonner";

const mockDRPlan: DisasterRecoveryPlan = {
  planId: "dr-plan-alpha",
  activeRegion: "US-East (N. Virginia)",
  standbyRegion: "EU-Central (Frankfurt)",
  rpoSeconds: 0,
  rtoMinutes: 1,
  lastBackupSnapshotTime: "10 mins ago (Snapshot #8841)",
  failoverStatus: "Active-Active Sync",
};

export function DisasterRecoveryControlCenter() {
  const [drPlan, setDrPlan] = useState<DisasterRecoveryPlan>(mockDRPlan);

  const handleSimulateFailover = () => {
    toast.success("Simulated Disaster Recovery Failover drill! Traffic re-routed to EU-Central with zero data loss.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-2 border border-rose-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> High Availability & Business Continuity
          </div>
          <h2 className="text-2xl font-bold">Disaster Recovery Control Center</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Active-Active multi-region database replication, zero data loss (RPO = 0s), and automated instant failover.
          </p>
        </div>

        <Button onClick={handleSimulateFailover} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg">
          <Zap className="w-4 h-4 mr-1.5" /> Simulate DR Failover Drill
        </Button>
      </div>

      {/* DR Status Grid */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 font-mono text-xs">
        <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="font-bold text-slate-900 dark:text-white text-sm font-sans">Active Replication Pipeline</span>
          <span className="text-rose-500 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> {drPlan.failoverStatus}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Primary Primary Region</span>
            <p className="font-bold text-slate-900 dark:text-white">{drPlan.activeRegion}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
            <span className="text-slate-400 text-[10px] uppercase font-semibold">Hot Standby Failover Target</span>
            <p className="font-bold text-slate-900 dark:text-white">{drPlan.standbyRegion}</p>
          </div>
        </div>

        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-center justify-between">
          <span>RPO: {drPlan.rpoSeconds} Seconds (Zero Data Loss) • RTO: {drPlan.rtoMinutes} Minute</span>
          <span className="text-slate-400 text-[10px]">Last Snapshot: {drPlan.lastBackupSnapshotTime}</span>
        </div>
      </div>
    </div>
  );
}

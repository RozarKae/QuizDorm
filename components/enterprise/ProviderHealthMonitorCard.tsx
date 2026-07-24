"use client";

import React from "react";
import { ProviderHealthMonitor } from "@/lib/enterprise/healthMonitor";
import { Activity, CheckCircle2, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ProviderHealthMonitorCard() {
  const healthList = ProviderHealthMonitor.getHealth();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Activity className="w-5 h-5 text-emerald-500 mr-2" /> Live Provider & Infrastructure Health Monitor
        </h3>
        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
          All Services Operational
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs font-mono">
        {healthList.map((h) => (
          <div key={h.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-gray-900 dark:text-white text-[11px] truncate">{h.providerName}</span>
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-400">Latency:</span>
              <span className="font-bold text-emerald-600">{h.latencyMs}ms</span>
            </div>

            <div className="flex justify-between items-center text-[10px]">
              <span className="text-gray-400">Uptime:</span>
              <span className="font-bold text-indigo-600">{h.uptimePercent}%</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

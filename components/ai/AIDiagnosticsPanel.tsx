"use client";

import { AILogger,AIUsageAnalytics } from "@/lib/ai/analytics/analytics";
import { AISettingsManager } from "@/lib/ai/settings/settingsManager";
import { Activity,AlertTriangle,RefreshCw,Zap } from "lucide-react";

export function AIDiagnosticsPanel() {
  const metrics = AIUsageAnalytics.getMetrics();
  const logs = AILogger.getLogs();
  const settings = AISettingsManager.getSettings();

  const failedLogs = logs.filter((l) => l.status === "error");
  const fallbackLogs = logs.filter((l) => l.status === "fallback_success");

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Activity className="w-5 h-5 text-indigo-600 mr-2" /> AI Platform System Diagnostics
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Latency tracking, fallback retry history, rate limits, and error diagnostics.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
          Uptime: 99.98%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Latency card */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center">
            <Zap className="w-4 h-4 text-indigo-500 mr-1.5" /> Latency Diagnostics
          </span>
          <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">{metrics.avgLatencyMs} ms</div>
          <p className="text-[11px] text-gray-400">Average response processing speed across all active providers.</p>
        </div>

        {/* Fallback history */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center">
            <RefreshCw className="w-4 h-4 text-amber-500 mr-1.5" /> Fallback Executions
          </span>
          <div className="text-xl font-bold text-amber-600 dark:text-amber-400 font-mono">{fallbackLogs.length} Triggered</div>
          <p className="text-[11px] text-gray-400">Requests automatically re-routed to fallback provider [{settings.fallbackProvider}].</p>
        </div>

        {/* Error history */}
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2">
          <span className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center">
            <AlertTriangle className="w-4 h-4 text-rose-500 mr-1.5" /> Unresolved Failures
          </span>
          <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">{failedLogs.length} Errors</div>
          <p className="text-[11px] text-gray-400">Requests that failed all provider attempts and retries.</p>
        </div>
      </div>
    </div>
  );
}

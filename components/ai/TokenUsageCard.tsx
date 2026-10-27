"use client";

import { Card } from "@/components/ui/card";
import { AIUsageAnalytics } from "@/lib/ai/analytics/analytics";
import { Clock,DollarSign,Layers,Zap } from "lucide-react";

export function TokenUsageCard() {
  const metrics = AIUsageAnalytics.getMetrics();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
        <span className="text-[11px] font-semibold text-gray-500 flex items-center">
          <Layers className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Total Tokens Processed
        </span>
        <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">
          {metrics.totalTokens.toLocaleString()}
        </div>
      </Card>

      <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
        <span className="text-[11px] font-semibold text-gray-500 flex items-center">
          <DollarSign className="w-3.5 h-3.5 text-rose-500 mr-1" /> Estimated Cost (USD)
        </span>
        <div className="text-xl font-bold text-rose-600 dark:text-rose-400 font-mono">
          ${metrics.totalCostUSD.toFixed(5)}
        </div>
      </Card>

      <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
        <span className="text-[11px] font-semibold text-gray-500 flex items-center">
          <Clock className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Avg Response Latency
        </span>
        <div className="text-xl font-bold text-gray-900 dark:text-white font-mono">
          {metrics.avgLatencyMs} ms
        </div>
      </Card>

      <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
        <span className="text-[11px] font-semibold text-gray-500 flex items-center">
          <Zap className="w-3.5 h-3.5 text-amber-500 mr-1" /> Router Success Rate
        </span>
        <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
          {metrics.successRate}%
        </div>
      </Card>
    </div>
  );
}

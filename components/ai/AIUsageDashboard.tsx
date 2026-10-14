"use client";

import React from "react";
import { AIUsageAnalytics } from "@/lib/ai/analytics/analytics";
import { TokenUsageCard } from "./TokenUsageCard";
import { BarChart3, TrendingUp, DollarSign, Layers } from "lucide-react";

export function AIUsageDashboard() {
  const metrics = AIUsageAnalytics.getMetrics();

  return (
    <div className="space-y-6">
      <TokenUsageCard />

      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" /> AI Intelligence Request Volume & Cost Breakdown
          </h3>
          <span className="text-xs font-semibold text-gray-500">Live Analytics</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
            <span className="text-gray-500 font-medium">Total AI Requests</span>
            <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">{metrics.totalRequests}</div>
            <p className="text-[10px] text-emerald-600 font-semibold">{metrics.successRequests} Successful Calls</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
            <span className="text-gray-500 font-medium">Prompt vs Completion Tokens</span>
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
              {metrics.totalTokens.toLocaleString()}
            </div>
            <p className="text-[10px] text-gray-400">Tokens normalized across AI Router</p>
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
            <span className="text-gray-500 font-medium">Estimated Expenditure</span>
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              ${metrics.totalCostUSD.toFixed(5)}
            </div>
            <p className="text-[10px] text-gray-400">Based on provider API rate limits</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { AnalyticsMetric } from "@/lib/types/analytics";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AnalyticsKpiGridProps {
  metrics: AnalyticsMetric[];
}

export function AnalyticsKpiGrid({ metrics }: AnalyticsKpiGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {metrics.map((m, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-2"
        >
          <p className="text-xs font-semibold text-gray-400 truncate">{m.title}</p>

          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">{m.value}</p>

            <div
              className={`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full ${
                m.trend === "up"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  : m.trend === "down"
                  ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              }`}
            >
              {m.trend === "up" ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : m.trend === "down" ? (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              ) : (
                <Minus className="w-3 h-3 mr-0.5" />
              )}
              <span>{m.change}</span>
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-medium">{m.timeframe}</p>
        </div>
      ))}
    </div>
  );
}

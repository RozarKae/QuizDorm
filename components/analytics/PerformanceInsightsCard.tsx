import React from "react";
import { PerformanceInsight } from "@/lib/types/analytics";
import { Sparkles, AlertTriangle, CheckCircle2, Info } from "lucide-react";

interface PerformanceInsightsCardProps {
  insights: PerformanceInsight[];
}

export function PerformanceInsightsCard({ insights }: PerformanceInsightsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
        <Sparkles className="w-4 h-4 text-amber-500 mr-2" /> Performance & Instructional Insights
      </h3>

      <div className="space-y-3">
        {insights.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border space-y-1 text-xs transition-all ${
              item.type === "warning"
                ? "bg-amber-50/60 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/50"
                : item.type === "success"
                ? "bg-emerald-50/60 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/50"
                : "bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-900/50"
            }`}
          >
            <div className="flex items-center justify-between font-bold text-gray-900 dark:text-white">
              <span className="flex items-center">
                {item.type === "warning" ? (
                  <AlertTriangle className="w-4 h-4 text-amber-600 mr-1.5 shrink-0" />
                ) : item.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-1.5 shrink-0" />
                ) : (
                  <Info className="w-4 h-4 text-indigo-600 mr-1.5 shrink-0" />
                )}
                {item.title}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{item.description}</p>
            <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
              💡 Action: {item.recommendation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

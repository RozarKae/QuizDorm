import React from "react";
import { AlertCircle, Flame } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface WeakTopicItem {
  topic: string;
  subject: string;
  incorrectRate: number; // e.g. 42%
  avgSpeedSec: number;
}

interface WeakTopicsHeatmapProps {
  topics: WeakTopicItem[];
}

export function WeakTopicsHeatmap({ topics }: WeakTopicsHeatmapProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
        <span className="flex items-center"><Flame className="w-4 h-4 text-red-500 mr-2" /> Topic Weakness Heatmap</span>
        <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[10px]">Action Needed</Badge>
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {topics.map((item, idx) => {
          const isHighAlert = item.incorrectRate >= 35;
          return (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                isHighAlert
                  ? "bg-red-50/50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50"
                  : "bg-amber-50/50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-semibold text-gray-500">{item.subject}</span>
                <span className={`text-xs font-mono font-extrabold ${isHighAlert ? "text-red-600" : "text-amber-600"}`}>
                  {item.incorrectRate}% Error Rate
                </span>
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white">{item.topic}</h4>
              <p className="text-[10px] text-gray-400 mt-1">Avg Speed: {item.avgSpeedSec}s per question</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

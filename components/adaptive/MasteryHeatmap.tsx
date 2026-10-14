"use client";

import React from "react";
import { TopicMastery } from "@/lib/types/adaptive";
import { Layers, AlertTriangle, CheckCircle2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MasteryHeatmapProps {
  topics: TopicMastery[];
}

export function MasteryHeatmap({ topics }: MasteryHeatmapProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Layers className="w-5 h-5 text-indigo-600 mr-2" /> Topic & Concept Mastery Heatmap
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time mastery tracking across curriculum topics based on accuracy and response speed.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {topics.map((t) => {
          let badgeColor = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300";
          let barColor = "bg-emerald-500";

          if (t.masteryPercent < 70) {
            badgeColor = "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300";
            barColor = "bg-rose-500";
          } else if (t.masteryPercent < 85) {
            badgeColor = "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300";
            barColor = "bg-indigo-500";
          }

          return (
            <div
              key={t.topic}
              className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold block">{t.subject}</span>
                  <span className="font-bold text-gray-900 dark:text-white text-sm">{t.topic}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badgeColor}`}>
                  {t.level} ({t.masteryPercent}%)
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                <div className={`h-full ${barColor} transition-all duration-500`} style={{ width: `${t.masteryPercent}%` }} />
              </div>

              <div className="flex justify-between text-[10px] font-mono text-gray-400 pt-1">
                <span>Accuracy: {t.correctCount}/{t.totalAttempted} items</span>
                <span>Avg Speed: {t.avgResponseSeconds}s</span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

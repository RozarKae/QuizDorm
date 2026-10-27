"use client";

import { Card } from "@/components/ui/card";
import { ParentAIInsight } from "@/lib/types/parent";
import { AlertTriangle,CheckCircle2,Lightbulb,Sparkles } from "lucide-react";

interface AIParentInsightCardProps {
  insight: ParentAIInsight;
}

export function AIParentInsightCard({ insight }: AIParentInsightCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="w-5 h-5 text-purple-600 mr-2" /> AI Parent Intelligence Summary
          </h3>
          <p className="text-xs text-gray-500">
            Parent-friendly learning analysis generated from recent quiz performance and study streaks.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
          {insight.confidenceScore}% Confidence
        </span>
      </div>

      <div className="space-y-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-900 font-bold text-purple-900 dark:text-purple-200">
          {insight.summaryTitle}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Strengths */}
          <div className="p-3.5 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Key Academic Strengths
            </span>
            <ul className="space-y-1 text-[11px] text-rose-900 dark:text-rose-200 list-disc list-inside">
              {insight.strengths.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Weaknesses */}
          <div className="p-3.5 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-1.5">
            <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center">
              <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Focus & Revision Needs
            </span>
            <ul className="space-y-1 text-[11px] text-rose-900 dark:text-rose-200 list-disc list-inside">
              {insight.weakAreas.map((w, idx) => (
                <li key={idx}>{w}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommended Home Actions */}
        <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 space-y-2">
          <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center">
            <Lightbulb className="w-4 h-4 text-indigo-600 mr-1.5" /> Recommended 15-Minute Home Action Plan:
          </span>
          <ul className="space-y-1 text-[11px] text-indigo-800 dark:text-indigo-200 list-disc list-inside">
            {insight.recommendedHomeActions.map((act, idx) => (
              <li key={idx}>{act}</li>
            ))}
          </ul>
        </div>
      </div>
    </Card>
  );
}

"use client";

import React from "react";
import { DuplicateAlert } from "@/lib/types/quality";
import { Copy, AlertTriangle, ArrowRight, CheckCircle2, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DuplicateViewerProps {
  alerts: DuplicateAlert[];
  currentQuestionTitle: string;
}

export function DuplicateViewer({ alerts, currentQuestionTitle }: DuplicateViewerProps) {
  if (alerts.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 flex items-center space-x-2 text-xs text-emerald-800 dark:text-emerald-300">
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>No duplicate or reworded items detected in Question Bank.</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center">
          <GitCompare className="w-4 h-4 text-amber-500 mr-1.5" /> Duplicate / Similarity Alerts ({alerts.length})
        </span>
      </div>

      {alerts.map((al, idx) => (
        <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[10px]">
              {al.matchType.replace(/_/g, " ")} match ({al.similarityPercent}% similarity)
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
              Rec: {al.recommendation}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white dark:bg-gray-950 rounded-xl border border-amber-100 dark:border-amber-900">
            <div>
              <span className="text-[10px] font-semibold text-gray-400 block mb-0.5">Current Question</span>
              <p className="font-medium text-gray-800 dark:text-gray-200">{currentQuestionTitle}</p>
            </div>
            <div>
              <span className="text-[10px] font-semibold text-gray-400 block mb-0.5">Matched Bank Item</span>
              <p className="font-medium text-gray-800 dark:text-gray-200">{al.matchedTitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import { ConfidenceScores } from "@/lib/types/ocr";
import { AlertTriangle,HelpCircle,Info,ShieldCheck } from "lucide-react";
import { useState } from "react";

interface ConfidenceBadgeProps {
  confidence: ConfidenceScores | number;
  showDetails?: boolean;
  size?: "sm" | "md" | "lg";
}

export function ConfidenceBadge({ confidence, showDetails = false, size = "md" }: ConfidenceBadgeProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const scores: ConfidenceScores =
    typeof confidence === "number"
      ? {
          overall: confidence,
          ocrAccuracy: confidence,
          questionDetection: confidence,
          answerDetection: confidence,
          tableRecognition: confidence,
          handwritingRecognition: confidence,
        }
      : confidence;

  const score = Math.round(scores.overall);

  let badgeColor = "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800";
  let icon = <ShieldCheck className="w-3.5 h-3.5 mr-1" />;
  let label = "High Confidence";

  if (score < 60) {
    badgeColor = "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800";
    icon = <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
    label = "Low Confidence";
  } else if (score < 85) {
    badgeColor = "bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800";
    icon = <HelpCircle className="w-3.5 h-3.5 mr-1" />;
    label = "Medium Confidence";
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px]",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={() => setPopoverOpen(!popoverOpen)}
        className={`inline-flex items-center font-semibold rounded-full border transition-all hover:scale-[1.02] cursor-pointer ${badgeColor} ${sizeClasses[size]}`}
        title={`${label}: Click to view detailed OCR confidence scores`}
      >
        {icon}
        <span>{score}% Confidence</span>
        {showDetails && <Info className="w-3 h-3 ml-1 opacity-70" />}
      </button>

      {popoverOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 p-3 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 z-50 text-xs text-gray-700 dark:text-gray-200 space-y-2">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2 font-bold text-gray-900 dark:text-white">
            <span>Confidence Breakdown</span>
            <span className="text-indigo-600 dark:text-indigo-400">{score}%</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">OCR Text Accuracy:</span>
              <span className="font-medium">{scores.ocrAccuracy}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Question Detection:</span>
              <span className="font-medium">{scores.questionDetection}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Answer Detection:</span>
              <span className="font-medium">{scores.answerDetection}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Table Recognition:</span>
              <span className="font-medium">{scores.tableRecognition}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500 dark:text-gray-400">Handwriting Score:</span>
              <span className="font-medium">{scores.handwritingRecognition}%</span>
            </div>
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 text-[10px] text-gray-400">
            {score < 75 ? "⚠️ Review recommended before saving." : "✓ Verified within safe extraction limits."}
          </div>
        </div>
      )}
    </div>
  );
}

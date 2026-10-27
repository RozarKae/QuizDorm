"use client";

import { Card } from "@/components/ui/card";
import { PredictiveScore } from "@/lib/types/performance";
import { CheckCircle2,ChevronDown,ChevronUp,Info,TrendingUp } from "lucide-react";
import { useState } from "react";

interface PredictiveGradeCardProps {
  prediction: PredictiveScore;
}

export function PredictiveGradeCard({ prediction }: PredictiveGradeCardProps) {
  const [explainOpen, setExplainOpen] = useState(false);

  return (
    <Card className="p-5 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
        <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-4 h-4 text-rose-500 mr-2" /> {prediction.subject}
        </h4>
        <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
          {prediction.confidencePercent}% Confidence
        </span>
      </div>

      <div className="flex items-baseline justify-between font-mono">
        <span className="text-xs text-gray-400 font-sans">Predicted Grade</span>
        <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">
          {prediction.predictedGradePercent}%
        </span>
      </div>

      <div className="space-y-1 text-xs">
        <span className="font-bold text-gray-700 dark:text-gray-300 block text-[11px]">Key Influencing Factors:</span>
        <ul className="space-y-1">
          {prediction.keyFactors.map((f, i) => (
            <li key={i} className="text-gray-600 dark:text-gray-400 flex items-center text-[11px]">
              <CheckCircle2 className="w-3 h-3 text-rose-500 mr-1.5 shrink-0" /> {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
        <button
          onClick={() => setExplainOpen(!explainOpen)}
          className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
        >
          <Info className="w-3.5 h-3.5 mr-1" /> Explainable AI (XAI) Insight
          {explainOpen ? <ChevronUp className="w-3.5 h-3.5 ml-1" /> : <ChevronDown className="w-3.5 h-3.5 ml-1" />}
        </button>

        {explainOpen && (
          <p className="mt-2 p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 text-[11px] text-gray-700 dark:text-gray-300 font-mono border border-indigo-100 dark:border-indigo-900">
            {prediction.explainabilityNote}
          </p>
        )}
      </div>
    </Card>
  );
}

"use client";

import React from "react";
import { PerformancePrediction } from "@/lib/types/adaptive";
import { TrendingUp, ShieldCheck, Trophy, AlertTriangle, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PerformancePredictorCardProps {
  prediction: PerformancePrediction;
}

export function PerformancePredictorCard({ prediction }: PerformancePredictorCardProps) {
  const { predictedScorePercent, examReadinessPercent, competitionReadinessPercent, riskStatus, explanation } = prediction;

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <TrendingUp className="w-5 h-5 text-emerald-600 mr-2" /> Predictive Exam & Quiz Performance
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Machine learning forecast of future assessment readiness and risk indicators.
          </p>
        </div>

        <span className={`text-xs font-extrabold px-3 py-1 rounded-full uppercase ${
          riskStatus === "low"
            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
            : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
        }`}>
          Risk Status: {riskStatus}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 text-center text-xs font-mono">
        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Predicted Score</span>
          <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {predictedScorePercent}%
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Exam Readiness</span>
          <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {examReadinessPercent}%
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Competition Ready</span>
          <span className="text-xl font-extrabold text-purple-600 dark:text-purple-400">
            {competitionReadinessPercent}%
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800">
        💡 <span className="font-semibold">{explanation}</span>
      </p>
    </Card>
  );
}

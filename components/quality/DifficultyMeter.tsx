"use client";

import React from "react";
import { PredictedDifficulty } from "@/lib/types/quality";
import { AlertCircle, CheckCircle2, Gauge } from "lucide-react";

interface DifficultyMeterProps {
  difficulty: PredictedDifficulty;
}

export function DifficultyMeter({ difficulty }: DifficultyMeterProps) {
  const { predictedLevel, teacherLevel, confidencePercent, matchesTeacher, explanation } = difficulty;

  return (
    <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700 dark:text-gray-300 flex items-center">
          <Gauge className="w-4 h-4 text-indigo-500 mr-1.5" /> Difficulty Prediction
        </span>
        <span className="text-[10px] font-mono text-gray-400">Confidence: {confidencePercent}%</span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center pt-1 font-mono">
        <div className="p-2 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
          <span className="text-[10px] text-gray-400 block font-sans">Educator Set</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{teacherLevel}</span>
        </div>

        <div className="p-2 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800">
          <span className="text-[10px] text-gray-400 block font-sans">AI Predicted</span>
          <span className={`font-bold ${matchesTeacher ? "text-emerald-600" : "text-amber-600"}`}>
            {predictedLevel}
          </span>
        </div>
      </div>

      <div className="flex items-start space-x-1.5 text-[11px] text-gray-500 pt-1">
        {matchesTeacher ? (
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
        )}
        <span>{explanation}</span>
      </div>
    </div>
  );
}

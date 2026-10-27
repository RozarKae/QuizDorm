"use client";

import { CheckCircle2,Loader2 } from "lucide-react";
import React from "react";

export type PipelineStep =
  | "Upload"
  | "OCR Processing"
  | "AI Structuring"
  | "Question Detection"
  | "Quality Validation"
  | "Duplicate Check"
  | "Educator Review"
  | "Completed"
  | "Failed";

interface ImportProgressProps {
  currentStep: PipelineStep;
  progress: number;
}

const PIPELINE_STEPS: PipelineStep[] = [
  "Upload",
  "OCR Processing",
  "AI Structuring",
  "Question Detection",
  "Quality Validation",
  "Duplicate Check",
  "Educator Review",
  "Completed",
];

export function ImportProgress({ currentStep, progress }: ImportProgressProps) {
  const currentIndex = PIPELINE_STEPS.indexOf(currentStep);

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
          OCR Pipeline Stage: <span className="text-indigo-600 dark:text-indigo-400">{currentStep}</span>
        </span>
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{progress}%</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-100 dark:bg-gray-900 h-2 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="hidden md:flex items-center justify-between pt-2">
        {PIPELINE_STEPS.map((step, idx) => {
          const isDone = idx < currentIndex || currentStep === "Completed";
          const isCurrent = idx === currentIndex && currentStep !== "Completed";

          return (
            <React.Fragment key={step}>
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                    isDone
                      ? "bg-rose-500 text-white shadow-sm"
                      : isCurrent
                      ? "bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-950"
                      : "bg-gray-100 dark:bg-gray-900 text-gray-400"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isCurrent ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span
                  className={`text-[10px] mt-1 font-medium ${
                    isDone
                      ? "text-gray-900 dark:text-white font-semibold"
                      : isCurrent
                      ? "text-indigo-600 dark:text-indigo-400 font-bold"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </span>
              </div>
              {idx < PIPELINE_STEPS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 mb-4 ${
                    idx < currentIndex ? "bg-rose-500" : "bg-gray-200 dark:bg-gray-800"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

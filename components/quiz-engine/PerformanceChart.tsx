import React from "react";

interface PerformanceChartProps {
  percentage: number;
  isPassed: boolean;
  score: number;
  totalMarks: number;
}

export function PerformanceChart({ percentage, isPassed, score, totalMarks }: PerformanceChartProps) {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm relative text-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-gray-100 dark:stroke-gray-900"
            strokeWidth="12"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            className={`transition-all duration-1000 ${isPassed ? "stroke-emerald-500" : "stroke-red-500"}`}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold font-mono text-gray-900 dark:text-white">{percentage}%</span>
          <span className="text-[11px] font-semibold text-gray-400">{score} / {totalMarks} pts</span>
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isPassed
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
              : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
          }`}
        >
          {isPassed ? "Passed 🎉" : "Failed Needs Improvement"}
        </span>
      </div>
    </div>
  );
}

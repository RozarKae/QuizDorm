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
    <div className="flex flex-col items-center justify-center p-6 bg-card rounded-[3px] border border-border relative text-center">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-muted"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            className={`transition-all duration-1000 ${isPassed ? "stroke-[#2855F5]" : "stroke-[#E85D3F]"}`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold font-mono text-foreground">{percentage}%</span>
          <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{score} / {totalMarks} PTS</span>
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-[2px] text-[10px] font-mono font-bold uppercase tracking-widest border ${
            isPassed
              ? "bg-[#DFFF43]/20 text-foreground border-[#DFFF43]/40"
              : "bg-[#E85D3F]/15 text-[#E85D3F] border-[#E85D3F]/30"
          }`}
        >
          {isPassed ? "ASSESSMENT PASSED" : "NEEDS REVISION"}
        </span>
      </div>
    </div>
  );
}


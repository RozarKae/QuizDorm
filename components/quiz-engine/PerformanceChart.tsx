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
    <div className="flex flex-col items-center justify-center p-6 bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] relative text-center shadow-xs">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            className="stroke-[#1D1013]"
            strokeWidth="10"
            fill="transparent"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            className={`transition-all duration-1000 ${
              isPassed ? "stroke-[#FF4D6D]" : "stroke-[#F87171]"
            }`}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              filter: isPassed
                ? "drop-shadow(0 0 6px rgba(255, 77, 109, 0.4))"
                : "drop-shadow(0 0 6px rgba(248, 113, 113, 0.4))",
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold font-mono text-[#F2F7F3]">{percentage}%</span>
          <span className="text-[10px] font-mono text-[#A0AEA5] uppercase tracking-wider">{score} / {totalMarks} PTS</span>
        </div>
      </div>

      <div className="mt-4">
        <span
          className={`inline-block px-3 py-1 rounded-[3px] text-[10px] font-mono font-bold uppercase tracking-widest border ${
            isPassed
              ? "bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border-[rgba(255, 77, 109,0.3)] shadow-[0_0_10px_rgba(255, 77, 109,0.15)]"
              : "bg-[rgba(248,113,113,0.12)] text-[#F87171] border-[rgba(248,113,113,0.3)]"
          }`}
        >
          {isPassed ? "ASSESSMENT PASSED" : "NEEDS REVISION"}
        </span>
      </div>
    </div>
  );
}


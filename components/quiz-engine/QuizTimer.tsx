import React from "react";
import { Clock, AlertTriangle } from "lucide-react";

interface QuizTimerProps {
  timeRemainingSeconds: number;
}

export function QuizTimer({ timeRemainingSeconds }: QuizTimerProps) {
  const formatTime = (totalSec: number) => {
    if (totalSec <= 0) return "00:00";
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isWarning = timeRemainingSeconds <= 300; // <= 5 mins
  const isCritical = timeRemainingSeconds <= 60; // <= 1 min

  return (
    <div
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-[4px] border transition-colors font-mono text-xs ${
        isCritical
          ? "bg-[rgba(248,113,113,0.12)] text-[#F87171] border-[#F87171] font-bold animate-pulse"
          : isWarning
          ? "bg-[#111B17] text-[#FBBF24] border-[rgba(251,191,36,0.35)] font-semibold"
          : "bg-[#111B17] text-[#65F59A] border-[rgba(101,245,154,0.3)] font-semibold shadow-[0_0_10px_rgba(101,245,154,0.1)]"
      }`}
    >
      {isCritical ? (
        <AlertTriangle className="w-3.5 h-3.5 text-[#F87171] shrink-0" />
      ) : (
        <Clock className="w-3.5 h-3.5 text-[#65F59A] shrink-0" />
      )}
      <span className="tracking-wider tabular-nums font-bold text-xs">{formatTime(timeRemainingSeconds)}</span>
    </div>
  );
}

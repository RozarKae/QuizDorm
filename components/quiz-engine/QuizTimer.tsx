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
      className={`flex items-center space-x-2 px-3 py-1.5 rounded-[2px] border transition-colors font-mono text-xs ${
        isCritical
          ? "bg-coral/10 text-coral border-coral font-bold animate-pulse"
          : isWarning
          ? "bg-muted text-foreground border-border font-semibold"
          : "bg-card text-foreground border-border font-semibold shadow-xs"
      }`}
    >
      {isCritical ? (
        <AlertTriangle className="w-3.5 h-3.5 text-coral shrink-0" />
      ) : (
        <Clock className="w-3.5 h-3.5 text-cobalt shrink-0" />
      )}
      <span className="tracking-wider tabular-nums font-bold text-xs">{formatTime(timeRemainingSeconds)}</span>
    </div>
  );
}

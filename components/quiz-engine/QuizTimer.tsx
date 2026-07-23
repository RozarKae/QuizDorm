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
      className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all ${
        isCritical
          ? "bg-red-500 text-white border-red-600 animate-pulse shadow-md font-extrabold"
          : isWarning
          ? "bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-300 font-bold"
          : "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-800 font-bold"
      }`}
    >
      {isCritical ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4 text-indigo-500" />}
      <span className="text-sm font-mono tracking-wider">{formatTime(timeRemainingSeconds)}</span>
    </div>
  );
}

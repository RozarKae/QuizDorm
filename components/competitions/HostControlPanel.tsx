import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play, FastForward, Clock, ShieldAlert, Trophy, Lock } from "lucide-react";

interface HostControlPanelProps {
  isPaused: boolean;
  timeRemaining: number;
  onPause: () => void;
  onResume: () => void;
  onSkipQuestion: () => void;
  onExtendTime: (secs: number) => void;
  onEndCompetition: () => void;
}

export function HostControlPanel({
  isPaused,
  timeRemaining,
  onPause,
  onResume,
  onSkipQuestion,
  onExtendTime,
  onEndCompetition,
}: HostControlPanelProps) {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-3xl border border-gray-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
        <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Host Control Desk</span>
        <Badge className="bg-gray-800 text-gray-300 font-mono text-xs">
          Time: {timeRemaining}s
        </Badge>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isPaused ? (
          <Button onClick={onResume} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl">
            <Play className="w-3.5 h-3.5 mr-1" /> Resume Game
          </Button>
        ) : (
          <Button onClick={onPause} size="sm" variant="outline" className="text-xs text-amber-400 border-amber-500 hover:bg-amber-950">
            <Pause className="w-3.5 h-3.5 mr-1" /> Pause Game
          </Button>
        )}

        <Button onClick={onSkipQuestion} size="sm" variant="outline" className="text-xs text-gray-300 border-gray-700 hover:bg-gray-800">
          <FastForward className="w-3.5 h-3.5 mr-1" /> Skip Question
        </Button>

        <Button onClick={() => onExtendTime(15)} size="sm" variant="outline" className="text-xs text-indigo-400 border-indigo-500 hover:bg-indigo-950">
          <Clock className="w-3.5 h-3.5 mr-1" /> +15 Secs
        </Button>

        <Button onClick={onEndCompetition} size="sm" className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl">
          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> End Game
        </Button>
      </div>
    </div>
  );
}

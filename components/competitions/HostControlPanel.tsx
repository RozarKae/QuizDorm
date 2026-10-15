"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play, FastForward, Clock, ShieldAlert } from "lucide-react";

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
    <div className="bg-[#111318] text-white p-4 rounded-[4px] border border-border shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E85D3F] animate-pulse" />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#DFFF43]">
          HOST CONTROL CONSOLE
        </span>
        <Badge className="bg-white/10 text-white font-mono text-xs border border-white/20">
          Clock: {timeRemaining}s
        </Badge>
        {isPaused && (
          <Badge className="bg-[#E85D3F] text-white font-mono text-[10px] uppercase font-bold animate-pulse">
            PAUSED
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isPaused ? (
          <Button
            onClick={onResume}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono font-bold rounded-[3px]"
          >
            <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Resume Competition
          </Button>
        ) : (
          <Button
            onClick={onPause}
            size="sm"
            variant="outline"
            className="text-xs font-mono text-amber-300 border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 rounded-[3px]"
          >
            <Pause className="w-3.5 h-3.5 mr-1" /> Pause Timer
          </Button>
        )}

        <Button
          onClick={onSkipQuestion}
          size="sm"
          variant="outline"
          className="text-xs font-mono text-gray-200 border-white/20 bg-white/5 hover:bg-white/10 rounded-[3px]"
        >
          <FastForward className="w-3.5 h-3.5 mr-1" /> Skip Question
        </Button>

        <Button
          onClick={() => onExtendTime(15)}
          size="sm"
          variant="outline"
          className="text-xs font-mono text-[#2855F5] border-[#2855F5]/40 bg-[#2855F5]/10 hover:bg-[#2855F5]/20 rounded-[3px]"
        >
          <Clock className="w-3.5 h-3.5 mr-1" /> +15 Secs
        </Button>

        <Button
          onClick={onEndCompetition}
          size="sm"
          className="bg-red-600 hover:bg-red-700 text-white text-xs font-mono font-bold rounded-[3px]"
        >
          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> End Tournament
        </Button>
      </div>
    </div>
  );
}

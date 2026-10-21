"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play, FastForward, Clock, ShieldAlert, Trophy } from "lucide-react";

interface HostControlPanelProps {
  isPaused: boolean;
  timeRemaining: number;
  onPause: () => void;
  onResume: () => void;
  onSkipQuestion: () => void;
  onExtendTime: (secs: number) => void;
  onEndCompetition: () => void;
  onNextQuestion?: () => void;
}

export function HostControlPanel({
  isPaused,
  timeRemaining,
  onPause,
  onResume,
  onSkipQuestion,
  onExtendTime,
  onEndCompetition,
  onNextQuestion,
}: HostControlPanelProps) {
  return (
    <div className="bg-[#0C1210] text-[#F2F7F3] p-4 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <span className={`w-2.5 h-2.5 rounded-full ${isPaused ? "bg-[#F87171]" : "bg-[#65F59A]"} animate-pulse`} />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#65F59A]">
          HOST CONTROL DESK
        </span>
        <Badge className="bg-[#111B17] text-[#A0AEA5] font-mono text-xs border border-[rgba(160,190,170,0.18)]">
          Clock: {timeRemaining}s
        </Badge>
        {isPaused && (
          <Badge className="bg-[rgba(248,113,113,0.2)] text-[#F87171] border border-[#F87171] font-mono text-[10px] uppercase font-bold animate-pulse">
            PAUSED
          </Badge>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onNextQuestion && (
          <Button
            onClick={onNextQuestion}
            size="sm"
            className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] text-xs font-mono font-bold rounded-[3px] shadow-[0_0_12px_rgba(101,245,154,0.25)]"
          >
            <Trophy className="w-3.5 h-3.5 mr-1" /> Reveal Leaderboard
          </Button>
        )}

        {isPaused ? (
          <Button
            onClick={onResume}
            size="sm"
            className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] text-xs font-mono font-bold rounded-[3px] shadow-[0_0_10px_rgba(101,245,154,0.2)]"
          >
            <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Resume Competition
          </Button>
        ) : (
          <Button
            onClick={onPause}
            size="sm"
            variant="outline"
            className="text-xs font-mono text-[#FBBF24] border-[rgba(251,191,36,0.4)] bg-[rgba(251,191,36,0.1)] hover:bg-[rgba(251,191,36,0.2)] rounded-[3px]"
          >
            <Pause className="w-3.5 h-3.5 mr-1" /> Pause Timer
          </Button>
        )}

        <Button
          onClick={onSkipQuestion}
          size="sm"
          variant="outline"
          className="text-xs font-mono text-[#A0AEA5] border-[rgba(160,190,170,0.18)] bg-[#111B17] hover:bg-[#17251E] hover:text-[#F2F7F3] rounded-[3px]"
        >
          <FastForward className="w-3.5 h-3.5 mr-1" /> Skip Question
        </Button>

        <Button
          onClick={() => onExtendTime(15)}
          size="sm"
          variant="outline"
          className="text-xs font-mono text-[#65F59A] border-[rgba(101,245,154,0.3)] bg-[rgba(101,245,154,0.1)] hover:bg-[rgba(101,245,154,0.2)] rounded-[3px]"
        >
          <Clock className="w-3.5 h-3.5 mr-1" /> +15 Secs
        </Button>

        <Button
          onClick={onEndCompetition}
          size="sm"
          className="bg-[rgba(248,113,113,0.2)] hover:bg-[rgba(248,113,113,0.3)] text-[#F87171] border border-[rgba(248,113,113,0.4)] text-xs font-mono font-bold rounded-[3px]"
        >
          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> End Tournament
        </Button>
      </div>
    </div>
  );
}

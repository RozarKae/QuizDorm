"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pause, Play, FastForward, Clock, ShieldAlert, Trophy, ArrowRight, Laptop, CheckCircle2 } from "lucide-react";

interface HostControlPanelProps {
  isPaused: boolean;
  timeRemaining: number;
  onPause: () => void;
  onResume: () => void;
  onSkipQuestion: () => void;
  onExtendTime: (secs: number) => void;
  onEndCompetition: () => void;
  onNextQuestion?: () => void;
  onNextQuestionDirect?: () => void;
  onRevealLeaderboard?: () => void;
  connectedSystemsCount?: number;
  submissionsCount?: number;
  totalParticipants?: number;
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
  onNextQuestionDirect,
  onRevealLeaderboard,
  connectedSystemsCount = 1,
  submissionsCount = 0,
  totalParticipants = 0,
}: HostControlPanelProps) {
  const isUrgent = timeRemaining <= 5 && timeRemaining > 0;

  return (
    <div className="bg-[#0C1210] text-[#F2F7F3] p-4 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Status & Live Telemetry Metrics */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className={`w-2.5 h-2.5 rounded-full ${isPaused ? "bg-[#F87171]" : "bg-[#65F59A]"} animate-pulse`} />
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#65F59A]">
          HOST CONTROL DESK
        </span>

        {/* Live Timer Meter */}
        <Badge
          className={`font-mono text-xs border transition-colors ${
            isUrgent
              ? "bg-[rgba(248,113,113,0.2)] text-[#F87171] border-[#F87171] animate-pulse"
              : "bg-[#111B17] text-[#A0AEA5] border-[rgba(160,190,170,0.18)]"
          }`}
        >
          <Clock className="w-3 h-3 mr-1 text-[#65F59A]" />
          Clock: {timeRemaining}s
        </Badge>

        {/* Connected Systems Telemetry */}
        <Badge className="bg-[#111B17] text-[#38D9B0] font-mono text-xs border border-[rgba(56,217,176,0.25)] flex items-center">
          <Laptop className="w-3 h-3 mr-1 text-[#38D9B0]" />
          <span>{connectedSystemsCount} Connected {connectedSystemsCount === 1 ? "System" : "Systems"}</span>
        </Badge>

        {/* Live Responses Progress */}
        <Badge className="bg-[#111B17] text-[#FFE600] font-mono text-xs border border-[rgba(255,230,0,0.25)] flex items-center">
          <CheckCircle2 className="w-3 h-3 mr-1 text-[#FFE600]" />
          <span>{submissionsCount} / {Math.max(totalParticipants, connectedSystemsCount, 1)} Responded</span>
        </Badge>

        {isPaused && (
          <Badge className="bg-[rgba(248,113,113,0.2)] text-[#F87171] border border-[#F87171] font-mono text-[10px] uppercase font-bold animate-pulse">
            PAUSED
          </Badge>
        )}
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Direct Next Question Action */}
        {(onNextQuestionDirect || onNextQuestion) && (
          <Button
            onClick={onNextQuestionDirect || onNextQuestion}
            size="sm"
            className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] text-xs font-mono font-bold rounded-[3px] shadow-[0_0_15px_rgba(101,245,154,0.3)] hover:shadow-[0_0_20px_rgba(101,245,154,0.45)] transition-all"
          >
            <span>Next Question</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}

        {/* Reveal Leaderboard Action */}
        {(onRevealLeaderboard || onNextQuestion) && (
          <Button
            onClick={onRevealLeaderboard || onNextQuestion}
            size="sm"
            variant="outline"
            className="text-xs font-mono text-[#FFE600] border-[rgba(255,230,0,0.3)] bg-[rgba(255,230,0,0.08)] hover:bg-[rgba(255,230,0,0.18)] rounded-[3px]"
          >
            <Trophy className="w-3.5 h-3.5 mr-1 text-[#FFE600]" /> Leaderboard
          </Button>
        )}

        {isPaused ? (
          <Button
            onClick={onResume}
            size="sm"
            className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] text-xs font-mono font-bold rounded-[3px] shadow-[0_0_10px_rgba(101,245,154,0.2)]"
          >
            <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Resume
          </Button>
        ) : (
          <Button
            onClick={onPause}
            size="sm"
            variant="outline"
            className="text-xs font-mono text-[#FBBF24] border-[rgba(251,191,36,0.4)] bg-[rgba(251,191,36,0.1)] hover:bg-[rgba(251,191,36,0.2)] rounded-[3px]"
          >
            <Pause className="w-3.5 h-3.5 mr-1" /> Pause
          </Button>
        )}

        <Button
          onClick={onSkipQuestion}
          size="sm"
          variant="outline"
          className="text-xs font-mono text-[#A0AEA5] border-[rgba(160,190,170,0.18)] bg-[#111B17] hover:bg-[#17251E] hover:text-[#F2F7F3] rounded-[3px]"
        >
          <FastForward className="w-3.5 h-3.5 mr-1" /> Skip
        </Button>

        <Button
          onClick={() => onExtendTime(15)}
          size="sm"
          variant="outline"
          className="text-xs font-mono text-[#65F59A] border-[rgba(101,245,154,0.3)] bg-[rgba(101,245,154,0.1)] hover:bg-[rgba(101,245,154,0.2)] rounded-[3px]"
        >
          <Clock className="w-3.5 h-3.5 mr-1" /> +15s
        </Button>

        <Button
          onClick={onEndCompetition}
          size="sm"
          className="bg-[rgba(248,113,113,0.15)] hover:bg-[rgba(248,113,113,0.25)] text-[#F87171] border border-[rgba(248,113,113,0.35)] text-xs font-mono font-bold rounded-[3px]"
        >
          <ShieldAlert className="w-3.5 h-3.5 mr-1" /> End
        </Button>
      </div>
    </div>
  );
}

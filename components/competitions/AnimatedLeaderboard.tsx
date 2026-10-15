"use client";

import React from "react";
import { LiveParticipant } from "@/lib/types/competition";
import { Trophy, Flame, ArrowUp, ArrowDown, Minus, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface AnimatedLeaderboardProps {
  participants: LiveParticipant[];
  onNextQuestion?: () => void;
  isHost?: boolean;
  questionExplanation?: string;
  correctOptionText?: string;
}

export function AnimatedLeaderboard({
  participants,
  onNextQuestion,
  isHost = true,
  questionExplanation,
  correctOptionText,
}: AnimatedLeaderboardProps) {
  // Sort participants by score descending
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      {/* Top Header Strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#111318] text-white p-6 rounded-[4px] border border-border shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#DFFF43]">
            <span className="w-1.5 h-1.5 bg-[#DFFF43] rounded-full animate-pulse" />
            <span>INTERMEDIATE LEADERBOARD // SYNCHRONIZED RANKINGS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display flex items-center text-white">
            <Trophy className="w-5 h-5 text-[#DFFF43] mr-2" /> Live Standings
          </h2>
        </div>

        {isHost ? (
          onNextQuestion && (
            <Button
              onClick={onNextQuestion}
              className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs font-bold rounded-[3px] px-6 py-2.5 shadow-sm"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )
        ) : (
          <Badge className="bg-white/10 text-white font-mono text-xs border border-white/20 self-start sm:self-center">
            Waiting for host to proceed...
          </Badge>
        )}
      </div>

      {/* Revealed Solution Card if present */}
      {(correctOptionText || questionExplanation) && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-[4px] space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>CORRECT ANSWER REVEALED</span>
          </div>
          {correctOptionText && (
            <p className="text-sm font-bold text-foreground">
              {correctOptionText}
            </p>
          )}
          {questionExplanation && (
            <p className="text-xs text-muted-foreground leading-relaxed pt-1">
              {questionExplanation}
            </p>
          )}
        </div>
      )}

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center items-end max-w-xl mx-auto py-2">
        {/* 2nd Place */}
        {sorted[1] ? (
          <div className="bg-card p-4 rounded-[4px] border border-border shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-sm mx-auto flex items-center justify-center">
              2
            </div>
            <p className="text-xs font-bold text-foreground truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-extrabold text-[#2855F5]">{sorted[1].score} pts</p>
          </div>
        ) : <div />}

        {/* 1st Place */}
        {sorted[0] ? (
          <div className="bg-card p-5 rounded-[4px] border-2 border-[#DFFF43] shadow-md space-y-2 scale-105 bg-[#111318] text-white">
            <div className="w-11 h-11 rounded-full bg-[#DFFF43] text-black font-mono font-black text-base mx-auto flex items-center justify-center shadow-sm">
              1
            </div>
            <p className="text-sm font-extrabold text-white truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-extrabold text-[#DFFF43]">{sorted[0].score} pts</p>
          </div>
        ) : <div />}

        {/* 3rd Place */}
        {sorted[2] ? (
          <div className="bg-card p-4 rounded-[4px] border border-border shadow-xs space-y-2">
            <div className="w-9 h-9 rounded-full bg-amber-500/20 text-amber-600 font-mono font-bold text-sm mx-auto flex items-center justify-center">
              3
            </div>
            <p className="text-xs font-bold text-foreground truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-extrabold text-[#2855F5]">{sorted[2].score} pts</p>
          </div>
        ) : <div />}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-card rounded-[4px] border border-border shadow-xs overflow-hidden p-4 sm:p-6 space-y-2.5">
        {sorted.map((p, idx) => (
          <div
            key={p.id}
            className={`p-3.5 rounded-[3px] border flex items-center justify-between transition-all ${
              idx === 0
                ? "border-[#DFFF43]/40 bg-amber-500/5 dark:bg-amber-500/10"
                : "border-border bg-background"
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="font-extrabold text-sm w-6 text-muted-foreground font-mono">
                #{idx + 1}
              </span>

              {/* Movement indicator */}
              <div className="flex items-center text-xs font-mono font-bold w-10">
                {(p.rankChange || 0) > 0 ? (
                  <span className="text-emerald-600 flex items-center">
                    <ArrowUp className="w-3.5 h-3.5 mr-0.5" />+{(p.rankChange || 0)}
                  </span>
                ) : (p.rankChange || 0) < 0 ? (
                  <span className="text-red-500 flex items-center">
                    <ArrowDown className="w-3.5 h-3.5 mr-0.5" />{(p.rankChange || 0)}
                  </span>
                ) : (
                  <span className="text-muted-foreground flex items-center">
                    <Minus className="w-3.5 h-3.5 mr-0.5" />=
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-[2px] bg-[#2855F5] text-white font-mono font-bold text-xs flex items-center justify-center">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{p.name}</p>
                  {(p.streak || 0) >= 3 && (
                    <span className="inline-flex items-center text-[10px] text-amber-500 font-mono font-bold">
                      <Flame className="w-3 h-3 mr-0.5 fill-current" /> {p.streak} Streak!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="font-mono text-sm sm:text-base font-extrabold text-[#2855F5]">
              {p.score} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0C1210] text-[#F2F7F3] p-5 sm:p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xl relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#65F59A]">
            <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
            <span>INTERMEDIATE LEADERBOARD // LIVE RANKINGS</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold font-display flex items-center text-[#F2F7F3]">
            <Trophy className="w-5 h-5 text-[#65F59A] mr-2" /> Live Standings
          </h2>
        </div>

        {isHost ? (
          onNextQuestion && (
            <Button
              onClick={onNextQuestion}
              className="font-mono text-xs font-bold rounded-[4px] px-6 py-2 shadow-[0_0_12px_rgba(101,245,154,0.2)] relative z-10"
            >
              <span>Next Question</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )
        ) : (
          <Badge className="bg-[#111B17] text-[#A0AEA5] font-mono text-xs border border-[rgba(160,190,170,0.18)] self-start sm:self-center">
            Waiting for host to proceed...
          </Badge>
        )}
      </div>

      {/* Revealed Solution Card if present */}
      {(correctOptionText || questionExplanation) && (
        <div className="bg-[rgba(101,245,154,0.08)] border border-[rgba(101,245,154,0.25)] p-4 rounded-[6px] space-y-1">
          <div className="flex items-center space-x-2 text-xs font-mono font-bold text-[#65F59A]">
            <CheckCircle2 className="w-4 h-4 text-[#65F59A]" />
            <span>CORRECT ANSWER REVEALED</span>
          </div>
          {correctOptionText && (
            <p className="text-sm font-bold text-[#F2F7F3]">
              {correctOptionText}
            </p>
          )}
          {questionExplanation && (
            <p className="text-xs text-[#A0AEA5] leading-relaxed pt-1 font-mono">
              {questionExplanation}
            </p>
          )}
        </div>
      )}

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center items-end max-w-xl mx-auto py-2">
        {/* 2nd Place */}
        {sorted[1] ? (
          <div className="bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.16)] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#17251E] text-[#38D9B0] border border-[rgba(56,217,176,0.3)] font-mono font-bold text-xs mx-auto flex items-center justify-center">
              2
            </div>
            <p className="text-xs font-bold text-[#F2F7F3] truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-bold text-[#38D9B0]">{sorted[1].score} pts</p>
          </div>
        ) : <div />}

        {/* 1st Place */}
        {sorted[0] ? (
          <div className="bg-[#111B17] p-5 rounded-[6px] border border-[#65F59A]/60 shadow-[0_0_24px_rgba(101,245,154,0.18)] space-y-2 scale-105 text-[#F2F7F3]">
            <div className="w-10 h-10 rounded-full bg-[#65F59A] text-[#070B0A] font-mono font-black text-sm mx-auto flex items-center justify-center shadow-sm">
              1
            </div>
            <p className="text-sm font-extrabold text-[#F2F7F3] truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-black text-[#65F59A]">{sorted[0].score} pts</p>
          </div>
        ) : <div />}

        {/* 3rd Place */}
        {sorted[2] ? (
          <div className="bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.16)] shadow-xs space-y-2">
            <div className="w-8 h-8 rounded-full bg-[#17251E] text-[#A0AEA5] border border-[rgba(160,190,170,0.2)] font-mono font-bold text-xs mx-auto flex items-center justify-center">
              3
            </div>
            <p className="text-xs font-bold text-[#F2F7F3] truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-bold text-[#A0AEA5]">{sorted[2].score} pts</p>
          </div>
        ) : <div />}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs overflow-hidden p-4 sm:p-5 space-y-2">
        {sorted.map((p, idx) => (
          <div
            key={p.id}
            className={`p-3 rounded-[4px] border flex items-center justify-between transition-all ${
              idx === 0
                ? "border-[rgba(101,245,154,0.3)] bg-[rgba(101,245,154,0.06)]"
                : "border-[rgba(160,190,170,0.1)] bg-[#111B17]/60"
            }`}
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="font-extrabold text-xs w-6 text-[#69786F] font-mono">
                #{idx + 1}
              </span>

              {/* Movement indicator */}
              <div className="flex items-center text-xs font-mono font-bold w-9">
                {(p.rankChange || 0) > 0 ? (
                  <span className="text-[#65F59A] flex items-center">
                    <ArrowUp className="w-3.5 h-3.5 mr-0.5" />+{(p.rankChange || 0)}
                  </span>
                ) : (p.rankChange || 0) < 0 ? (
                  <span className="text-[#F87171] flex items-center">
                    <ArrowDown className="w-3.5 h-3.5 mr-0.5" />{(p.rankChange || 0)}
                  </span>
                ) : (
                  <span className="text-[#69786F] flex items-center">
                    <Minus className="w-3.5 h-3.5 mr-0.5" />=
                  </span>
                )}
              </div>

              <div className="flex items-center space-x-2.5">
                <div className="w-6 h-6 rounded-[3px] bg-[#17251E] text-[#65F59A] font-mono font-bold text-xs flex items-center justify-center border border-[rgba(101,245,154,0.2)]">
                  {p.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[#F2F7F3]">{p.name}</p>
                  {(p.streak || 0) >= 3 && (
                    <span className="inline-flex items-center text-[10px] text-[#65F59A] font-mono font-semibold">
                      <Flame className="w-3 h-3 mr-0.5 fill-current" /> {p.streak} Streak!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="font-mono text-xs sm:text-sm font-bold text-[#65F59A]">
              {p.score} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

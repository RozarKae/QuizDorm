import React from "react";
import { LiveParticipant } from "@/lib/types/competition";
import { Trophy, Flame, ArrowUp, ArrowDown, Minus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AnimatedLeaderboardProps {
  participants: LiveParticipant[];
  onNextQuestion?: () => void;
  isHost?: boolean;
}

export function AnimatedLeaderboard({ participants, onNextQuestion, isHost = true }: AnimatedLeaderboardProps) {
  // Sort participants by score
  const sorted = [...participants].sort((a, b) => b.score - a.score);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-gradient-to-r from-amber-500 to-orange-600 p-6 rounded-3xl text-white shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-100">Live Stage</span>
          <h2 className="text-2xl font-extrabold flex items-center">
            <Trophy className="w-6 h-6 text-amber-200 mr-2" /> Leaderboard Ranking
          </h2>
        </div>

        {isHost && onNextQuestion && (
          <Button onClick={onNextQuestion} className="bg-white text-orange-600 hover:bg-gray-100 font-extrabold rounded-xl px-6">
            Next Question <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        )}
      </div>

      {/* Podium Highlights for Top 3 */}
      <div className="grid grid-cols-3 gap-4 text-center items-end max-w-lg mx-auto py-4">
        {/* 2nd Place */}
        {sorted[1] && (
          <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold text-sm mx-auto flex items-center justify-center">
              🥈 2
            </div>
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-extrabold text-indigo-600">{sorted[1].score} pts</p>
          </div>
        )}

        {/* 1st Place */}
        {sorted[0] && (
          <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border-2 border-amber-400 shadow-lg space-y-2 scale-105">
            <div className="w-12 h-12 rounded-full bg-amber-400 text-amber-950 font-bold text-base mx-auto flex items-center justify-center">
              🥇 1
            </div>
            <p className="text-sm font-extrabold text-gray-900 dark:text-white truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-extrabold text-amber-600">{sorted[0].score} pts</p>
          </div>
        )}

        {/* 3rd Place */}
        {sorted[2] && (
          <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-800/20 text-amber-800 font-bold text-sm mx-auto flex items-center justify-center">
              🥉 3
            </div>
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-extrabold text-indigo-600">{sorted[2].score} pts</p>
          </div>
        )}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm overflow-hidden p-6 space-y-3">
        {sorted.map((p, idx) => (
          <div
            key={p.id}
            className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
              idx === 0
                ? "border-amber-300 bg-amber-50/50 dark:bg-amber-950/30"
                : "border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50"
            }`}
          >
            <div className="flex items-center space-x-4">
              <span className="font-extrabold text-sm w-6 text-gray-500 font-mono">#{idx + 1}</span>

              {/* Movement indicator */}
              <div className="flex items-center text-xs font-bold w-10">
                {p.rankChange > 0 ? (
                  <span className="text-emerald-600 flex items-center"><ArrowUp className="w-3.5 h-3.5 mr-0.5" />+{p.rankChange}</span>
                ) : p.rankChange < 0 ? (
                  <span className="text-red-500 flex items-center"><ArrowDown className="w-3.5 h-3.5 mr-0.5" />{p.rankChange}</span>
                ) : (
                  <span className="text-gray-400 flex items-center"><Minus className="w-3.5 h-3.5 mr-0.5" />=</span>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  {p.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</p>
                  {p.streak >= 3 && (
                    <span className="inline-flex items-center text-[10px] text-amber-600 font-bold">
                      <Flame className="w-3 h-3 mr-0.5 fill-current" /> {p.streak} Streak!
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="font-mono text-base font-extrabold text-indigo-600">
              {p.score} pts
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

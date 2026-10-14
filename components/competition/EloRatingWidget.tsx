"use client";

import React from "react";
import { Trophy, Award, Flame, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EloRatingWidget() {
  return (
    <Card className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-2xl bg-white/10 text-purple-300">
            <Trophy className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">Global Participant Rating & Trophy Cabinet</h3>
            <span className="text-[10px] text-purple-300 font-mono">Elo Rating Algorithm v3.4</span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold text-xs border border-purple-500/30">
          DIAMOND TIER LEAGUE
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Current Elo Rating</span>
          <span className="font-bold text-emerald-400 text-xl">2,450 ELO</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Global Rank</span>
          <span className="font-bold text-amber-400 text-xl">#1 Worldwide</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Matches Won</span>
          <span className="font-bold text-white text-xl">42 Wins</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Active Win Streak</span>
          <span className="font-bold text-rose-400 text-xl">7 Matches 🔥</span>
        </div>
      </div>
    </Card>
  );
}

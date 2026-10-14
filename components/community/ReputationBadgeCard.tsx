"use client";

import React from "react";
import { CommunityReputationEngine } from "@/lib/community/reputationEngine";
import { Award, Trophy, Zap, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ReputationBadgeCard() {
  const leaderboard = CommunityReputationEngine.getLeaderboard();

  return (
    <Card className="p-6 bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-2xl bg-white/10 text-amber-300">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">Community Karma & Global Reputation Leaderboard</h3>
            <span className="text-[10px] text-amber-300 font-mono">Academic Trust System v3.8</span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-mono font-bold text-xs border border-amber-500/30">
          YOUR KARMA: 9,800 PTS (#4)
        </span>
      </div>

      <div className="space-y-2 text-xs font-mono">
        {leaderboard.map((user) => (
          <div key={user.rank} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="font-bold text-amber-400 font-sans">#{user.rank}</span>
              <span className="font-bold text-white font-sans">{user.name}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-emerald-400 font-bold">{user.reputationPoints.toLocaleString()} PTS</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-purple-500/30 text-purple-200 font-sans font-bold">
                {user.badgeTitle}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

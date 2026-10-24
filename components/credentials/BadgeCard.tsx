"use client";

import React from "react";
import { AchievementBadge, BadgeLevel } from "@/lib/types/credentials";
import { Trophy, Flame, Sigma, Zap, ShieldCheck, Lock } from "lucide-react";

interface BadgeCardProps {
  badge: AchievementBadge;
}

export function BadgeCard({ badge }: BadgeCardProps) {
  const levelStyles: Record<BadgeLevel, { gradient: string; border: string; text: string }> = {
    bronze: {
      gradient: "from-amber-700 via-amber-800 to-amber-900",
      border: "border-amber-600",
      text: "text-amber-200",
    },
    silver: {
      gradient: "from-slate-400 via-slate-500 to-slate-600",
      border: "border-slate-300",
      text: "text-slate-100",
    },
    gold: {
      gradient: "from-amber-400 via-amber-500 to-amber-600",
      border: "border-amber-300",
      text: "text-amber-100",
    },
    platinum: {
      gradient: "from-indigo-400 via-purple-500 to-indigo-600",
      border: "border-purple-300",
      text: "text-purple-100",
    },
    diamond: {
      gradient: "from-cyan-400 via-sky-500 to-blue-600",
      border: "border-cyan-200",
      text: "text-cyan-100",
    },
  };

  const icons: Record<string, React.ReactNode> = {
    flame: <Flame className="w-6 h-6 text-white" />,
    sigma: <Sigma className="w-6 h-6 text-white" />,
    trophy: <Trophy className="w-6 h-6 text-white" />,
    zap: <Zap className="w-6 h-6 text-white" />,
  };

  const style = levelStyles[badge.level] || levelStyles.gold;

  return (
    <div
      className={`p-4 rounded-3xl border text-center space-y-3 relative overflow-hidden transition-all ${
        badge.unlocked
          ? "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg"
          : "bg-gray-50 dark:bg-gray-900/40 border-gray-200 dark:border-gray-800 opacity-60 grayscale"
      }`}
    >
      {/* Badge Emblem Icon */}
      <div
        className={`w-14 h-14 rounded-full mx-auto bg-gradient-to-tr ${style.gradient} border-2 ${style.border} flex items-center justify-center shadow-lg relative`}
      >
        {icons[badge.icon] || <Trophy className="w-6 h-6 text-white" />}
        {!badge.unlocked && (
          <div className="absolute inset-0 bg-slate-950/70 rounded-full flex items-center justify-center text-white">
            <Lock className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-white`}>
          {badge.level} Tier
        </span>
        <h4 className="font-bold text-xs text-gray-900 dark:text-white">{badge.title}</h4>
        <p className="text-[11px] text-gray-500 line-clamp-2">{badge.description}</p>
      </div>

      {badge.unlocked ? (
        <span className="text-[10px] text-rose-600 font-bold block">
          Unlocked on {badge.unlockedAt}
        </span>
      ) : (
        <div className="space-y-1 pt-1">
          <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div className="h-full bg-indigo-500" style={{ width: `${badge.progressPercent}%` }} />
          </div>
          <span className="text-[10px] font-mono text-gray-400 block">{badge.progressPercent}% Completed</span>
        </div>
      )}
    </div>
  );
}

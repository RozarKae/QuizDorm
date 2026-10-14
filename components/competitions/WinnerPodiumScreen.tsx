import React from "react";
import Link from "next/link";
import { LiveParticipant } from "@/lib/types/competition";
import { Trophy, Award, Sparkles, Share2, Home, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WinnerPodiumScreenProps {
  participants: LiveParticipant[];
  competitionTitle: string;
}

export function WinnerPodiumScreen({ participants, competitionTitle }: WinnerPodiumScreenProps) {
  const sorted = [...participants].sort((a, b) => b.score - a.score);
  const winner = sorted[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6 text-center">
      {/* Confetti & Winner Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-600 p-8 sm:p-12 rounded-3xl text-white shadow-2xl space-y-4 relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-extrabold uppercase tracking-wider backdrop-blur-md">
          <Sparkles className="w-4 h-4 fill-amber-200 text-amber-200" />
          <span>Competition Winner Crowned</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight">{competitionTitle}</h1>

        <div className="pt-4 max-w-sm mx-auto bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 space-y-2">
          <Trophy className="w-16 h-16 text-amber-200 mx-auto animate-bounce" />
          <p className="text-xs uppercase font-bold text-amber-100 tracking-wider">CHAMPION 🥇</p>
          <h2 className="text-2xl font-black text-white">{winner?.name || "Alex Rivera"}</h2>
          <p className="text-xl font-mono font-extrabold text-amber-200">{winner?.score || 2850} Points</p>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
        {sorted[1] && (
          <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <span className="text-2xl">🥈</span>
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{sorted[1].name}</p>
            <p className="text-xs font-mono font-extrabold text-indigo-600">{sorted[1].score} pts</p>
          </div>
        )}
        {sorted[0] && (
          <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border-2 border-amber-400 shadow-lg space-y-2 scale-105">
            <span className="text-3xl">🥇</span>
            <p className="text-sm font-extrabold text-gray-900 dark:text-white truncate">{sorted[0].name}</p>
            <p className="text-sm font-mono font-extrabold text-amber-600">{sorted[0].score} pts</p>
          </div>
        )}
        {sorted[2] && (
          <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm space-y-2">
            <span className="text-2xl">🥉</span>
            <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{sorted[2].name}</p>
            <p className="text-xs font-mono font-extrabold text-indigo-600">{sorted[2].score} pts</p>
          </div>
        )}
      </div>

      {/* Action CTA */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6">
          <Share2 className="w-4 h-4 mr-2" /> Share Leaderboard
        </Button>
        <Link href="/dashboard/competitions">
          <Button variant="outline" className="rounded-xl px-6">
            <Home className="w-4 h-4 mr-2" /> Return to Competitions
          </Button>
        </Link>
      </div>
    </div>
  );
}

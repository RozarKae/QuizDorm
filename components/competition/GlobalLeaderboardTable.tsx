"use client";

import { RankingEngine } from "@/lib/competition/rankingEngine";
import { RankingScope } from "@/lib/types/competition";
import { Trophy } from "lucide-react";
import { useState } from "react";

export function GlobalLeaderboardTable() {
  const [scope, setScope] = useState<RankingScope>("international");
  const leaderboard = RankingEngine.getLeaderboard(scope);

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3 gap-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Trophy className="w-5 h-5 text-amber-500 mr-2" /> Global & Multi-Level Leaderboard
          </h3>
          <p className="text-xs text-gray-500">
            Real-time rankings powered by Elo rating algorithms across Classroom to International scopes.
          </p>
        </div>

        {/* Scope Selector */}
        <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl text-[11px] font-bold">
          {(["classroom", "school", "state", "national", "international"] as RankingScope[]).map((sc) => (
            <button
              key={sc}
              onClick={() => setScope(sc)}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                scope === sc ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {sc}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-3">Rank</th>
              <th className="p-3">Participant</th>
              <th className="p-3">School / Institution</th>
              <th className="p-3">Region</th>
              <th className="p-3">Elo Rating</th>
              <th className="p-3">Total Points</th>
              <th className="p-3">Tier Medal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
            {leaderboard.map((entry) => (
              <tr key={entry.participantId} className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors">
                <td className="p-3 font-bold text-gray-900 dark:text-white font-sans text-sm">
                  {entry.rank === 1 ? "🥇 #1" : entry.rank === 2 ? "🥈 #2" : entry.rank === 3 ? "🥉 #3" : `#${entry.rank}`}
                </td>
                <td className="p-3 font-bold text-gray-900 dark:text-white font-sans">{entry.participantName}</td>
                <td className="p-3 font-sans text-gray-600 dark:text-gray-300">{entry.schoolName}</td>
                <td className="p-3 text-gray-400 font-sans">{entry.region}</td>
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{entry.eloRating} ELO</td>
                <td className="p-3 text-rose-600 font-bold">{entry.totalPoints.toLocaleString()} pts</td>
                <td className="p-3 font-sans">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      entry.medal === "diamond"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                        : entry.medal === "gold"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {entry.medal} Tier
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { GlobalLeaderboardTable } from "@/components/competition/GlobalLeaderboardTable";
import { EloRatingWidget } from "@/components/competition/EloRatingWidget";
import { OlympiadQualificationCard } from "@/components/competition/OlympiadQualificationCard";

import { Trophy, Globe, Award, Swords, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GlobalCompetitionsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300">
                <Trophy className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.4 Global Competitive Ecosystem
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Global Olympiads, Championships & World Leaderboards
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Compete in national and international championships, track your Elo rating, climb multi-level leaderboards, and win verified digital trophies.
            </p>
          </div>

          <Link href="/dashboard/competitions/organizer">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-600/30">
              <Swords className="w-4 h-4 mr-1.5" /> Launch Organizer Bracket Console
            </Button>
          </Link>
        </div>
      </div>

      {/* Elo Rating & Trophy Cabinet Widget */}
      <EloRatingWidget />

      {/* Olympiad Arena & Multi-Level Global Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <OlympiadQualificationCard />
        </div>
        <div className="lg:col-span-8">
          <GlobalLeaderboardTable />
        </div>
      </div>
    </div>
  );
}

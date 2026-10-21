"use client";

import React from "react";
import Link from "next/link";
import { GlobalLeaderboardTable } from "@/components/competition/GlobalLeaderboardTable";
import { EloRatingWidget } from "@/components/competition/EloRatingWidget";
import { OlympiadQualificationCard } from "@/components/competition/OlympiadQualificationCard";
import { Trophy, Globe, Award, Swords, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/components/audio/useSound";

export default function GlobalCompetitionsPage() {
  const { playTap } = useSound();

  return (
    <div className="space-y-6 text-[#F2F7F3]">
      <div>
        <Link
          href="/dashboard/competitions"
          onClick={playTap}
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO COMPETITIONS
        </Link>

        {/* Masthead Header */}
        <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8 rounded-[6px] relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-1/4 w-80 h-36 bg-[radial-gradient(ellipse_at_center,rgba(101,245,154,0.1)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse shadow-[0_0_8px_#65F59A]" />
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#65F59A]">
                  GLOBAL COMPETITIVE ECOSYSTEM // ELO &amp; OLYMPIADS
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
                <Globe className="w-6 h-6 text-[#65F59A] mr-2.5" />
                Global Olympiads, Championships &amp; World Standings
              </h1>
              <p className="text-xs font-mono text-[#A0AEA5] max-w-2xl leading-relaxed">
                Compete in national and international championships, track your live Elo rating, climb multi-level leaderboards, and win verified cryptographic credentials.
              </p>
            </div>

            <Link href="/dashboard/competitions/organizer" onClick={playTap}>
              <Button className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 shadow-[0_0_12px_rgba(101,245,154,0.2)]">
                <Swords className="w-3.5 h-3.5 mr-1.5" /> Launch Organizer Console
              </Button>
            </Link>
          </div>
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

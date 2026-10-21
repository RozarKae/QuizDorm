"use client";

import React from "react";
import Link from "next/link";
import { TournamentBracketCard } from "@/components/competition/TournamentBracketCard";
import { AntiCheatConsoleCard } from "@/components/competition/AntiCheatConsoleCard";
import { Swords, ShieldAlert, Play, Pause, ArrowLeft, Sparkles, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/components/audio/useSound";
import { toast } from "sonner";

export default function OrganizerConsolePage() {
  const { playTap } = useSound();

  const handleEventControl = (action: string) => {
    playTap();
    toast.success(`Event Control Action Triggered: ${action}`);
  };

  return (
    <div className="space-y-6 text-[#F2F7F3]">
      {/* Navigation Breadcrumb */}
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
                  TOURNAMENT CONTROL // ELIMINATION BRACKET &amp; INTEGRITY
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
                <Swords className="w-6 h-6 text-[#65F59A] mr-2.5" />
                Organizer Command &amp; Anti-Cheat Monitor
              </h1>
              <p className="text-xs font-mono text-[#A0AEA5] max-w-2xl leading-relaxed">
                Manage championship elimination brackets, broadcast live sync announcements, and monitor real-time anti-cheat telemetry streams.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <Button
                onClick={() => handleEventControl("Live Competition Resumed")}
                className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 shadow-[0_0_12px_rgba(101,245,154,0.2)]"
              >
                <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Resume Event
              </Button>
              <Button
                onClick={() => handleEventControl("Competition Paused")}
                variant="outline"
                className="text-xs font-mono rounded-[4px] h-9 border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3]"
              >
                <Pause className="w-3.5 h-3.5 mr-1.5" /> Pause
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <TournamentBracketCard />
        </div>
        <div className="lg:col-span-5">
          <AntiCheatConsoleCard />
        </div>
      </div>
    </div>
  );
}

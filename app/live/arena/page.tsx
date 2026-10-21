"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { JoinArenaForm } from "@/components/competitions/JoinArenaForm";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { useSound } from "@/components/audio/useSound";
import {
  Trophy,
  Zap,
  Users,
  Clock,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Flame,
  Radio,
  PlusCircle,
  Home,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ACTIVE_FEATURED_ARENAS = [
  {
    code: "QD-8492",
    title: "Tamil Nadu & Kerala Inter-District Science Olympiad 2026",
    host: "TN & Kerala Science Olympiad Council",
    subject: "Physics, Chemistry & Advanced Biology",
    status: "LIVE NOW",
    statusVariant: "live",
    currentRound: "Round 03 of 10",
    participantsCount: 840,
    timeRemaining: "07s per question",
    prize: "Gold Trophy + Scholarship",
    badge: "Olympiad Division A",
  },
  {
    code: "QD-3104",
    title: "Kerala State Algorithmic & Coding Decathlon",
    host: "Kerala State IT & Algorithmic League (Kochi)",
    subject: "Algorithms & Data Structures",
    status: "LOBBY OPEN",
    statusVariant: "lobby",
    currentRound: "Synchronizing Contenders",
    participantsCount: 310,
    timeRemaining: "Launching shortly",
    prize: "State IT Trophy + Cloud Access",
    badge: "Computer Science Guild",
  },
  {
    code: "QD-1250",
    title: "Madurai & South Tamil Nadu Inter-School Heritage Bowl",
    host: "Madurai Heritage & Higher Secondary Academic Council",
    subject: "20th Century History & Regional Heritage",
    status: "PODIUM ACTIVE",
    statusVariant: "podium",
    currentRound: "Final Podium Standings",
    participantsCount: 1250,
    timeRemaining: "Completed",
    prize: "Championship Laurels + Merit Honors",
    badge: "Heritage Bowl",
  },
];

export default function LiveArenaIndexPage() {
  const { playTap, playCorrect } = useSound();

  return (
    <div className="min-h-screen bg-[#070B0A] text-[#F2F7F3] aurora-grid relative overflow-x-hidden flex flex-col">
      {/* Top Header Navigation */}
      <header className="border-b border-[rgba(160,190,170,0.14)] bg-[#0C1210]/90 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            onClick={playTap}
            className="flex items-center space-x-2 text-xs font-mono text-[#A0AEA5] hover:text-[#F2F7F3] transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[#65F59A]" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="text-[rgba(160,190,170,0.3)]">/</span>
          <div className="flex items-center space-x-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65F59A] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#65F59A]" />
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
              Live Arena Portal
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <AudioToggle />
          <Link href="/dashboard" onClick={playTap}>
            <Button
              variant="outline"
              size="sm"
              className="border-[rgba(160,190,170,0.2)] bg-[#111B17] hover:bg-[#17251E] text-[#A0AEA5] hover:text-[#F2F7F3] text-xs font-mono rounded-[4px] h-8 flex items-center gap-1.5"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#65F59A]" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
        {/* Masthead Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2.5 border border-[#65F59A]/30 bg-[#111B17] px-3.5 py-1.5 rounded-full text-[10px] font-mono shadow-[0_0_15px_rgba(101,245,154,0.15)]">
            <Radio className="w-3 h-3 text-[#65F59A] animate-pulse" />
            <span className="text-[#65F59A] font-bold uppercase tracking-widest">
              REAL-TIME SSE DECATLONS // TAMIL NADU &amp; KERALA
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F2F7F3] leading-tight">
            Step Into The Live <br />
            <span className="bg-gradient-to-r from-[#FFE600] via-[#65F59A] to-[#00F0FF] bg-clip-text text-transparent">
              Competition Arena.
            </span>
          </h1>

          <p className="text-xs sm:text-sm font-mono text-[#A0AEA5] max-w-xl mx-auto leading-relaxed">
            Enter a live tournament room code to compete with students across Tamil Nadu and Kerala in real-time, or explore ongoing state championship arenas below.
          </p>
        </div>

        {/* Two-Column Deck: Join Form + Live Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (5 cols): Instant Room PIN Entry Card */}
          <div className="lg:col-span-5 bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(101,245,154,0.1)] space-y-6">
            <div className="space-y-1 border-b border-[rgba(160,190,170,0.12)] pb-4">
              <div className="flex items-center space-x-2 text-[#65F59A]">
                <Zap className="w-4 h-4 fill-current" />
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Join Competition Arena
                </h2>
              </div>
              <p className="text-[11px] font-mono text-[#69786F]">
                Enter room code (e.g. <strong className="text-[#65F59A]">QD-8492</strong>) and your callsign to sync.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="text-center font-mono text-xs text-[#A0AEA5] py-12">
                  Initializing Arena Gateway...
                </div>
              }
            >
              <JoinArenaForm initialCode="QD-8492" />
            </Suspense>

            {/* Host Quick Link */}
            <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] flex items-center justify-between text-[11px] font-mono text-[#A0AEA5]">
              <span>Are you an organizer or teacher?</span>
              <Link
                href="/dashboard/competitions/new"
                onClick={playTap}
                className="text-[#65F59A] hover:underline font-bold flex items-center gap-1"
              >
                <span>Create Session</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Right Column (7 cols): Active Live Tournaments & Quick Entry */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-[#FFE600]" />
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Featured Active Tournaments
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#38D9B0] bg-[#111B17] px-2.5 py-0.5 rounded-full border border-[rgba(160,190,170,0.16)]">
                3 Broadcasts Live
              </span>
            </div>

            <div className="space-y-4">
              {ACTIVE_FEATURED_ARENAS.map((arena) => (
                <div
                  key={arena.code}
                  className="bg-[#0C1210] border border-[rgba(160,190,170,0.16)] hover:border-[#65F59A]/40 rounded-xl p-5 transition-all shadow-md space-y-4 group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[rgba(160,190,170,0.1)] pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-xs font-black text-[#65F59A] bg-[#111B17] px-2.5 py-1 rounded-[4px] border border-[#65F59A]/30">
                        {arena.code}
                      </span>
                      <span className="font-mono text-[10px] text-[#A0AEA5] uppercase tracking-wide">
                        {arena.badge}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                          arena.statusVariant === "live"
                            ? "bg-[#65F59A]/15 text-[#65F59A] border-[#65F59A]/40 animate-pulse"
                            : arena.statusVariant === "lobby"
                            ? "bg-[#00F0FF]/15 text-[#00F0FF] border-[#00F0FF]/40"
                            : "bg-[#FFE600]/15 text-[#FFE600] border-[#FFE600]/40"
                        }`}
                      >
                        {arena.status}
                      </span>
                      <span className="text-[10px] font-mono text-[#69786F]">
                        {arena.currentRound}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-base font-bold text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors leading-snug">
                      {arena.title}
                    </h3>
                    <p className="text-[11px] font-mono text-[#A0AEA5] mt-1">
                      Organized by <strong className="text-[#C0CEC5]">{arena.host}</strong> • {arena.subject}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[10px] font-mono text-[#69786F] bg-[#111B17] p-2.5 rounded-[6px] border border-[rgba(160,190,170,0.08)]">
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-[#65F59A]" />
                      <span>{arena.participantsCount} Enrolled</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-[#38D9B0]" />
                      <span>{arena.timeRemaining}</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-1.5 text-[#FFE600] truncate">
                      <Trophy className="w-3 h-3 shrink-0" />
                      <span className="truncate">{arena.prize}</span>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-end">
                    <Link
                      href={`/live/arena/${arena.code}`}
                      onClick={() => {
                        playCorrect();
                      }}
                      className="w-full sm:w-auto"
                    >
                      <Button className="w-full sm:w-auto bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 px-5 shadow-[0_0_15px_rgba(101,245,154,0.25)] flex items-center justify-center gap-1.5">
                        <span>Enter Arena ({arena.code})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Host Banner Card */}
            <div className="bg-gradient-to-r from-[#111B17] via-[#0C1210] to-[#17251E] p-5 rounded-xl border border-[rgba(160,190,170,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-sm font-bold text-[#F2F7F3] flex items-center justify-center sm:justify-start gap-1.5">
                  <PlusCircle className="w-4 h-4 text-[#65F59A]" />
                  Launch Your Own Competition Arena
                </h4>
                <p className="text-[11px] font-mono text-[#A0AEA5]">
                  Host real-time decathlons for your classroom or school with live podiums and question broadcasts.
                </p>
              </div>

              <Link href="/dashboard/competitions/new" onClick={playTap} className="shrink-0 w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-[#65F59A]/40 text-[#65F59A] hover:bg-[#65F59A] hover:text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 px-4 transition-all"
                >
                  Create Live Arena
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[rgba(160,190,170,0.12)] bg-[#0C1210] py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[#69786F]">
          <p>
            &copy; {new Date().getFullYear()} QuizDorm Platform. Founded by <strong className="text-[#F2F7F3]">RK Akbar</strong> (Tamil Nadu &amp; Kerala).
          </p>
          <p className="text-[11px] text-[#65F59A]">
            Real-Time High-Speed Arena Engine
          </p>
        </div>
      </footer>
    </div>
  );
}

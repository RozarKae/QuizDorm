"use client";

import React, { Suspense, useState, useEffect } from "react";
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
  Radio,
  PlusCircle,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY_HOSTED_COMPETITIONS = "quizdorm_hosted_competitions_v1";

interface HostedArenaItem {
  id: string;
  code: string;
  title: string;
  hostName: string;
  category: string;
  subject?: string;
  status: string;
  participantsCount: number;
  timeRemaining?: string;
}

export default function LiveArenaIndexPage() {
  const { playTap, playCorrect } = useSound();
  const [activeArenas, setActiveArenas] = useState<HostedArenaItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_HOSTED_COMPETITIONS);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const mapped = parsed.map((p: any) => ({
              id: p.id || p.code,
              code: p.code,
              title: p.title || "Live Curriculum Arena",
              hostName: p.hostName || "Verified Organizer",
              category: p.category || "Competitive Assessment",
              subject: p.subject || "General Academic",
              status: p.status || "WAITING",
              participantsCount: p.participantsCount || 0,
              timeRemaining: p.timeRemaining || "In Session",
            }));
            setActiveArenas(mapped);
          }
        }
      } catch {
        setActiveArenas([]);
      }
    }
    setIsLoaded(true);
  }, []);

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
              <span>Workspace</span>
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-10 flex-1">
        {/* Banner Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-white via-slate-50 to-emerald-50/50 dark:from-[#0C1210] dark:via-[#111B17] dark:to-[#0C1210] border border-slate-200 dark:border-[rgba(160,190,170,0.18)] p-6 sm:p-10 shadow-lg dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 dark:bg-[#65F59A]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-[#17251E] border border-emerald-300 dark:border-[rgba(101,245,154,0.3)] text-emerald-800 dark:text-[#65F59A] text-[11px] font-mono tracking-wider shadow-xs">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>SYNCHRONIZED MULTI-PLAYER ARENA ENGINE</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-[#F2F7F3] tracking-tight leading-tight uppercase">
              Real-Time Competitive <span className="text-[#047857] dark:text-[#65F59A]">Live Arenas</span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-[#A0AEA5] leading-relaxed max-w-2xl font-sans">
              Enter real-time head-to-head academic decathlons, live classroom quizzes, and Olympiad showdowns with microsecond scoring and live podiums.
            </p>
          </div>
        </div>

        {/* Two-Column Deck: Join Form + Live Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 cols): Instant Room PIN Entry Card */}
          <div className="lg:col-span-5 bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_30px_rgba(101,245,154,0.1)] space-y-6">
            <div className="space-y-1 border-b border-[rgba(160,190,170,0.12)] pb-4">
              <div className="flex items-center space-x-2 text-[#65F59A]">
                <Zap className="w-4 h-4 fill-current" />
                <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Enter Battle Arena
                </h2>
              </div>
              <p className="text-[11px] font-mono text-[#69786F]">
                Enter room PIN (e.g. <strong className="text-[#65F59A]">QD-XXXX</strong>) and your scholar callsign to enter.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="text-center font-mono text-xs text-[#A0AEA5] py-12">
                  Initializing Arena Gateway...
                </div>
              }
            >
              <JoinArenaForm />
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
                  Active Tournaments
                </h2>
              </div>
              <span className="text-[10px] font-mono text-[#38D9B0] bg-[#111B17] px-2.5 py-0.5 rounded-full border border-[rgba(160,190,170,0.16)]">
                {activeArenas.length} {activeArenas.length === 1 ? "Broadcast Live" : "Broadcasts Live"}
              </span>
            </div>

            {isLoaded && activeArenas.length === 0 ? (
              <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.16)] rounded-xl p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#111B17] border border-[rgba(160,190,170,0.2)] mx-auto flex items-center justify-center text-[#69786F]">
                  <Radio className="w-6 h-6 text-[#A0AEA5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-[#F2F7F3]">
                    No Public Arenas Currently Broadcasting Live
                  </h3>
                  <p className="text-xs text-[#A0AEA5] max-w-md mx-auto">
                    Live battle arenas appear here automatically when a faculty mentor, academy, or tournament proctor starts broadcasting.
                  </p>
                </div>
                <div className="pt-2 text-xs font-mono text-[#69786F]">
                  Have an arena PIN? Enter your room code on the left to step into the showdown.
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {activeArenas.map((arena) => (
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
                          {arena.category}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[9px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full border bg-[#65F59A]/15 text-[#65F59A] border-[#65F59A]/40 animate-pulse">
                          {arena.status}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display text-base font-bold text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors leading-snug">
                        {arena.title}
                      </h3>
                      <p className="text-[11px] font-mono text-[#A0AEA5] mt-1">
                        Organized by <strong className="text-[#C0CEC5]">{arena.hostName}</strong> • {arena.subject}
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
            )}

            {/* Host Banner Card */}
            <div className="bg-slate-50 border border-slate-200 dark:bg-gradient-to-r dark:from-[#111B17] dark:via-[#0C1210] dark:to-[#17251E] p-5 rounded-xl dark:border-[rgba(160,190,170,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="space-y-1 text-center sm:text-left">
                <h4 className="font-display text-sm font-bold text-slate-900 dark:text-[#F2F7F3] flex items-center justify-center sm:justify-start gap-1.5">
                  <PlusCircle className="w-4 h-4 text-[#047857] dark:text-[#65F59A]" />
                  Launch Your Own Competition Arena
                </h4>
                <p className="text-[11px] font-mono text-slate-600 dark:text-[#A0AEA5]">
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
            Autonomous Real-Time Competition Engine Active
          </p>
        </div>
      </footer>
    </div>
  );
}

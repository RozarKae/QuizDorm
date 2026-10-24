"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Flame,
  Award,
  BookOpen,
  ArrowRight,
  Clock,
  Compass,
  Trophy,
  Swords,
  Zap,
  TrendingUp,
  Brain,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubscriberDashboardView() {
  const [pinCode, setPinCode] = useState("");

  const highYieldDecks = [
    {
      title: "Cognitive IQ & Lateral Logic Matrix",
      discipline: "Cognitive Reasoning",
      questionsCount: 30,
      estimatedTime: "20 mins",
      difficulty: "Advanced",
      completionRate: "78%",
      color: "from-amber-500/20 to-yellow-500/10",
      accent: "text-amber-400",
      border: "border-amber-500/30",
    },
    {
      title: "Grand Dorm Multi-Discipline Decathlon",
      discipline: "STEM & Humanities",
      questionsCount: 40,
      estimatedTime: "30 mins",
      difficulty: "Competitive",
      completionRate: "84%",
      color: "from-orange-500/20 to-amber-500/10",
      accent: "text-orange-400",
      border: "border-orange-500/30",
    },
    {
      title: "Quantum Physics & Mechanics Mastery",
      discipline: "Physical Sciences",
      questionsCount: 25,
      estimatedTime: "25 mins",
      difficulty: "Mastery",
      completionRate: "71%",
      color: "from-yellow-500/20 to-orange-500/10",
      accent: "text-yellow-400",
      border: "border-yellow-500/30",
    },
    {
      title: "High-Yield Clinical Pharmacology Diagnostic",
      discipline: "Clinical Sciences",
      questionsCount: 35,
      estimatedTime: "30 mins",
      difficulty: "Professional",
      completionRate: "89%",
      color: "from-amber-600/20 to-yellow-600/10",
      accent: "text-amber-300",
      border: "border-amber-500/30",
    },
  ];

  const recentTelemetry = [
    { title: "Calculus & Vector Sprints", score: "94%", date: "Today, 11:20 AM", accuracy: "28/30 Correct" },
    { title: "Neuroscience Diagnostic #2", score: "88%", date: "Yesterday", accuracy: "22/25 Correct" },
    { title: "Organic Chemistry Mechanism Sprint", score: "82%", date: "2 days ago", accuracy: "24/30 Correct" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Scholar Club Masthead (Obsidian & Burnished Gold) */}
      <div className="relative overflow-hidden rounded-[10px] bg-[#0A0A0C] border border-amber-500/25 p-6 sm:p-8 shadow-[0_0_40px_rgba(234,179,8,0.06)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(234,179,8,0.12)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-amber-500/15 border border-amber-500/35 text-amber-400 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                <Sparkles className="w-3 h-3 text-amber-300" />
                Autonomous Scholar Club // Pro Tier
              </span>
              <span className="text-[#69786F]">&bull;</span>
              <span className="font-mono text-xs text-[#A0AEA5]">Self-Paced Mastery</span>
            </div>
            
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Independent Scholar Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Curated intellectual dormitory for self-directed contenders. Accelerate cognitive IQ, take high-yield sprint trials, and enter synchronized decathlons.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/dashboard/quizzes">
              <Button className="h-10 px-5 rounded-[4px] bg-gradient-to-r from-amber-500 to-amber-400 text-[#0B0708] hover:brightness-110 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all">
                <BookOpen className="mr-2 h-4 w-4" />
                The Dorm Vault
              </Button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                className="h-10 px-4 rounded-[4px] border-amber-500/30 bg-[#121118] text-amber-300 hover:border-amber-400 hover:text-amber-200 font-mono text-xs uppercase font-bold"
              >
                <CreditCard className="mr-2 h-3.5 w-3.5" />
                Manage Plan
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Personal Performance & Quota HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Monthly AI Quota Ring */}
        <div className="p-4 rounded-[8px] bg-[#0A0A0C] border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/10">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400/80">
              AI Generation Quota
            </span>
            <Sparkles className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-baseline justify-between">
              <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
                42 <span className="text-xs text-[#69786F] font-mono">/ 100 Qs</span>
              </p>
              <span className="font-mono text-[10px] text-amber-400 font-bold">58 Remaining</span>
            </div>
            <div className="w-full h-1.5 bg-[#17161F] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: "42%" }} />
            </div>
          </div>
        </div>

        {/* Metric 2: Study Streak */}
        <div className="p-4 rounded-[8px] bg-[#0A0A0C] border border-orange-500/20 hover:border-orange-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-orange-500/10">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-orange-400/80">
              Active Daily Streak
            </span>
            <Flame className="h-4 w-4 text-orange-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
                19 <span className="text-xs text-orange-400 font-mono">Days</span>
              </p>
              <p className="text-[11px] text-[#A0AEA5] mt-0.5">Continuous daily sprint</p>
            </div>
            <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30">
              Top 5% Velocity
            </span>
          </div>
        </div>

        {/* Metric 3: Quizzes Completed */}
        <div className="p-4 rounded-[8px] bg-[#0A0A0C] border border-amber-500/20 hover:border-amber-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-amber-500/10">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-amber-400/80">
              Dorm Vault Runs
            </span>
            <Trophy className="h-4 w-4 text-amber-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
                64
              </p>
              <p className="text-[11px] text-[#A0AEA5] mt-0.5">High-yield trials</p>
            </div>
            <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              88% Accuracy
            </span>
          </div>
        </div>

        {/* Metric 4: Cognitive IQ Growth */}
        <div className="p-4 rounded-[8px] bg-[#0A0A0C] border border-yellow-500/20 hover:border-yellow-500/40 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between pb-2 border-b border-yellow-500/10">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-yellow-400/80">
              Cognitive Velocity
            </span>
            <Brain className="h-4 w-4 text-yellow-400" />
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <div>
              <p className="font-display text-2xl font-extrabold text-[#F2F7F3] tabular-nums">
                128 <span className="text-xs text-yellow-400 font-mono">Index</span>
              </p>
              <p className="text-[11px] text-[#A0AEA5] mt-0.5">+4.2 pts this month</p>
            </div>
            <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold bg-yellow-500/15 text-yellow-400 border border-yellow-500/30">
              Mastery Tier
            </span>
          </div>
        </div>
      </div>

      {/* 3. Live Battle Arena Quick Pass */}
      <div className="rounded-[8px] bg-[#0E0D14] border border-amber-500/30 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-[6px] bg-amber-500/15 border border-amber-500/35 text-amber-400 shrink-0">
            <Swords className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                Live Decathlon & Battle Arena Pass
              </h3>
              <span className="px-2 py-0.2 rounded text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                Live Contender
              </span>
            </div>
            <p className="text-xs text-[#A0AEA5] mt-0.5">
              Enter any 6-digit arena room PIN to join live multiplayer tournament showdowns.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="6-Digit PIN..."
            maxLength={6}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.toUpperCase())}
            className="w-32 px-3 py-2 rounded-[4px] bg-[#171620] border border-amber-500/30 text-amber-300 font-mono text-center tracking-widest text-sm uppercase focus:outline-none focus:border-amber-400"
          />
          <Link href={pinCode ? `/live/join?pin=${pinCode}` : "/live/join"}>
            <Button className="h-9 px-4 rounded-[4px] bg-gradient-to-r from-amber-500 to-amber-400 text-[#0B0708] hover:brightness-110 font-mono text-xs uppercase font-bold">
              Join Arena
            </Button>
          </Link>
        </div>
      </div>

      {/* 4. High-Yield Practice Decks (The Dorm Vault Curated for Subscribers) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-3 bg-amber-400 rounded-[1px] shadow-[0_0_6px_#EAB308]" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
              Curated Practice Decks (The Dorm Vault)
            </h2>
          </div>
          <Link
            href="/dashboard/quizzes"
            className="font-mono text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Explore All 24 Decks <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highYieldDecks.map((deck) => (
            <div
              key={deck.title}
              className={`p-4 rounded-[6px] bg-[#0A0A0C] border ${deck.border} hover:scale-[1.01] transition-all flex flex-col justify-between group`}
            >
              <div>
                <span className={`text-[9px] font-mono uppercase font-bold tracking-wider ${deck.accent}`}>
                  {deck.discipline}
                </span>
                <h3 className="text-xs font-bold text-[#F2F7F3] mt-1 group-hover:text-amber-300 transition-colors line-clamp-2">
                  {deck.title}
                </h3>
                <div className="flex items-center gap-2 font-mono text-[10px] text-[#A0AEA5] mt-2">
                  <span>{deck.questionsCount} Qs</span>
                  <span>&bull;</span>
                  <span>{deck.estimatedTime}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-500/10 flex items-center justify-between">
                <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[#17161F] text-[#A0AEA5] border border-amber-500/15">
                  {deck.difficulty}
                </span>
                <Link href="/dashboard/quizzes">
                  <Button
                    size="sm"
                    className="h-7 px-2.5 rounded-[3px] bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 border border-amber-500/30 font-mono text-[10px] uppercase font-bold"
                  >
                    Start Deck &rarr;
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Personal Telemetry History */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[8px] bg-[#0A0A0C] border border-amber-500/20 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-amber-500/10">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-amber-400" />
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
                Recent Cognitive Telemetry
              </h3>
            </div>
            <Link href="/dashboard/quizzes/history" className="text-xs font-mono text-amber-400 hover:underline">
              Full Archive &rarr;
            </Link>
          </div>

          <div className="space-y-2.5">
            {recentTelemetry.map((t, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[4px] bg-[#121118] border border-amber-500/15 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-bold text-[#F2F7F3]">{t.title}</h4>
                  <p className="text-[10px] font-mono text-[#A0AEA5] mt-0.5">
                    {t.accuracy} &bull; {t.date}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-extrabold text-amber-400 tabular-nums">
                    {t.score}
                  </span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Autonomous Roadmap */}
        <div className="rounded-[8px] bg-[#0A0A0C] border border-amber-500/20 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-amber-500/10">
            <Compass className="h-4 w-4 text-amber-400" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
              Autonomous Mastery Path
            </h3>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-[4px] bg-[#121118] border border-amber-500/20 space-y-1.5">
              <span className="text-[9px] uppercase tracking-wider text-amber-400 font-bold block">
                Next Benchmark
              </span>
              <p className="text-[#F2F7F3] text-xs font-semibold">
                Complete 100 Vault Sprints
              </p>
              <p className="text-[10px] text-[#A0AEA5]">
                Unlocks Master Contender Badge and +25 bonus AI synthesis credits.
              </p>
            </div>

            <div className="p-3 rounded-[4px] bg-[#121118] border border-amber-500/10 space-y-1">
              <span className="text-[9px] uppercase tracking-wider text-[#A0AEA5] block">
                Weekly Decathlon Event
              </span>
              <p className="text-xs text-amber-300 font-bold">
                Sunday 7:00 PM IST (Global Arena)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

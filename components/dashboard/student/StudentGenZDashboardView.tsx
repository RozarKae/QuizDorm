"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Zap,
  Flame,
  Swords,
  Trophy,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Play,
  ArrowRight,
  CheckCircle2,
  Circle,
  Users,
  Target,
  Gamepad2,
  Crown,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StudentGenZDashboardView() {
  const [pinCode, setPinCode] = useState("");
  const [quests, setQuests] = useState([
    { id: 1, title: "Complete Daily Cognitive Sprint", xp: 50, completed: true },
    { id: 2, title: "Solve 5 Thermodynamics questions", xp: 80, completed: false },
    { id: 3, title: "Challenge a dorm peer in Live Arena", xp: 120, completed: false },
  ]);

  const toggleQuest = (id: number) => {
    setQuests((prev) =>
      prev.map((q) => (q.id === id ? { ...q, completed: !q.completed } : q))
    );
  };

  const assignedQuizzes = [
    {
      title: "AP Chemistry: Organic Reactions Diagnostic",
      teacher: "Prof. Sarah Jenkins",
      dueIn: "Today, 6:00 PM",
      urgent: true,
      questions: 20,
    },
    {
      title: "Advanced Physics: Magnetic Flux & Induction",
      teacher: "Dr. Alan Vance",
      dueIn: "Tomorrow",
      urgent: false,
      questions: 25,
    },
  ];

  const leaderboardTop3 = [
    { rank: 1, name: "Arjun Verma", xp: "4,920 XP", crown: "🥇" },
    { rank: 2, name: "Sarah Lin", xp: "4,680 XP", crown: "🥈" },
    { rank: 3, name: "You (Rank #3)", xp: "4,350 XP", crown: "🥉", isMe: true },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Gen-Z Arcade Level Banner (Electric Violet & Cyber Neon) */}
      <div className="relative overflow-hidden rounded-[12px] bg-gradient-to-r from-violet-100 via-fuchsia-50 to-cyan-50 dark:from-[#1E1138] dark:via-[#160B2E] dark:to-[#0A1728] border-2 border-violet-500/40 p-6 sm:p-8 shadow-[0_0_40px_rgba(139,92,246,0.15)]">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(6,182,212,0.18)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[radial-gradient(circle,rgba(244,63,94,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-500/25 border border-violet-400/50 text-violet-700 dark:text-violet-300 font-mono text-[10px] font-extrabold uppercase tracking-widest shadow-[0_0_12px_rgba(139,92,246,0.3)]">
                <Gamepad2 className="w-3.5 h-3.5 text-violet-600 dark:text-violet-300" />
                Level 14 Cognitive Contender
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-600 dark:text-orange-400 font-mono text-[10px] font-extrabold uppercase">
                <Flame className="w-3.5 h-3.5 text-orange-500 dark:text-orange-400" />
                24 Day Streak
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-700 dark:text-cyan-300 font-mono text-[10px] font-extrabold uppercase">
                <Crown className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-300" />
                Diamond League
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-slate-900 dark:text-white drop-shadow-[0_2px_10px_rgba(139,92,246,0.3)]">
              Scholar&apos;s Arena & Hub
            </h1>

            {/* XP Level Bar */}
            <div className="space-y-1.5 max-w-md pt-1">
              <div className="flex items-center justify-between font-mono text-[11px]">
                <span className="text-violet-700 dark:text-violet-300 font-bold">XP to Level 15</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-extrabold">2,840 / 3,500 XP (81%)</span>
              </div>
              <div className="w-full h-2.5 bg-violet-200/60 dark:bg-[#0D071B] rounded-full overflow-hidden border border-violet-500/30 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  style={{ width: "81%" }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/live/join">
              <Button className="h-11 px-6 rounded-[8px] bg-gradient-to-r from-cyan-500 via-rose-500 to-rose-500 text-white dark:text-[#0B0708] hover:brightness-110 font-mono text-xs uppercase font-extrabold tracking-wider shadow-[0_0_25px_rgba(6,182,212,0.4)]">
                <Swords className="mr-2 h-4 w-4" />
                Battle Arena
              </Button>
            </Link>
            <Link href="/dashboard/assignments">
              <Button
                variant="outline"
                className="h-11 px-5 rounded-[8px] border-violet-500/40 bg-white/80 dark:bg-violet-950/40 text-violet-800 dark:text-violet-200 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/50 font-mono text-xs uppercase font-bold"
              >
                <BookOpen className="mr-2 h-3.5 w-3.5" />
                Class Homework
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Interactive Battle Arena Launchpad */}
      <div className="rounded-[12px] bg-gradient-to-r from-violet-50 to-cyan-50 dark:from-[#170E2B] dark:to-[#0A1224] border-2 border-cyan-500/40 p-5 shadow-[0_0_30px_rgba(6,182,212,0.12)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="p-3 rounded-[10px] bg-cyan-500/20 border border-cyan-400/40 text-cyan-600 dark:text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Swords className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Live Multiplayer Arena
              </h3>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="text-[10px] font-mono text-cyan-700 dark:text-cyan-300 uppercase font-bold">142 Live Battles Now</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-[#A0AEA5] mt-0.5">
              Enter your teacher&apos;s or tournament 6-digit game PIN to drop straight into the arena.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder="ENTER PIN..."
            maxLength={6}
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value.toUpperCase())}
            className="w-36 px-3 py-2.5 rounded-[6px] bg-white dark:bg-[#0E071D] border-2 border-cyan-500/40 text-cyan-700 dark:text-cyan-300 font-mono text-center tracking-widest text-base font-bold uppercase focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
          />
          <Link href={pinCode ? `/live/join?pin=${pinCode}` : "/live/join"}>
            <Button className="h-10 px-5 rounded-[6px] bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:brightness-110 font-mono text-xs uppercase font-extrabold shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              Drop In &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* 3. Main Student Grid: Quests, Homework & Podium */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Daily Quests & Class Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Quests Card */}
          <div className="rounded-[10px] bg-[#0E081F] border border-violet-500/30 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-violet-500/20">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Daily Quests & Challenges
                </h3>
              </div>
              <span className="font-mono text-xs text-violet-700 dark:text-violet-300 font-bold">
                {quests.filter((q) => q.completed).length} / {quests.length} Completed
              </span>
            </div>

            <div className="space-y-2.5">
              {quests.map((q) => (
                <div
                  key={q.id}
                  onClick={() => toggleQuest(q.id)}
                  className={`p-3 rounded-[6px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    q.completed
                      ? "bg-violet-100/50 dark:bg-violet-950/20 border-violet-500/20 text-[#69786F]"
                      : "bg-[#140D2B] border-violet-500/30 hover:border-violet-400 text-slate-900 dark:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {q.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-rose-600 dark:text-rose-400 shrink-0" />
                    ) : (
                      <Circle className="h-4 w-4 text-violet-500 dark:text-violet-400 shrink-0" />
                    )}
                    <span className={`text-xs font-semibold ${q.completed ? "line-through text-[#69786F]" : ""}`}>
                      {q.title}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-[4px] font-mono text-[10px] font-extrabold uppercase bg-violet-500/20 text-violet-700 dark:text-violet-300 border border-violet-500/30 shrink-0">
                    +{q.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Class Assignments */}
          <div className="rounded-[10px] bg-[#0E081F] border border-violet-500/30 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-violet-500/20">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Assigned Class Quizzes
                </h3>
              </div>
              <Link href="/dashboard/assignments" className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {assignedQuizzes.map((quiz, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-[6px] bg-[#140D2B] border border-cyan-500/20 hover:border-cyan-400/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">{quiz.title}</h4>
                    <p className="text-[11px] font-mono text-[#A0AEA5] mt-0.5">
                      {quiz.teacher} &bull; {quiz.questions} Questions
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-[3px] font-mono text-[10px] font-bold uppercase ${
                        quiz.urgent
                          ? "bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/40"
                          : "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40"
                      }`}
                    >
                      {quiz.dueIn}
                    </span>
                    <Link href="/dashboard/assignments">
                      <Button size="sm" className="h-7 px-3 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/30 border border-cyan-400/40 font-mono text-[10px] uppercase font-bold">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Leaderboard Podium Snapshot & Badges */}
        <div className="space-y-6">
          {/* Podium Snapshot */}
          <div className="rounded-[10px] bg-[#0E081F] border border-violet-500/30 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-violet-500/20">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-500 dark:text-amber-400" />
                <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                  Class Podium
                </h3>
              </div>
              <Link href="/dashboard/leaderboard" className="text-xs font-mono text-violet-600 dark:text-violet-300 hover:underline">
                Full Podium &rarr;
              </Link>
            </div>

            <div className="space-y-2">
              {leaderboardTop3.map((entry) => (
                <div
                  key={entry.rank}
                  className={`p-3 rounded-[6px] border flex items-center justify-between font-mono text-xs ${
                    entry.isMe
                      ? "bg-gradient-to-r from-violet-100 to-cyan-100 dark:from-violet-900/40 dark:to-cyan-900/40 border-cyan-400/60 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                      : "bg-[#140D2B] border-violet-500/15"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{entry.crown}</span>
                    <span className={`font-bold ${entry.isMe ? "text-cyan-700 dark:text-cyan-300" : "text-slate-900 dark:text-white"}`}>
                      {entry.name}
                    </span>
                  </div>
                  <span className="font-extrabold text-violet-700 dark:text-violet-300">{entry.xp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dorm Badges Unlocked */}
          <div className="rounded-[10px] bg-[#0E081F] border border-violet-500/30 p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-violet-500/20">
              <h3 className="font-display text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Unlocked Honours
              </h3>
              <span className="font-mono text-[10px] text-cyan-700 dark:text-cyan-300 font-bold">8 Badges</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[9px]">
              <div className="p-2.5 rounded-[6px] bg-[#140D2B] border border-violet-500/20 space-y-1">
                <span className="text-xl block">⚡</span>
                <span className="text-violet-700 dark:text-violet-300 font-bold block">Speed Demon</span>
              </div>
              <div className="p-2.5 rounded-[6px] bg-[#140D2B] border border-violet-500/20 space-y-1">
                <span className="text-xl block">🦉</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-bold block">Night Owl</span>
              </div>
              <div className="p-2.5 rounded-[6px] bg-[#140D2B] border border-violet-500/20 space-y-1">
                <span className="text-xl block">🎯</span>
                <span className="text-amber-700 dark:text-amber-300 font-bold block">Flawless 100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

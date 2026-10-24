"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Clock,
  Award,
  Plus,
  Swords,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Megaphone,
  School,
  Check,
  ChevronRight,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherPage() {
  const [activeTab, setActiveTab] = useState<"cohorts" | "queue" | "feed">("cohorts");

  const stats = [
    {
      title: "Active Students",
      value: "128",
      subtext: "Across 4 course sections",
      change: "+6 this month",
      isPositive: true,
      icon: <Users className="h-4 w-4 text-indigo-400" />,
      border: "border-indigo-500/20",
    },
    {
      title: "Classroom Quizzes",
      value: "14",
      subtext: "8 published, 6 drafts",
      change: "+2 this week",
      isPositive: true,
      icon: <BookOpen className="h-4 w-4 text-indigo-400" />,
      border: "border-indigo-500/20",
    },
    {
      title: "Pending Evaluations",
      value: "8",
      subtext: "Subjective essays to grade",
      change: "Action required",
      isPositive: false,
      icon: <Clock className="h-4 w-4 text-amber-400" />,
      border: "border-amber-500/30",
    },
    {
      title: "Average Cohort Mastery",
      value: "84.2%",
      subtext: "Class median accuracy",
      change: "+3.2% gain",
      isPositive: true,
      icon: <Award className="h-4 w-4 text-rose-400" />,
      border: "border-rose-500/20",
    },
  ];

  const cohorts = [
    {
      id: "sec-12a",
      name: "AP Chemistry — Section 12-A",
      students: 34,
      mastery: 86,
      status: "Excelling",
      recentTopic: "Thermodynamics & Reaction Kinetics",
      accent: "text-indigo-400",
      barColor: "bg-indigo-500",
    },
    {
      id: "sec-12b",
      name: "Advanced Physics — Section 12-B",
      students: 28,
      mastery: 79,
      status: "Review Required",
      recentTopic: "Electromagnetism & Wave Mechanics",
      accent: "text-amber-400",
      barColor: "bg-amber-500",
    },
    {
      id: "sec-10a",
      name: "Foundations of STEM — Section 10-A",
      students: 36,
      mastery: 91,
      status: "Mastered",
      recentTopic: "Stoichiometry & Atomic Orbitals",
      accent: "text-rose-400",
      barColor: "bg-rose-500",
    },
    {
      id: "sec-11a",
      name: "Organic Chemistry Lab — Section 11-A",
      students: 30,
      mastery: 83,
      status: "On Track",
      recentTopic: "Alkanes & Functional Groups",
      accent: "text-sky-400",
      barColor: "bg-sky-500",
    },
  ];

  const triageQueue = [
    {
      student: "Aarav Sharma",
      section: "Section 12-A",
      quiz: "Thermodynamics Midterm Free Response",
      submitted: "24 mins ago",
      scoreSuggestion: "9/10 (AI Evaluated)",
    },
    {
      student: "Meera Patel",
      section: "Section 12-B",
      quiz: "Magnetic Induction Lab Explanation",
      submitted: "1 hour ago",
      scoreSuggestion: "7.5/10 (Needs Review)",
    },
    {
      student: "David Miller",
      section: "Section 10-A",
      quiz: "Atomic Structure Concept Check",
      submitted: "2 hours ago",
      scoreSuggestion: "10/10 (Auto-Scored)",
    },
  ];

  const submissionFeed = [
    { student: "Ananya Sharma", quiz: "Reaction Kinetics Quiz", score: "94%", time: "10 mins ago" },
    { student: "Rohan Gupta", quiz: "Thermodynamics Concept Drill", score: "88%", time: "35 mins ago" },
    { student: "Chloe Zhao", quiz: "Wave Interference Sprint", score: "92%", time: "1 hour ago" },
    { student: "Liam Smith", quiz: "Stoichiometry Diagnostics", score: "76%", time: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Millennial Productivity Masthead (Warm Indigo & Refined Slate) */}
      <div className="relative overflow-hidden rounded-[10px] bg-[#0B0F19] border border-indigo-500/25 p-6 sm:p-8 shadow-[0_0_35px_rgba(99,102,241,0.08)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(99,102,241,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono text-[10px] font-bold uppercase tracking-widest">
                <School className="w-3 h-3 text-indigo-400" />
                Faculty Mentor Console // Academic Session 2026
              </span>
              <span className="text-[#64748B]">&bull;</span>
              <span className="font-mono text-xs text-[#94A3B8]">4 Active Cohorts</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Classroom & Assessment Orchestrator
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              Plan and publish curriculum assessments, review student submissions in real time, and launch synchronized class arena showdowns.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/dashboard/quizzes/builder">
              <Button className="h-10 px-5 rounded-[6px] bg-indigo-600 text-white hover:bg-indigo-500 font-medium text-xs tracking-wider shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all">
                <Plus className="mr-1.5 h-4 w-4" />
                Create Assessment
              </Button>
            </Link>
            <Link href="/live/arena">
              <Button
                variant="outline"
                className="h-10 px-4 rounded-[6px] border-rose-500/30 bg-[#0E1719] text-rose-300 hover:border-rose-400 hover:text-rose-200 text-xs font-semibold"
              >
                <Swords className="mr-1.5 h-3.5 w-3.5" />
                Live Class Arena
              </Button>
            </Link>
            <Link href="/teacher/reports">
              <Button
                variant="outline"
                className="h-10 px-4 rounded-[6px] border-slate-700 bg-[#0F172A] text-slate-300 hover:text-white text-xs font-medium"
              >
                <BarChart3 className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                Gradebook
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Focused Productivity Metric Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-4 rounded-[8px] bg-[#0B0F19] border ${stat.border} hover:border-indigo-500/40 transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                {stat.title}
              </span>
              <div className="p-1 rounded-[4px] bg-slate-800/60">{stat.icon}</div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">{stat.subtext}</p>
              </div>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-medium ${
                  stat.isPositive
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Action Triage Queue (Items Needing Grading/Evaluation) */}
      <div className="rounded-[8px] bg-[#0B0F19] border border-amber-500/30 p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Action Triage Queue (Pending Evaluations)
            </h3>
          </div>
          <span className="font-mono text-[11px] text-amber-400 font-bold">
            3 items awaiting approval
          </span>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {triageQueue.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-[6px] bg-[#101626] border border-slate-800 hover:border-amber-500/40 transition-all space-y-2"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-xs font-bold text-[#F8FAFC]">{item.student}</h4>
                  <span className="text-[10px] font-mono text-indigo-400">{item.section}</span>
                </div>
                <span className="text-[9px] font-mono text-[#64748B]">{item.submitted}</span>
              </div>
              <p className="text-[11px] text-[#94A3B8] line-clamp-1">{item.quiz}</p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[10px] font-mono text-amber-300">{item.scoreSuggestion}</span>
                <Button size="sm" className="h-6 px-2 bg-indigo-600/30 text-indigo-300 hover:bg-indigo-600 hover:text-white text-[10px] font-medium rounded-[3px]">
                  Review &rarr;
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Active Cohorts & Real-Time Feed Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Cohort Performance Cards */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-3 bg-indigo-500 rounded-[1px]" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
                Classroom Sections Overview
              </h2>
            </div>
            <Link href="/dashboard/classes" className="text-xs font-mono text-indigo-400 hover:underline">
              Manage Rosters &rarr;
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {cohorts.map((cohort) => (
              <div
                key={cohort.id}
                className="p-4 rounded-[8px] bg-[#0B0F19] border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#F8FAFC]">{cohort.name}</h3>
                    <span className={`text-[10px] font-mono font-bold ${cohort.accent}`}>
                      {cohort.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#64748B] mt-1">
                    Current Module: <span className="text-[#94A3B8]">{cohort.recentTopic}</span>
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-[#64748B]">{cohort.students} Enrolled</span>
                    <span className="text-[#F8FAFC] font-bold">{cohort.mastery}% Mastery</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${cohort.barColor} rounded-full`} style={{ width: `${cohort.mastery}%` }} />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <Link href={`/dashboard/assignments?section=${cohort.id}`}>
                    <Button size="sm" variant="outline" className="h-7 px-3 border-slate-700 text-xs text-[#94A3B8] hover:text-white">
                      Assign Quiz
                    </Button>
                  </Link>
                  <Link href={`/dashboard/classes`} className="text-[11px] text-indigo-400 hover:underline">
                    Class Hub &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Real-Time Submissions Feed */}
        <div className="rounded-[8px] bg-[#0B0F19] border border-slate-800 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Live Submission Stream
            </h3>
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
          </div>

          <div className="space-y-3">
            {submissionFeed.map((sub, i) => (
              <div
                key={i}
                className="p-2.5 rounded-[4px] bg-[#101626] border border-slate-850 flex items-center justify-between text-xs"
              >
                <div>
                  <h5 className="font-semibold text-[#F8FAFC]">{sub.student}</h5>
                  <p className="text-[10px] text-[#64748B] mt-0.5">{sub.quiz}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-rose-400">{sub.score}</span>
                  <span className="block text-[9px] text-[#64748B]">{sub.time}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800">
            <Link href="/dashboard/calendar">
              <Button variant="ghost" className="w-full justify-between h-8 text-xs text-indigo-400 hover:text-indigo-300">
                View Academic Calendar <ArrowUpRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

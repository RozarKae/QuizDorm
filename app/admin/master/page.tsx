"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  HelpCircle,
  Database,
  Sparkles,
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowUpRight,
  Trophy,
  Activity,
  FileText,
  ScanText,
  Search,
  Plus,
  Layers,
  Cpu,
  TrendingUp,
  Brain,
  Award,
  Clock,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MasterAdminPage() {
  const stats = [
    {
      title: "Knowledge Matrix Questions",
      value: "535+",
      subtext: "Across 18 academic matrices",
      change: "+48 this week",
      isPositive: true,
      icon: <Database className="h-4 w-4 text-purple-400" />,
      border: "border-purple-500/20",
    },
    {
      title: "The Dorm Vault Quizzes",
      value: "24",
      subtext: "Active timed & adaptive trials",
      change: "100% Verified",
      isPositive: true,
      icon: <HelpCircle className="h-4 w-4 text-fuchsia-400" />,
      border: "border-purple-500/20",
    },
    {
      title: "Active Subscribers",
      value: "1,840",
      subtext: "Independent scholars & contenders",
      change: "+18% MoM",
      isPositive: true,
      icon: <Users className="h-4 w-4 text-amber-400" />,
      border: "border-amber-500/20",
    },
    {
      title: "Quality Gate Verification",
      value: "99.4%",
      subtext: "0 critical factual hallucinations",
      change: "Optimal Quality",
      isPositive: true,
      icon: <ShieldCheck className="h-4 w-4 text-teal-400" />,
      border: "border-teal-500/20",
    },
  ];

  const primaryActions = [
    {
      title: "Subscribers & Scholar Roster",
      description: "Manage individual scholar memberships, subscription tiers, tier quotas, and individual streak performance.",
      href: "/admin/master/subscribers",
      icon: <Users className="h-4 w-4 text-amber-400" />,
      actionLabel: "Manage Subscribers",
      badge: "Subscriber Governance",
      accent: "text-amber-300",
      border: "border-amber-500/25",
    },
    {
      title: "The Dorm Vault (Quiz Library)",
      description: "Publish, edit, and organize verified quizzes, multi-round olympiads, and timed decathlon assessments.",
      href: "/dashboard/quizzes",
      icon: <HelpCircle className="h-4 w-4 text-purple-400" />,
      actionLabel: "Open Vault",
      badge: "24 Published",
      accent: "text-purple-300",
      border: "border-purple-500/25",
    },
    {
      title: "Curriculum Knowledge Matrix",
      description: "Explore and curate verified question bank items, Bloom's taxonomy tags, peer review notes, and source citations.",
      href: "/dashboard/questions",
      icon: <Database className="h-4 w-4 text-fuchsia-400" />,
      actionLabel: "Question Matrix",
      badge: "535+ Items",
      accent: "text-fuchsia-300",
      border: "border-fuchsia-500/25",
    },
    {
      title: "Assessment Architect",
      description: "Author new multi-modal quizzes with AI-assisted prompt synthesis, distractor generation, and step explanations.",
      href: "/dashboard/quizzes/builder",
      icon: <Sparkles className="h-4 w-4 text-teal-400" />,
      actionLabel: "Quiz Builder",
      badge: "AI Powered",
      accent: "text-teal-300",
      border: "border-teal-500/25",
    },
    {
      title: "Quality Gate & Fact Audit",
      description: "Review automated AI hallucination checks, member feedback flags, citation validity, and curriculum standards.",
      href: "/dashboard/quality",
      icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
      actionLabel: "Quality Audit",
      badge: "99.4% Clean",
      accent: "text-emerald-300",
      border: "border-emerald-500/25",
    },
    {
      title: "Omni-Curriculum AI Synthesizer",
      description: "Extract high-yield questions directly from textbook PDFs, handwritten notes, lecture diagrams, and syllabus documents.",
      href: "/dashboard/ocr",
      icon: <ScanText className="h-4 w-4 text-cyan-400" />,
      actionLabel: "Extract from Docs",
      badge: "Vision OCR",
      accent: "text-cyan-300",
      border: "border-cyan-500/25",
    },
  ];

  const curriculumMatrices = [
    {
      discipline: "Cognitive IQ & Logical Matrix",
      code: "MAT-IQ",
      questionsCount: 112,
      difficulty: "Advanced",
      quizzesActive: 6,
      accuracyRate: "99.8%",
      status: "Verified",
    },
    {
      discipline: "Quantum Physics & Thermodynamics",
      code: "SCI-PHYS",
      questionsCount: 94,
      difficulty: "Mastery",
      quizzesActive: 4,
      accuracyRate: "99.2%",
      status: "Verified",
    },
    {
      discipline: "Clinical Anatomy & Pathology",
      code: "MED-CLIN",
      questionsCount: 148,
      difficulty: "Clinical Professional",
      quizzesActive: 5,
      accuracyRate: "99.6%",
      status: "Verified",
    },
    {
      discipline: "Algorithmic Engineering & Discrete Math",
      code: "CS-ALGO",
      questionsCount: 88,
      difficulty: "Competitive",
      quizzesActive: 4,
      accuracyRate: "98.9%",
      status: "Verified",
    },
    {
      discipline: "Global Geopolitics & World History",
      code: "HUM-GEO",
      questionsCount: 93,
      difficulty: "Standard to High",
      quizzesActive: 5,
      accuracyRate: "99.5%",
      status: "Verified",
    },
  ];

  const recentVaultQuizzes = [
    {
      title: "Grand Dorm Decathlon: Multi-Disciplinary Sprint",
      questions: 40,
      timeLimit: "30 mins",
      participants: 642,
      status: "Live & Active",
      avgScore: "78.4%",
    },
    {
      title: "Quantum Physics & Mechanics Mastery Trial",
      questions: 25,
      timeLimit: "25 mins",
      participants: 419,
      status: "Live & Active",
      avgScore: "69.1%",
    },
    {
      title: "High-Yield Clinical Pharmacology Diagnostic",
      questions: 50,
      timeLimit: "45 mins",
      participants: 312,
      status: "Live & Active",
      avgScore: "81.2%",
    },
    {
      title: "Cognitive IQ: Pattern Matrix & Lateral Reasoning",
      questions: 30,
      timeLimit: "20 mins",
      participants: 890,
      status: "Featured Arena",
      avgScore: "74.8%",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Alexandria Editorial Studio Masthead (Royal Midnight Amethyst & Gold) */}
      <div className="relative overflow-hidden rounded-[10px] bg-[#0B0716] border border-purple-500/30 p-6 sm:p-8 shadow-[0_0_40px_rgba(168,85,247,0.1)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_70%)] pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-[radial-gradient(circle,rgba(234,179,8,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[4px] bg-purple-500/15 border border-purple-500/35 text-purple-300 font-mono text-[10px] font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <Brain className="w-3.5 h-3.5 text-purple-300" />
                Master Admin Portal // Academic Directorate
              </span>
              <span className="text-[#64748B]">&bull;</span>
              <span className="font-mono text-xs text-purple-200/70">Content & Scholar OS</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F8FAFC]">
              Curriculum, Quizzes & Subscribers
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Curate the verified Curriculum Knowledge Matrix, publish decathlon assessments to The Dorm Vault, and govern independent subscriber cohorts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/admin/master/subscribers">
              <Button className="h-10 px-5 rounded-[4px] bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                <Users className="mr-2 h-3.5 w-3.5" />
                Subscribers Directory
              </Button>
            </Link>
            <Link href="/dashboard/quizzes/builder">
              <Button
                variant="outline"
                className="h-10 px-5 rounded-[4px] border-purple-500/30 bg-[#160E2A] text-purple-200 hover:border-purple-400 hover:text-white font-mono text-xs uppercase font-bold tracking-wider"
              >
                <Plus className="mr-2 h-3.5 w-3.5" />
                Create Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Platform Stats HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`p-4 rounded-[8px] bg-[#0B0716] border ${stat.border} hover:border-purple-500/40 transition-all flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-purple-500/10">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-purple-200/70">
                {stat.title}
              </span>
              <div className="p-1 rounded-[4px] bg-purple-950/40 border border-purple-500/20">{stat.icon}</div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#A0AEA5] mt-0.5">{stat.subtext}</p>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Core Governance Workspaces */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-3 bg-purple-400 rounded-[1px] shadow-[0_0_6px_#A855F7]" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
              Master Admin Control Panels
            </h2>
          </div>
          <span className="font-mono text-[11px] text-[#A0AEA5]">
            Curriculum & Contender Directorate
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primaryActions.map((action) => (
            <div
              key={action.title}
              className={`p-5 rounded-[8px] bg-[#0B0716] border ${action.border} hover:border-purple-400/50 transition-all flex flex-col justify-between group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-[6px] bg-purple-950/40 border border-purple-500/20">
                    {action.icon}
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider font-semibold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                    {action.badge}
                  </span>
                </div>
                <h3 className={`text-sm font-bold text-[#F8FAFC] group-hover:${action.accent} transition-colors`}>
                  {action.title}
                </h3>
                <p className="text-xs text-[#A0AEA5] mt-1.5 leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-purple-500/10 flex items-center justify-between">
                <Link
                  href={action.href}
                  className={`inline-flex items-center text-xs font-mono font-semibold ${action.accent} hover:underline`}
                >
                  {action.actionLabel}
                  <ArrowUpRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Curriculum Knowledge Matrices & Vault Overview */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Academic Matrices */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-[8px] bg-[#0B0716] border border-purple-500/25 p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/15">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-purple-400 rounded-[1px]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
                  Curriculum Knowledge Matrices (High-Yield Distribution)
                </h2>
              </div>
              <Link
                href="/dashboard/questions"
                className="font-mono text-xs text-purple-300 hover:underline flex items-center gap-1"
              >
                Inspect All Items <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {curriculumMatrices.map((matrix) => (
                <div
                  key={matrix.code}
                  className="p-3.5 rounded-[6px] bg-[#120C24] border border-purple-500/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-purple-300 px-1.5 py-0.2 rounded bg-purple-500/20 border border-purple-500/30">
                        {matrix.code}
                      </span>
                      <h4 className="text-sm font-semibold text-[#F8FAFC]">{matrix.discipline}</h4>
                    </div>
                    <p className="font-mono text-[11px] text-[#A0AEA5] mt-1">
                      {matrix.questionsCount} verified questions &bull; {matrix.quizzesActive} active dorm quizzes
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <div className="text-right">
                      <span className="text-[#64748B] block text-[10px] uppercase">Tier</span>
                      <span className="text-[#F8FAFC] font-bold">{matrix.difficulty}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#64748B] block text-[10px] uppercase">Accuracy</span>
                      <span className="text-emerald-400 font-bold">{matrix.accuracyRate}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                      {matrix.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: The Dorm Vault Live Quizzes */}
        <div className="space-y-4">
          <div className="rounded-[8px] bg-[#0B0716] border border-purple-500/25 p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-purple-500/15">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-fuchsia-400 rounded-[1px]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
                  The Dorm Vault Highlights
                </h2>
              </div>
              <Link
                href="/dashboard/quizzes"
                className="font-mono text-xs text-purple-300 hover:underline"
              >
                Vault &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {recentVaultQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="p-3 rounded-[6px] bg-[#120C24] border border-purple-500/15 space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[#F8FAFC] leading-snug">
                      {quiz.title}
                    </h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-purple-500/20 text-purple-300 shrink-0 border border-purple-500/30">
                      {quiz.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A0AEA5] pt-1 border-t border-purple-500/10">
                    <span>{quiz.questions} Qs &bull; {quiz.timeLimit}</span>
                    <span className="text-purple-300 font-bold">{quiz.participants} contender runs</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-purple-500/15">
              <Link href="/admin/master/subscribers">
                <Button
                  variant="outline"
                  className="w-full h-9 border-purple-500/30 bg-[#160E2A] text-purple-200 hover:text-white font-mono text-xs uppercase font-bold"
                >
                  <Users className="mr-2 h-3.5 w-3.5 text-purple-400" />
                  View Subscriber Cohorts
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

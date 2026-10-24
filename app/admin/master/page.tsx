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
  const [activeTab, setActiveTab] = useState<"overview" | "matrices" | "vault">("overview");

  const stats = [
    {
      title: "Knowledge Matrix Questions",
      value: "535+",
      subtext: "Across 18 academic matrices",
      change: "+48 this week",
      isPositive: true,
      icon: <Database className="h-4 w-4 text-[#65F59A]" />,
    },
    {
      title: "The Dorm Vault Quizzes",
      value: "24",
      subtext: "Active timed & adaptive trials",
      change: "100% Verified",
      isPositive: true,
      icon: <HelpCircle className="h-4 w-4 text-[#38D9B0]" />,
    },
    {
      title: "Active Subscribers",
      value: "1,840",
      subtext: "Independent scholars & contenders",
      change: "+18% MoM",
      isPositive: true,
      icon: <Users className="h-4 w-4 text-[#65F59A]" />,
    },
    {
      title: "Quality Gate Verification",
      value: "99.4%",
      subtext: "0 critical factual hallucinations",
      change: "Optimal Quality",
      isPositive: true,
      icon: <ShieldCheck className="h-4 w-4 text-[#38D9B0]" />,
    },
  ];

  const primaryActions = [
    {
      title: "Subscribers & Scholar Roster",
      description: "Manage individual scholar memberships, subscription tiers, tier quotas, and individual streak performance.",
      href: "/admin/master/subscribers",
      icon: <Users className="h-4 w-4 text-[#65F59A]" />,
      actionLabel: "Manage Subscribers",
      badge: "Core Governance",
    },
    {
      title: "The Dorm Vault (Quiz Library)",
      description: "Publish, edit, and organize verified quizzes, multi-round olympiads, and timed decathlon assessments.",
      href: "/dashboard/quizzes",
      icon: <HelpCircle className="h-4 w-4 text-[#38D9B0]" />,
      actionLabel: "Open Vault",
      badge: "24 Published",
    },
    {
      title: "Curriculum Knowledge Matrix",
      description: "Explore and curate verified question bank items, Bloom's taxonomy tags, peer review notes, and source citations.",
      href: "/dashboard/questions",
      icon: <Database className="h-4 w-4 text-[#65F59A]" />,
      actionLabel: "Question Matrix",
      badge: "535+ Items",
    },
    {
      title: "Assessment Architect",
      description: "Author new multi-modal quizzes with AI-assisted prompt synthesis, distractor generation, and step explanations.",
      href: "/dashboard/quizzes/builder",
      icon: <Sparkles className="h-4 w-4 text-[#38D9B0]" />,
      actionLabel: "Quiz Builder",
      badge: "AI Powered",
    },
    {
      title: "Quality Gate & Fact Audit",
      description: "Review automated AI hallucination checks, member feedback flags, citation validity, and curriculum standards.",
      href: "/dashboard/quality",
      icon: <ShieldCheck className="h-4 w-4 text-[#65F59A]" />,
      actionLabel: "Quality Audit",
      badge: "99.4% Clean",
    },
    {
      title: "Omni-Curriculum AI Synthesizer",
      description: "Extract high-yield questions directly from textbook PDFs, handwritten notes, lecture diagrams, and syllabus documents.",
      href: "/dashboard/ocr",
      icon: <ScanText className="h-4 w-4 text-[#38D9B0]" />,
      actionLabel: "Extract from Docs",
      badge: "Vision OCR",
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
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(56,217,176,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(56,217,176,0.1)] border border-[rgba(56,217,176,0.25)] text-[#38D9B0] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38D9B0] animate-pulse" />
                Master Admin Portal // Academic Directorate
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">Content & Scholar OS</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Curriculum, Quizzes & Subscribers
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Exclusive governance over individual subscribers, The Dorm Vault quizzes, and the verified Curriculum Knowledge Matrix.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/admin/master/subscribers">
              <Button className="h-10 px-5 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,154,0.25)]">
                <Users className="mr-2 h-3.5 w-3.5" />
                Subscribers Directory
              </Button>
            </Link>
            <Link href="/dashboard/quizzes/builder">
              <Button
                variant="outline"
                className="h-10 px-5 rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#F2F7F3] hover:border-[#65F59A]/50 hover:text-[#65F59A] font-mono text-xs uppercase font-bold tracking-wider"
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
            className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(160,190,170,0.28)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
                {stat.title}
              </span>
              <div className="p-1 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F7F3] tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#A0AEA5] mt-0.5 font-sans">{stat.subtext}</p>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.25)]">
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
            <div className="w-1.5 h-3 bg-[#65F59A] rounded-[1px] shadow-[0_0_6px_#65F59A]" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
              Master Admin Control Panels
            </h2>
          </div>
          <span className="font-mono text-[11px] text-[#69786F]">
            Dedicated Governance for Content & Subscribers
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {primaryActions.map((action) => (
            <div
              key={action.title}
              className="p-5 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(101,245,154,0.3)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
                    {action.icon}
                  </div>
                  <span className="px-2 py-0.5 rounded-[2px] font-mono text-[9px] uppercase tracking-wider font-semibold bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.25)]">
                    {action.badge}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors">
                  {action.title}
                </h3>
                <p className="text-xs text-[#A0AEA5] mt-1.5 leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(160,190,170,0.1)] flex items-center justify-between">
                <Link
                  href={action.href}
                  className="inline-flex items-center text-xs font-mono font-semibold text-[#65F59A] hover:underline"
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
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#38D9B0] rounded-[1px] shadow-[0_0_6px_#38D9B0]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Curriculum Knowledge Matrices (High-Yield Distribution)
                </h2>
              </div>
              <Link
                href="/dashboard/questions"
                className="font-mono text-xs text-[#65F59A] hover:underline flex items-center gap-1"
              >
                Inspect All Items <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {curriculumMatrices.map((matrix) => (
                <div
                  key={matrix.code}
                  className="p-3.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] font-bold text-[#38D9B0] px-1.5 py-0.2 rounded bg-[rgba(56,217,176,0.1)] border border-[rgba(56,217,176,0.2)]">
                        {matrix.code}
                      </span>
                      <h4 className="text-sm font-semibold text-[#F2F7F3]">{matrix.discipline}</h4>
                    </div>
                    <p className="font-mono text-[11px] text-[#A0AEA5] mt-1">
                      {matrix.questionsCount} verified questions &bull; {matrix.quizzesActive} active dorm quizzes
                    </p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                    <div className="text-right">
                      <span className="text-[#69786F] block text-[10px] uppercase">Tier</span>
                      <span className="text-[#F2F7F3] font-bold">{matrix.difficulty}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[#69786F] block text-[10px] uppercase">Accuracy</span>
                      <span className="text-[#65F59A] font-bold">{matrix.accuracyRate}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.2)]">
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
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#65F59A] rounded-[1px] shadow-[0_0_6px_#65F59A]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                  The Dorm Vault Highlights
                </h2>
              </div>
              <Link
                href="/dashboard/quizzes"
                className="font-mono text-xs text-[#65F59A] hover:underline"
              >
                Vault &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {recentVaultQuizzes.map((quiz, index) => (
                <div
                  key={index}
                  className="p-3 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-semibold text-[#F2F7F3] leading-snug">
                      {quiz.title}
                    </h4>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono uppercase bg-[rgba(101,245,154,0.1)] text-[#65F59A] shrink-0 border border-[rgba(101,245,154,0.2)]">
                      {quiz.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#A0AEA5] pt-1 border-t border-[rgba(160,190,170,0.06)]">
                    <span>{quiz.questions} Qs &bull; {quiz.timeLimit}</span>
                    <span className="text-[#65F59A] font-bold">{quiz.participants} contender runs</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[rgba(160,190,170,0.1)]">
              <Link href="/admin/master/subscribers">
                <Button
                  variant="outline"
                  className="w-full h-9 border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#38D9B0] hover:text-[#65F59A] font-mono text-xs uppercase font-bold"
                >
                  <Users className="mr-2 h-3.5 w-3.5" />
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

"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileQuestion,
  Plus,
  Play,
  Trophy,
  BarChart3,
  BookOpen,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Activity,
  Cpu,
  GraduationCap,
} from "lucide-react";

export default function DashboardHomePage() {
  const suites = [
    {
      category: "Assessment & Curricula",
      items: [
        { title: "Question Bank", desc: "535 validated items across 18 domains", href: "/dashboard/questions", badge: "535 ITEMS" },
        { title: "Assessment Builder", desc: "Interactive composer with LaTeX & AI drafting", href: "/dashboard/quizzes/builder", badge: "BUILDER" },
        { title: "Quiz Delivery Engine", desc: "Deterministic timer & auto-scoring runtime", href: "/dashboard/quizzes", badge: "PLAYER" },
        { title: "Examination Platform", desc: "Proctored high-stakes terminal (Phase 4.2)", href: "/dashboard/examination", badge: "SECURE" },
      ],
    },
    {
      category: "Real-Time Arenas & Analytics",
      items: [
        { title: "Live Competition Arena", desc: "Synchronized multiplayer tournaments with room PINs", href: "/dashboard/competitions", badge: "LIVE" },
        { title: "Editorial Analytics", desc: "Topic weakness heatmaps & cohort performance", href: "/dashboard/analytics", badge: "REPORTS" },
        { title: "Digital Classroom Suite", desc: "Live instruction & collaborative workspaces", href: "/dashboard/classroom", badge: "CLASSROOM" },
        { title: "AI Teaching Assistant", desc: "Automated grading & instructional recommendations", href: "/dashboard/ai-assistant", badge: "AI" },
      ],
    },
    {
      category: "Institutional Infrastructure",
      items: [
        { title: "Academic Administration ERP", desc: "Multi-campus student records & compliance", href: "/dashboard/administration", badge: "ERP" },
        { title: "LMS Platform", desc: "Syllabus mapping & asynchronous coursework", href: "/dashboard/lms", badge: "LMS" },
        { title: "Global Certifications", desc: "Cryptographically verifiable diplomas & transcripts", href: "/dashboard/certifications", badge: "VERIFIED" },
        { title: "Global EduCloud OS", desc: "Cluster telemetry, multi-region sync & backups", href: "/dashboard/cloud-ops", badge: "INFRA" },
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Editorial Masthead Dispatch */}
      <div className="border border-border bg-card p-6 sm:p-8 rounded-[3px] space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
              <span className="w-1.5 h-1.5 bg-[#2855F5] rounded-full animate-pulse" />
              <span>SYSTEM DISPATCH // DESK TERMINAL</span>
              <span>—</span>
              <span className="text-[#2855F5] font-bold">OPERATIONAL</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-foreground">
              Assessment Operations Hub
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Centralized command center for curriculum authoring, real-time tournament execution, institutional grading, and verifiable assessment delivery.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link href="/dashboard/questions">
              <Button variant="outline" size="sm" className="font-mono text-xs tracking-wider rounded-[3px]">
                <FileQuestion className="w-3.5 h-3.5 mr-1.5 text-[#2855F5]" /> QUESTION BANK
              </Button>
            </Link>
            <Link href="/create-quiz">
              <Button size="sm" className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs tracking-wider rounded-[3px]">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> COMPOSE QUIZ
              </Button>
            </Link>
          </div>
        </div>

        {/* Precision Telemetry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">QUESTION BANK</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#2855F5]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">535</div>
            <p className="text-[10px] font-mono text-muted-foreground">100% verified & categorized</p>
          </div>

          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">CURRICULAR DOMAINS</span>
              <BookOpen className="w-3.5 h-3.5 text-[#2855F5]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">18</div>
            <p className="text-[10px] font-mono text-muted-foreground">Full domain coverage</p>
          </div>

          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">ACTIVE TOURNAMENTS</span>
              <Trophy className="w-3.5 h-3.5 text-[#E85D3F]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">3</div>
            <p className="text-[10px] font-mono text-muted-foreground">Real-time sync enabled</p>
          </div>

          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">DELIVERY LATENCY</span>
              <Activity className="w-3.5 h-3.5 text-[#2855F5]" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-foreground tracking-tight">&lt;250ms</div>
            <p className="text-[10px] font-mono text-muted-foreground">Deterministic auto-save</p>
          </div>
        </div>
      </div>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/quizzes"
          className="group block border border-border bg-card p-5 rounded-[3px] hover:border-[#2855F5] transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 rounded-[2px] bg-[#2855F5]/10 border border-[#2855F5]/20 flex items-center justify-center text-[#2855F5] mb-3">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#2855F5] transition-colors" />
          </div>
          <h3 className="text-sm font-bold font-display text-foreground group-hover:text-[#2855F5] transition-colors">
            Launch Practice Assessment
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Take timed adaptive mock tests with randomized question order and immediate step-by-step scoring.
          </p>
        </Link>

        <Link
          href="/dashboard/competitions"
          className="group block border border-border bg-card p-5 rounded-[3px] hover:border-[#2855F5] transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 rounded-[2px] bg-[#E85D3F]/10 border border-[#E85D3F]/20 flex items-center justify-center text-[#E85D3F] mb-3">
              <Trophy className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#2855F5] transition-colors" />
          </div>
          <h3 className="text-sm font-bold font-display text-foreground group-hover:text-[#2855F5] transition-colors">
            Live Competition Arena
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Join multiplayer tournaments via Room PIN code or host scheduled school-wide academic decathlons.
          </p>
        </Link>

        <Link
          href="/dashboard/analytics"
          className="group block border border-border bg-card p-5 rounded-[3px] hover:border-[#2855F5] transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="w-8 h-8 rounded-[2px] bg-[#2855F5]/10 border border-[#2855F5]/20 flex items-center justify-center text-[#2855F5] mb-3">
              <BarChart3 className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-[#2855F5] transition-colors" />
          </div>
          <h3 className="text-sm font-bold font-display text-foreground group-hover:text-[#2855F5] transition-colors">
            Performance Analytics
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Inspect cohort grade distribution, topic error heatmaps, and export verifiable instructional reports.
          </p>
        </Link>
      </div>

      {/* Platform Suites & Modules Sections */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#2855F5]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
              Institutional Platform Suites
            </h2>
          </div>
          <span className="text-[10px] font-mono text-muted-foreground">12 MODULES INTEGRATED</span>
        </div>

        <div className="space-y-6">
          {suites.map((suite, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-[#2855F5] font-bold">0{sIdx + 1} //</span>
                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                  {suite.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {suite.items.map((item, iIdx) => (
                  <Link
                    key={iIdx}
                    href={item.href}
                    className="group border border-border bg-card p-4 rounded-[3px] hover:border-[#2855F5] transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest rounded-[2px] px-1.5 py-0 border-border">
                          {item.badge}
                        </Badge>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#2855F5] transition-colors" />
                      </div>
                      <h3 className="text-xs font-bold font-display text-foreground group-hover:text-[#2855F5] transition-colors pt-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

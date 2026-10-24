"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
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
  Sparkles,
  Zap,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function DashboardHomePage() {
  const router = useRouter();
  const { role, isLoading } = useAuth();
  const [greeting, setGreeting] = useState("Welcome Back. Let's Make Progress.");

  useEffect(() => {
    if (!isLoading && role) {
      if (role === "admin") {
        router.replace("/admin");
      } else if (role === "institution" || role === "school") {
        router.replace("/school");
      } else if (role === "handler" || role === "teacher") {
        router.replace("/teacher");
      } else if (role === "member" || role === "subscriber" || role === "student") {
        router.replace("/student");
      }
    }
  }, [role, isLoading, router]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning. Let's Make Progress.");
    else if (hour < 18) setGreeting("Good Afternoon. Focus on What Matters.");
    else setGreeting("Good Evening. Ready for the Next Challenge?");
  }, []);

  const suites = [
    {
      category: "Quizzes & Question Banks",
      items: [
        { title: "Question Bank", desc: "535 validated items across 18 domains", href: "/dashboard/questions", badge: "535 ITEMS" },
        { title: "Quiz Builder", desc: "Interactive composer with LaTeX & AI drafting", href: "/dashboard/quizzes/builder", badge: "BUILDER" },
        { title: "Quiz Delivery Engine", desc: "Live timed quizzes with instant scores", href: "/dashboard/quizzes", badge: "PLAYER" },
        { title: "Examination Platform", desc: "Exam mode with focus lock & countdown", href: "/dashboard/examination", badge: "SECURE" },
      ],
    },
    {
      category: "Live Battles & Brain Stats",
      items: [
        { title: "Live Battle Arena", desc: "Synchronized multiplayer tournaments with room PINs", href: "/dashboard/competitions", badge: "LIVE" },
        { title: "Performance Analytics", desc: "Track topic accuracy, speed & weak spots", href: "/dashboard/analytics", badge: "STATS" },
        { title: "Digital Classroom Suite", desc: "Live instruction & collaborative workspaces", href: "/dashboard/classroom", badge: "CLASSROOM" },
        { title: "AI Study Coach", desc: "Automated grading & instructional recommendations", href: "/dashboard/tutor/planner", badge: "AI COACH" },
      ],
    },
    {
      category: "Campus & Dorm HQ",
      items: [
        { title: "Academic Administration ERP", desc: "Multi-campus student records & compliance", href: "/dashboard/administration", badge: "CAMPUS" },
        { title: "LMS Platform", desc: "Syllabus mapping & asynchronous coursework", href: "/dashboard/lms", badge: "LMS" },
        { title: "Global Certifications", desc: "Cryptographically verifiable diplomas & transcripts", href: "/dashboard/credentials", badge: "VERIFIED" },
        { title: "Global EduCloud OS", desc: "Cloud sync, device backups & offline mode", href: "/dashboard/cloud-ops", badge: "CLOUD" },
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Future OS Masthead Dispatch */}
      <FadeIn direction="up" delay={0.05}>
        <div className="border border-[rgba(160,190,170,0.18)] bg-[#0C1210] p-6 sm:p-8 rounded-[8px] space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle atmospheric glow in corner */}
          <div className="absolute top-0 right-0 w-80 h-40 bg-[radial-gradient(ellipse_at_top_right,rgba(101,245,154,0.1)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.12)] pb-6 relative z-10">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5]">
                <span className="w-2 h-2 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_10px_#65F59A]" />
                <span>ASSESSMENT OS // MISSION CONTROL</span>
                <span className="text-[#69786F]">—</span>
                <span className="text-[#65F59A] font-bold">OPERATIONAL</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-[#F2F7F3]">
                {greeting}
              </h1>
              <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
                Centralized command center for curriculum authoring, real-time tournament execution, institutional grading, and verifiable assessment delivery.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 relative z-10">
              <Link href="/dashboard/questions">
                <Button variant="outline" size="sm" className="font-mono text-xs tracking-wider rounded-[6px] border-[rgba(160,190,170,0.2)] bg-[#111B17] hover:bg-[#17251E] text-[#F2F7F3] hover:text-[#65F59A] transition-colors">
                  <FileQuestion className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> QUESTION BANK
                </Button>
              </Link>
              <Link href="/create-quiz">
                <Button size="sm" className="font-mono text-xs tracking-wider rounded-[6px] bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-bold shadow-[0_0_15px_rgba(101,245,154,0.3)] transition-all">
                  <Plus className="w-3.5 h-3.5 mr-1.5" /> COMPOSE QUIZ
                </Button>
              </Link>
            </div>
          </div>

          {/* Precision Telemetry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-1 relative z-10">
            <div className="border border-[rgba(160,190,170,0.14)] bg-[#111B17] p-4 rounded-[6px] space-y-1 hover:border-[#65F59A]/35 transition-all hover:-translate-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#69786F]">QUESTION BANK</span>
                <ShieldCheck className="w-3.5 h-3.5 text-[#65F59A]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F2F7F3] tracking-tight">535</div>
              <p className="text-[10px] font-mono text-[#A0AEA5]">100% verified & categorized</p>
            </div>

            <div className="border border-[rgba(160,190,170,0.14)] bg-[#111B17] p-4 rounded-[6px] space-y-1 hover:border-[#38D9B0]/35 transition-all hover:-translate-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#69786F]">CURRICULAR DOMAINS</span>
                <BookOpen className="w-3.5 h-3.5 text-[#38D9B0]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F2F7F3] tracking-tight">18</div>
              <p className="text-[10px] font-mono text-[#A0AEA5]">Full domain coverage</p>
            </div>

            <div className="border border-[rgba(160,190,170,0.14)] bg-[#111B17] p-4 rounded-[6px] space-y-1 hover:border-[#65F59A]/35 transition-all hover:-translate-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#69786F]">ACTIVE ARENAS</span>
                <Trophy className="w-3.5 h-3.5 text-[#65F59A]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F2F7F3] tracking-tight">3</div>
              <p className="text-[10px] font-mono text-[#A0AEA5]">Real-time sync enabled</p>
            </div>

            <div className="border border-[rgba(160,190,170,0.14)] bg-[#111B17] p-4 rounded-[6px] space-y-1 hover:border-[#38D9B0]/35 transition-all hover:-translate-y-0.5 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#69786F]">DELIVERY LATENCY</span>
                <Activity className="w-3.5 h-3.5 text-[#38D9B0]" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F2F7F3] tracking-tight">&lt;250ms</div>
              <p className="text-[10px] font-mono text-[#A0AEA5]">Deterministic auto-save</p>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Quick Action Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/dashboard/quizzes"
          className="group block border border-[rgba(160,190,170,0.14)] bg-[#0C1210] p-5 rounded-[8px] hover:border-[#65F59A]/50 transition-all hover:bg-[#111B17] hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(101,245,154,0.1)]"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[rgba(101,245,154,0.12)] border border-[rgba(101,245,154,0.25)] flex items-center justify-center text-[#65F59A] mb-3 group-hover:scale-105 transition-transform">
              <Play className="w-4 h-4 fill-current" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#69786F] group-hover:text-[#65F59A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="text-sm font-bold font-display text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors">
            Launch Practice Assessment
          </h3>
          <p className="text-xs text-[#A0AEA5] mt-1.5 leading-relaxed">
            Take timed adaptive mock tests with randomized question order and immediate step-by-step scoring.
          </p>
        </Link>

        <Link
          href="/dashboard/competitions"
          className="group block border border-[rgba(160,190,170,0.14)] bg-[#0C1210] p-5 rounded-[8px] hover:border-[#38D9B0]/50 transition-all hover:bg-[#111B17] hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(56,217,176,0.1)]"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[rgba(56,217,176,0.12)] border border-[rgba(56,217,176,0.25)] flex items-center justify-center text-[#38D9B0] mb-3 group-hover:scale-105 transition-transform">
              <Trophy className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#69786F] group-hover:text-[#38D9B0] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="text-sm font-bold font-display text-[#F2F7F3] group-hover:text-[#38D9B0] transition-colors">
            Step Into the Live Arena
          </h3>
          <p className="text-xs text-[#A0AEA5] mt-1.5 leading-relaxed">
            Join multiplayer tournaments via Room PIN code or host scheduled school-wide academic decathlons.
          </p>
        </Link>

        <Link
          href="/dashboard/analytics"
          className="group block border border-[rgba(160,190,170,0.14)] bg-[#0C1210] p-5 rounded-[8px] hover:border-[#65F59A]/50 transition-all hover:bg-[#111B17] hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(101,245,154,0.1)]"
        >
          <div className="flex items-start justify-between">
            <div className="w-9 h-9 rounded-[6px] bg-[rgba(101,245,154,0.12)] border border-[rgba(101,245,154,0.25)] flex items-center justify-center text-[#65F59A] mb-3 group-hover:scale-105 transition-transform">
              <BarChart3 className="w-4 h-4" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#69786F] group-hover:text-[#65F59A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <h3 className="text-sm font-bold font-display text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors">
            Inspect Brain Stats & Weak Spots
          </h3>
          <p className="text-xs text-[#A0AEA5] mt-1.5 leading-relaxed">
            See student score trends, topic weak spots, and export grade breakdowns for your study squad.
          </p>
        </Link>
      </div>

      {/* Platform Suites & Modules Sections */}
      <div className="space-y-6 pt-2">
        <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.14)] pb-3">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-[#65F59A]" />
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-[#F2F7F3]">
              Institutional Platform Suites
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#69786F]">12 MODULES INTEGRATED</span>
        </div>

        <div className="space-y-6">
          {suites.map((suite, sIdx) => (
            <div key={sIdx} className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono text-[#65F59A] font-bold">0{sIdx + 1} //</span>
                <span className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
                  {suite.category}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {suite.items.map((item, iIdx) => (
                  <Link
                    key={iIdx}
                    href={item.href}
                    className="group border border-[rgba(160,190,170,0.14)] bg-[#0C1210] p-4 rounded-[6px] hover:border-[#65F59A]/40 transition-all flex flex-col justify-between hover:bg-[#111B17] hover:-translate-y-0.5 shadow-sm"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest rounded-[3px] px-1.5 py-0 border-[rgba(160,190,170,0.18)] text-[#A0AEA5] group-hover:text-[#65F59A] group-hover:border-[#65F59A]/30 transition-colors">
                          {item.badge}
                        </Badge>
                        <ArrowUpRight className="w-3.5 h-3.5 text-[#69786F] group-hover:text-[#65F59A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <h3 className="text-xs font-bold font-display text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors pt-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#A0AEA5] line-clamp-2 leading-relaxed">
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

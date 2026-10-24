"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Compass, Home, LayoutDashboard, Swords, BookOpen, ArrowRight, ArrowLeft } from "lucide-react";
import Logo from "@/components/layout/Logo";

export default function NotFound() {
  const pathname = usePathname() || "";

  // Smart suggestion engine based on requested URL slug
  const suggestion = useMemo(() => {
    const p = pathname.toLowerCase();

    if (p.includes("quiz") || p.includes("test")) {
      return { title: "Quizzes Hub", href: "/dashboard/quizzes", reason: "Found quiz-related route" };
    }
    if (p.includes("arena") || p.includes("live") || p.includes("battle") || p.includes("pin")) {
      return { title: "Live Battle Arena", href: "/live/arena", reason: "Found competition arena route" };
    }
    if (p.includes("question") || p.includes("bank") || p.includes("mcq")) {
      return { title: "Question Bank", href: "/dashboard/questions", reason: "Found question bank route" };
    }
    if (p.includes("lead") || p.includes("rank") || p.includes("score")) {
      return { title: "Global Leaderboard", href: "/dashboard/leaderboard", reason: "Found leaderboard route" };
    }
    if (p.includes("compete") || p.includes("tournament") || p.includes("olympiad")) {
      return { title: "Tournament Competitions", href: "/dashboard/competitions", reason: "Found competition route" };
    }
    if (p.includes("class") || p.includes("student") || p.includes("course")) {
      return { title: "Classrooms Directory", href: "/dashboard/classes", reason: "Found classroom route" };
    }
    if (p.includes("doc") || p.includes("api") || p.includes("developer")) {
      return { title: "Developer APIs & Docs", href: "/dashboard/developer", reason: "Found documentation route" };
    }
    if (p.includes("term") || p.includes("legal")) {
      return { title: "Terms of Service", href: "/terms", reason: "Found legal terms route" };
    }
    if (p.includes("priv") || p.includes("policy") || p.includes("gdpr")) {
      return { title: "Privacy Policy", href: "/privacy", reason: "Found privacy policy route" };
    }
    if (p.includes("help") || p.includes("support") || p.includes("contact")) {
      return { title: "Support & Contact Desk", href: "/contact", reason: "Found support route" };
    }

    return { title: "QuizDorm Workspace", href: "/dashboard", reason: "Primary student & teacher hub" };
  }, [pathname]);

  return (
    <div className="min-h-screen bg-[#0B0708] text-[#F2F7F3] aurora-grid flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      
      {/* Background glow radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-md w-full space-y-6">
        
        {/* Brand Logo */}
        <div className="flex justify-center mb-2">
          <Logo />
        </div>

        {/* 404 Badge */}
        <div className="inline-flex items-center space-x-2 border border-[#FF4D6D]/30 bg-[#1D1013] px-3.5 py-1.5 rounded-full text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
          <span className="text-[#FF4D6D] font-bold uppercase tracking-wider">
            STATUS 404 // ROUTE NOT FOUND
          </span>
        </div>

        {/* Big Code */}
        <div className="space-y-1">
          <h1 className="text-6xl sm:text-7xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
            404
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5] uppercase tracking-widest">
            Non-Existent Endpoint
          </p>
        </div>

        {/* Explanation */}
        <p className="text-xs sm:text-sm text-[#A0AEA5] font-mono leading-relaxed">
          The requested path <code className="text-[#FF4D6D] bg-[#1D1013] px-1.5 py-0.5 rounded border border-[rgba(240, 160, 180,0.15)]">{pathname || "/..."}</code> does not exist on QuizDorm or has been relocated.
        </p>

        {/* Smart Suggester Card */}
        <div className="bg-[#140C0E] border border-[rgba(255, 77, 109,0.3)] rounded-[6px] p-4 text-left shadow-[0_0_25px_rgba(255, 77, 109,0.1)] space-y-2.5">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#FF758F]">
            <span className="flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>Smart Route Suggestion</span>
            </span>
            <span className="text-[#69786F]">{suggestion.reason}</span>
          </div>

          <p className="text-xs font-mono text-[#F2F7F3]">
            Were you looking for <strong className="text-[#FF4D6D]">{suggestion.title}</strong>?
          </p>

          <Link href={suggestion.href} className="block">
            <Button
              className="w-full bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] font-mono text-xs font-bold rounded-[3px] h-9 flex items-center justify-center space-x-1.5 shadow-[0_0_15px_rgba(255, 77, 109,0.25)] transition-all cursor-pointer uppercase tracking-wider"
            >
              <span>Go to {suggestion.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Primary Fallback Navigation Links */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:bg-[#2A141A] hover:border-[#FF4D6D]/40 font-mono text-xs h-9 rounded-[3px] flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>Dashboard</span>
            </Button>
          </Link>

          <Link href="/live/arena">
            <Button
              variant="outline"
              className="w-full border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:bg-[#2A141A] hover:border-[#FF4D6D]/40 font-mono text-xs h-9 rounded-[3px] flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
            >
              <Swords className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>Live Arena</span>
            </Button>
          </Link>
        </div>

        {/* Return to Home Link */}
        <div className="pt-2">
          <Link
            href="/"
            className="text-[11px] font-mono text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors inline-flex items-center gap-1.5"
          >
            <Home className="w-3 h-3" />
            <span>Or return to Homepage</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Trophy,
  Zap,
  Layers,
  Activity,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem, OrbitalRings } from "@/components/ui/motion";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 border-b border-border bg-background overflow-hidden aurora-grid transition-colors">
      {/* Multi-Spectral Neon Spotlight (Yellow, Blue, Green, Red, Orange) */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[520px] blur-[110px] pointer-events-none opacity-85 dark:opacity-85"
        style={{
          background: `radial-gradient(ellipse at center, 
            rgba(255, 230, 0, 0.07) 0%,
            rgba(255, 119, 0, 0.05) 20%,
            rgba(255, 0, 85, 0.04) 40%,
            rgba(0, 240, 255, 0.05) 60%,
            rgba(255, 77, 109, 0.05) 80%,
            transparent 100%
          )`
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Masthead & Cinematic Story */}
          <div className="lg:col-span-7 space-y-7">
            <FadeIn direction="up" delay={0.05}>
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center space-x-2.5 border border-rose-300 dark:border-[#FF4D6D]/25 bg-rose-50/90 dark:bg-[#1D1013]/90 px-3.5 py-1.5 rounded-full shadow-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#BE123C] dark:bg-[#FF4D6D] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#BE123C] dark:bg-[#FF4D6D]" />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-rose-800 dark:text-[#FF4D6D] font-semibold">
                    THE COGNITIVE DORMITORY // UNIVERSAL QUIZ HABITAT
                  </span>
                </div>
                <div className="inline-flex items-center space-x-2 border border-slate-200 dark:border-[rgba(240, 160, 180,0.2)] bg-slate-100/90 dark:bg-[#140C0E]/90 px-3 py-1.5 rounded-full text-[10px] font-mono text-slate-600 dark:text-[#A0AEA5]">
                  <span className="text-[#BE123C] dark:text-[#FF4D6D] font-bold">FOUNDED BY RK AKBAR</span>
                  <span className="text-slate-300 dark:text-[rgba(240, 160, 180,0.3)]">•</span>
                  <span>TAMIL NADU &amp; KERALA</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.15}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-[#F2F7F3] tracking-tight leading-[1.06]">
                Where Knowledge Resides. <br />
                <span className="bg-gradient-to-r from-[#BE123C] via-[#0D9488] to-[#BE123C] dark:from-[#FF4D6D] dark:via-[#FF758F] dark:to-[#FF4D6D] bg-clip-text text-transparent">
                  Where IQ Accelerates.
                </span>
              </h1>
            </FadeIn>

            <FadeIn direction="up" delay={0.25}>
              <p className="text-slate-600 dark:text-[#A0AEA5] text-base sm:text-lg max-w-xl leading-relaxed font-normal">
                The universal dormitory for every quiz format known to academia. From fast-twitch competitive decathlons to deep Olympiad diagnostics — sharpen cognitive speed, accelerate reasoning quotient, and claim podium honours.
              </p>
            </FadeIn>

            {/* Primary Action Buttons */}
            <FadeIn direction="up" delay={0.35}>
              <div className="flex flex-wrap items-center gap-3.5 pt-1">
                <Link href="/dashboard">
                  <Button className="bg-[#BE123C] hover:bg-[#9F1239] text-white dark:bg-[#FF4D6D] dark:hover:bg-[#FF3366] dark:text-[#0B0708] font-mono text-xs font-bold rounded-[6px] px-6 h-11 shadow-[0_0_20px_rgba(190, 18, 60,0.25)] dark:shadow-[0_0_25px_rgba(255, 77, 109,0.35)] transition-all flex items-center gap-2 group">
                    <Sparkles className="w-4 h-4 fill-current group-hover:rotate-12 transition-transform" />
                    Enter the Dorm
                  </Button>
                </Link>

                <Link href="/live/arena">
                  <Button
                    variant="outline"
                    className="border-rose-700/30 text-rose-800 bg-white hover:bg-rose-50 dark:border-[#FF4D6D]/30 dark:bg-[#1D1013] dark:text-[#FF4D6D] dark:hover:bg-[rgba(255, 77, 109,0.12)] dark:hover:border-[#FF4D6D]/60 text-xs font-mono font-medium rounded-[6px] px-5 h-11 flex items-center gap-2 transition-all shadow-xs dark:shadow-[0_0_15px_rgba(255, 77, 109,0.1)]"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    Live Battle Arena
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </Button>
                </Link>

                <Link href="/dashboard/quizzes/builder">
                  <Button
                    variant="ghost"
                    className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-[#A0AEA5] dark:hover:text-[#F2F7F3] dark:hover:bg-[#2A141A] text-xs font-mono rounded-[6px] h-11 flex items-center gap-1.5 px-4"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-rose-700 dark:text-[#FF758F]" />
                    Make a Quiz
                  </Button>
                </Link>
              </div>
            </FadeIn>

            {/* Platform Specifications Strip */}
            <FadeIn direction="up" delay={0.45}>
              <div className="pt-7 border-t border-border grid grid-cols-3 gap-6 font-mono text-xs">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#69786F]">Question Styles</p>
                  <p className="text-slate-900 dark:text-[#F2F7F3] font-bold text-base flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-[#BE123C] dark:text-[#FF4D6D]" /> 9 Interactive Types
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#69786F]">Live Showdown</p>
                  <p className="text-slate-900 dark:text-[#F2F7F3] font-bold text-base flex items-center gap-1.5">
                    <Zap className="w-4 h-4 text-rose-700 dark:text-[#FF758F]" /> Real-time Battle
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-[#69786F]">Quizbot Engine</p>
                  <p className="text-slate-900 dark:text-[#F2F7F3] font-bold text-base flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#BE123C] dark:text-[#FF4D6D]" /> Smart AI Active
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Floating Assessment Terminal & Orbital Sphere */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Ambient Orbital Rings in Background */}
            <div className="absolute -top-12 -right-8 z-0 opacity-70">
              <OrbitalRings />
            </div>

            {/* Floating Terminal Card */}
            <FadeIn direction="up" delay={0.2} className="relative z-10 w-full animate-aurora-float">
              <div className="border border-border bg-card/95 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_35px_-5px_rgba(255, 77, 109,0.18)] p-6 space-y-4">
                
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-border pb-3.5">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-300 dark:bg-[rgba(255, 77, 109,0.14)] dark:text-[#FF4D6D] dark:border-[#FF4D6D]/30 font-bold">
                      ACTIVE ARENA // ITEM #QD-409
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-rose-800 dark:text-[#FF758F] bg-rose-50 dark:bg-[#1D1013] px-2.5 py-1 rounded-full border border-rose-200 dark:border-[rgba(240, 160, 180,0.18)] flex items-center gap-1.5 shadow-xs">
                    <Activity className="w-3 h-3 text-rose-700 dark:text-[#FF758F] animate-pulse" />
                    09:42 REMAINING
                  </span>
                </div>

                {/* Question Stem */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#69786F]">
                      Question 04 of 15 • Computer Science
                    </span>
                    <span className="text-[10px] font-mono text-rose-700 dark:text-[#FF4D6D] font-semibold">
                      Difficulty: Hard (+10 Pts)
                    </span>
                  </div>
                  <p className="font-display text-sm sm:text-base font-semibold text-slate-900 dark:text-[#F2F7F3] leading-snug">
                    Which algorithmic technique applies optimal substructure and overlapping subproblems to solve complex recurrence relations?
                  </p>
                </div>

                {/* Interactive Answer Choices */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-slate-50 dark:bg-[#1D1013] text-xs font-mono text-slate-700 dark:text-[#A0AEA5] hover:border-rose-600/40 hover:text-slate-900 dark:hover:text-[#F2F7F3] transition-colors cursor-pointer">
                    <span>
                      <span className="font-bold text-slate-400 dark:text-[#69786F] mr-2.5">A.</span> Greedy Approximation
                    </span>
                  </div>

                  {/* Selected / Correct State */}
                  <div className="flex items-center justify-between p-3 rounded-xl border border-rose-600 bg-rose-50 dark:border-[#FF4D6D]/60 dark:bg-[#2A141A] text-xs font-mono text-rose-950 dark:text-[#F2F7F3] font-semibold shadow-xs">
                    <span className="flex items-center">
                      <span className="font-bold text-rose-700 dark:text-[#FF4D6D] mr-2.5">B.</span> Dynamic Programming
                    </span>
                    <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#BE123C] text-white dark:bg-[#FF4D6D] dark:text-[#0B0708] font-bold rounded-full shadow-xs">
                      Selected
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-slate-50 dark:bg-[#1D1013] text-xs font-mono text-slate-700 dark:text-[#A0AEA5] hover:border-rose-600/40 hover:text-slate-900 dark:hover:text-[#F2F7F3] transition-colors cursor-pointer">
                    <span>
                      <span className="font-bold text-slate-400 dark:text-[#69786F] mr-2.5">C.</span> Divide and Conquer
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-slate-50 dark:bg-[#1D1013] text-xs font-mono text-slate-700 dark:text-[#A0AEA5] hover:border-rose-600/40 hover:text-slate-900 dark:hover:text-[#F2F7F3] transition-colors cursor-pointer">
                    <span>
                      <span className="font-bold text-slate-400 dark:text-[#69786F] mr-2.5">D.</span> Monte Carlo Search
                    </span>
                  </div>
                </div>

                {/* Footer Status */}
                <div className="pt-3 border-t border-border flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#69786F]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C] dark:bg-[#FF4D6D]" />
                    Topic: Advanced Algorithms // Unit 04
                  </span>
                  <span className="text-rose-700 dark:text-[#FF4D6D] font-bold">Auto-Save: Synchronized</span>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

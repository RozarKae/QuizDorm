"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#65F59A]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Future OS Masthead & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 border border-[#65F59A]/20 bg-[#17251E] px-3 py-1 rounded-full shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#65F59A] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] font-semibold">
                FUTURE OS // ASSESSMENT PLATFORM
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#F2F7F3] tracking-tight leading-[1.08]">
              Unlock Human Potential <br />
              <span className="text-[#65F59A]">Through Assessment.</span>
            </h1>

            <p className="text-[#A0AEA5] text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              Deliver intelligent assessments, run real-time competitions, and uncover actionable learning insights with QuizDorm.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/dashboard">
                <Button className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-xl px-5 py-2.5 h-10 shadow-lg shadow-[#65F59A]/20 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 fill-current" />
                  Explore QuizDorm
                </Button>
              </Link>
              <Link href="/dashboard/quizzes/builder">
                <Button variant="outline" className="border-[rgba(160,190,170,0.18)] bg-[#111B17] text-[#F2F7F3] hover:bg-[#17251E] hover:text-[#65F59A] text-xs font-mono font-medium rounded-xl px-4 py-2.5 h-10 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#38D9B0]" />
                  Start Creating
                </Button>
              </Link>
              <Link href="/live/arena">
                <Button variant="ghost" className="text-[#A0AEA5] hover:text-[#65F59A] hover:bg-[#111B17] text-xs font-mono rounded-xl h-10 flex items-center gap-1.5 px-3">
                  Live Arena <ArrowRight className="w-3.5 h-3.5 text-[#65F59A]" />
                </Button>
              </Link>
            </div>

            {/* Platform Specifications Strip */}
            <div className="pt-6 border-t border-[rgba(160,190,170,0.12)] grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#69786F]">Question Formats</p>
                <p className="text-[#F2F7F3] font-bold text-base mt-0.5">7 Native Types</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#69786F]">Competition Engine</p>
                <p className="text-[#F2F7F3] font-bold text-base mt-0.5">Real-time SSE</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-[#69786F]">Intelligence Layer</p>
                <p className="text-[#F2F7F3] font-bold text-base mt-0.5 flex items-center gap-1">
                  AI Orchestrated <CheckCircle2 className="w-3.5 h-3.5 text-[#65F59A]" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Future OS Product Preview Interface */}
          <div className="lg:col-span-5">
            <div className="relative border border-[rgba(160,190,170,0.15)] bg-[#0C1210] rounded-2xl shadow-2xl p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#17251E] text-[#65F59A] border border-[#65F59A]/30 font-bold">
                    ACTIVE ASSESSMENT
                  </span>
                  <span className="font-mono text-[10px] text-[#69786F]">
                    ITEM-ID #QD-409
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#38D9B0] bg-[#111B17] px-2 py-0.5 rounded-full border border-[rgba(160,190,170,0.1)]">
                  09:42 REMAINING
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                    Question 04 of 15
                  </span>
                  <span className="text-[10px] font-mono text-[#65F59A]">Difficulty: Hard (+10 Pts)</span>
                </div>
                <p className="font-display text-sm sm:text-base font-semibold text-[#F2F7F3] leading-snug">
                  Which algorithmic technique applies optimal substructure and overlapping subproblems to solve complex recurrence relations?
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-[rgba(160,190,170,0.12)] bg-[#111B17] text-xs font-mono text-[#A0AEA5] hover:border-[#65F59A]/30 transition-colors">
                  <span><span className="font-bold text-[#F2F7F3] mr-2">A.</span> Greedy Approximation</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-[#65F59A]/50 bg-[#17251E] text-xs font-mono text-[#F2F7F3] font-semibold shadow-sm shadow-[#65F59A]/10">
                  <span><span className="font-bold text-[#65F59A] mr-2">B.</span> Dynamic Programming</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#65F59A] text-[#070B0A] font-bold rounded-full">Selected</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-[rgba(160,190,170,0.12)] bg-[#111B17] text-xs font-mono text-[#A0AEA5] hover:border-[#65F59A]/30 transition-colors">
                  <span><span className="font-bold text-[#F2F7F3] mr-2">C.</span> Divide and Conquer</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl border border-[rgba(160,190,170,0.12)] bg-[#111B17] text-xs font-mono text-[#A0AEA5] hover:border-[#65F59A]/30 transition-colors">
                  <span><span className="font-bold text-[#F2F7F3] mr-2">D.</span> Monte Carlo Search</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[rgba(160,190,170,0.12)] flex items-center justify-between text-[10px] font-mono text-[#69786F]">
                <span>Topic: Computer Science // Algorithms</span>
                <span className="text-[#65F59A] font-bold">Auto-Save: Synchronized</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

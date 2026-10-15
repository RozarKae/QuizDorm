"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Editorial Masthead & Copy */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 border border-border bg-card px-3 py-1 rounded-[2px] shadow-xs">
              <span className="h-2 w-2 rounded-full bg-acid" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-semibold">
                Platform Release // Edition 2026.4
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-[1.08]">
              Precision Assessment. <br />
              <span className="text-cobalt">Editorial Intelligence.</span>
            </h1>

            <p className="text-muted-foreground text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              QuizDorm unifies verified question banks, live academic competitions, and automated institutional grading into a high-precision testing platform.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/create-quiz">
                <Button className="bg-cobalt hover:bg-cobalt/90 text-white font-mono text-xs font-semibold rounded-[3px] px-5 py-2.5 h-10 shadow-xs flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-acid" />
                  + Create Custom Quiz
                </Button>
              </Link>
              <Link href="/dashboard/questions">
                <Button variant="outline" className="border-border bg-card text-foreground hover:bg-muted text-xs font-mono font-medium rounded-[3px] px-4 py-2.5 h-10 flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-cobalt" />
                  Explore Question Bank (535)
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground text-xs font-mono rounded-[3px] h-10 flex items-center gap-1.5 px-3">
                  Institution Access <ArrowRight className="w-3.5 h-3.5 text-cobalt" />
                </Button>
              </Link>
            </div>

            {/* Editorial Metadata Strip */}
            <div className="pt-6 border-t border-border/80 grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active Bank</p>
                <p className="text-foreground font-bold text-base mt-0.5">535 Verified</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Knowledge Areas</p>
                <p className="text-foreground font-bold text-base mt-0.5">18 Domains</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Integrity Index</p>
                <p className="text-foreground font-bold text-base mt-0.5 flex items-center gap-1">
                  100% <CheckCircle2 className="w-3.5 h-3.5 text-cobalt" />
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Document Preview Card */}
          <div className="lg:col-span-5">
            <div className="relative border border-border bg-card rounded-[3px] shadow-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-[2px] bg-acid text-ink font-bold">
                    SAMPLE SPECIMEN
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    DOC-REF #QD-2026-084
                  </span>
                </div>
                <span className="font-mono text-[10px] text-cobalt font-medium">
                  Page 063 // Space Exploration
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                  Question 01 of 20
                </span>
                <p className="font-display text-base font-semibold text-foreground leading-snug">
                  Which space mission was the first to land humans on the surface of the Moon?
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between p-2.5 rounded-[2px] border border-border bg-background text-xs font-mono text-muted-foreground">
                  <span className="font-bold text-foreground mr-2">A.</span> Gemini 8
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[2px] border-2 border-cobalt bg-cobalt/5 text-xs font-mono text-foreground font-semibold">
                  <span><span className="font-bold text-cobalt mr-2">B.</span> Apollo 11</span>
                  <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 bg-cobalt text-white rounded-[2px]">Verified</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[2px] border border-border bg-background text-xs font-mono text-muted-foreground">
                  <span className="font-bold text-foreground mr-2">C.</span> Vostok 1
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-[2px] border border-border bg-background text-xs font-mono text-muted-foreground">
                  <span className="font-bold text-foreground mr-2">D.</span> Mercury-Atlas 6
                </div>
              </div>

              <div className="pt-2 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>Domain: Space Exploration</span>
                <span>Difficulty: Medium (4 Pts)</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

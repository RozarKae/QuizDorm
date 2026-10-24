"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Brain, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionDivider from "@/components/ui/section-divider";

export default function AnalyticsSection() {
  const topics = [
    { name: "AP Bio: Cellular Respiration & ATP", mastery: 94, status: "Mastered", color: "bg-[#65F59A]" },
    { name: "Calculus: Limits & Derivatives", mastery: 86, status: "Proficient", color: "bg-[#38D9B0]" },
    { name: "World History: Industrial Revolutions", mastery: 82, status: "Proficient", color: "bg-[#38D9B0]" },
    { name: "Physics: Kinematics & Projectile Motion", mastery: 58, status: "Needs Review", color: "bg-[#F87171]" },
  ];

  return (
    <section className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-3 py-1 rounded-full border border-[#65F59A]/30 font-semibold shadow-[0_0_12px_rgba(101,245,154,0.15)]">
              COGNITIVE TELEMETRY // INTELLECTUAL ACCELERATION
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F7F3] tracking-tight">
              Measure True IQ & <br />
              <span className="text-[#38D9B0]">Cognitive Acceleration.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Go far beyond crude percentages. Unlock microsecond reaction telemetry, multi-tier cognitive depth metrics, and high-precision conceptual diagnostics across every cohort.
          </p>
        </div>

        {/* Brain Stats Dashboard Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Topic Weakness Heatmap (7 cols) */}
          <div className="lg:col-span-7 bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-4">
              <div className="flex items-center space-x-2.5">
                <Brain className="w-4 h-4 text-[#65F59A]" />
                <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                  Cognitive Mastery & Conceptual Diagnostic Matrix
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#A0AEA5] uppercase bg-[#111B17] px-2.5 py-0.5 rounded-full border border-[rgba(160,190,170,0.14)]">
                Cohort Intelligence (128 Scholars)
              </span>
            </div>

            <div className="space-y-4">
              {topics.map((t) => (
                <div key={t.name} className="space-y-1.5 font-mono">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F2F7F3] font-medium truncate max-w-[280px] sm:max-w-none">
                      {t.name}
                    </span>
                    <div className="flex items-center space-x-2 shrink-0">
                      <span className="text-[10px] text-[#69786F]">{t.status}</span>
                      <span className="font-bold text-[#F2F7F3] w-10 text-right">{t.mastery}%</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-[#111B17] rounded-full overflow-hidden border border-[rgba(160,190,170,0.1)]">
                    <div
                      className={`h-full ${t.color} rounded-full transition-all duration-700 shadow-[0_0_8px_currentColor]`}
                      style={{ width: `${t.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] flex items-center justify-between text-xs font-mono text-[#A0AEA5]">
              <span className="flex items-center gap-1.5 text-[#F87171]">
                <AlertTriangle className="w-3.5 h-3.5" /> 1 Weak Spot Flagged for Squad Review
              </span>
              <span className="text-[#65F59A] font-semibold">AI Study Guide Generated</span>
            </div>
          </div>

          {/* Card 2: Cognitive Depth & Psychometric Precision (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Sub-card: Bloom's Taxonomy Distribution */}
            <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#69786F] font-semibold">
                  Cognitive Depth // Bloom&apos;s Taxonomy
                </span>
                <span className="text-[10px] font-mono text-[#65F59A] font-bold">Rigor Level</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center font-mono">
                <div className="bg-[#111B17] p-3 rounded-xl border border-[rgba(160,190,170,0.12)]">
                  <p className="text-[10px] uppercase text-[#69786F]">Recall</p>
                  <p className="text-xl font-extrabold text-[#F2F7F3] mt-1">20%</p>
                </div>
                <div className="bg-[#111B17] p-3 rounded-xl border border-[rgba(160,190,170,0.12)]">
                  <p className="text-[10px] uppercase text-[#38D9B0]">Understand</p>
                  <p className="text-xl font-extrabold text-[#38D9B0] mt-1">35%</p>
                </div>
                <div className="bg-[#111B17] p-3 rounded-xl border border-[#65F59A]/30 shadow-[0_0_12px_rgba(101,245,154,0.1)]">
                  <p className="text-[10px] uppercase text-[#65F59A]">Analyze &amp; Synthesize</p>
                  <p className="text-xl font-extrabold text-[#65F59A] mt-1">45%</p>
                </div>
              </div>

              <p className="text-[11px] font-mono text-[#A0AEA5] leading-relaxed">
                45% of synthesized challenges evaluate multi-step analytical reasoning and Olympiad-level synthesis rather than rote memorization.
              </p>
            </div>

            {/* Sub-card: Verification Gateway */}
            <div className="bg-gradient-to-br from-[#111B17] to-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#65F59A]">
                <Activity className="w-3.5 h-3.5" />
                <span className="font-bold uppercase tracking-wider">Instant Cognitive Telemetry &amp; IQ Scorecards</span>
              </div>
              <p className="text-xs text-[#A0AEA5] leading-relaxed font-normal">
                Export comprehensive intellectual dossiers with reaction times, conceptual mastery percentiles, and cohort IQ telemetry formatted for faculty, institutions, and competitive leagues.
              </p>
              <div className="pt-2">
                <Link href="/dashboard/analytics">
                  <Button variant="outline" className="w-full border-[rgba(160,190,170,0.2)] bg-[#070B0A] hover:bg-[#17251E] text-xs font-mono text-[#F2F7F3] hover:text-[#65F59A] rounded-[6px] h-9 flex items-center justify-center gap-1.5 transition-colors">
                    <span>Explore Cognitive Telemetry Hub</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>

      <SectionDivider variant="editorial" label="INTELLIGENCE STUDIO" />
    </section>
  );
}

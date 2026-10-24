"use client";

import React from "react";
import { motion } from "framer-motion";
import { School, Sparkles, Trophy } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Establish Your Academy & Scholar Identity",
      description: "Authenticate into your dedicated workspace — Academy Directorate, Faculty Mentor Console, or Scholar's Hub — and synchronize with your intellectual peers.",
      icon: <School className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      detail: "Seamless Identity Sync",
    },
    {
      step: "02",
      title: "Synthesize or Curate High-Rigor Quests",
      description: "Ingest curriculum materials into the Omni-Curriculum AI Studio, explore verified questions in the Knowledge Matrix, or author challenges across 9 high-cognition formats.",
      icon: <Sparkles className="h-5 w-5 text-rose-700 dark:text-[#FF758F]" />,
      detail: "AI Synthesis & 9 Formats",
    },
    {
      step: "03",
      title: "Enter the Synchronized Decathlon Arena",
      description: "Broadcast battle PINs, race the clock in synchronized microsecond live rounds, and claim verified honours on the global Podium of Intellect.",
      icon: <Trophy className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      detail: "Synchronized Arena Battle",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  return (
    <section id="how-it-works" className="py-24 relative z-10 border-b border-border bg-background transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-rose-800 bg-rose-50 dark:text-[#FF4D6D] dark:bg-[#2A141A] px-2.5 py-0.5 rounded-full border border-rose-300 dark:border-[#FF4D6D]/20 font-semibold shadow-xs">
              INTELLECTUAL EVOLUTION // 3-PHASE LIFECYCLE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F2F7F3] tracking-tight">
              From Foundational Concept <br />
              <span className="text-rose-700 dark:text-[#FF758F]">to Accelerated Mastery.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-slate-600 dark:text-[#A0AEA5] max-w-md leading-relaxed">
            Deploy QuizDorm across academies, competitive Olympiads, or independent study cohorts with zero operational friction.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {steps.map((itemObj) => (
            <motion.div
              key={itemObj.step}
              variants={item}
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-card border border-border hover:border-rose-600/40 transition-all duration-300 shadow-md hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                  <div className="p-2.5 bg-rose-50 dark:bg-[#2A141A] rounded-xl text-rose-800 dark:text-[#FF4D6D] border border-rose-200 dark:border-[#FF4D6D]/20 shadow-xs">
                    {itemObj.icon}
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-800 border border-rose-300 dark:bg-[#2A141A] dark:text-[#FF4D6D] dark:border-[#FF4D6D]/30">
                    STAGE {itemObj.step}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-slate-900 dark:text-[#F2F7F3] mb-2">
                  {itemObj.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed font-normal">
                  {itemObj.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-[#69786F]">
                <span className="text-rose-700 dark:text-[#FF758F] font-semibold">{itemObj.detail}</span>
                <span className="text-rose-700 dark:text-[#FF4D6D] font-semibold">&bull; Active Verified</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="ACADEMIC MATRIX" />
    </section>
  );
}

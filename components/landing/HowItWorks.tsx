"use client";

import React from "react";
import { motion } from "framer-motion";
import { School, Sparkles, Trophy } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Provision Workspaces & Scopes",
      description: "Administrators configure multi-campus institution directories, synchronize rosters, and assign cryptographically scoped roles.",
      icon: <School className="h-5 w-5 text-[#65F59A]" />,
      detail: "Role-Based Access Control",
    },
    {
      step: "02",
      title: "Synthesize or Compose Assessments",
      description: "Extract syllabus concepts with Gemini 3.5 AI, pull from 535+ verified question items, or author custom interactive questions.",
      icon: <Sparkles className="h-5 w-5 text-[#38D9B0]" />,
      detail: "Multimodal AI & 9 Formats",
    },
    {
      step: "03",
      title: "Execute Arenas & Uncover Mastery",
      description: "Launch real-time tournaments with room PINs, synchronize live leaderboards, and inspect granular topic-level error heatmaps.",
      icon: <Trophy className="h-5 w-5 text-[#65F59A]" />,
      detail: "Low-Latency SSE Engine",
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
    <section id="how-it-works" className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-2.5 py-0.5 rounded-full border border-[#65F59A]/20 font-semibold">
              WORKFLOW // SEQUENCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F7F3] tracking-tight">
              From First Thought <br />
              <span className="text-[#38D9B0]">to Brilliant Question.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Deploy QuizDorm across classrooms, departments, or high-stakes competitive leagues with zero operational friction.
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
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/35 transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.7),0_0_20px_rgba(101,245,154,0.1)]"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(160,190,170,0.12)] mb-4">
                  <div className="p-2.5 bg-[#17251E] rounded-xl text-[#65F59A] border border-[#65F59A]/20 shadow-sm">
                    {itemObj.icon}
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#17251E] text-[#65F59A] border border-[#65F59A]/30">
                    STAGE {itemObj.step}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold text-[#F2F7F3] mb-2">
                  {itemObj.title}
                </h3>
                <p className="text-xs text-[#A0AEA5] leading-relaxed font-normal">
                  {itemObj.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(160,190,170,0.1)] flex items-center justify-between text-[10px] font-mono text-[#69786F]">
                <span className="text-[#38D9B0]">{itemObj.detail}</span>
                <span className="text-[#65F59A] font-semibold">&bull; Active Verified</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="STAKEHOLDER WORKSPACES" />
    </section>
  );
}

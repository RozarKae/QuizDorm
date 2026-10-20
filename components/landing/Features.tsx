"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Swords, Trophy, Activity, Users, School, Layers, CheckCircle2 } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function Features() {
  const list = [
    {
      title: "Intelligent AI Question Studio",
      description: "Generate and refine curriculum-grounded items with multimodal source analysis, distractor homogeneity, and Bloom's cognitive taxonomy.",
      icon: <Sparkles className="h-5 w-5 text-[#65F59A]" />,
      tag: "Gemini 3.5 Multimodal",
    },
    {
      title: "High-Concurrency Live Arena",
      description: "Host synchronized competitive tournaments powered by low-latency Server-Sent Events (SSE), room PIN lobbies, and live podium reveals.",
      icon: <Swords className="h-5 w-5 text-[#38D9B0]" />,
      tag: "Real-Time SSE",
    },
    {
      title: "Precise Multi-Role Workspaces",
      description: "Dedicated operational consoles with cryptographically scoped permissions for Super Admins, School Leaders, Teachers, and Students.",
      icon: <School className="h-5 w-5 text-[#65F59A]" />,
      tag: "Institutional ERP",
    },
    {
      title: "Performance Telemetry & Heatmaps",
      description: "Sub-second cohort telemetry, concept weakness heatmaps, item discrimination curves, and downloadable verifiable dossiers.",
      icon: <Activity className="h-5 w-5 text-[#38D9B0]" />,
      tag: "Deep Analytics",
    },
    {
      title: "9-Format Question Engine",
      description: "Full native evaluation for Single Choice, Multi-Select, True/False, Fill in Blanks, Matching, Drag & Drop, Error Spotting, Sequences, and Assertion & Reason.",
      icon: <Layers className="h-5 w-5 text-[#65F59A]" />,
      tag: "9 Item Types",
    },
    {
      title: "Automated Evaluation & Instant Remediation",
      description: "Sub-second deterministic scoring, custom penalty parameters for timed exams, and actionable pedagogical feedback for every question.",
      icon: <CheckCircle2 className="h-5 w-5 text-[#38D9B0]" />,
      tag: "Automated Grading",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  return (
    <section id="features" className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A] aurora-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-2.5 py-0.5 rounded-full border border-[#65F59A]/25 font-semibold">
                SYSTEM ARCHITECTURE // CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F7F3] tracking-tight">
              Great Questions <br />
              <span className="text-[#65F59A]">Change Everything.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Architected for assessment rigor, real-time arena speed, and verifiable learning breakthroughs across classrooms and institutions.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {list.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/40 transition-all duration-300 shadow-xl relative flex flex-col justify-between hover:-translate-y-1 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.7),0_0_25px_-5px_rgba(101,245,154,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#17251E] rounded-xl text-[#65F59A] border border-[#65F59A]/20 group-hover:border-[#65F59A]/50 transition-colors shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-[11px] text-[#69786F] font-semibold">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-[#F2F7F3] mb-2 group-hover:text-[#65F59A] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-[#A0AEA5] leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[rgba(160,190,170,0.1)] flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                <span className="text-[#38D9B0]">{feature.tag}</span>
                <span className="group-hover:text-[#65F59A] transition-colors">Operational &rarr;</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="OPERATIONAL LIFECYCLE" />
    </section>
  );
}

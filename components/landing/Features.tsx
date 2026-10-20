"use client";

import { motion } from "framer-motion";
import { Sparkles, Swords, Trophy, Activity, Users, School } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function Features() {
  const list = [
    {
      title: "Intelligent AI Question Studio",
      description: "Generate and refine syllabus-aligned questions with source document verification, difficulty calibrations, and expert review loops.",
      icon: <Sparkles className="h-5 w-5 text-[#65F59A]" />,
    },
    {
      title: "High-Concurrency Live Arena",
      description: "Host real-time competition lobbies with Server-Sent Events (SSE), synchronized countdown clocks, and live podium updates.",
      icon: <Swords className="h-5 w-5 text-[#38D9B0]" />,
    },
    {
      title: "Precise Role-Based Administration",
      description: "Dedicated operational consoles with cryptographically scoped permissions for Super Admins, School Administrators, Teachers, and Students.",
      icon: <School className="h-5 w-5 text-[#65F59A]" />,
    },
    {
      title: "Performance Telemetry & Reporting",
      description: "Real-time cohort telemetry, question difficulty distributions, error heatmaps, and downloadable verifiable dossiers.",
      icon: <Activity className="h-5 w-5 text-[#38D9B0]" />,
    },
    {
      title: "Multi-Format Question Engine",
      description: "Native evaluation for 7 question architectures: Multiple Choice, Multi-Select, Numeric, True/False, Fill in Blank, Sequence Ordering, and Open Response.",
      icon: <Trophy className="h-5 w-5 text-[#65F59A]" />,
    },
    {
      title: "Automated Evaluation & Feedback",
      description: "Sub-second deterministic grading, penalty calculations for timed exams, and actionable topic-level remediation hints.",
      icon: <Users className="h-5 w-5 text-[#38D9B0]" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 24 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section id="features" className="py-20 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-2.5 py-0.5 rounded-full border border-[#65F59A]/20 font-semibold">
                SYSTEM ARCHITECTURE // CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F2F7F3] tracking-tight">
              Architected for Assessment Rigor & Real-Time Speed
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            From verified multi-domain question banks to synchronized live arena competitions and institutional telemetry.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {list.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/30 transition-all duration-300 shadow-xl relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-[#17251E] rounded-xl text-[#65F59A] border border-[#65F59A]/20 group-hover:border-[#65F59A]/40 transition-colors">
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

              <div className="pt-6 mt-6 border-t border-[rgba(160,190,170,0.1)] flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#69786F] group-hover:text-[#65F59A] transition-colors">
                <span>Production Capability</span>
                <span>Active &rarr;</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="ONBOARDING WORKFLOW" />
    </section>
  );
}

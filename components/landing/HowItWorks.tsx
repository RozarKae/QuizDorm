"use client";

import { motion } from "framer-motion";
import { School, UserPlus, Trophy } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Provision Workspaces & Roles",
      description: "Administrators configure institution directories, invite educators, and assign cryptographically scoped roles.",
      icon: <School className="h-5 w-5 text-[#65F59A]" />,
    },
    {
      step: "02",
      title: "Author or Import Assessments",
      description: "Build assessments with AI Studio assistance, import from verified question banks, or use the 7-format quiz authoring builder.",
      icon: <UserPlus className="h-5 w-5 text-[#38D9B0]" />,
    },
    {
      step: "03",
      title: "Host Live Arenas & Analyze Telemetry",
      description: "Broadcast real-time arena competitions with synchronized SSE countdowns, instant scoring, and deep cohort telemetry.",
      icon: <Trophy className="h-5 w-5 text-[#65F59A]" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const item = {
    hidden: { opacity: 0, filter: "blur(8px)", y: 24 },
    show: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  } as const;

  return (
    <section id="how-it-works" className="py-20 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-2.5 py-0.5 rounded-full border border-[#65F59A]/20 font-semibold">
              WORKFLOW // SEQUENCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F2F7F3] tracking-tight">
              Three-Stage Operating Lifecycle
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Deploy QuizDorm across classrooms, departments, or high-stakes competitive leagues with seamless operational velocity.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 relative"
        >
          {steps.map((itemObj) => (
            <motion.div
              key={itemObj.step}
              variants={item}
              className="relative flex flex-col justify-between p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/30 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[rgba(160,190,170,0.12)] mb-4">
                  <div className="p-2.5 bg-[#17251E] rounded-xl text-[#65F59A] border border-[#65F59A]/20">
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
                <span>Phase 0{itemObj.step}</span>
                <span className="text-[#65F59A] font-semibold">Active &bull; Verified</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="TARGET PROFILES" />
    </section>
  );
}

"use client";

import SectionDivider from "@/components/ui/section-divider";
import { motion } from "framer-motion";
import { Activity,CheckCircle2,Layers,School,Sparkles,Swords } from "lucide-react";

export default function Features() {
  const list = [
    {
      title: "Omni-Curriculum Intelligence Studio",
      description: "Transform raw notes, lecture slides, and syllabus PDFs into high-cognition assessments with step-by-step rationales and difficulty tuning.",
      icon: <Sparkles className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      tag: "Omni-AI Studio",
    },
    {
      title: "Synchronized Decathlon Arenas",
      description: "Host high-stakes cognitive showdowns with synchronized question delivery, microsecond response tracking, and live podium shifts.",
      icon: <Swords className="h-5 w-5 text-rose-700 dark:text-[#FF758F]" />,
      tag: "Decathlon Arenas",
    },
    {
      title: "The Dormitory Ecosystem",
      description: "A unified cognitive habitat built for scholars, mentors, squads, and academies to organize, collaborate, and elevate intellect.",
      icon: <School className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      tag: "Dorm Habitat",
    },
    {
      title: "Cognitive IQ Telemetry",
      description: "Track precision speed curves, cognitive stamina, and concept mastery trajectories to systematically elevate your intellectual quotient.",
      icon: <Activity className="h-5 w-5 text-rose-700 dark:text-[#FF758F]" />,
      tag: "IQ Telemetry",
    },
    {
      title: "9 High-Cognition Challenge Formats",
      description: "Beyond standard MCQs: master matching pairs, categorical grouping, fill-in-blanks, error spotting, chronological sequences, and logic assertion challenges.",
      icon: <Layers className="h-5 w-5 text-rose-700 dark:text-[#FF4D6D]" />,
      tag: "9 Challenge Modes",
    },
    {
      title: "Microsecond Scoring & Deep Rationale",
      description: "Precision telemetry scores responses in milliseconds with rich educational explanations for every tricky distractor.",
      icon: <CheckCircle2 className="h-5 w-5 text-rose-700 dark:text-[#FF758F]" />,
      tag: "Precision Scoring",
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
    <section id="features" className="py-24 relative z-10 border-b border-border bg-background aurora-grid transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-rose-800 bg-rose-50 dark:text-[#FF4D6D] dark:bg-[#2A141A] px-2.5 py-0.5 rounded-full border border-rose-300 dark:border-[#FF4D6D]/25 font-semibold shadow-xs">
                THE COGNITIVE ENGINE // CAPABILITIES
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F2F7F3] tracking-tight">
              Elevating Intellect <br />
              <span className="text-rose-700 dark:text-[#FF4D6D]">Across Every Discipline.</span>
            </h2>
          </div>
          <p className="text-sm font-normal text-slate-600 dark:text-[#A0AEA5] max-w-md leading-relaxed">
            Architected for assessment rigor, real-time arena speed, and verifiable cognitive breakthroughs across schools, universities, and competitive Olympiads.
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
              className="group p-6 rounded-2xl bg-card border border-border hover:border-rose-600/40 transition-all duration-300 shadow-md relative flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 bg-rose-50 dark:bg-[#2A141A] rounded-xl text-rose-800 dark:text-[#FF4D6D] border border-rose-200 dark:border-[#FF4D6D]/20 group-hover:border-rose-500/50 transition-colors shadow-xs">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 dark:text-[#69786F] font-semibold">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-[#F2F7F3] mb-2 group-hover:text-rose-700 dark:group-hover:text-[#FF4D6D] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-[#69786F]">
                <span className="text-rose-700 dark:text-[#FF758F] font-semibold">{feature.tag}</span>
                <span className="group-hover:text-rose-700 dark:group-hover:text-[#FF4D6D] transition-colors">Operational &rarr;</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="OPERATIONAL LIFECYCLE" />
    </section>
  );
}

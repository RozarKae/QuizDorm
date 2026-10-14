"use client";

import { motion } from "framer-motion";
import { Sparkles, Swords, Trophy, Activity, Users, School } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function Features() {
  const list = [
    {
      title: "Interactive Learning",
      description: "Engage students with rich media questions, timed challenges, and flashcard modes designed to boost retention.",
      icon: <Sparkles className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Live Quiz Battles",
      description: "Host real-time competitions with classrooms or institutions, complete with live lobbies and game lobbies.",
      icon: <Swords className="h-6 w-6 text-emerald-400" />,
    },
    {
      title: "Leaderboards",
      description: "Motivate students through friendly competition. Displays national, school-wide, and classroom standings.",
      icon: <Trophy className="h-6 w-6 text-amber-400" />,
    },
    {
      title: "Progress Tracking",
      description: "Detailed dashboard analytics help students map their improvement and focus areas over academic periods.",
      icon: <Activity className="h-6 w-6 text-blue-400" />,
    },
    {
      title: "Teacher Dashboard",
      description: "Auto-grade submissions, manage subjects, invite student codes, and analyze grade curves automatically.",
      icon: <Users className="h-6 w-6 text-indigo-400" />,
    },
    {
      title: "School Management",
      description: "Centralized licensing, multi-department course management, and aggregate reports for administrators.",
      icon: <School className="h-6 w-6 text-emerald-400" />,
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
    <section id="features" className="py-28 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3.5 py-1.5 rounded-full">
            Core Architecture
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight pt-2">
            Engineered for Academic Mastery
          </h2>
          <p className="text-base sm:text-lg text-[#B8BCC8] leading-relaxed">
            QuizDorm bridges the gap between static study guides and real-time interactive intelligence for modern learners and educators.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {list.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="group p-8 rounded-[24px] bg-white/[0.05] backdrop-blur-[20px] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1.5 shadow-2xl shadow-black/40 hover:shadow-blue-500/10 relative overflow-hidden"
            >
              <div className="p-3.5 bg-white/[0.05] border border-white/10 rounded-[18px] w-fit shadow-md mb-6 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-[#B8BCC8] leading-relaxed font-normal">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="glow" />
    </section>
  );
}

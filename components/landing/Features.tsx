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
    <section id="features" className="py-20 relative z-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2">
              <span className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold">
                SYSTEM CAPABILITIES // ARCHITECTURE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Engineered for Academic Rigor & Speed
            </h2>
          </div>
          <p className="text-sm font-normal text-muted-foreground max-w-md leading-relaxed">
            From verified multi-domain question banks to instant classroom arena battles and institutional analytics.
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
              className="group p-6 rounded-[3px] bg-card border border-border hover:border-cobalt/50 transition-colors shadow-xs relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-muted rounded-[2px] text-foreground border border-border group-hover:border-cobalt/40 transition-colors">
                    {feature.icon}
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground font-semibold">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-muted-foreground group-hover:text-cobalt transition-colors">
                <span>Production Capability</span>
                <span>Ready &rarr;</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="ONBOARDING WORKFLOW" />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { School, UserPlus, Trophy } from "lucide-react";
import SectionDivider from "@/components/ui/section-divider";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create School Profile",
      description: "Administrators register the institution, configure subject catalogs, and set license tiers effortlessly.",
      icon: <School className="h-6 w-6 text-blue-400" />,
    },
    {
      step: "02",
      title: "Invite Teachers & Students",
      description: "Send instant invitation links or unique classroom codes for secure, automated onboarding.",
      icon: <UserPlus className="h-6 w-6 text-emerald-400" />,
    },
    {
      step: "03",
      title: "Start Learning & Competing",
      description: "Build custom AI quizzes, challenge squads in the live arena, and monitor aggregate performance analytics.",
      icon: <Trophy className="h-6 w-6 text-amber-400" />,
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
    <section id="how-it-works" className="py-20 relative z-10 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-cobalt font-semibold">
              INSTITUTIONAL ROLLOUT // SEQUENCE
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
              Three-Step Institutional Deployment
            </h2>
          </div>
          <p className="text-sm font-normal text-muted-foreground max-w-md leading-relaxed">
            Deploy QuizDorm across classrooms, departments, or entire regional campuses in under five minutes.
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
              className="relative flex flex-col justify-between p-6 rounded-[3px] bg-card border border-border hover:border-cobalt/40 transition-colors shadow-xs"
            >
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                  <div className="p-2 bg-muted rounded-[2px] text-foreground border border-border">
                    {itemObj.icon}
                  </div>
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-[2px] bg-foreground text-background">
                    STEP {itemObj.step}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-foreground mb-2">
                  {itemObj.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                  {itemObj.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                <span>Phase 0{itemObj.step}</span>
                <span className="text-cobalt font-semibold">Automated</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="editorial" label="TARGET PROFILES" />
    </section>
  );
}

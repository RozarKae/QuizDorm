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
    <section className="py-28 relative z-10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full">
            Streamlined Onboarding
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white tracking-tight pt-2">
            Simple 3-Step Setup
          </h2>
          <p className="text-base sm:text-lg text-[#B8BCC8] leading-relaxed">
            Deploying QuizDorm across classrooms, departments, or entire institutions takes less than five minutes.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Glowing Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-12 left-[18%] right-[18%] h-[2px] bg-gradient-to-r from-blue-500/30 via-emerald-500/50 to-amber-500/30 z-0" />

          {steps.map((itemObj) => (
            <motion.div
              key={itemObj.step}
              variants={item}
              className="relative flex flex-col items-center text-center p-8 rounded-[24px] bg-white/[0.05] backdrop-blur-[20px] border border-white/[0.08] hover:border-white/20 transition-all duration-300 hover:-translate-y-1.5 shadow-2xl shadow-black/40 z-10 group"
            >
              {/* Step Icon Container */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-[20px] bg-white/[0.05] border border-white/15 shadow-xl group-hover:scale-110 group-hover:border-blue-500/40 transition-all duration-300">
                {itemObj.icon}
                <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white flex items-center justify-center text-xs font-bold font-mono shadow-md border border-white/20">
                  {itemObj.step}
                </span>
              </div>

              <div className="pt-6">
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {itemObj.title}
                </h3>
                <p className="text-sm text-[#B8BCC8] leading-relaxed max-w-xs font-normal">
                  {itemObj.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <SectionDivider variant="glow" />
    </section>
  );
}

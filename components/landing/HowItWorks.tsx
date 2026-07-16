"use client";

import { motion } from "framer-motion";
import { School, UserPlus, Trophy } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Create School Profile",
      description: "Administrators register the institution, configure subject catalogs, and set license tiers.",
      icon: <School className="h-6 w-6 text-primary" />,
    },
    {
      step: "02",
      title: "Invite Teachers & Students",
      description: "Send invitation links or unique classroom codes for secure, instant account creation.",
      icon: <UserPlus className="h-6 w-6 text-primary" />,
    },
    {
      step: "03",
      title: "Start Learning & Competing",
      description: "Build custom quizzes, challenge others in the live arena, and track analytics.",
      icon: <Trophy className="h-6 w-6 text-primary" />,
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  } as const;

  return (
    <section className="py-24 bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest">
            Workflow
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How it works in three simple steps
          </p>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            Getting your class set up on QuizDorm is quick and seamless.
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
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[76px] left-[15%] right-[15%] h-0.5 border-t border-dashed border-slate-200 dark:border-gray-800 z-0" />

          {steps.map((itemObj) => (
            <motion.div
              key={itemObj.step}
              variants={item}
              className="relative flex flex-col items-center text-center space-y-4 z-10"
            >
              {/* Step Icon circle */}
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white dark:bg-gray-900 border-2 border-primary shadow-lg group-hover:scale-105 transition-transform">
                {itemObj.icon}
                <span className="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                  {itemObj.step}
                </span>
              </div>

              <div className="pt-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {itemObj.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  {itemObj.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

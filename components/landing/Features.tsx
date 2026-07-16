"use client";

import { motion } from "framer-motion";
import { Sparkles, Swords, Trophy, Activity, Users, School } from "lucide-react";

export default function Features() {
  const list = [
    {
      title: "Interactive Learning",
      description: "Engage students with rich media questions, timed challenges, and flashcard modes designed to boost retention.",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Live Quiz Battles",
      description: "Host real-time competitions with classrooms or institutions, complete with live lobbies and game lobbies.",
      icon: <Swords className="h-6 w-6 text-red-500" />,
    },
    {
      title: "Leaderboards",
      description: "Motivate students through friendly competition. Displays national, school-wide, and classroom standings.",
      icon: <Trophy className="h-6 w-6 text-yellow-500" />,
    },
    {
      title: "Progress Tracking",
      description: "Detailed dashboard analytics help students map their improvement and focus areas over academic periods.",
      icon: <Activity className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Teacher Dashboard",
      description: "Auto-grade submissions, manage subjects, invite student codes, and analyze grade curves automatically.",
      icon: <Users className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "School Management",
      description: "Centralized licensing, multi-department course management, and aggregate reports for administrators.",
      icon: <School className="h-6 w-6 text-indigo-500" />,
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  } as const;

  return (
    <section id="features" className="py-24 bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-sm font-bold text-primary uppercase tracking-widest">
            Core Features
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything you need to master learning
          </p>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400">
            QuizDorm bridges the gap between study guides and gamified entertainment, offering key tools for students, teachers, and admins.
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
              className="group p-8 rounded-3xl border border-slate-200/60 dark:border-gray-800/60 bg-slate-50/30 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:border-primary/25 dark:hover:border-primary/25 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-3 bg-white dark:bg-gray-800 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-gray-700/80 mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

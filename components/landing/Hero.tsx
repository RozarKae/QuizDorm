"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Play, Sparkles, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
  } as const;

  const mockupStudents = [
    { name: "Alex Johnson", score: 98, badge: "Grandmaster", rank: "1st" },
    { name: "Sarah Connor", score: 94, badge: "Expert", rank: "2nd" },
    { name: "David Kim", score: 91, badge: "Pro Student", rank: "3rd" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-slate-50 dark:bg-gray-950 transition-colors duration-300">
      {/* Premium background gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 text-left"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="h-4 w-4" />
            <span>Interactive Gamified Quizzing</span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Learn. <br />
            Compete. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 dark:from-blue-400 dark:to-violet-450">
              Become a Champion.
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-350 max-w-lg leading-relaxed"
          >
            QuizDorm is a modern quiz learning platform for schools, teachers and students. Create, play, and monitor progress inside a premium workspace.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Link href="/auth/register">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold py-6 px-8 rounded-2xl text-base shadow-lg shadow-primary/20 hover:shadow-primary/35 transform hover:-translate-y-0.5 transition-all">
                Get Started
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="border-slate-200 dark:border-gray-800 hover:bg-slate-100 dark:hover:bg-gray-900 font-semibold py-6 px-8 rounded-2xl text-base">
                Explore Platform
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side Mockup Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.25 }}
          className="relative flex items-center justify-center lg:justify-end"
        >
          {/* Main Dashboard Card */}
          <div className="relative w-full max-w-md bg-white/70 dark:bg-gray-900/70 border border-slate-200/50 dark:border-gray-800/50 backdrop-blur-xl rounded-3xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <span className="h-3.5 w-3.5 rounded-full bg-red-400" />
                <span className="h-3.5 w-3.5 rounded-full bg-yellow-400" />
                <span className="h-3.5 w-3.5 rounded-full bg-green-400" />
              </div>
              <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider">
                Live Quiz Arena
              </span>
            </div>

            {/* Simulated Quiz Stats Widget */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-100 dark:border-gray-800/80">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-450 text-xs">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span>Accuracy</span>
                </div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">94.8%</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-950 border border-slate-100 dark:border-gray-800/80">
                <div className="flex items-center space-x-2 text-slate-500 dark:text-slate-450 text-xs">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span>Rank</span>
                </div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">#1 Top Student</p>
              </div>
            </div>

            {/* Leaderboard Mockup list */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Leaderboard</h3>
              <div className="space-y-2">
                {mockupStudents.map((student) => (
                  <div
                    key={student.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50/50 dark:bg-gray-950/50 border border-slate-100/50 dark:border-gray-800/30 hover:bg-slate-50 dark:hover:bg-gray-950 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold uppercase">
                        {student.name.substring(0, 2)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{student.name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-450">{student.badge}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white">{student.score} pts</p>
                      <p className="text-[10px] font-bold text-green-500">{student.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Floating badge elements */}
          <div className="absolute top-10 -left-6 md:-left-12 p-3 bg-white dark:bg-gray-900 border border-slate-200/50 dark:border-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl flex items-center space-x-3 pointer-events-none transform -rotate-6">
            <span className="p-2 rounded-xl bg-green-100 dark:bg-green-950/30 text-green-600 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Quiz Complete</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">+250 XP earned</p>
            </div>
          </div>

          <div className="absolute bottom-10 -right-6 p-3 bg-white dark:bg-gray-900 border border-slate-200/50 dark:border-gray-800/50 backdrop-blur-md rounded-2xl shadow-xl flex items-center space-x-3 pointer-events-none transform rotate-3">
            <span className="p-2 rounded-xl bg-yellow-100 dark:bg-yellow-950/30 text-yellow-600 dark:text-yellow-400">
              <Play className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Live Battle</p>
              <p className="text-xs font-bold text-slate-900 dark:text-white">Chemistry Cup Arena</p>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}

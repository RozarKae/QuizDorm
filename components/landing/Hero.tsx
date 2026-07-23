"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Play,
  TrendingUp,
  Award,
  Zap,
  CheckCircle2,
  Users,
  BrainCircuit,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 24 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  } as const;

  const leaderboardData = [
    { name: "Alex Chen", score: 2840, rank: "1st", badge: "Grandmaster", avatar: "AC", color: "from-amber-400 to-yellow-500" },
    { name: "Sofia Rivera", score: 2690, rank: "2nd", badge: "AI Scholar", avatar: "SR", color: "from-slate-300 to-slate-400" },
    { name: "David Kim", score: 2510, rank: "3rd", badge: "Quiz Master", avatar: "DK", color: "from-amber-600 to-amber-700" },
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Background Soft Lighting Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-blue-600/10 via-emerald-500/10 to-indigo-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8 text-left"
        >
          {/* AI Badge Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center space-x-2.5 bg-white/[0.05] border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-xs font-medium text-blue-400 shadow-xl">
            <BrainCircuit className="h-4 w-4 text-blue-400 animate-pulse" />
            <span className="text-white/90">AI-Powered Educational Platform</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>

          {/* Large Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-[1.08]"
          >
            The Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-blue-300">
              Interactive
            </span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
              Learning.
            </span>
          </motion.h1>

          {/* Short Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-[#B8BCC8] max-w-xl leading-relaxed font-normal"
          >
            Empower educators and inspire students with AI-crafted quizzes, real-time live competition arenas, and deep performance analytics built for modern institutions.
          </motion.p>

          {/* Two Primary CTAs */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2">
            <Link href="/auth/register">
              <Button size="lg" className="rounded-[16px] px-8 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white font-semibold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all">
                <Sparkles className="h-5 w-5 mr-1" />
                Start Creating
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="rounded-[16px] px-8 border-white/10 bg-white/[0.05] hover:bg-white/[0.09] text-white font-semibold text-base backdrop-blur-md">
                <Play className="h-4 w-4 mr-1 text-emerald-400 fill-emerald-400" />
                Watch Demo
              </Button>
            </Link>
          </motion.div>

          {/* Key Metric Badges */}
          <motion.div variants={itemVariants} className="pt-6 grid grid-cols-3 gap-6 border-t border-white/[0.08]">
            <div>
              <p className="font-heading text-2xl font-bold text-white">99.8%</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Uptime & Speed</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-white">10M+</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Questions Solved</p>
            </div>
            <div>
              <p className="font-heading text-2xl font-bold text-white">500+</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Schools & Academies</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Floating Holographic Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(12px)", scale: 0.94, y: 30 }}
          animate={{ opacity: 1, filter: "blur(0px)", scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="lg:col-span-6 relative flex items-center justify-center"
        >
          {/* Main Holographic Container */}
          <div className="relative w-full max-w-lg bg-white/[0.05] backdrop-blur-[24px] border border-white/[0.12] rounded-[28px] p-6 sm:p-8 shadow-2xl shadow-blue-950/50 space-y-6 hover:border-white/25 transition-all duration-500 group overflow-hidden">
            
            {/* Holographic Top Glow Effect */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue-500/20 blur-3xl rounded-full pointer-events-none" />

            {/* Dashboard Header Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
                </div>
                <span className="text-xs font-mono font-medium text-[#B8BCC8]">quizdorm.ai/live-arena</span>
              </div>
              <div className="flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[11px] font-medium text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Live Arena Active</span>
              </div>
            </div>

            {/* Animated Stats Cards Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-[20px] bg-white/[0.04] border border-white/[0.08] relative overflow-hidden group-hover:border-blue-500/30 transition-colors">
                <div className="flex items-center justify-between text-xs text-[#B8BCC8]">
                  <span>Avg Accuracy</span>
                  <TrendingUp className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-heading text-2xl font-bold text-white">96.4%</span>
                  <span className="text-xs font-medium text-emerald-400">+4.2%</span>
                </div>
                {/* Mini SVG Trend Line */}
                <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 w-[96%]" />
                </div>
              </div>

              <div className="p-4 rounded-[20px] bg-white/[0.04] border border-white/[0.08] relative overflow-hidden group-hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center justify-between text-xs text-[#B8BCC8]">
                  <span>Global Rank</span>
                  <Award className="h-4 w-4 text-amber-400" />
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-heading text-2xl font-bold text-white">#1 Top Squad</span>
                  <span className="text-xs font-medium text-amber-400">Master</span>
                </div>
                <div className="mt-3 h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 w-[88%]" />
                </div>
              </div>
            </div>

            {/* Simulated AI Question Card Preview */}
            <div className="p-4 rounded-[20px] bg-white/[0.04] border border-white/[0.08] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-blue-400 flex items-center space-x-1">
                  <Zap className="h-3.5 w-3.5 text-blue-400 mr-1" />
                  <span>Question 04 / 10</span>
                </span>
                <span className="text-[11px] text-[#6B7280] font-mono">15s left</span>
              </div>
              <p className="text-sm font-medium text-white leading-snug">
                Which organelle is responsible for generating cellular ATP in eukaryotic organisms?
              </p>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-[12px] bg-white/[0.03] border border-white/[0.06] text-xs text-slate-300">
                  A. Ribosome
                </div>
                <div className="p-2.5 rounded-[12px] bg-emerald-500/15 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center justify-between">
                  <span>B. Mitochondria</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              </div>
            </div>

            {/* Live Leaderboard List */}
            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B8BCC8]">Live Tournament Standings</h4>
                <span className="text-[11px] text-blue-400 hover:underline cursor-pointer flex items-center">
                  <span>View All</span>
                  <ArrowRight className="h-3 w-3 ml-1" />
                </span>
              </div>
              <div className="space-y-2">
                {leaderboardData.map((player) => (
                  <div
                    key={player.name}
                    className="flex items-center justify-between p-2.5 rounded-[14px] bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${player.color} text-slate-950 flex items-center justify-center text-xs font-bold shadow-md`}>
                        {player.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-white">{player.name}</p>
                        <p className="text-[10px] text-[#6B7280]">{player.badge}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-white">{player.score} pts</p>
                      <p className="text-[10px] font-semibold text-emerald-400">{player.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Holographic Floating Widget 1 - Left */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 sm:-left-10 p-3.5 bg-white/[0.06] backdrop-blur-2xl border border-white/15 rounded-[20px] shadow-2xl flex items-center space-x-3 pointer-events-none z-20 max-w-xs"
          >
            <div className="p-2.5 rounded-[14px] bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">AI Generator</p>
              <p className="text-[10px] text-[#B8BCC8]">10 Questions in 1.2s</p>
            </div>
          </motion.div>

          {/* Holographic Floating Widget 2 - Right */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -right-6 sm:-right-8 p-3.5 bg-white/[0.06] backdrop-blur-2xl border border-white/15 rounded-[20px] shadow-2xl flex items-center space-x-3 pointer-events-none z-20"
          >
            <div className="p-2.5 rounded-[14px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[11px] font-semibold text-white">1,420 Players</p>
              <p className="text-[10px] text-emerald-400 font-medium">Live Battle Mode</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

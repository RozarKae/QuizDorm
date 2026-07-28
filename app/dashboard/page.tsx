"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  HelpCircle,
  Trophy,
  Building2,
  PlusSquare,
  ArrowUpRight,
  TrendingUp,
  Clock,
  CheckCircle2,
  PlayCircle,
  Award,
  GraduationCap,
  ShieldCheck,
  BookOpen,
  Sparkles,
  ShoppingBag,
  Cloud,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardHomePage() {
  const [chartTab, setChartTab] = useState<"weekly" | "monthly">("weekly");

  const stats = [
    { title: "Total Users", count: "12,450", change: "+14%", icon: Users, color: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-50 dark:bg-indigo-950/60" },
    { title: "Total Quizzes", count: "1,280", change: "+22%", icon: HelpCircle, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/60" },
    { title: "Active Competitions", count: "34", change: "+8%", icon: Trophy, color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/60" },
    { title: "Connected Schools", count: "186", change: "+5%", icon: Building2, color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950/60" },
  ];

  const recentActivities = [
    { text: "Mathematics Olympiad 2026 reached 500+ participants", time: "10 mins ago", type: "competition" },
    { text: "Prof. Sarah created 'Advanced Physics Chapter 4' quiz", time: "45 mins ago", type: "quiz" },
    { text: "Oakridge High School registered 40 new students", time: "2 hours ago", type: "school" },
    { text: "Elena Rostova claimed #1 spot on Global Leaderboard", time: "4 hours ago", type: "leaderboard" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-700 p-8 text-white shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            🚀 Phase 1.0 MVP Dashboard
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, Administrator!
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Manage your quizzes, launch live competitions, inspect leaderboard rankings, and build questions effortlessly.
          </p>
          <div className="pt-3 flex flex-wrap items-center gap-3">
            <Link href="/dashboard/cloud-ops">
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 hover:from-indigo-600 hover:to-emerald-500 text-white font-extrabold rounded-xl px-5 py-2.5 shadow-md text-sm">
                <Cloud className="w-4 h-4 mr-2 text-white" />
                Global EduCloud OS (Phase 4.9)
              </Button>
            </Link>
            <Link href="/dashboard/marketplace">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <ShoppingBag className="w-4 h-4 mr-2 text-emerald-300" />
                Marketplace (4.8)
              </Button>
            </Link>
            <Link href="/dashboard/certifications">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <Award className="w-4 h-4 mr-2 text-amber-300" />
                Global Certifications (4.7)
              </Button>
            </Link>
            <Link href="/dashboard/research-studio">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <BookOpen className="w-4 h-4 mr-2 text-purple-300" />
                Research Studio (4.6)
              </Button>
            </Link>
            <Link href="/dashboard/administration">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <Building2 className="w-4 h-4 mr-2 text-blue-300" />
                Academic Admin ERP (4.5)
              </Button>
            </Link>
            <Link href="/dashboard/ai-assistant">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <Sparkles className="w-4 h-4 mr-2 text-amber-300 fill-amber-300" />
                AI Assistant (4.4)
              </Button>
            </Link>
            <Link href="/dashboard/lms">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <BookOpen className="w-4 h-4 mr-2 text-purple-300" />
                LMS Platform (4.3)
              </Button>
            </Link>
            <Link href="/dashboard/examination">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <ShieldCheck className="w-4 h-4 mr-2 text-amber-300" />
                Examination Platform (4.2)
              </Button>
            </Link>
            <Link href="/dashboard/classroom">
              <Button className="bg-white/20 hover:bg-white/30 text-white font-bold rounded-xl px-5 py-2.5 shadow-sm text-sm border border-white/20">
                <GraduationCap className="w-4 h-4 mr-2 text-emerald-300" />
                Digital Classroom Suite (4.1)
              </Button>
            </Link>
            <Link href="/dashboard/quizzes/builder">
              <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-semibold rounded-xl px-5 py-2.5 shadow-sm text-sm">
                <PlusSquare className="w-4 h-4 mr-2" />
                Launch Question Builder
              </Button>
            </Link>
            <Link href="/dashboard/competitions">
              <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 font-semibold rounded-xl px-5 py-2.5 text-sm">
                <Trophy className="w-4 h-4 mr-2" />
                View Competitions
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -right-12 -bottom-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1">
                  {stat.count}
                </h3>
                <span className="inline-flex items-center text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  {stat.change} this month
                </span>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center shadow-sm`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance SVG Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quiz Participation Overview</h3>
              <p className="text-xs text-gray-500">Student submissions and competition activity</p>
            </div>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl text-xs font-medium">
              <button
                onClick={() => setChartTab("weekly")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartTab === "weekly" ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setChartTab("monthly")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  chartTab === "monthly" ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm" : "text-gray-500"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* SVG Line Graphic */}
          <div className="h-56 w-full flex items-end justify-between gap-3 pt-6 border-b border-gray-100 dark:border-gray-900">
            {[45, 62, 50, 78, 90, 84, 95].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div
                  style={{ height: `${val}%` }}
                  className="w-full max-w-[36px] bg-gradient-to-t from-indigo-600 to-blue-500 rounded-t-xl hover:opacity-90 transition-all duration-300 group relative"
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded font-bold shadow pointer-events-none transition-opacity">
                    {val * 12}
                  </div>
                </div>
                <span className="text-[11px] font-medium text-gray-400">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-600 inline-block" />
              <span>Completed Submissions</span>
            </div>
            <span>Peak Activity: Sunday (1,140 attempts)</span>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Quick Actions</h3>
          
          <div className="space-y-3">
            <Link
              href="/dashboard/quizzes/new"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-900 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-gray-50/50 dark:bg-gray-900/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 flex items-center justify-center font-bold">
                  <PlusSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Create New Quiz</h4>
                  <p className="text-xs text-gray-500">Setup title, time & tags</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
            </Link>

            <Link
              href="/dashboard/quizzes/builder"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-900 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-gray-50/50 dark:bg-gray-900/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Question Builder</h4>
                  <p className="text-xs text-gray-500">Add MCQs & Live preview</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
            </Link>

            <Link
              href="/dashboard/competitions"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-900 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-gray-50/50 dark:bg-gray-900/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Live Competitions</h4>
                  <p className="text-xs text-gray-500">Manage active timer events</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
            </Link>

            <Link
              href="/dashboard/leaderboard"
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-900 hover:border-indigo-200 dark:hover:border-indigo-900/50 bg-gray-50/50 dark:bg-gray-900/40 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20 transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center font-bold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Leaderboard Ranks</h4>
                  <p className="text-xs text-gray-500">Inspect top student medals</p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Activity Timeline */}
      <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent System Activity</h3>
        <div className="divide-y divide-gray-100 dark:divide-gray-900">
          {recentActivities.map((act, idx) => (
            <div key={idx} className="py-3.5 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-indigo-600" />
                <span className="text-gray-700 dark:text-gray-300 font-medium">{act.text}</span>
              </div>
              <span className="text-xs text-gray-400 flex items-center shrink-0">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {act.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

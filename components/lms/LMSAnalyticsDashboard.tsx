"use client";

import React from "react";
import { LMSAnalyticsData } from "@/lib/types/lms";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, TrendingUp, Users, Clock, Download, 
  Sparkles, CheckCircle2, Award, Activity
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: LMSAnalyticsData = {
  courseCompletionRate: 82.4,
  avgTimeSpentMinutes: 145,
  activeLearnersDaily: 3420,
  popularLessons: [
    { title: "1.1 Introduction to Perceptrons", views: 4120 },
    { title: "2.1 Scaled Dot-Product Attention", views: 3890 },
    { title: "1.2 Backpropagation Derivations", views: 3100 },
  ],
  weeklyHeatmap: [
    { day: "Mon", hours: [50, 75, 90, 80, 60] },
    { day: "Tue", hours: [60, 85, 95, 88, 70] },
    { day: "Wed", hours: [70, 90, 98, 92, 80] },
  ],
};

export function LMSAnalyticsDashboard() {
  const handleExportDigest = () => {
    toast.success("Exporting LMS Analytics Digest (PDF format)...");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> Learning Analytics & Study Activity
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track course completion velocity, daily active learners, lesson popularity metrics, and cohort engagement heatmaps.
          </p>
        </div>

        <Button onClick={handleExportDigest} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export LMS Digest
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Course Completion Rate</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{mockAnalytics.courseCompletionRate}%</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +4.2% vs last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Avg Daily Learning Time</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.avgTimeSpentMinutes} Mins</p>
          <p className="text-[11px] text-slate-400">~2.4 Hours / Learner</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Daily Active Learners</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockAnalytics.activeLearnersDaily.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Active online today</p>
        </div>
      </div>

      {/* Popular Lessons Leaderboard */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Activity className="w-4 h-4 text-indigo-600" /> Popular Lesson Engagement Leaderboard
        </h3>

        <div className="space-y-3">
          {mockAnalytics.popularLessons.map((les, idx) => (
            <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white">{les.title}</span>
              <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{les.views.toLocaleString()} Total Views</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

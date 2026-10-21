"use client";

import React from "react";
import { ClassroomAnalyticsData } from "@/lib/types/classroom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, TrendingUp, Users, CheckCircle2, AlertTriangle, 
  Award, Calendar, Download, Sparkles, Activity, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: ClassroomAnalyticsData = {
  averageAttendanceRate: 94.2,
  participationScore: 88.5,
  assignmentCompletionRate: 91.0,
  engagementTrend: [
    { date: "Mon", score: 82 },
    { date: "Tue", score: 89 },
    { date: "Wed", score: 94 },
    { date: "Thu", score: 91 },
    { date: "Fri", score: 88 },
  ],
  weeklyHeatmap: [
    { day: "Mon", hours: [60, 80, 90, 85, 70] },
    { day: "Tue", hours: [70, 85, 95, 90, 75] },
    { day: "Wed", hours: [80, 90, 98, 92, 85] },
    { day: "Thu", hours: [75, 88, 92, 89, 80] },
    { day: "Fri", hours: [65, 78, 85, 80, 70] },
  ],
  topPerformersCount: 14,
  needsAttentionCount: 3,
};

export function ClassroomAnalyticsDashboard() {
  const handleExportDigest = () => {
    toast.success("Exporting weekly classroom analytics digest (PDF format)...");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5" /> Real-time Student & Study Stats
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-600" /> Classroom Brain Stats & Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track student engagement heatmaps, attendance trends, assignment completion velocity, and teacher performance metrics.
          </p>
        </div>

        <Button
          onClick={handleExportDigest}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-emerald-500/30"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Digest (PDF)
        </Button>
      </div>

      {/* Primary Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Avg Attendance Rate</span>
            <Users className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.averageAttendanceRate}%</p>
          <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2.4% vs last week
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Participation Index</span>
            <Activity className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.participationScore}/100</p>
          <p className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> Top 5% in department
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Assignment Completion</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.assignmentCompletionRate}%</p>
          <p className="text-[11px] text-slate-400">36/42 On Time</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Students Needing Attention</span>
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{mockAnalytics.needsAttentionCount}</p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">Low attendance alert</p>
        </div>
      </div>

      {/* Engagement Trend & Weekly Heatmap Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trend Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" /> Weekly Engagement Trend
            </h3>
            <span className="text-xs text-slate-400">Mon - Fri</span>
          </div>

          <div className="h-48 flex items-end justify-between gap-3 pt-6">
            {mockAnalytics.engagementTrend.map((item) => (
              <div key={item.date} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{item.score}%</span>
                <div
                  style={{ height: `${item.score}%` }}
                  className="w-full bg-gradient-to-t from-indigo-600 to-purple-500 rounded-t-xl transition-all duration-500"
                />
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">{item.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Classroom Activity Heatmap */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-600" /> Hourly Engagement Heatmap
            </h3>
            <span className="text-xs text-slate-400">Classroom Time Slots</span>
          </div>

          <div className="space-y-2">
            {mockAnalytics.weeklyHeatmap.map((row) => (
              <div key={row.day} className="flex items-center gap-3 text-xs">
                <span className="w-8 font-semibold text-slate-600 dark:text-slate-400">{row.day}</span>
                <div className="flex-1 grid grid-cols-5 gap-2">
                  {row.hours.map((val, idx) => (
                    <div
                      key={idx}
                      style={{ opacity: val / 100 }}
                      className="h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-[10px] text-white font-bold"
                      title={`Score: ${val}%`}
                    >
                      {val}%
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

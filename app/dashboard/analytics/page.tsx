"use client";

import React, { useState } from "react";
import { AnalyticsKpiGrid } from "@/components/analytics/AnalyticsKpiGrid";
import { LineChartWidget } from "@/components/analytics/LineChartWidget";
import { BarChartWidget } from "@/components/analytics/BarChartWidget";
import { DonutChartWidget } from "@/components/analytics/DonutChartWidget";
import { WeakTopicsHeatmap } from "@/components/analytics/WeakTopicsHeatmap";
import { PerformanceInsightsCard } from "@/components/analytics/PerformanceInsightsCard";
import { ExportReportDialog } from "@/components/analytics/ExportReportDialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { BarChart3, Download, Sparkles, Users, Trophy } from "lucide-react";

export default function AnalyticsHubPage() {
  const [rolePerspective, setRolePerspective] = useState<"SuperAdmin" | "Organization" | "Teacher" | "Student">("Teacher");
  const [exportOpen, setExportOpen] = useState(false);

  const metricsMap = {
    SuperAdmin: [
      { title: "Total Organizations", value: "48", change: "+12%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Active Users", value: "18,420", change: "+24%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Quizzes Conducted", value: "3,120", change: "+8%", trend: "up" as const, timeframe: "vs last month" },
      { title: "System Health", value: "99.9%", change: "Stable", trend: "neutral" as const, timeframe: "Uptime" },
    ],
    Organization: [
      { title: "Active Teachers", value: "38", change: "Stable", trend: "neutral" as const, timeframe: "This term" },
      { title: "Total Students", value: "940", change: "+4%", trend: "up" as const, timeframe: "vs last term" },
      { title: "Quiz Completion Rate", value: "92%", change: "+3%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Avg School Score", value: "84%", change: "+2%", trend: "up" as const, timeframe: "vs last test" },
    ],
    Teacher: [
      { title: "My Classroom Students", value: "128", change: "4 Classes", trend: "neutral" as const, timeframe: "Active term" },
      { title: "Quiz Assignments", value: "14", change: "+2 new", trend: "up" as const, timeframe: "This month" },
      { title: "Pending Grading", value: "8", change: "Action Needed", trend: "down" as const, timeframe: "Homework" },
      { title: "Class Pass Rate", value: "88%", change: "+4%", trend: "up" as const, timeframe: "vs last quiz" },
    ],
    Student: [
      { title: "Quizzes Completed", value: "32", change: "+4", trend: "up" as const, timeframe: "This week" },
      { title: "My Average Score", value: "88%", change: "+1.2%", trend: "up" as const, timeframe: "Grade 12 rank" },
      { title: "Study Duration", value: "12.5 hrs", change: "Active", trend: "neutral" as const, timeframe: "This week" },
      { title: "Class Rank", value: "#3", change: "+2 ranks", trend: "up" as const, timeframe: "Top 5%" },
    ],
  };

  const lineData = [
    { label: "Mon", value: 45 },
    { label: "Tue", value: 62 },
    { label: "Wed", value: 58 },
    { label: "Thu", value: 78 },
    { label: "Fri", value: 92 },
    { label: "Sat", value: 85 },
    { label: "Sun", value: 88 },
  ];

  const barData = [
    { label: "Grade 12-A Calculus", value: 88, color: "#4F46E5" },
    { label: "Grade 11-B AP Physics", value: 76, color: "#2563EB" },
    { label: "Grade 10 Chemistry", value: 82, color: "#10B981" },
    { label: "Algebra Foundations", value: 70, color: "#F59E0B" },
  ];

  const donutSlices = [
    { label: "Passed (A/B)", value: 74, color: "#10B981" },
    { label: "Average (C)", value: 18, color: "#F59E0B" },
    { label: "Failed (<60%)", value: 8, color: "#EF4444" },
  ];

  const weakTopics = [
    { topic: "Integral Substitution & Integration by Parts", subject: "Mathematics", incorrectRate: 42, avgSpeedSec: 48 },
    { topic: "Benzene Ring Reaction Mechanisms", subject: "Chemistry", incorrectRate: 36, avgSpeedSec: 52 },
    { topic: "Refinement of Optical Snell's Law", subject: "Physics", incorrectRate: 28, avgSpeedSec: 34 },
  ];

  const insights = [
    {
      id: "i1",
      type: "warning" as const,
      title: "Difficult Topic Flagged in Calculus",
      description: "42% of Grade 12-A students missed questions related to Integral Substitution.",
      recommendation: "Schedule a 20-minute recap session before the mid-term assessment.",
    },
    {
      id: "i2",
      type: "success" as const,
      title: "Substantial Gain in Class Average",
      description: "Class average score rose by +4% following the review quiz assignment.",
      recommendation: "Maintain current practice quiz frequency.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Perspective Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="w-6 h-6 text-indigo-600 mr-2" /> Analytics & Performance Insights
          </h1>
          <p className="text-sm text-gray-500">Real-time performance analytics, charts, heatmaps, and report generator</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Select
            value={rolePerspective}
            onChange={(e) => setRolePerspective(e.target.value as any)}
            options={[
              { value: "Teacher", label: "Teacher Perspective" },
              { value: "Student", label: "Student Perspective" },
              { value: "Organization", label: "Organization Admin Perspective" },
              { value: "SuperAdmin", label: "Platform Super Admin View" },
            ]}
            className="text-xs font-bold w-52"
          />

          <Button onClick={() => setExportOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            <Download className="w-4 h-4 mr-1.5" /> Generate Report
          </Button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <AnalyticsKpiGrid metrics={metricsMap[rolePerspective]} />

      {/* Main Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Line Graph & Bar Graph */}
        <div className="lg:col-span-7 space-y-6">
          <LineChartWidget
            title="Weekly Score & Engagement Trend"
            subtitle="Average test scores across active student assessments"
            data={lineData}
          />
          <BarChartWidget
            title="Class & Classroom Score Comparison"
            data={barData}
          />
        </div>

        {/* Right 5 cols: Donut & Weak Topics */}
        <div className="lg:col-span-5 space-y-6">
          <DonutChartWidget
            title="Overall Grade Distribution Ratio"
            slices={donutSlices}
          />
          <WeakTopicsHeatmap topics={weakTopics} />
        </div>
      </div>

      {/* Performance Insights */}
      <PerformanceInsightsCard insights={insights} />

      {/* Export Dialog */}
      <ExportReportDialog open={exportOpen} onOpenChange={setExportOpen} />
    </div>
  );
}

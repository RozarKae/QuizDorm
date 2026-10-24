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
      { title: "Total Institutions", value: "48", change: "+12%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Active Scholars & Faculty", value: "18,420", change: "+24%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Decathlons & Quests", value: "3,120", change: "+8%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Cognitive Core Health", value: "99.9%", change: "Optimal", trend: "neutral" as const, timeframe: "Uptime" },
    ],
    Organization: [
      { title: "Faculty Mentors", value: "38", change: "Stable", trend: "neutral" as const, timeframe: "This term" },
      { title: "Enrolled Scholars", value: "940", change: "+4%", trend: "up" as const, timeframe: "vs last term" },
      { title: "Decathlon Completion", value: "92%", change: "+3%", trend: "up" as const, timeframe: "vs last month" },
      { title: "Academy Mastery Quotient", value: "84%", change: "+2%", trend: "up" as const, timeframe: "vs last sprint" },
    ],
    Teacher: [
      { title: "Cohort Scholars", value: "128", change: "4 Cohorts", trend: "neutral" as const, timeframe: "Active term" },
      { title: "Assessment Sprints", value: "14", change: "+2 new", trend: "up" as const, timeframe: "This month" },
      { title: "Pending Evaluation", value: "8", change: "Action Needed", trend: "down" as const, timeframe: "Assignments" },
      { title: "Cohort Pass Rate", value: "88%", change: "+4%", trend: "up" as const, timeframe: "vs last sprint" },
    ],
    Student: [
      { title: "Cognitive Sprints", value: "32", change: "+4", trend: "up" as const, timeframe: "This week" },
      { title: "Mastery Quotient", value: "88%", change: "+1.2%", trend: "up" as const, timeframe: "Cohort rank" },
      { title: "Cognitive Immersion", value: "12.5 hrs", change: "Active", trend: "neutral" as const, timeframe: "This week" },
      { title: "Podium Standings", value: "#3", change: "+2 ranks", trend: "up" as const, timeframe: "Top 5%" },
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
    { label: "Grade 12-A Calculus", value: 88, color: "#FF4D6D" },
    { label: "Grade 11-B AP Physics", value: 76, color: "#FF758F" },
    { label: "Grade 10 Chemistry", value: 82, color: "#A0AEA5" },
    { label: "Algebra Foundations", value: 70, color: "#69786F" },
  ];

  const donutSlices = [
    { label: "Passed (A/B)", value: 74, color: "#FF4D6D" },
    { label: "Average (C)", value: 18, color: "#FF758F" },
    { label: "Failed (<60%)", value: 8, color: "#FF6B6B" },
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
    <div className="space-y-8 max-w-7xl mx-auto text-[#F2F7F3]">
      {/* Header & Perspective Switcher */}
      <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8 rounded-2xl space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-80 h-28 bg-[#FF4D6D]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(240, 160, 180,0.12)] pb-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5]">
              <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse" />
              <span>COGNITIVE TELEMETRY // COHORT & SCHOLAR ANALYTICS</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#F2F7F3] flex items-center">
              <BarChart3 className="w-6 h-6 text-[#FF4D6D] mr-2.5" /> Cognitive IQ Telemetry & Analytics
            </h1>
            <p className="text-xs text-[#A0AEA5]">
              Real-time cognitive metrics, conceptual weakness diagnostics, and Olympiad readiness telemetry across your cohort.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Select
              value={rolePerspective}
              onChange={(e) => setRolePerspective(e.target.value as any)}
              options={[
                { value: "Teacher", label: "Faculty Mentor Perspective" },
                { value: "Student", label: "Scholar Perspective" },
                { value: "Organization", label: "Academy Directorate View" },
                { value: "SuperAdmin", label: "Super Admin Command OS View" },
              ]}
              className="text-xs font-mono font-medium w-64 rounded-xl border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#F2F7F3]"
            />

            <Button
              onClick={() => setExportOpen(true)}
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-bold font-mono text-xs tracking-wider rounded-xl shadow-md shadow-[#FF4D6D]/15"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> EXPORT REPORT
            </Button>
          </div>
        </div>

        {/* KPI Stat Cards */}
        <AnalyticsKpiGrid metrics={metricsMap[rolePerspective]} />
      </div>

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

"use client";

import { Button } from "@/components/ui/button";
import { ExamAnalyticsData } from "@/lib/types/examination";
import {
BarChart3,
Building2,
Download,
TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: ExamAnalyticsData = {
  passPercentage: 84.6,
  averageScore: 72.4,
  highestScore: 99.0,
  totalAppeared: 248500,
  totalPassed: 210231,
  difficultyIndex: [
    { questionNumber: 1, topic: "Lorentz Invariance", correctRate: 88.2 },
    { questionNumber: 2, topic: "Heisenberg Uncertainty", correctRate: 74.5 },
    { questionNumber: 3, topic: "Orthogonal Matrix Determinants", correctRate: 42.1 },
    { questionNumber: 4, topic: "Pauli Matrix Algebra", correctRate: 61.8 },
  ],
  schoolRankings: [
    { schoolName: "Metropolitan Institute of Technology", avgScore: 86.4, passRate: 96.2 },
    { schoolName: "Central Academy of Science", avgScore: 82.1, passRate: 91.5 },
    { schoolName: "St. Jude Senior Secondary School", avgScore: 78.0, passRate: 88.4 },
  ],
};

export function ExamAnalyticsConsole() {
  const handleExportReport = () => {
    toast.success("Exporting Examination Statistical Digest (PDF format)...");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> High-Stakes Examination Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Deep examination insights, question difficulty indices, candidate performance distribution, and institutional rankings.
          </p>
        </div>

        <Button
          onClick={handleExportReport}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Analytics Digest
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Pass Percentage</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{mockAnalytics.passPercentage}%</p>
          <p className="text-[11px] text-slate-400">{mockAnalytics.totalPassed.toLocaleString()} Passed</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Average Raw Score</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.averageScore}/100</p>
          <p className="text-[11px] text-slate-400">Highest: {mockAnalytics.highestScore}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Total Appeared</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockAnalytics.totalAppeared.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">99.4% Attendance Rate</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Top Institution</span>
          <p className="text-xl font-bold text-slate-900 dark:text-white truncate">Metro Institute</p>
          <p className="text-[11px] text-rose-500 font-semibold">96.2% Pass Rate</p>
        </div>
      </div>

      {/* Difficulty Index & School Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Difficulty Index Matrix */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-600" /> Question Difficulty Index Analysis
          </h3>

          <div className="space-y-3">
            {mockAnalytics.difficultyIndex.map((q) => (
              <div key={q.questionNumber} className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Q{q.questionNumber}: {q.topic}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{q.correctRate}% Correct</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${q.correctRate}%` }}
                    className={`h-full rounded-full ${q.correctRate < 50 ? "bg-red-500" : "bg-indigo-600"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institution Performance Comparison */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Building2 className="w-4 h-4 text-rose-600" /> Institutional Comparison Matrix
          </h3>

          <div className="space-y-3">
            {mockAnalytics.schoolRankings.map((sch, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{sch.schoolName}</h4>
                  <p className="text-[10px] text-slate-400">Avg Score: {sch.avgScore}/100</p>
                </div>
                <span className="font-extrabold text-rose-600 dark:text-rose-400 text-sm">
                  {sch.passRate}% Pass
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

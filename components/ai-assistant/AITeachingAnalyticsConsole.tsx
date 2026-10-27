"use client";

import { Button } from "@/components/ui/button";
import { InstructionalAnalytics } from "@/lib/types/ai-assistant";
import {
BarChart3,
Download,
Sparkles,
TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: InstructionalAnalytics = {
  classId: "cls-101",
  className: "Grade 12 Quantum Physics & Higher Math",
  masteryRate: 88.5,
  engagementIndex: 92.0,
  learningGaps: [
    { topic: "Tensor Product Kronecker Multiplications", affectedStudentsCount: 6 },
    { topic: "CHSH Boundary Violation Conditions", affectedStudentsCount: 4 },
  ],
  aiActionRecommendations: [
    "Schedule 15-minute quick recap on Kronecker products before next lab session.",
    "Pair top-scoring students (Alexander, Beatriz) with struggling peer groups for study session 4.",
  ],
};

export function AITeachingAnalyticsConsole() {
  const handleExportDigest = () => {
    toast.success("Exported AI Instructional Analytics Digest!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> AI Instructional Analytics & Gap Detection
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated learning gap detection, class mastery rates, curriculum coverage tracking, and predictive performance forecasts.
          </p>
        </div>

        <Button onClick={handleExportDigest} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export Analytics Digest
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Overall Class Mastery Rate</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{mockAnalytics.masteryRate}%</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +3.8% vs last chapter
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Engagement Index</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockAnalytics.engagementIndex}/100</p>
          <p className="text-[11px] text-slate-400">High active participation</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Detected Learning Gaps</span>
          <p className="text-3xl font-black text-amber-500">{mockAnalytics.learningGaps.length} Topics</p>
          <p className="text-[11px] text-amber-600 font-semibold">10 students affected</p>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> AI Instructional Action Recommendations
        </h3>

        <div className="space-y-3">
          {mockAnalytics.aiActionRecommendations.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-xs text-slate-800 dark:text-slate-200 font-medium">
              {rec}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

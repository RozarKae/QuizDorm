"use client";

import React from "react";
import { ResearchAnalyticsData } from "@/lib/types/research-studio";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, TrendingUp, Award, Download, Sparkles, BookOpen
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: ResearchAnalyticsData = {
  totalPublications: 18,
  totalCitations: 420,
  hIndexImpact: 14,
  monthlyReadership: 18450,
  topPerformingPaper: "Quantum Entanglement & Non-Locality Derivations (PRL 2025)",
};

export function ResearchAnalyticsDashboard() {
  const handleExportReport = () => {
    toast.success("Exported Research Impact & Citation Report (PDF format)!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> Research Analytics & Citation Impact Metrics
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track research publication readership performance, h-index citation impact scores, author productivity, and curriculum coverage.
          </p>
        </div>

        <Button onClick={handleExportReport} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export Research Digest
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Total Publications</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.totalPublications}</p>
          <p className="text-[11px] text-slate-400">Peer-Reviewed Papers & Books</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Total Citations</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockAnalytics.totalCitations.toLocaleString()}</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +14.2% vs last quarter
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">h-Index Citation Score</span>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">h-index: {mockAnalytics.hIndexImpact}</p>
          <p className="text-[11px] text-purple-500 font-semibold">High Academic Impact</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Monthly Readership</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{mockAnalytics.monthlyReadership.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Global academic readers</p>
        </div>
      </div>

      {/* Top Performing Paper Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-3">
        <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <Award className="w-4 h-4" /> Top Performing Research Publication
        </h3>
        <p className="text-base font-bold">{mockAnalytics.topPerformingPaper}</p>
      </div>
    </div>
  );
}

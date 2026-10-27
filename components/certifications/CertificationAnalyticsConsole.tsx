"use client";

import { Button } from "@/components/ui/button";
import { CertificationAnalyticsData } from "@/lib/types/certifications";
import {
BarChart3,
Download,
TrendingUp
} from "lucide-react";
import { toast } from "sonner";

const mockAnalytics: CertificationAnalyticsData = {
  totalCertificatesIssued: 14250,
  activeLearnersCount: 8900,
  averagePassRatePercent: 86.4,
  employerVerificationsCount: 4120,
  topDemandedSkill: "Quantum Mechanics & PyTorch AI",
};

export function CertificationAnalyticsConsole() {
  const handleExportDigest = () => {
    toast.success("Exported Global Certification Analytics Digest (PDF format)!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-600" /> Certification Analytics & Demand Insights
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Track certificate completion rates, pass/fail analytics, industry skill demand heatmaps, and employer verification volume.
          </p>
        </div>

        <Button onClick={handleExportDigest} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export Analytics Digest
        </Button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Issued Credentials</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockAnalytics.totalCertificatesIssued.toLocaleString()}</p>
          <p className="text-[11px] text-slate-400">Lifetime Issued</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Average Exam Pass Rate</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{mockAnalytics.averagePassRatePercent}%</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +2.1% vs last quarter
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Employer Verifications</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockAnalytics.employerVerificationsCount.toLocaleString()}</p>
          <p className="text-[11px] text-indigo-500 font-semibold">Active Recruiter Searches</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Top Demanded Skill</span>
          <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-1">{mockAnalytics.topDemandedSkill}</p>
          <p className="text-[11px] text-slate-400">Industry Leader</p>
        </div>
      </div>
    </div>
  );
}

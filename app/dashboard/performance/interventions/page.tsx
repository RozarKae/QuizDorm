"use client";

import React from "react";
import { AtRiskStudentTable } from "@/components/performance/AtRiskStudentTable";
import { LearningSuccessIndexCard } from "@/components/performance/LearningSuccessIndexCard";
import { ShieldAlert, TrendingUp } from "lucide-react";

export default function RiskInterventionsPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
              <ShieldAlert className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              AI Risk Detection & Remedial Intervention Console
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Early Risk Detection & Automated AI Remedial Interventions
          </h1>
          <p className="text-xs sm:text-sm text-rose-100/80 max-w-2xl">
            Automatically detect falling performance, missed practice sets, and attendance gaps with 1-click teacher and parent remediation workflows.
          </p>
        </div>
      </div>

      {/* At Risk Learner Roster */}
      <AtRiskStudentTable />
    </div>
  );
}

"use client";

import React from "react";
import { ParentPortalSummary } from "@/lib/types/administration";
import { Button } from "@/components/ui/button";
import { 
  Users, Heart, Sparkles, CheckCircle2, Clock, 
  CreditCard, MessageSquare, BookOpen
} from "lucide-react";
import { toast } from "sonner";

const mockSummary: ParentPortalSummary = {
  parentName: "Robert Wright",
  studentName: "Alexander Wright",
  rollNumber: "2026-PHY-01",
  attendancePercent: 98.4,
  currentGPA: 3.94,
  feeStatus: "Paid in Full",
  recentNoticesCount: 3,
  aiProgressSummary: "Alexander continues to demonstrate top-tier academic excellence, achieving a 3.94 GPA and 98.4% attendance. All term fees are paid in full.",
};

export function ParentGuardianPortalConsole() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Heart className="w-3.5 h-3.5 text-rose-400" /> Parent & Guardian Engagement Portal
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Parent Portal — {mockSummary.studentName}</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Real-time visibility into your child's attendance records, GPA progress, fee status, teacher notices, and AI progress summaries.
          </p>
        </div>

        <Button onClick={() => toast.success("Message sent to Lead Faculty!")} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <MessageSquare className="w-4 h-4 mr-1.5" /> Contact Class Teacher
        </Button>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Live Attendance</span>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{mockSummary.attendancePercent}%</p>
          <p className="text-[11px] text-emerald-500 font-semibold">Verified Daily</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Current GPA</span>
          <p className="text-3xl font-black text-indigo-600 dark:text-indigo-400">{mockSummary.currentGPA} / 4.0</p>
          <p className="text-[11px] text-purple-500 font-semibold">Rank #1 in Class</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Fee Payment Status</span>
          <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{mockSummary.feeStatus}</p>
          <p className="text-[11px] text-slate-400">Zero Dues Pending</p>
        </div>
      </div>

      {/* AI Progress Summary Card */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> AI Executive Progress Digest for Parent
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-purple-500/5 p-4 rounded-xl border border-purple-500/20">
          "{mockSummary.aiProgressSummary}"
        </p>
      </div>
    </div>
  );
}

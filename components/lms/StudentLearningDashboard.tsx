"use client";

import { Button } from "@/components/ui/button";
import { StudentLearningProfile } from "@/lib/types/lms";
import {
Award,
CheckCircle2,
Flame,
Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockProfile: StudentLearningProfile = {
  studentId: "s-101",
  studentName: "Alexander Wright",
  enrolledCount: 4,
  completedCount: 2,
  totalHoursLearned: 48,
  currentStreakDays: 14,
  badges: [
    { id: "b1", title: "AI Pioneer", description: "Completed Neural Network Foundations", iconName: "Flame" },
    { id: "b2", title: "Quantum Novice", description: "Scored 90%+ in Quantum Physics Lab", iconName: "Award" },
    { id: "b3", title: "Consistency Master", description: "14-Day uninterrupted study streak", iconName: "Target" },
  ],
  weakTopics: [
    { topic: "Tensor Product Matrix Algebra", score: 58 },
    { topic: "Backpropagation Loss Derivatives", score: 64 },
  ],
};

export function StudentLearningDashboard() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400" /> {mockProfile.currentStreakDays}-Day Active Study Streak!
          </div>
          <h2 className="text-3xl font-black">Welcome back, {mockProfile.studentName}!</h2>
          <p className="text-slate-300 text-xs mt-1 max-w-xl">
            Track your course progress, study hours, active learning streaks, achievement badges, and AI weak topic diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Learned</span>
            <p className="text-2xl font-black text-indigo-400">{mockProfile.totalHoursLearned} Hours</p>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Enrolled Courses</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{mockProfile.enrolledCount}</p>
          <p className="text-[11px] text-slate-400">2 In Progress</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Completed Courses</span>
          <p className="text-3xl font-black text-rose-600 dark:text-rose-400">{mockProfile.completedCount}</p>
          <p className="text-[11px] text-rose-500 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> 100% Verified Certificates
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Study Streak</span>
          <p className="text-3xl font-black text-amber-500 flex items-center gap-1">
            <Flame className="w-6 h-6 fill-amber-500" /> {mockProfile.currentStreakDays} Days
          </p>
          <p className="text-[11px] text-slate-400">Personal Record!</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
          <span className="text-xs font-semibold text-slate-500">Badges Unlocked</span>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">{mockProfile.badges.length}</p>
          <p className="text-[11px] text-purple-500 font-semibold">Rank #1 in Cohort</p>
        </div>
      </div>

      {/* Badges & Weak Topic Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievement Badges */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Award className="w-4 h-4 text-purple-600" /> Earned Achievement Badges
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {mockProfile.badges.map((b) => (
              <div key={b.id} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-center space-y-1">
                <Award className="w-8 h-8 text-purple-600 mx-auto" />
                <h4 className="font-bold text-slate-900 dark:text-white text-xs">{b.title}</h4>
                <p className="text-[10px] text-slate-500">{b.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Weak Topic Diagnostic */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" /> AI Weak Topic Diagnostics & Revision
          </h3>

          <div className="space-y-3">
            {mockProfile.weakTopics.map((wt, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{wt.topic}</span>
                  <span className="text-[10px] text-amber-600 block">Mastery Score: {wt.score}%</span>
                </div>
                <Button
                  onClick={() => toast.success(`Generated 5-minute revision drill for "${wt.topic}"!`)}
                  size="sm"
                  className="bg-amber-600 hover:bg-amber-700 text-white text-[10px] h-7 rounded-lg font-bold"
                >
                  Start Revision Drill
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

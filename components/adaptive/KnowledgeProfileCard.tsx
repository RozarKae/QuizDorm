"use client";

import { Card } from "@/components/ui/card";
import { StudentKnowledgeProfile } from "@/lib/types/adaptive";
import { Award,Clock,Flame,Target,Zap } from "lucide-react";

interface KnowledgeProfileCardProps {
  profile: StudentKnowledgeProfile;
}

export function KnowledgeProfileCard({ profile }: KnowledgeProfileCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-indigo-600/30">
            {profile.studentName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              {profile.studentName} <span className="ml-2 text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-semibold">Mastery: Level 4</span>
            </h3>
            <p className="text-xs text-gray-500">Continuous Adaptive Learning Profile • Last updated today</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 px-3.5 py-1.5 rounded-2xl">
          <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
          <div>
            <span className="text-xs font-bold text-amber-900 dark:text-amber-300 block leading-tight">
              {profile.studyStreakDays} Day Streak!
            </span>
            <span className="text-[10px] text-amber-600 dark:text-amber-400">Keep it up!</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 flex items-center font-medium">
            <Target className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Overall Mastery
          </span>
          <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {profile.overallMasteryPercent}%
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 flex items-center font-medium">
            <Zap className="w-3.5 h-3.5 text-rose-500 mr-1" /> Accuracy Rate
          </span>
          <div className="text-xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
            {profile.overallAccuracyPercent}%
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 flex items-center font-medium">
            <Clock className="w-3.5 h-3.5 text-purple-500 mr-1" /> Avg Response Speed
          </span>
          <div className="text-xl font-extrabold text-gray-900 dark:text-white font-mono">
            {profile.overallAvgSpeedSeconds}s / item
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-500 flex items-center font-medium">
            <Award className="w-3.5 h-3.5 text-amber-500 mr-1" /> Quizzes Completed
          </span>
          <div className="text-xl font-extrabold text-gray-900 dark:text-white font-mono">
            {profile.totalQuizzesCompleted} ({profile.totalQuestionsAnswered} Qs)
          </div>
        </div>
      </div>
    </Card>
  );
}

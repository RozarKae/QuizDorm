"use client";

import React from "react";
import { TrendingUp, Clock, Award, Target, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

interface FamilyAnalyticsCardProps {
  studentName: string;
}

export function FamilyAnalyticsCard({ studentName }: FamilyAnalyticsCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <TrendingUp className="w-5 h-5 text-indigo-600 mr-2" /> Academic Growth & Family Analytics
        </h3>
        <span className="text-xs font-mono font-bold text-indigo-600 font-bold">
          Predicted Exam Score: 94.2%
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Weekly Study Hours</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400 text-lg">12.5 hrs</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Monthly Growth Rate</span>
          <span className="font-bold text-emerald-600 text-lg">+8.4%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Quizzes Completed</span>
          <span className="font-bold text-gray-900 dark:text-white text-lg">42 Quizzes</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Certificates Earned</span>
          <span className="font-bold text-amber-500 text-lg">2 Verified</span>
        </div>
      </div>
    </Card>
  );
}

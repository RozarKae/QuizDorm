"use client";

import React from "react";
import { AIStudyCoachWidget } from "@/components/tutor/AIStudyCoachWidget";
import { AILearningPathCard } from "@/components/tutor/AILearningPathCard";
import { AIFlashcardDeckCard } from "@/components/tutor/AIFlashcardDeckCard";

import { Sparkles, Bot, ArrowRight, Target } from "lucide-react";

export default function AIStudyCoachPlannerPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
              <Sparkles className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              AI Study Coach & Adaptive Learning Path
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Study Coach, Exam Readiness & Learning Milestones
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Continuously evolving learning path, daily study goals, and exam preparation readiness countdown.
          </p>
        </div>
      </div>

      {/* AI Study Coach Readiness Widget */}
      <AIStudyCoachWidget />

      {/* Main Grid: Learning Path & Flashcards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <AILearningPathCard />
        </div>
        <div className="lg:col-span-5">
          <AIFlashcardDeckCard />
        </div>
      </div>
    </div>
  );
}

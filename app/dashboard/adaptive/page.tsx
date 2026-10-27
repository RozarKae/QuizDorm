"use client";

import { PerformancePredictor } from "@/lib/adaptive/performancePredictor";
import { KnowledgeProfileManager } from "@/lib/adaptive/profileManager";
import { AIRecommendationEngine } from "@/lib/adaptive/recommendationEngine";
import { AICoachService } from "@/lib/adaptive/studyCoach";
import { StudentKnowledgeProfile } from "@/lib/types/adaptive";
import { useState } from "react";

import { AICoachWidget } from "@/components/adaptive/AICoachWidget";
import { GoalTrackerCard } from "@/components/adaptive/GoalTrackerCard";
import { KnowledgeProfileCard } from "@/components/adaptive/KnowledgeProfileCard";
import { MasteryHeatmap } from "@/components/adaptive/MasteryHeatmap";
import { PerformancePredictorCard } from "@/components/adaptive/PerformancePredictorCard";
import { RecommendationPanel } from "@/components/adaptive/RecommendationPanel";
import { TeacherInsightsCard } from "@/components/adaptive/TeacherInsightsCard";

import { Button } from "@/components/ui/button";
import { Brain,Play } from "lucide-react";
import Link from "next/link";

export default function AdaptiveLearningDashboardPage() {
  const [profile] = useState<StudentKnowledgeProfile>(() => KnowledgeProfileManager.getProfile());
  const [roleView, setRoleView] = useState<"student" | "teacher">("student");

  const recommendations = AIRecommendationEngine.getRecommendations(profile);
  const coachMessages = AICoachService.getCoachAdvice();
  const prediction = PerformancePredictor.predictPerformance(profile);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-purple-300">
                <Brain className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.4 Adaptive Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Adaptive Learning & Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/80 max-w-2xl">
              Continuous performance analytics, explainable AI study recommendations, SM-2 spaced repetition revision, performance prediction, and personalized study paths.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white/10 p-1 rounded-2xl border border-white/20 flex space-x-1 backdrop-blur-md text-xs font-semibold">
              <button
                onClick={() => setRoleView("student")}
                className={`px-3 py-1.5 rounded-xl transition-all ${roleView === "student" ? "bg-purple-600 text-white shadow-md" : "text-purple-200 hover:text-white"}`}
              >
                Student View
              </button>
              <button
                onClick={() => setRoleView("teacher")}
                className={`px-3 py-1.5 rounded-xl transition-all ${roleView === "teacher" ? "bg-purple-600 text-white shadow-md" : "text-purple-200 hover:text-white"}`}
              >
                Teacher AI Insights
              </button>
            </div>

            <Link href="/dashboard/quizzes/builder?mode=practice">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-purple-600/30">
                <Play className="w-4 h-4 mr-1.5" /> Start Adaptive Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {roleView === "student" ? (
        <>
          {/* Knowledge Profile Card */}
          <KnowledgeProfileCard profile={profile} />

          {/* AI Coach & Performance Forecast Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6">
              <AICoachWidget messages={coachMessages} />
            </div>
            <div className="lg:col-span-6">
              <PerformancePredictorCard prediction={prediction} />
            </div>
          </div>

          {/* Explainable AI Recommendations Panel */}
          <RecommendationPanel recommendations={recommendations} />

          {/* Topic Mastery Heatmap */}
          <MasteryHeatmap topics={profile.topicMasteryList} />

          {/* Goal Tracker */}
          <GoalTrackerCard />
        </>
      ) : (
        /* Teacher AI Insights View */
        <div className="space-y-6">
          <TeacherInsightsCard />
          <MasteryHeatmap topics={profile.topicMasteryList} />
        </div>
      )}
    </div>
  );
}

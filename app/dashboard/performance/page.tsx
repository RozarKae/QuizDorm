"use client";

import React from "react";
import { PredictiveAnalyticsEngine } from "@/lib/performance/predictiveEngine";
import { PredictiveGradeCard } from "@/components/performance/PredictiveGradeCard";
import { WhatIfSimulatorCard } from "@/components/performance/WhatIfSimulatorCard";
import { LearningSuccessIndexCard } from "@/components/performance/LearningSuccessIndexCard";

import { TrendingUp, ShieldAlert, Sparkles, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PerformanceCoachPage() {
  const predictions = PredictiveAnalyticsEngine.getPredictions();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <TrendingUp className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.7 Predictive Intelligence & AI Performance Coach
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI Performance Coach & Predictive Exam Analytics
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Forecast upcoming exam scores with confidence metrics, inspect Explainable AI (XAI) factors, and run interactive What-If academic study simulations.
            </p>
          </div>

          <Link href="/dashboard/performance/interventions">
            <Button className="bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-500/30">
              <ShieldAlert className="w-4 h-4 mr-1.5" /> Early Risk & Intervention Console
            </Button>
          </Link>
        </div>
      </div>

      {/* Learning Success Index Gauge */}
      <LearningSuccessIndexCard />

      {/* Predictive Grade Cards Grid */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="w-5 h-5 text-indigo-600 mr-2" /> Subject Grade Forecasts & Explainable AI (XAI)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictions.map((p, idx) => (
            <PredictiveGradeCard key={idx} prediction={p} />
          ))}
        </div>
      </div>

      {/* Interactive What-If Simulator */}
      <WhatIfSimulatorCard />
    </div>
  );
}

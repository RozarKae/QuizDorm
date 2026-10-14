"use client";

import React, { useState } from "react";
import { ParentManager } from "@/lib/parent/parentManager";
import { ParentAIService } from "@/lib/parent/parentAIService";

import { AIParentInsightCard } from "@/components/parent/AIParentInsightCard";
import { FamilyAnalyticsCard } from "@/components/parent/FamilyAnalyticsCard";
import { ChildSwitcherCard } from "@/components/parent/ChildSwitcherCard";

import { Sparkles, TrendingUp, HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AIParentInsightsPage() {
  const parent = ParentManager.getParentProfile();
  const [activeChildId, setActiveChildId] = useState(ParentManager.getActiveChildId());

  const activeChild = parent.linkedChildren.find((c) => c.id === activeChildId) || parent.linkedChildren[0];
  const insight = ParentAIService.getAIInsight(activeChild.id);

  const handleSelectChild = (id: string) => {
    setActiveChildId(id);
    ParentManager.setActiveChildId(id);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-purple-300">
              <Sparkles className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              AI Parent Intelligence & Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Learning Progress & Home Action Plan for {activeChild.name}
          </h1>
          <p className="text-xs sm:text-sm text-purple-100/80 max-w-2xl">
            Parent-friendly academic summaries, strengths, weakness breakdowns, and recommended 15-minute home study habits.
          </p>
        </div>
      </div>

      {/* Child Switcher Header Card */}
      <ChildSwitcherCard
        childrenList={parent.linkedChildren}
        activeChildId={activeChild.id}
        onSelectChild={handleSelectChild}
      />

      {/* Family Analytics Metric Card */}
      <FamilyAnalyticsCard studentName={activeChild.name} />

      {/* Main AI Insight Summary Card */}
      <AIParentInsightCard insight={insight} />
    </div>
  );
}

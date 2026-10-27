"use client";

import { Button } from "@/components/ui/button";
import { AICertificationRoadmap } from "@/lib/types/certifications";
import {
RefreshCw,
Sparkles,
Target
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockRoadmap: AICertificationRoadmap = {
  learnerId: "s-101",
  targetRole: "Senior Quantum AI Engineer",
  recommendedCertifications: [
    { title: "Certified Full-Stack Quantum Systems Engineer (CFSQE)", priority: "High", estHours: 45 },
    { title: "Enterprise AI Infrastructure Specialist (EAIS)", priority: "Medium", estHours: 30 },
  ],
  studyPlanDays: 30,
  readinessIndex: 92,
};

export function AICertificationAssistantHub() {
  const [roadmap] = useState<AICertificationRoadmap>(mockRoadmap);

  const handleGenerateRoadmap = () => {
    toast.success("AI generated personalized 30-day certification study plan!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Career Guidance & Certification Copilot
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Certification Assistant & Roadmap</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Automates eligibility evaluation, generates personalized certification roadmaps, recommends exam prep drills, and manages renewal cycles.
          </p>
        </div>

        <Button onClick={handleGenerateRoadmap} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Re-Generate AI Roadmap
        </Button>
      </div>

      {/* Recommended Certification Path Cards */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-600" /> Recommended Certification Path for &ldquo;{roadmap.targetRole}&rdquo;
        </h3>

        <div className="space-y-3">
          {roadmap.recommendedCertifications.map((rec, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded bg-purple-600 text-white font-bold text-[9px] uppercase">
                  {rec.priority} Priority
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{rec.title}</h4>
                <p className="text-slate-500">Estimated Study Time: {rec.estHours} Hours</p>
              </div>

              <Button onClick={() => toast.success(`Enrolled in prep module for "${rec.title}"`)} size="sm" className="bg-purple-600 text-white text-xs rounded-xl font-bold shrink-0">
                Start Exam Prep
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import {
CheckCircle2,
Sparkles
} from "lucide-react";
import { toast } from "sonner";

export function SkillAssessmentPlatform() {
  const handleStartAssessment = () => {
    toast.success("Launched 30-minute AI Practical Skill Benchmark Assessment!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" /> Skill Assessment & Competency Benchmarking
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Measure real-world competencies against industry benchmarks to evaluate certification readiness.
          </p>
        </div>

        <Button onClick={handleStartAssessment} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          Start Practical Skill Exam
        </Button>
      </div>

      {/* Benchmark Metric Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b border-slate-800 pb-3">
          <span className="font-mono text-xs text-indigo-400 font-bold">Certification Target: CFSQE</span>
          <span className="text-rose-400 font-bold text-xs flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Readiness: 92% (ELAPSED)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Quantum Mechanics</span>
            <p className="text-2xl font-black text-rose-400">96% Score</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">PyTorch & Neural Nets</span>
            <p className="text-2xl font-black text-indigo-400">90% Score</p>
          </div>
          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">PennyLane SDK</span>
            <p className="text-2xl font-black text-purple-400">88% Score</p>
          </div>
        </div>
      </div>
    </div>
  );
}

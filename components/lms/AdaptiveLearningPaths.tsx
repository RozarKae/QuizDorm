"use client";

import React, { useState } from "react";
import { LearningPath } from "@/lib/types/lms";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, CheckCircle2, Lock, ArrowRight, Target, Award, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockPaths: LearningPath[] = [
  {
    id: "path-1",
    title: "Senior Full-Stack AI Engineer Career Track",
    targetRole: "Lead AI Engineer",
    description: "Sequential skill progression covering neural network fundamentals, PyTorch, vector databases, LLM RAG pipelines, and cloud deployment.",
    totalCourses: 5,
    completedCourses: 2,
    progressPercent: 40,
    milestones: [
      { id: "m1", title: "Python & Tensor Mathematics", requiredSkill: "Linear Algebra", points: 100, isUnlocked: true, order: 1 },
      { id: "m2", title: "Feedforward Neural Networks & PyTorch", requiredSkill: "Calculus & PyTorch", points: 200, isUnlocked: true, order: 2 },
      { id: "m3", title: "Transformer Models & Attention Mechanisms", requiredSkill: "Deep Learning", points: 300, isUnlocked: false, order: 3 },
      { id: "m4", title: "LLM Fine-Tuning & Vector RAG Architectures", requiredSkill: "Embeddings & LangChain", points: 400, isUnlocked: false, order: 4 },
    ],
  },
];

export function AdaptiveLearningPaths() {
  const [paths, setPaths] = useState<LearningPath[]>(mockPaths);
  const activePath = paths[0];

  const handleUnlockMilestone = (mId: string) => {
    setPaths((prev) =>
      prev.map((p) => ({
        ...p,
        milestones: p.milestones.map((m) => (m.id === mId ? { ...m, isUnlocked: true } : m)),
      }))
    );
    toast.success("Skill milestone unlocked on your personalized adaptive learning path!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-2 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5" /> AI-Driven Adaptive Learning Engine
          </div>
          <h2 className="text-2xl font-bold">{activePath.title}</h2>
          <p className="text-xs text-purple-200 mt-1 max-w-xl">{activePath.description}</p>
        </div>

        <div className="bg-slate-900/90 px-4 py-3 rounded-2xl border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-semibold">Track Progress</span>
          <p className="text-2xl font-black text-purple-400">{activePath.progressPercent}%</p>
        </div>
      </div>

      {/* Sequential Milestone Road Graph */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-600" /> Milestone Progression Path
        </h3>

        <div className="space-y-4">
          {activePath.milestones.map((m) => (
            <div
              key={m.id}
              className={`p-5 rounded-2xl border flex items-center justify-between gap-4 transition-all ${
                m.isUnlocked
                  ? "bg-indigo-50/60 dark:bg-indigo-950/40 border-indigo-500/40"
                  : "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-75"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    m.isUnlocked ? "bg-emerald-500 text-white shadow-md" : "bg-slate-200 dark:bg-slate-700 text-slate-500"
                  }`}
                >
                  {m.isUnlocked ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                    Stage {m.order}: {m.title}
                  </h4>
                  <p className="text-xs text-slate-500">Prerequisite: {m.requiredSkill}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">{m.points} Mastery XP</span>
                {!m.isUnlocked && (
                  <Button
                    onClick={() => handleUnlockMilestone(m.id)}
                    size="sm"
                    className="bg-indigo-600 text-white text-xs rounded-xl font-semibold"
                  >
                    Unlock Milestone
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

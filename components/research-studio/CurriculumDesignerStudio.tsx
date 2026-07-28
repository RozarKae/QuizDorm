"use client";

import React, { useState } from "react";
import { CurriculumDesign } from "@/lib/types/research-studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Layers, Target, CheckCircle2, Sparkles, Plus, BookOpen, ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

const mockCurriculum: CurriculumDesign = {
  id: "curr-101",
  title: "B.Sc Quantum Information Systems & Computing Framework",
  subjectArea: "Computer Science & Physics",
  academicLevel: "Undergraduate (Years 1-4)",
  targetDurationWeeks: 16,
  outcomes: [
    { id: "o1", bloomsLevel: "Apply", outcomeStatement: "Implement quantum Fourier transform algorithms using PennyLane SDK." },
    { id: "o2", bloomsLevel: "Evaluate", outcomeStatement: "Analyze decoherence rates in superconducting transmons." },
    { id: "o3", bloomsLevel: "Create", outcomeStatement: "Design a fault-tolerant surface code error-correction circuit." },
  ],
  modulesCount: 8,
  accreditationMapped: true,
};

export function CurriculumDesignerStudio() {
  const [curriculum, setCurriculum] = useState<CurriculumDesign>(mockCurriculum);

  const handlePublishCurriculum = () => {
    toast.success("Curriculum Published & Mapped to ABET Academic Accreditation Standards!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Outcome-Based Education (OBE) Designer
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-purple-600" /> Academic Curriculum & Outcome Architect
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Design structured academic curricula, Bloom's Taxonomy learning outcome statements, competency frameworks, and accreditation mappings.
          </p>
        </div>

        <Button onClick={handlePublishCurriculum} className="bg-purple-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <ShieldCheck className="w-4 h-4 mr-1.5" /> Publish Accredited Curriculum
        </Button>
      </div>

      {/* Curriculum Details Overview */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              {curriculum.subjectArea} • {curriculum.academicLevel}
            </span>
            <h3 className="font-bold text-slate-900 dark:text-white text-lg mt-0.5">{curriculum.title}</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs">
              ABET Accredited
            </span>
          </div>
        </div>

        {/* Learning Outcome Statement Mapping */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-4 h-4 text-purple-600" /> Bloom's Taxonomy Learning Outcomes
          </h4>

          <div className="space-y-2">
            {curriculum.outcomes.map((out) => (
              <div key={out.id} className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20 text-xs flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-purple-600 text-white font-bold text-[9px] uppercase">
                    {out.bloomsLevel}
                  </span>
                  <p className="font-medium text-slate-900 dark:text-white">{out.outcomeStatement}</p>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

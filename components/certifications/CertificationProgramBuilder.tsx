"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CertificationProgram } from "@/lib/types/certifications";
import {
Award,Plus,
Sparkles
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockPrograms: CertificationProgram[] = [
  {
    id: "prog-101",
    title: "Certified Full-Stack Quantum Systems Engineer (CFSQE)",
    category: "Professional",
    issuingAuthority: "QuizDorm Global Certification Board & MIT Open",
    validityYears: 3,
    requiredExamScorePercent: 85,
    skillsCovered: ["Quantum Mechanics", "PyTorch AI", "PennyLane SDK", "Pauli Matrices"],
    totalLearnersCertified: 1420,
    status: "Active",
  },
  {
    id: "prog-102",
    title: "Enterprise AI Infrastructure Specialist (EAIS)",
    category: "Corporate",
    issuingAuthority: "QuizDorm Corporate Training Authority",
    validityYears: 2,
    requiredExamScorePercent: 80,
    skillsCovered: ["TensorFlow", "Kubernetes GPU", "Model Alignment"],
    totalLearnersCertified: 890,
    status: "Active",
  },
];

export function CertificationProgramBuilder() {
  const [programs, setPrograms] = useState<CertificationProgram[]>(mockPrograms);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<CertificationProgram["category"]>("Professional");

  const handleCreateProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newProg: CertificationProgram = {
      id: `prog-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      issuingAuthority: "QuizDorm International Examination Board",
      validityYears: 3,
      requiredExamScorePercent: 80,
      skillsCovered: ["Core Competency", "Practical Assessment"],
      totalLearnersCertified: 0,
      status: "Active",
    };
    setPrograms([newProg, ...programs]);
    setNewTitle("");
    toast.success(`Certification Program "${newProg.title}" created successfully!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-3 border border-amber-500/30">
            <Award className="w-3.5 h-3.5 text-amber-400" /> Global Certification Authority
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Certification Program Builder</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Design academic, professional, skill-based, corporate, and government-recognized digital certification programs with passing threshold rules and skill mappings.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Course-to-Certification Mapper...")} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Map Course Curriculum
        </Button>
      </div>

      {/* Program Builder Form Bar */}
      <form onSubmit={handleCreateProgram} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3 text-xs">
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Certification Title (e.g. Certified Data Science Specialist)"
          className="rounded-xl bg-slate-50 dark:bg-slate-800"
          required
        />
        <select
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as CertificationProgram["category"])}
          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs shrink-0"
        >
          <option value="Academic">Academic</option>
          <option value="Professional">Professional</option>
          <option value="Skill-Based">Skill-Based</option>
          <option value="Corporate">Corporate</option>
          <option value="Government">Government</option>
        </select>
        <Button type="submit" className="bg-indigo-600 text-white font-bold text-xs rounded-xl shrink-0">
          <Plus className="w-4 h-4 mr-1" /> Launch Certification Program
        </Button>
      </form>

      {/* Active Certification Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950">
                    {p.category} Certification
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{p.title}</h3>
                  <p className="text-xs text-slate-500">{p.issuingAuthority}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                  {p.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Validity Period:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{p.validityYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Exam Passing Threshold:</span>
                  <span className="font-mono font-bold text-rose-600">{p.requiredExamScorePercent}% Minimum</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Mapped Verified Skills:</span>
                <div className="flex flex-wrap gap-1">
                  {p.skillsCovered.map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-bold">{p.totalLearnersCertified.toLocaleString()} Certified Graduates</span>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                Program Settings
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

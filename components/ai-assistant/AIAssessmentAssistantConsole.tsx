"use client";

import React, { useState } from "react";
import { AIAssessmentDraft } from "@/lib/types/ai-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, CheckCircle2, RefreshCw, FileCheck, Sliders, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockDraft: AIAssessmentDraft = {
  id: "asg-draft-1",
  title: "Quantum Entanglement & Pauli Matrix Assessment",
  subject: "Physics",
  totalMarks: 50,
  questions: [
    { id: "q1", questionText: "Which Pauli matrix represents quantum bit-flip operation?", options: ["Pauli X", "Pauli Y", "Pauli Z", "Identity I"], correctAnswer: "Pauli X", difficulty: "Easy", bloomsLevel: "Remember" },
    { id: "q2", questionText: "Derive Bell parameter S for state |Ψ+⟩ and demonstrate non-locality violation.", correctAnswer: "Requires matrix expansions of σa ⊗ σb operators.", difficulty: "Hard", bloomsLevel: "Evaluate" },
  ],
  rubric: [
    { criterion: "Matrix Notation Rigor", maxPoints: 20, guidance: "Full points for explicit 2x2 tensor products." },
    { criterion: "Physical Interpretation", maxPoints: 10, guidance: "Clear explanation of local hidden variable bounds." },
  ],
  createdAt: "Feb 24, 2026",
};

export function AIAssessmentAssistantConsole() {
  const [draft, setDraft] = useState<AIAssessmentDraft>(mockDraft);
  const [promptTopic, setPromptTopic] = useState("Quantum Mechanics");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`AI Generated 5 High-Quality Assessment Questions for "${promptTopic}"!`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Question & Rubric Architect
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCheck className="w-6 h-6 text-indigo-600" /> AI Assessment Assistant
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automate question generation, answer key creation, rubric generation, and difficulty level tuning.
          </p>
        </div>
      </div>

      {/* Generator Bar */}
      <form onSubmit={handleGenerateQuestions} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-2 text-xs">
        <Input
          value={promptTopic}
          onChange={(e) => setPromptTopic(e.target.value)}
          placeholder="Topic for question bank..."
          className="rounded-xl"
          required
        />
        <Button type="submit" disabled={isGenerating} className="bg-indigo-600 text-white font-bold text-xs rounded-xl shrink-0">
          {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
          Generate Quiz & Rubric
        </Button>
      </form>

      {/* Questions Preview List */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">{draft.title}</h3>

        <div className="space-y-3">
          {draft.questions.map((q, idx) => (
            <div key={q.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Question #{idx + 1}</span>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 font-bold text-[10px]">{q.bloomsLevel}</span>
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 font-bold text-[10px]">{q.difficulty}</span>
                </div>
              </div>
              <p className="font-bold text-slate-900 dark:text-white">{q.questionText}</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">Answer Key: {q.correctAnswer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AILessonPlan } from "@/lib/types/ai-assistant";
import {
Clock,
Download,
Lightbulb,
RefreshCw,
Sparkles,
Target
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockPlan: AILessonPlan = {
  id: "plan-1",
  topic: "Quantum Entanglement & Non-Locality",
  subject: "Physics",
  gradeLevel: "Grade 12 / University Prep",
  durationMinutes: 60,
  learningObjectives: [
    { level: "Understand", text: "Explain the physical meaning of quantum entanglement state vectors." },
    { level: "Apply", text: "Calculate joint measurement expectations for Bell state |Ψ+⟩." },
    { level: "Evaluate", text: "Compare classical local hidden variable limits against quantum experimental violations." },
  ],
  timeline: [
    { timeMinutes: 10, phase: "Warm-Up & Hook", activity: "Interactive double-photon polarization thought experiment", teacherAction: "Show animation on smart display" },
    { timeMinutes: 25, phase: "Core Instruction", activity: "Derivation of Bell's Inequality S ≤ 2", teacherAction: "Board work on Pauli matrix tensor products" },
    { timeMinutes: 15, phase: "Collaborative Lab", activity: "Pairs analyze simulated photon coincidence counts", teacherAction: "Circulate and guide student pairs" },
    { timeMinutes: 10, phase: "Wrap-Up & Check", activity: "3-question live exit poll assessment", teacherAction: "Review instant class analytics" },
  ],
  homeworkSuggestion: "Solve Problem 4.2 in Griffiths: Derive CHSH inequality violation for arbitrary measurement angles θ = 45°.",
  recommendedResources: [
    "MIT OCW 8.04 Quantum Mechanics Lecture 14 Slides",
    "PhET Quantum Interference Interactive Simulation Applet",
  ],
  createdAt: "Feb 24, 2026",
};

export function AILessonPlannerHub() {
  const [topic, setTopic] = useState("Quantum Entanglement & Non-Locality");
  const [subject, setSubject] = useState("Physics");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<AILessonPlan>(mockPlan);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      const newGenerated: AILessonPlan = {
        ...mockPlan,
        id: `plan-${Date.now()}`,
        topic,
        subject,
        createdAt: "Just now",
      };
      setCurrentPlan(newGenerated);
      toast.success(`AI Generated 60-minute Lesson Plan for "${topic}"!`);
    }, 2000);
  };

  const handleExportPDF = () => {
    toast.success("Exported AI Lesson Plan to PDF format!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Pedagogical Curriculum Planner
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Lesson Planner & Curriculum Engine</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Automate daily, weekly, and semester lesson planning mapped to Bloom&apos;s Taxonomy learning objectives, minute-by-minute timeline breakdowns, and homework suggestions.
          </p>
        </div>

        <Button onClick={handleExportPDF} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Export Lesson Plan (PDF)
        </Button>
      </div>

      {/* Generator Form Bar */}
      <form onSubmit={handleGeneratePlan} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3">
        <Input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Lesson Topic (e.g. Photosynthesis, Binary Search Trees)"
          className="rounded-xl text-xs bg-slate-50 dark:bg-slate-800"
          required
        />
        <Input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Subject / Discipline"
          className="rounded-xl text-xs bg-slate-50 dark:bg-slate-800 w-full sm:w-48"
          required
        />
        <Button
          type="submit"
          disabled={isGenerating}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shrink-0"
        >
          {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1.5" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
          Generate Lesson Plan
        </Button>
      </form>

      {/* Generated Lesson Plan View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              {currentPlan.subject} • {currentPlan.gradeLevel}
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">{currentPlan.topic}</h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
            <Clock className="w-4 h-4 text-indigo-500" /> {currentPlan.durationMinutes} Minutes Session
          </div>
        </div>

        {/* Bloom's Taxonomy Objectives */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Target className="w-4 h-4 text-indigo-600" /> Bloom&apos;s Taxonomy Learning Objectives
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentPlan.learningObjectives.map((obj, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-500/30 text-xs space-y-1">
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[9px] uppercase">{obj.level}</span>
                <p className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed pt-1">{obj.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Minute-by-Minute Timeline */}
        <div className="space-y-3">
          <h3 className="font-bold text-xs text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-rose-600" /> Minute-by-Minute Instructional Timeline
          </h3>

          <div className="space-y-2">
            {currentPlan.timeline.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs gap-4">
                <div className="flex items-center gap-3">
                  <span className="w-12 py-1 bg-indigo-600 text-white font-mono font-bold text-[10px] text-center rounded-lg">
                    {step.timeMinutes} Mins
                  </span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{step.phase}</h4>
                    <p className="text-slate-500">{step.activity}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Action: {step.teacherAction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Homework & Resources */}
        <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-2xl space-y-2 text-xs">
          <span className="font-bold text-purple-700 dark:text-purple-300 flex items-center gap-1">
            <Lightbulb className="w-4 h-4 text-amber-400" /> Suggested Homework Assignment
          </span>
          <p className="text-slate-700 dark:text-slate-200">{currentPlan.homeworkSuggestion}</p>
        </div>
      </div>
    </div>
  );
}

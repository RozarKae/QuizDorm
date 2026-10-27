"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AILectureSummary } from "@/lib/types/classroom";
import {
CheckCircle2,
FileText,
Globe,
Languages,
Lightbulb,
MessageSquare,
RefreshCw,
Sparkles,
Zap
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockSummary: AILectureSummary = {
  id: "sum-1",
  sessionTopic: "Quantum Entanglement & Bell State Proofs",
  date: "Feb 24, 2026",
  keyTakeaways: [
    "Bell's inequality sets an upper bound on classical local hidden variable correlations (≤ 2).",
    "Quantum entangled states violate Bell inequality with maximum value of 2√2 ≈ 2.82.",
    "Tensor product Hilbert space 𝐻A ⊗ 𝐻B enables non-local quantum state representation.",
  ],
  actionItems: [
    "Review matrix expansions for Pauli Y operator in homework problem 4.",
    "Prepare code setup for Qiskit Bell state simulator by Thursday.",
  ],
  suggestedHomework: [
    "Calculate Bell parameter S for state |Ψ-⟩ = 1/√2 (|01⟩ - |10⟩).",
    "Explain how CHSH inequality differs from original Bell 1964 formulation.",
  ],
  transcriptExcerpt: "Dr. Vance: 'Notice how when measurement angle θ is set to 45 degrees, classical correlation fails to predict the observed photon coincidence counts...'",
};

export function AIClassroomAssistantPanel() {
  const [summary] = useState<AILectureSummary>(mockSummary);
  const [selectedLanguage, setSelectedLanguage] = useState("English (US)");
  const [captionsActive, setCaptionsActive] = useState(true);
  const [studentQuestion, setStudentQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("AI has processed live transcript and generated instant lecture digest!");
    }, 2000);
  };

  const handleAskAiBot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentQuestion.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setAiAnswer(`AI Assistant: In quantum mechanics, quantum entanglement occurs when particles interact in ways such that the quantum state of each particle cannot be described independently of the state of the others, even when the particles are separated by a large distance.`);
      toast.success("AI Teaching Copilot answered the question!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-purple-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-2 border border-purple-500/30">
              <Sparkles className="w-3.5 h-3.5" /> AI Classroom Copilot Engine
            </div>
            <h2 className="text-2xl font-bold">AI Classroom Assistant</h2>
            <p className="text-xs text-purple-200 mt-1 max-w-xl">
              Automatic lecture summarization, real-time closed captions, automated homework generation, and intelligent Q&A assistance.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-2 rounded-xl border border-slate-700 text-xs">
              <Globe className="w-4 h-4 text-indigo-400" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="bg-transparent text-white font-semibold outline-none cursor-pointer"
              >
                <option value="English (US)" className="bg-slate-900">English (US)</option>
                <option value="Spanish" className="bg-slate-900">Spanish (Español)</option>
                <option value="French" className="bg-slate-900">French (Français)</option>
                <option value="Hindi" className="bg-slate-900">Hindi (हिंदी)</option>
                <option value="Mandarin" className="bg-slate-900">Mandarin (中文)</option>
              </select>
            </div>

            <Button
              onClick={() => setCaptionsActive(!captionsActive)}
              variant={captionsActive ? "default" : "outline"}
              className={`text-xs rounded-xl ${captionsActive ? "bg-purple-600 text-white" : "border-white/20 text-white"}`}
            >
              <Languages className="w-4 h-4 mr-1.5" />
              {captionsActive ? "Captions: ON" : "Captions: OFF"}
            </Button>
          </div>
        </div>
      </div>

      {/* Live Closed Captions Display Box */}
      {captionsActive && (
        <div className="bg-slate-950 p-4 rounded-2xl border border-purple-500/30 text-white space-y-2 shadow-lg">
          <div className="flex items-center justify-between text-xs text-purple-400 font-bold">
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-400 animate-pulse" /> Live Speech-to-Text Transcriber ({selectedLanguage})
            </span>
            <span className="text-[10px] text-slate-400">Delay: ~200ms</span>
          </div>
          <p className="text-sm font-mono text-slate-200 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
            &ldquo;{mockSummary.transcriptExcerpt}&rdquo;
          </p>
        </div>
      )}

      {/* AI Lecture Summary & Homework Generator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lecture Summary Box (Cols 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-600" /> AI Lecture Digest & Takeaways
              </h3>
              <p className="text-xs text-slate-500">{summary.sessionTopic} • {summary.date}</p>
            </div>
            <Button
              onClick={handleGenerateSummary}
              disabled={isGenerating}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-xl"
            >
              {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
              Refresh Digest
            </Button>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2 text-indigo-600 dark:text-indigo-400">
                Key Conceptual Takeaways
              </h4>
              <ul className="space-y-2">
                {summary.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] mb-2 text-purple-600 dark:text-purple-400">
                AI Suggested Homework & Quiz Items
              </h4>
              <ul className="space-y-2">
                {summary.suggestedHomework.map((hw, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-purple-500/5 p-3 rounded-xl border border-purple-500/20">
                    <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-200">{hw}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* AI Student Q&A Bot Sidebar (Col 1) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-600" /> AI Student Q&A Copilot
            </h3>
            <p className="text-xs text-slate-500">Ask any concept clarification question during class for instant AI explanation.</p>

            {aiAnswer && (
              <div className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-xl text-xs space-y-1">
                <p className="text-slate-700 dark:text-slate-200">{aiAnswer}</p>
              </div>
            )}
          </div>

          <form onSubmit={handleAskAiBot} className="space-y-2 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
            <Input
              value={studentQuestion}
              onChange={(e) => setStudentQuestion(e.target.value)}
              placeholder="Ask AI Copilot..."
              className="rounded-xl text-xs"
            />
            <Button
              type="submit"
              disabled={isGenerating}
              className="w-full bg-indigo-600 text-white font-semibold text-xs rounded-xl"
            >
              {isGenerating ? "Thinking..." : "Ask AI Assistant"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

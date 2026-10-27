"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GeneratedContent } from "@/lib/types/ai-assistant";
import {
Copy,
FileText,
RefreshCw,
Sparkles
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockContent: GeneratedContent = {
  id: "cnt-1",
  title: "Quantum Entanglement & Pauli Matrix Derivations — Comprehensive Study Flashcards & Lecture Notes",
  type: "Flashcards",
  subject: "Physics",
  content: "Lecture Summary:\nQuantum entanglement is a physical phenomenon in which quantum states of two or more particles cannot be described independently...",
  flashcards: [
    { question: "What is the mathematical condition for a two-qubit state |Ψ⟩ to be entangled?", answer: "State cannot be factored into product state |ψA⟩ ⊗ |ψB⟩." },
    { question: "What is the maximum Bell inequality violation value S?", answer: "2√2 ≈ 2.828 (Tsirelson's bound)." },
    { question: "Which Pauli matrix corresponds to bit-flip operation?", answer: "Pauli X matrix σx = [[0, 1], [1, 0]]." },
  ],
  createdAt: "Feb 24, 2026",
};

export function AIContentGeneratorStudio() {
  const [contentType, setContentType] = useState<GeneratedContent["type"]>("Flashcards");
  const [promptTopic, setPromptTopic] = useState("Quantum Physics Pauli Matrices");
  const [isGenerating, setIsGenerating] = useState(false);
  const [content, setContent] = useState<GeneratedContent>(mockContent);

  const handleGenerateContent = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setContent({
        ...mockContent,
        id: `cnt-${Date.now()}`,
        title: `AI Generated ${contentType} — ${promptTopic}`,
        type: contentType,
        createdAt: "Just now",
      });
      toast.success(`AI Generated ${contentType} for "${promptTopic}"!`);
    }, 1800);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content.content);
    toast.success("Content copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> High-Speed AI Material Synthesis
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" /> AI Teaching Content Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Instantly generate lecture notes, presentation outlines, student worksheets, practice flashcards, and reading passages.
          </p>
        </div>

        <Button onClick={handleCopy} variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
          <Copy className="w-4 h-4 mr-1.5" /> Copy Text
        </Button>
      </div>

      {/* Type Selector & Form Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-2">
          {["Flashcards", "Lecture Notes", "Worksheet", "Reading Passage", "Mind Map"].map((t) => (
            <button
              key={t}
              onClick={() => setContentType(t as GeneratedContent["type"])}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                contentType === t ? "bg-purple-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <form onSubmit={handleGenerateContent} className="flex gap-2 text-xs">
          <Input
            value={promptTopic}
            onChange={(e) => setPromptTopic(e.target.value)}
            placeholder="Topic prompt (e.g. Organic Reactions Mechanism, French Grammar Conjugations)"
            className="rounded-xl"
            required
          />
          <Button type="submit" disabled={isGenerating} className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shrink-0">
            {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
            Generate Material
          </Button>
        </form>
      </div>

      {/* Content Display Stage */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">{content.title}</h3>

        {content.type === "Flashcards" && content.flashcards ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.flashcards.map((fc, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/20 text-xs space-y-2 flex flex-col justify-between">
                <span className="font-bold text-purple-600 dark:text-purple-400">Card #{idx + 1}</span>
                <p className="font-bold text-slate-900 dark:text-white">{fc.question}</p>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  {fc.answer}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <pre className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 whitespace-pre-wrap">
            {content.content}
          </pre>
        )}
      </div>
    </div>
  );
}

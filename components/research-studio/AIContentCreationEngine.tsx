"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
Copy,
RefreshCw,
Sparkles
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

export function AIContentCreationEngine() {
  const [topic, setTopic] = useState("Quantum Computing & Qubit Superposition");
  const [mode, setMode] = useState<"Article" | "Worksheet" | "Translate" | "Proofread">("Article");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedOutput, setGeneratedOutput] = useState(
    "Quantum computing leverages quantum mechanical phenomena such as superposition and entanglement to perform calculations that are intractable for classical supercomputers..."
  );

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedOutput(`AI Generated ${mode} Content for topic "${topic}":\n\n1. Executive Summary & Core Definitions\n2. Key Mathematical Formulations\n3. Practical Classroom Problem Set`);
      toast.success(`AI Generated ${mode} for "${topic}"!`);
    }, 1600);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedOutput);
    toast.success("AI content copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Study Material Builder
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Study Sheets & Content Studio</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Generate study sheets, summarize chapters, proofread essays, and translate notes for your study squad.
          </p>
        </div>

        <Button onClick={handleCopy} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Copy className="w-4 h-4 mr-1.5" /> Copy Output
        </Button>
      </div>

      {/* Mode Selector & Generator Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-2">
          {(["Article", "Worksheet", "Translate", "Proofread"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                mode === m ? "bg-purple-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <form onSubmit={handleGenerate} className="flex gap-2 text-xs">
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What topic do you want to create study notes for?..."
            className="rounded-xl"
            required
          />
          <Button type="submit" disabled={isGenerating} className="bg-purple-600 text-white font-bold text-xs rounded-xl shrink-0">
            {isGenerating ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Sparkles className="w-3.5 h-3.5 mr-1" />}
            Generate {mode}
          </Button>
        </form>
      </div>

      {/* Output Display Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm">Generated AI Content Output</h3>
        <pre className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 whitespace-pre-wrap">
          {generatedOutput}
        </pre>
      </div>
    </div>
  );
}

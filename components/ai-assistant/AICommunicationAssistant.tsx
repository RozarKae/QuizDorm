"use client";

import React, { useState } from "react";
import { CommunicationDraft } from "@/lib/types/ai-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, Mail, Send, Copy, Globe, Sparkles, Check
} from "lucide-react";
import { toast } from "sonner";

const mockDraft: CommunicationDraft = {
  id: "comm-1",
  recipientType: "Parent",
  subjectLine: "Academic Update: Exceptional Progress in Mid-Term Physics & Quantum Mechanics",
  bodyText: "Dear Parent,\n\nWe are pleased to inform you that Alexander Wright achieved an A+ grade (96%) in the recent Mid-Term Physics Examination. Alexander demonstrated outstanding mastery of matrix tensor products and quantum entanglement concepts.\n\nBest regards,\nDr. Eleanor Vance",
  targetLanguage: "English",
  channel: "Email",
  createdAt: "Feb 24, 2026",
};

export function AICommunicationAssistant() {
  const [draft, setDraft] = useState<CommunicationDraft>(mockDraft);
  const [studentName, setStudentName] = useState("Alexander Wright");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`AI Generated personalized Parent Email for ${studentName}!`);
    }, 1500);
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(`${draft.subjectLine}\n\n${draft.bodyText}`);
    toast.success("Draft email copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Multi-Channel Communication Engine
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Mail className="w-6 h-6 text-indigo-600" /> AI Stakeholder Communication Assistant
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automate personalized parent communication drafts, student progress reports, SMS/Email notifications, and multi-language translations.
          </p>
        </div>

        <Button onClick={handleCopyText} variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
          <Copy className="w-4 h-4 mr-1.5" /> Copy Email Draft
        </Button>
      </div>

      {/* Draft Generator Bar */}
      <form onSubmit={handleGenerateDraft} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-2 text-xs">
        <Input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name for Report..."
          className="rounded-xl"
          required
        />
        <Button type="submit" disabled={isGenerating} className="bg-indigo-600 text-white font-bold text-xs rounded-xl shrink-0">
          <Sparkles className="w-3.5 h-3.5 mr-1" /> Draft Parent Update
        </Button>
      </form>

      {/* Generated Email Preview Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
            Channel: {draft.channel} • Target: {draft.recipientType}
          </span>
          <span className="text-xs text-slate-400">Language: {draft.targetLanguage}</span>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase">Subject Line</label>
          <p className="font-bold text-slate-900 dark:text-white text-sm bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            {draft.subjectLine}
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-500 uppercase">Message Body</label>
          <pre className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 whitespace-pre-wrap">
            {draft.bodyText}
          </pre>
        </div>
      </div>
    </div>
  );
}

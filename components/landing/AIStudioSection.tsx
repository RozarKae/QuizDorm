"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, FileText, Cpu, CheckCircle2, ArrowRight, Layers, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AIDocumentQuizModal } from "@/components/ai/AIDocumentQuizModal";
import SectionDivider from "@/components/ui/section-divider";

export default function AIStudioSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="py-24 relative z-10 border-b border-border bg-background aurora-grid transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-border mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-800 bg-emerald-50 dark:text-[#65F59A] dark:bg-[#17251E] px-3 py-1 rounded-full border border-emerald-300 dark:border-[#65F59A]/30 font-semibold shadow-xs">
              OMNI-CURRICULUM INTELLIGENCE // AI SYNTHESIZER
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-[#F2F7F3] tracking-tight">
              From Complex Curriculum <br />
              <span className="bg-gradient-to-r from-[#047857] to-[#0D9488] dark:from-[#65F59A] dark:to-[#38D9B0] bg-clip-text text-transparent">
                to Exam-Ready Mastery.
              </span>
            </h2>
          </div>
          <p className="text-sm font-normal text-slate-600 dark:text-[#A0AEA5] max-w-md leading-relaxed">
            Drop in your syllabus PDFs, notes, lecture slides, or textbook captures. QuizDorm AI extracts core concepts and synthesizes rigorous, multi-format assessments with zero fluff.
          </p>
        </div>

        {/* Interactive 3-Stage Pipeline Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-10">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-emerald-600/40 transition-all shadow-md group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-[#17251E] dark:text-[#65F59A] dark:border-[#65F59A]/20 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                01
              </div>
              <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-[#69786F]">Drop Notes</span>
            </div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-[#F2F7F3]">
              Drop PDFs, Notes or Snaps
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed">
              Drop PDFs, Word files, Markdown notes, or photos of your test papers. Fast built-in parsing reads your study material cleanly.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-teal-700 dark:text-[#38D9B0]">
              <FileCheck className="w-3.5 h-3.5" /> PDF, DOCX, TXT, MD, Photos
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-card border border-border space-y-4 hover:border-teal-600/40 transition-all shadow-md group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 border border-teal-200 dark:bg-[#17251E] dark:text-[#38D9B0] dark:border-[#38D9B0]/20 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                02
              </div>
              <span className="font-mono text-[10px] uppercase text-slate-500 dark:text-[#69786F]">Exam Focus</span>
            </div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-[#F2F7F3]">
              Pulls Real Exam Concepts
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed">
              QuizDorm AI extracts key formulas, historical dates, theorems, and definitions straight from your material so every question is high-yield.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-emerald-700 dark:text-[#65F59A]">
              <Cpu className="w-3.5 h-3.5" /> 100% Grounded in Your Material
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-card border border-emerald-300 dark:border-[#65F59A]/30 shadow-md space-y-4 hover:border-emerald-500/60 transition-all group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 dark:bg-[#17251E] dark:text-[#65F59A] dark:border-[#65F59A]/40 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                03
              </div>
              <span className="font-mono text-[10px] uppercase text-emerald-800 dark:text-[#65F59A] font-bold">Interactive Formats</span>
            </div>
            <h3 className="font-display text-base font-bold text-slate-900 dark:text-[#F2F7F3]">
              Cooks Up 9 Question Styles
            </h3>
            <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed">
              Makes MCQs, match-the-following, drag-and-drop, fill-in-blanks, and error-spotting questions with tricky options so you never get caught off guard.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-emerald-700 dark:text-[#65F59A] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> High-Accuracy Quality Filtered
            </div>
          </div>

        </div>

        {/* Launch Studio Action Bar */}
        <div className="bg-slate-50 border border-slate-200 dark:bg-[#111B17] dark:border-[rgba(160,190,170,0.18)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-emerald-800 dark:text-[#65F59A] font-bold">
              Ready to Accelerate Your Prep?
            </div>
            <h4 className="text-xl font-bold font-display text-slate-900 dark:text-[#F2F7F3]">
              Synthesize Your First Document-Grounded Quiz in 10 Seconds
            </h4>
            <p className="text-xs text-slate-600 dark:text-[#A0AEA5] max-w-lg">
              Upload course PDFs or slides and let the AI generate syllabus-aligned assessments with zero manual question entry.
            </p>
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            className="bg-[#047857] hover:bg-[#065F46] text-white dark:bg-[#65F59A] dark:hover:bg-[#52E086] dark:text-[#070B0A] font-mono text-xs font-bold rounded-[6px] px-7 h-11 shadow-sm flex items-center gap-2 shrink-0 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Launch AI Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      <AIDocumentQuizModal
        open={modalOpen}
        onOpenChange={setModalOpen}
      />

      <SectionDivider variant="editorial" label="LIVE MULTIPLAYER SHOWDOWN" />
    </section>
  );
}

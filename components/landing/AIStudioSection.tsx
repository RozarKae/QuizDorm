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
    <section className="py-24 relative z-10 border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A] aurora-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-12 border-b border-[rgba(160,190,170,0.12)] mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-3 py-1 rounded-full border border-[#65F59A]/30 font-semibold shadow-[0_0_12px_rgba(101,245,154,0.15)]">
              GEMINI 3.5 MULTIMODAL // COGNITIVE STUDIO
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#F2F7F3] tracking-tight">
              From First Thought <br />
              <span className="bg-gradient-to-r from-[#65F59A] to-[#38D9B0] bg-clip-text text-transparent">
                to Brilliant Question.
              </span>
            </h2>
          </div>
          <p className="text-sm font-normal text-[#A0AEA5] max-w-md leading-relaxed">
            Upload textbooks, syllabus PDFs, research notes, or diagrams. Gemini extracts factual curriculum concepts and synthesizes deep, pedagogically validated assessments.
          </p>
        </div>

        {/* Interactive 3-Stage Pipeline Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-10">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] space-y-4 hover:border-[#65F59A]/40 transition-all shadow-xl group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#17251E] text-[#65F59A] border border-[#65F59A]/20 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                01
              </div>
              <span className="font-mono text-[10px] uppercase text-[#69786F]">Multimodal Ingestion</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#F2F7F3]">
              Curriculum Document Ingestion
            </h3>
            <p className="text-xs text-[#A0AEA5] leading-relaxed">
              Drop PDFs, Word files, Markdown notes, or scanned test sheets up to 50MB. Native Node.js decompression parses structure without loss.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-[#38D9B0]">
              <FileCheck className="w-3.5 h-3.5" /> PDF, DOCX, TXT, MD, Images
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-[#0C1210] border border-[rgba(160,190,170,0.14)] space-y-4 hover:border-[#38D9B0]/40 transition-all shadow-xl group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#17251E] text-[#38D9B0] border border-[#38D9B0]/20 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                02
              </div>
              <span className="font-mono text-[10px] uppercase text-[#69786F]">Concept Grounding</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#F2F7F3]">
              Semantic Concept Grounding
            </h3>
            <p className="text-xs text-[#A0AEA5] leading-relaxed">
              Gemini 3.5 identifies core premises, mathematical theorems, historical dates, and definitions directly from the document—preventing hallucinations.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-[#65F59A]">
              <Cpu className="w-3.5 h-3.5" /> Strict Source Document Grounding
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-[#0C1210] border border-[#65F59A]/30 shadow-[0_0_25px_rgba(101,245,154,0.1)] space-y-4 hover:border-[#65F59A]/60 transition-all group">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#17251E] text-[#65F59A] border border-[#65F59A]/40 flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform shadow-[0_0_10px_rgba(101,245,154,0.2)]">
                03
              </div>
              <span className="font-mono text-[10px] uppercase text-[#65F59A] font-bold">9 Native Architectures</span>
            </div>
            <h3 className="font-display text-base font-bold text-[#F2F7F3]">
              9-Architecture Synthesis
            </h3>
            <p className="text-xs text-[#A0AEA5] leading-relaxed">
              Synthesizes Single Choice, Matching, Drag & Drop, Fill-in-Blanks, Error Spotting, and Reasoning items with verified distractor homogeneity.
            </p>
            <div className="pt-2 flex items-center gap-2 font-mono text-[11px] text-[#65F59A] font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Deterministic Quality Gate Approved
            </div>
          </div>

        </div>

        {/* Launch Studio Action Bar */}
        <div className="bg-[#111B17] border border-[rgba(160,190,170,0.18)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-xs font-mono uppercase tracking-widest text-[#65F59A] font-bold">
              Try It Live With Any Document
            </div>
            <h4 className="text-xl font-bold font-display text-[#F2F7F3]">
              Launch the AI Document Quiz Maker
            </h4>
            <p className="text-xs text-[#A0AEA5] max-w-lg">
              Upload your syllabus or test instantly with curated biology, physics, and distributed systems sample presets.
            </p>
          </div>

          <Button
            onClick={() => setModalOpen(true)}
            className="bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono text-xs font-bold rounded-[6px] px-7 h-11 shadow-[0_0_20px_rgba(101,245,154,0.35)] flex items-center gap-2 shrink-0 transition-all"
          >
            <Sparkles className="w-4 h-4 fill-current" />
            <span>Launch AI Quiz Maker</span>
          </Button>
        </div>

      </div>

      {/* Embedded Live Modal Triggerable directly from Landing Page */}
      <AIDocumentQuizModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        defaultSubject="Computer Science"
        defaultTopic="Distributed Consensus Algorithms"
      />

      <SectionDivider variant="editorial" label="PLATFORM ENROLLMENT" />
    </section>
  );
}

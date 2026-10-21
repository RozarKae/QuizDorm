"use client";

import React, { useState } from "react";
import { ResearchProject, CitationItem } from "@/lib/types/research-studio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Sparkles, Plus, Copy, FileText, CheckCircle2, 
  Search, Link as LinkIcon, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const mockProjects: ResearchProject[] = [
  {
    id: "res-proj-1",
    title: "Quantum Entanglement & Decoherence Mitigation in Noisy Intermediate-Scale Quantum Hardware",
    discipline: "Quantum Physics & Computer Science",
    leadResearcher: "Dr. Eleanor Vance",
    collaboratorsCount: 4,
    status: "Under Peer Review",
    milestones: [
      { title: "Theoretical State Vector Derivation", isCompleted: true },
      { title: "IBM Quantum Hardware Pulse Calibration Test", isCompleted: true },
      { title: "Manuscript Draft Peer Review Submission", isCompleted: true },
    ],
    citationsCount: 24,
    createdAt: "Jan 12, 2026",
  },
];

const mockCitations: CitationItem[] = [
  {
    id: "cit-1",
    citationKey: "Vance2025Quantum",
    title: "Experimental Demonstration of Topological Qubit Decoherence Protection",
    authors: ["E. Vance", "A. Turing", "M. Chen"],
    journalOrConference: "Physical Review Letters (PRL)",
    year: 2025,
    doi: "10.1103/PhysRevLett.132.040501",
    bibtexSnippet: "@article{Vance2025Quantum,\n  title={Experimental Demonstration...},\n  author={Vance, E. and Turing, A.},\n  journal={PRL}, year={2025}\n}",
  },
];

export function ResearchWorkspaceHub() {
  const [projects, setProjects] = useState<ResearchProject[]>(mockProjects);
  const [citations, setCitations] = useState<CitationItem[]>(mockCitations);
  const [newTitle, setNewTitle] = useState("");

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newProj: ResearchProject = {
      id: `res-proj-${Date.now()}`,
      title: newTitle,
      discipline: "Academic Research",
      leadResearcher: "You (Principal Researcher)",
      collaboratorsCount: 1,
      status: "In Progress",
      milestones: [
        { title: "Literature Review & Hypothesis Formulation", isCompleted: false },
        { title: "Experimental Methodology Design", isCompleted: false },
      ],
      citationsCount: 0,
      createdAt: "Just now",
    };
    setProjects([newProj, ...projects]);
    setNewTitle("");
    toast.success(`Research Project "${newProj.title}" initialized!`);
  };

  const handleCopyBibtex = (snippet: string) => {
    navigator.clipboard.writeText(snippet);
    toast.success("BibTeX citation copied to clipboard!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <BookOpen className="w-3.5 h-3.5" /> Academic Research & Literature Workspace
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Academic Research Workspace</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Manage research projects, literature reviews, BibTeX/IEEE citation libraries, collaboration milestones, and AI hypothesis summaries.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening AI Study Review Assistant...")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" /> AI Study Review Assistant
        </Button>
      </div>

      {/* New Project Input */}
      <form onSubmit={handleCreateProject} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-2 text-xs">
        <Input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New Research Project Title..."
          className="rounded-xl"
          required
        />
        <Button type="submit" className="bg-purple-600 text-white font-bold text-xs rounded-xl shrink-0">
          <Plus className="w-4 h-4 mr-1" /> Create Project
        </Button>
      </form>

      {/* Active Projects Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Active Research Projects</h3>

        {projects.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                  {p.discipline}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{p.title}</h4>
              </div>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs">
                {p.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-500 uppercase text-[10px]">Research Milestones</span>
              {p.milestones.map((m, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className={`w-4 h-4 ${m.isCompleted ? "text-emerald-500" : "text-slate-300"}`} />
                  <span className={m.isCompleted ? "line-through text-slate-400" : ""}>{m.title}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Citation Library Section */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" /> BibTeX / IEEE Citation Library
        </h3>

        {citations.map((c) => (
          <div key={c.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">[{c.citationKey}]</span>
              <Button onClick={() => handleCopyBibtex(c.bibtexSnippet)} size="sm" variant="ghost" className="text-xs">
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy BibTeX
              </Button>
            </div>
            <p className="font-bold text-slate-900 dark:text-white">{c.title}</p>
            <p className="text-slate-500">{c.authors.join(", ")} • {c.journalOrConference} ({c.year})</p>
          </div>
        ))}
      </div>
    </div>
  );
}

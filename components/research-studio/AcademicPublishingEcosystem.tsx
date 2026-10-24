"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Globe, ShieldCheck, ExternalLink, Award, Sparkles, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

interface PeerReviewPaper {
  id: string;
  doiHash: string;
  title: string;
  authors: string;
  journalName: string;
  reviewStatus: "Double-Blind Peer Review" | "Accepted & Published" | "Revisions Requested";
}

const mockPapers: PeerReviewPaper[] = [
  { id: "p1", doiHash: "10.1016/j.quizdorm.2026.04.01", title: "Topological Error-Correcting Surface Codes on NISQ Processors", authors: "Dr. Eleanor Vance, Prof. Alan Turing", journalName: "QuizDorm Journal of Quantum Computing & AI", reviewStatus: "Accepted & Published" },
  { id: "p2", doiHash: "10.1016/j.quizdorm.2026.04.02", title: "Pedagogical Efficacy of AI Classroom Assistants in K-12 STEM Education", authors: "Alexander Wright, Beatriz Morales", journalName: "Journal of Open Educational Technology (OER)", reviewStatus: "Double-Blind Peer Review" },
];

export function AcademicPublishingEcosystem() {
  const [papers, setPapers] = useState<PeerReviewPaper[]>(mockPapers);

  const handleMintDOI = (title: string) => {
    toast.success(`DOI Minted & Registered with CrossRef for paper: "${title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Globe className="w-3.5 h-3.5 text-indigo-400" /> Global Educational Publishing Network
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Academic Publishing Ecosystem & OER Portal</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Educational journals, peer-review evaluation protocols, Open Educational Resources (OER), and CrossRef DOI digital object identifier minting.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Paper Submission Wizard...")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg">
          Submit Manuscript for Peer Review
        </Button>
      </div>

      {/* Papers List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {papers.map((paper) => (
          <div key={paper.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    DOI: {paper.doiHash}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{paper.title}</h3>
                  <p className="text-xs text-slate-500">{paper.authors}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${paper.reviewStatus === "Accepted & Published" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}>
                  {paper.reviewStatus}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
                <span className="text-slate-400">Journal:</span>
                <p className="font-semibold text-slate-800 dark:text-slate-200">{paper.journalName}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">CrossRef Registered</span>
              <Button onClick={() => handleMintDOI(paper.title)} size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> View OER Entry
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { PublishedPublication } from "@/lib/types/research-studio";
import { Button } from "@/components/ui/button";
import { 
  Globe, BookOpen, ExternalLink, Download, Sparkles, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const mockPubs: PublishedPublication[] = [
  {
    id: "pub-1",
    publicationTitle: "Principles of Quantum Physics & Matrix Mechanics — University Textbook Edition",
    format: "Digital Book",
    isbn: "ISBN 978-3-16-148410-0",
    publisher: "QuizDorm Academic Press",
    releaseDate: "Feb 20, 2026",
    downloadCount: 4120,
    publicPortalUrl: "https://quizdorm.edu/books/ISBN-978-3-16-148410-0",
    status: "Published",
  },
  {
    id: "pub-2",
    publicationTitle: "Full-Stack AI & Neural Networks Courseware Package",
    format: "Courseware",
    isbn: "ISBN 978-1-4028-9401-2",
    publisher: "QuizDorm Academic Press",
    releaseDate: "Mar 01, 2026",
    downloadCount: 1890,
    publicPortalUrl: "https://quizdorm.edu/courses/ISBN-978-1-4028-9401-2",
    status: "Scheduled",
  },
];

export function DigitalPublishingPlatform() {
  const [pubs, setPubs] = useState<PublishedPublication[]>(mockPubs);

  const handlePublishRelease = (id: string) => {
    setPubs((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: "Published" as const } : p))
    );
    toast.success("Publication Released to Public Institutional Digital Catalog!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Globe className="w-6 h-6 text-indigo-600" /> Digital Publishing Platform & Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Publish educational textbooks, courseware packages, and question banks with ISBN-ready metadata and scheduled releases.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Publishing Metadata Builder...")} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <BookOpen className="w-4 h-4 mr-1.5" /> Publish New Title
        </Button>
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pubs.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {p.isbn}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{p.publicationTitle}</h3>
                  <p className="text-xs text-slate-500">{p.publisher}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${p.status === "Published" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}>
                  {p.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Downloads:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{p.downloadCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Release Date:</span>
                  <span className="text-slate-500">{p.releaseDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-mono text-[10px]">Format: {p.format}</span>
              {p.status === "Scheduled" ? (
                <Button onClick={() => handlePublishRelease(p.id)} size="sm" className="bg-rose-600 text-white text-xs rounded-xl font-bold">
                  Release Catalog
                </Button>
              ) : (
                <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                  <ExternalLink className="w-3.5 h-3.5 mr-1" /> Public Portal
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

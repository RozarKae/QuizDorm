"use client";

import React, { useState } from "react";
import { LMSContentResource } from "@/lib/types/lms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Folder, FileText, Video, Music, File, Download, Upload, 
  Search, Tag, Cloud, ExternalLink
} from "lucide-react";
import { toast } from "sonner";

const mockContent: LMSContentResource[] = [
  { id: "cnt-1", title: "PyTorch Deep Learning & Tensor Operations Cheat Sheet.pdf", type: "PDF", fileSize: "4.2 MB", downloads: 340, uploadedBy: "Dr. Eleanor Vance", uploadedAt: "Feb 10, 2026", tags: ["PyTorch", "AI", "CheatSheet"] },
  { id: "cnt-2", title: "Quantum Circuit Simulation in Qiskit - Video Workshop.mp4", type: "Video", fileSize: "320 MB", downloads: 512, uploadedBy: "Prof. Alan Turing", uploadedAt: "Feb 12, 2026", tags: ["Qiskit", "Quantum"] },
  { id: "cnt-3", title: "Corporate Strategy & Financial Valuation Slide Deck.pptx", type: "Presentation", fileSize: "18.5 MB", downloads: 190, uploadedBy: "Marcus Sterling", uploadedAt: "Feb 15, 2026", tags: ["Business", "Strategy"] },
];

export function LMSContentLibrary() {
  const [resources, setResources] = useState<LMSContentResource[]>(mockContent);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");

  const handleDownload = (r: LMSContentResource) => {
    setResources((prev) =>
      prev.map((item) => (item.id === r.id ? { ...item, downloads: item.downloads + 1 } : item))
    );
    toast.success(`Downloading "${r.title}"...`);
  };

  const filtered = resources.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Folder className="w-6 h-6 text-indigo-600" /> Central Educational Content Repository
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Store, tag, search, and distribute lecture slides, PDF textbooks, audio notes, and video demonstrations across all LMS courses.
          </p>
        </div>

        <Button onClick={() => toast.info("Cloud storage connector active (Google Cloud Storage / S3).")} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Upload className="w-4 h-4 mr-1.5" /> Upload Learning Material
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search material title or tag..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["All", "PDF", "Video", "Presentation"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedType === type ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Content Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((r) => (
          <div key={r.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                  {r.type}
                </span>
                <span className="font-mono text-xs text-slate-400">{r.fileSize}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{r.title}</h4>
              <div className="flex flex-wrap gap-1">
                {r.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">{r.downloads} Downloads</span>
              <Button onClick={() => handleDownload(r)} size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                <Download className="w-3.5 h-3.5 mr-1" /> Download Resource
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

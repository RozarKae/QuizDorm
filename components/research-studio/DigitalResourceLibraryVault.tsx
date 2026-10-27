"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResourceLibraryAsset } from "@/lib/types/research-studio";
import {
Folder,
Search,
Sparkles,
Upload
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockAssets: ResourceLibraryAsset[] = [
  { id: "asset-1", assetName: "Pauli-Matrices-Tensor-Diagram.svg", assetType: "SVG Diagram", fileSizeBytes: 42000, tags: ["Quantum Physics", "Diagram", "Linear Algebra"], uploadedBy: "Dr. Eleanor Vance", uploadDate: "Feb 20, 2026", vectorVectorized: true },
  { id: "asset-2", assetName: "Lecture-14-Quantum-Entanglement.pdf", assetType: "PDF Document", fileSizeBytes: 2450000, tags: ["MIT OCW", "Textbook", "PDF"], uploadedBy: "Prof. Alan Turing", uploadDate: "Feb 22, 2026", vectorVectorized: true },
];

export function DigitalResourceLibraryVault() {
  const [assets] = useState<ResourceLibraryAsset[]>(mockAssets);
  const [searchTerm, setSearchTerm] = useState("");

  const handleUploadAsset = () => {
    toast.info("Uploading asset & indexing in Vector Database...");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI Semantic Vector Indexing
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Folder className="w-6 h-6 text-purple-600" /> Digital Resource Library & Knowledge Vault
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Central repository for PDF textbooks, SVG vector diagrams, high-res images, and question bank templates with semantic vector search.
          </p>
        </div>

        <Button onClick={handleUploadAsset} className="bg-purple-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Upload className="w-4 h-4 mr-1.5" /> Upload Asset
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Semantic vector search across assets..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* Asset Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((ast) => (
          <div key={ast.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase">
                  {ast.assetType}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {(ast.fileSizeBytes / 1024).toFixed(1)} KB
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ast.assetName}</h4>
              <div className="flex flex-wrap gap-1">
                {ast.tags.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-600 dark:text-slate-400">
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Uploaded by {ast.uploadedBy}</span>
              <span className="text-rose-500 font-bold text-[10px]">Vector Indexed</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

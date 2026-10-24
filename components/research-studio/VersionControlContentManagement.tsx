"use client";

import React, { useState } from "react";
import { ContentVersion } from "@/lib/types/research-studio";
import { Button } from "@/components/ui/button";
import { 
  GitBranch, GitCommit, GitMerge, RotateCcw, CheckCircle2, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockVersions: ContentVersion[] = [
  { versionHash: "v2.4.1-a8f", branchName: "main", commitMessage: "Added Theorem 4.1 Tsirelson Bound Proof", author: "Dr. Eleanor Vance", timestamp: "10 mins ago", linesAdded: 42, linesDeleted: 6 },
  { versionHash: "v2.4.0-99b", branchName: "main", commitMessage: "Initial Chapter 4 Hilbert Space Draft", author: "Prof. Alan Turing", timestamp: "2 hours ago", linesAdded: 180, linesDeleted: 0 },
];

export function VersionControlContentManagement() {
  const [versions, setVersions] = useState<ContentVersion[]>(mockVersions);
  const [activeBranch, setActiveBranch] = useState("main");

  const handleRollback = (hash: string) => {
    toast.success(`Restored content to commit hash ${hash}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-500/30">
            <GitBranch className="w-3.5 h-3.5" /> Git-Style Academic Content Versioning
          </div>
          <h2 className="text-2xl font-bold">Content Version Control & Branching</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Track revision history, switch content branches (`main`, `draft-v2`), compare side-by-side diffs, and restore prior versions.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => toast.success("Created new branch 'feature/ch5-edits'")} variant="outline" className="text-xs rounded-xl border-slate-700 text-white">
            <GitBranch className="w-4 h-4 mr-1.5" /> New Branch
          </Button>
        </div>
      </div>

      {/* Version Commit Tree */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
          <GitCommit className="w-4 h-4 text-indigo-600" /> Commit History Tree (Branch: <span className="font-mono text-indigo-600">{activeBranch}</span>)
        </h3>

        <div className="space-y-3">
          {versions.map((ver) => (
            <div key={ver.versionHash} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between text-xs gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {ver.versionHash}
                  </span>
                  <span className="font-bold text-slate-900 dark:text-white">{ver.commitMessage}</span>
                </div>
                <p className="text-slate-500 font-mono text-[11px]">
                  Author: {ver.author} • {ver.timestamp} • <span className="text-rose-600 font-bold">+{ver.linesAdded}</span> <span className="text-rose-600 font-bold">-{ver.linesDeleted}</span>
                </p>
              </div>

              <Button onClick={() => handleRollback(ver.versionHash)} size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700 shrink-0">
                <RotateCcw className="w-3.5 h-3.5 mr-1" /> Restore Commit
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { ConflictResolver } from "@/lib/mobile/conflictResolver";
import { SyncConflictItem } from "@/lib/types/mobile";
import { GitCompare, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ConflictResolverModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ConflictResolverModal({ open, onOpenChange }: ConflictResolverModalProps) {
  const [conflicts, setConflicts] = useState<SyncConflictItem[]>(ConflictResolver.getConflicts());

  if (!open) return null;

  const handleResolve = (id: string, strategy: any) => {
    const updated = ConflictResolver.resolveConflict(id, strategy);
    setConflicts(updated);
    toast.success(`Conflict resolved using "${strategy}" strategy!`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <GitCompare className="w-5 h-5 text-indigo-600 mr-2" /> Offline vs Cloud Conflict Resolver
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          {conflicts.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
              <span className="font-bold text-gray-900 dark:text-white text-sm block">{c.entityTitle}</span>

              <div className="grid grid-cols-2 gap-3 font-mono text-[11px]">
                <div className="p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-1">
                  <span className="text-indigo-600 font-bold font-sans block">Local Offline State</span>
                  <div className="text-gray-600 dark:text-gray-300">{c.localValue}</div>
                  <span className="text-[9px] text-gray-400 block">{new Date(c.localTimestamp).toLocaleTimeString()}</span>
                </div>

                <div className="p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-1">
                  <span className="text-purple-600 font-bold font-sans block">Cloud Server State</span>
                  <div className="text-gray-600 dark:text-gray-300">{c.serverValue}</div>
                  <span className="text-[9px] text-gray-400 block">{new Date(c.serverTimestamp).toLocaleTimeString()}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <Button onClick={() => handleResolve(c.id, "last_write_wins")} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                  Keep Offline State (Last Write Wins)
                </Button>
                <Button onClick={() => handleResolve(c.id, "merge")} size="sm" variant="outline" className="text-xs rounded-xl">
                  Merge Both
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

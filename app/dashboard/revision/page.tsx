"use client";

import React, { useState, useEffect } from "react";
import { SpacedRevisionItem } from "@/lib/types/adaptive";
import { SpacedRepetitionEngine } from "@/lib/adaptive/spacedRepetition";
import { SpacedRevisionQueue } from "@/components/adaptive/SpacedRevisionQueue";
import { RotateCcw, Calendar, CheckCircle2, RefreshCw, Play, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function RevisionCenterPage() {
  const [items, setItems] = useState<SpacedRevisionItem[]>([]);

  useEffect(() => {
    loadQueue();
  }, []);

  const loadQueue = () => {
    setItems(SpacedRepetitionEngine.getRevisionQueue());
  };

  const dueItems = items.filter((i) => i.status === "due");

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300">
                <RotateCcw className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                SM-2 Spaced Repetition
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Spaced Repetition Revision Center
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl">
              Prevent memory decay and boost long-term recall using automated SuperMemo SM-2 forgetting curve revision queues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/dashboard/quizzes/builder?mode=revision">
              <Button className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-amber-500/30">
                <Play className="w-4 h-4 mr-1.5" /> Start Revision Session
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <RotateCcw className="w-3.5 h-3.5 text-amber-500 mr-1" /> Revisions Due Today
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {dueItems.length} Items
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <Calendar className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Scheduled Queue
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {items.length} Total
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1" /> Memory Retention Rate
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
            96.4%
          </div>
        </Card>
      </div>

      {/* Main Revision Queue Widget */}
      <SpacedRevisionQueue items={items} onRefresh={loadQueue} />
    </div>
  );
}

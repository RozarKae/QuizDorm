"use client";

import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function LearningSuccessIndexCard() {
  return (
    <Card className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-2xl bg-white/10 text-purple-300">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">Overall Learning Success Index & Performance Score</h3>
            <span className="text-[10px] text-purple-300 font-mono">Predictive AI Model v3.7</span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/30">
          96.4 / 100 EXCELLENCE INDEX
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Consistency Score</span>
          <span className="font-bold text-rose-400 text-xl">98/100</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Accuracy Index</span>
          <span className="font-bold text-indigo-300 text-xl">94.2%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Goal Completion</span>
          <span className="font-bold text-amber-400 text-xl">91.5%</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
          <span className="text-purple-200 text-[10px] block font-sans">Growth Velocity</span>
          <span className="font-bold text-rose-400 text-xl">+14% / Mo</span>
        </div>
      </div>
    </Card>
  );
}

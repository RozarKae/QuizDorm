"use client";

import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Battery,Play,RotateCcw,Wifi } from "lucide-react";

export function MobilePreviewFrame() {
  return (
    <div className="w-[320px] h-[640px] rounded-[48px] border-[10px] border-slate-900 bg-slate-950 text-white shadow-2xl overflow-hidden mx-auto flex flex-col relative font-sans">
      {/* Dynamic Notch */}
      <div className="w-32 h-4 bg-slate-900 rounded-b-xl mx-auto flex items-center justify-center shrink-0 z-20">
        <div className="w-3 h-3 rounded-full bg-slate-950 border border-slate-800" />
      </div>

      {/* Status Bar */}
      <div className="px-6 py-1 flex items-center justify-between text-[10px] text-slate-400 font-mono shrink-0">
        <span>9:41 AM</span>
        <div className="flex items-center space-x-1">
          <Wifi className="w-3 h-3 text-rose-400" />
          <Battery className="w-3.5 h-3.5 text-slate-300" />
        </div>
      </div>

      {/* App Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        <div className="flex items-center justify-between">
          <Logo />
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            OFFLINE READY
          </span>
        </div>

        {/* Knowledge Streak */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900 to-indigo-900 border border-purple-500/30 space-y-1">
          <span className="text-[10px] text-purple-200 font-extrabold uppercase">Daily Study Streak</span>
          <div className="text-xl font-extrabold text-white flex items-center">
            7 Days Active 🔥
          </div>
        </div>

        {/* Quick Practice Card */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between font-bold">
            <span className="text-white text-xs">Calculus & Algebra Practice</span>
            <span className="text-[10px] text-rose-400">150 Qs Offline</span>
          </div>
          <p className="text-[10px] text-slate-400">Cached in local IndexedDB for zero latency quiz taking.</p>
          <Button size="sm" className="w-full text-xs h-7 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
            <Play className="w-3 h-3 mr-1" /> Start Practice Quiz
          </Button>
        </div>

        {/* Spaced Revision Queue */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="font-bold text-xs text-amber-400 flex items-center">
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> SM-2 Revision (3 Items Due)
          </span>
          <div className="p-2 rounded-xl bg-slate-950 text-[10px] text-slate-300">
            • Circulatory Anatomy (Review Due)
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-around items-center text-[10px] font-bold text-slate-400 shrink-0">
        <span className="text-indigo-400">Home</span>
        <span>Quizzes</span>
        <span>Revision</span>
        <span>Profile</span>
      </div>
    </div>
  );
}

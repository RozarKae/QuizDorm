"use client";

import { Card } from "@/components/ui/card";
import { CheckCircle2,Trophy } from "lucide-react";

export function Version3MilestoneCard() {
  const version3Phases = [
    { code: "3.0", title: "Native Mobile Platform & Offline Sync Engine" },
    { code: "3.1", title: "Parent & Guardian Ecosystem & AI Family Insights" },
    { code: "3.2", title: "Offline Edge Computing & Campus LAN Server Nodes" },
    { code: "3.3", title: "LMS, SIS & Academic Ecosystem Integration Platform" },
    { code: "3.4", title: "Global Rankings, Olympiads & Competition Ecosystem" },
    { code: "3.5", title: "Educational Marketplace & Creator Revenue Economy" },
    { code: "3.6", title: "Conversational AI Tutor & Doubt Resolution Copilot" },
    { code: "3.7", title: "AI Performance Coach, XAI & What-If Simulator" },
    { code: "3.8", title: "Community, Quiz Clubs & Mentorship Network" },
    { code: "3.9", title: "Global Education Cloud & Worldwide Ecosystem" },
  ];

  return (
    <Card className="p-6 bg-gradient-to-r from-slate-950 via-purple-950 to-slate-900 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-2xl bg-white/10 text-rose-400">
            <Trophy className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold text-white">QUIZDORM VERSION 3.0 — RELEASE READINESS MILESTONE</h3>
            <span className="text-xs text-rose-300 font-mono font-bold">100% Core Requirements Implemented & Verified</span>
          </div>
        </div>

        <span className="px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/30">
          VERSION 3.0 GOLD MASTER
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
        {version3Phases.map((phase) => (
          <div key={phase.code} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center space-x-3">
            <CheckCircle2 className="w-4 h-4 text-rose-400 shrink-0" />
            <div>
              <span className="font-bold text-rose-300 block text-[10px]">Phase {phase.code}</span>
              <span className="text-white font-sans font-bold">{phase.title}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

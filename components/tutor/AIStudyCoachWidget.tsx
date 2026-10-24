"use client";

import React from "react";
import { AIStudyCoach } from "@/lib/tutor/studyCoach";
import { Sparkles, CheckCircle2, Target, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AIStudyCoachWidget() {
  const goals = AIStudyCoach.getGoals();
  const score = AIStudyCoach.getReadinessScore();

  return (
    <Card className="p-6 bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-2xl bg-white/10 text-purple-300">
            <Sparkles className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-base font-bold text-white">AI Study Coach & Exam Preparation Readiness</h3>
            <span className="text-[10px] text-purple-300 font-mono">Dynamic 7-Day Countdown</span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 font-mono font-bold text-xs border border-rose-500/30">
          {score}% Exam Readiness
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <span className="font-extrabold uppercase text-[10px] text-purple-300 tracking-wider">Active Daily Goals</span>
        {goals.map((g) => (
          <div key={g.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className={`w-4 h-4 ${g.status === "completed" ? "text-rose-400" : "text-gray-400"}`} />
              <span className="font-bold text-white">{g.title}</span>
            </div>

            <span className="font-mono text-[10px] text-indigo-300">{g.progressPercent}%</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

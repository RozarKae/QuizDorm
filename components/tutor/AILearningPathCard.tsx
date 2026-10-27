"use client";

import { Card } from "@/components/ui/card";
import { AILearningPathEngine } from "@/lib/tutor/learningPathEngine";
import { ArrowRight,CheckCircle2,Circle,Lock } from "lucide-react";

export function AILearningPathCard() {
  const milestones = AILearningPathEngine.getMilestones();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <ArrowRight className="w-5 h-5 text-indigo-600 mr-2" /> Personalized AI Learning Path Milestones
        </h3>
      </div>

      <div className="space-y-3 text-xs">
        {milestones.map((m) => (
          <div key={m.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-full font-bold flex items-center justify-center text-xs">
                {m.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-rose-500" />
                ) : m.status === "current" ? (
                  <Circle className="w-5 h-5 text-indigo-600 animate-pulse" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400" />
                )}
              </div>
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">{m.title}</span>
                <span className="text-[10px] text-gray-400 font-mono">Estimated Time: {m.estimatedMins} mins</span>
              </div>
            </div>

            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                m.status === "completed"
                  ? "bg-rose-100 text-rose-800"
                  : m.status === "current"
                  ? "bg-indigo-100 text-indigo-800"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {m.status}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

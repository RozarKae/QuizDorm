"use client";

import React, { useState } from "react";
import { LearningPathGoal } from "@/lib/types/adaptive";
import { Target, Plus, CheckCircle2, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function GoalTrackerCard() {
  const [goals, setGoals] = useState<LearningPathGoal[]>([
    { id: "g-1", title: "Reach 90% Mastery in Calculus", subject: "Mathematics", targetMasteryPercent: 90, currentProgressPercent: 92, targetDate: "2026-08-15", status: "completed" },
    { id: "g-2", title: "Boost Circulatory Anatomy to 80%", subject: "Biology", targetMasteryPercent: 80, currentProgressPercent: 62, targetDate: "2026-08-01", status: "in_progress" },
  ]);

  const handleAddGoal = () => {
    const title = prompt("Enter learning goal title (e.g. Master Kinematics Physics):");
    if (title) {
      setGoals([
        ...goals,
        {
          id: `g-${Date.now()}`,
          title,
          subject: "Mathematics",
          targetMasteryPercent: 85,
          currentProgressPercent: 0,
          targetDate: "2026-08-30",
          status: "in_progress",
        },
      ]);
      toast.success("New learning goal added!");
    }
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Target className="w-5 h-5 text-indigo-600 mr-2" /> Student Goal & Syllabus Milestone Tracker
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Personal learning goals with visual progress bars & deadline alerts.
          </p>
        </div>

        <Button size="sm" onClick={handleAddGoal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
          <Plus className="w-3.5 h-3.5 mr-1" /> Add Goal
        </Button>
      </div>

      <div className="space-y-3 text-xs">
        {goals.map((g) => (
          <div key={g.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white">{g.title}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                g.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-indigo-100 text-indigo-800"
              }`}>
                {g.status.replace(/_/g, " ")}
              </span>
            </div>

            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div
                className={`h-full ${g.status === "completed" ? "bg-emerald-500" : "bg-indigo-500"} transition-all duration-500`}
                style={{ width: `${Math.min(100, g.currentProgressPercent)}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>Progress: {g.currentProgressPercent}% / {g.targetMasteryPercent}%</span>
              <span>Target Date: {g.targetDate}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

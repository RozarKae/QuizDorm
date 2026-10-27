"use client";

import { Card } from "@/components/ui/card";
import { TeacherClassInsight } from "@/lib/types/adaptive";
import { AlertTriangle,Sparkles,Users } from "lucide-react";

export function TeacherInsightsCard() {
  const insight: TeacherClassInsight = {
    classId: "cls-10A",
    className: "Grade 12 Advanced Science & Math",
    averageMasteryPercent: 81,
    strugglingTopics: ["Circulatory Anatomy", "Cellular Respiration"],
    studentsNeedingHelp: [
      { id: "s-1", name: "Irfan Marakkar", mastery: 58, weakArea: "Circulatory Anatomy" },
      { id: "s-2", name: "Teresa Mathew", mastery: 64, weakArea: "Cellular Respiration" },
    ],
    fastLearners: [
      { id: "s-3", name: "Karthik Rajendran", mastery: 92 },
      { id: "s-4", name: "Anandhi K. Bapu", mastery: 90 },
    ],
    recommendedInterventions: [
      "Assign 5-question targeted adaptive review on Circulatory Anatomy to Irfan & Teresa.",
      "Assign Expert Challenge Quiz to Karthik Rajendran and Anandhi K. Bapu to unlock Master certification.",
    ],
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="w-5 h-5 text-indigo-600 mr-2" /> Teacher AI Classroom Intelligence Insights
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real-time analytics identifying students needing help, fast learners & AI recommended interventions.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
          Class Avg Mastery: {insight.averageMasteryPercent}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Students needing help */}
        <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
          <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center">
            <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Students Needing Intervention ({insight.studentsNeedingHelp.length})
          </span>
          {insight.studentsNeedingHelp.map((s) => (
            <div key={s.id} className="p-2.5 rounded-xl bg-white dark:bg-gray-950 flex justify-between items-center font-medium">
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">{s.name}</span>
                <span className="text-[10px] text-rose-600">Weak Topic: {s.weakArea}</span>
              </div>
              <span className="font-mono font-bold text-rose-600">{s.mastery}%</span>
            </div>
          ))}
        </div>

        {/* Fast learners */}
        <div className="p-4 rounded-2xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 space-y-2">
          <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1" /> High-Mastery Fast Learners ({insight.fastLearners.length})
          </span>
          {insight.fastLearners.map((s) => (
            <div key={s.id} className="p-2.5 rounded-xl bg-white dark:bg-gray-950 flex justify-between items-center font-medium">
              <span className="font-bold text-gray-900 dark:text-white">{s.name}</span>
              <span className="font-mono font-bold text-rose-600">{s.mastery}% Mastery</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended interventions */}
      <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 space-y-2 text-xs">
        <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center">
          <Sparkles className="w-4 h-4 text-indigo-600 mr-1.5" /> AI Recommended Educator Interventions:
        </span>
        <ul className="space-y-1 text-indigo-800 dark:text-indigo-200 list-disc list-inside">
          {insight.recommendedInterventions.map((inv, idx) => (
            <li key={idx}>{inv}</li>
          ))}
        </ul>
      </div>
    </Card>
  );
}

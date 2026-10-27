"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EvaluationRecord } from "@/lib/types/examination";
import {
Award,CheckCircle2,
Search,
Sliders,
Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockEvaluations: EvaluationRecord[] = [
  { id: "ev-101", candidateId: "c-101", candidateName: "Alexander Wright", rollNumber: "2026-ENG-8810", examId: "exam-101", objectiveScore: 78, descriptiveScore: 18, graceMarks: 0, totalScore: 96, percentage: 96.0, grade: "A+", rank: 1, status: "Moderated" },
  { id: "ev-102", candidateId: "c-102", candidateName: "Beatriz Morales", rollNumber: "2026-ENG-8811", examId: "exam-101", objectiveScore: 70, descriptiveScore: 16, graceMarks: 2, totalScore: 88, percentage: 88.0, grade: "A", rank: 4, status: "Evaluated" },
  { id: "ev-103", candidateId: "c-103", candidateName: "Charles Darwin Jr.", rollNumber: "2026-ENG-8812", examId: "exam-101", objectiveScore: 42, descriptiveScore: 8, graceMarks: 3, totalScore: 53, percentage: 53.0, grade: "C", rank: 142, status: "Under Re-evaluation" },
];

export function EvaluationResultProcessor() {
  const [evaluations, setEvaluations] = useState<EvaluationRecord[]>(mockEvaluations);
  const [isResultsPublished, setIsResultsPublished] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleApplyGraceMarks = () => {
    setEvaluations((prev) =>
      prev.map((e) => {
        const newGrace = e.graceMarks + 2;
        const newTotal = e.totalScore + 2;
        return {
          ...e,
          graceMarks: newGrace,
          totalScore: newTotal,
          percentage: newTotal,
        };
      })
    );
    toast.success("Applied +2 Grace Marks rule to all borderline candidate evaluations!");
  };

  const handlePublishResults = () => {
    setIsResultsPublished(true);
    toast.success("Official Examination Results published to public candidate portal & SMS gateway!");
  };

  const filteredEvaluations = evaluations.filter(
    (e) => e.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) || e.rollNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Automated Evaluation & Moderation Engine
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-purple-600" /> Evaluation & Result Processing
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Automated objective grading, descriptive answer moderation, grace mark rule application, rank matrix calculation, and result publishing.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleApplyGraceMarks}
            variant="outline"
            className="text-xs rounded-xl border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300"
          >
            <Sliders className="w-4 h-4 mr-1.5" /> Apply Grace Marks Rule (+2)
          </Button>

          <Button
            onClick={handlePublishResults}
            disabled={isResultsPublished}
            className={`text-xs font-bold rounded-xl shadow-lg ${
              isResultsPublished ? "bg-rose-600 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {isResultsPublished ? "Results Published Live" : "Publish Official Results"}
          </Button>
        </div>
      </div>

      {/* Roster & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roll number or candidate..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Evaluated Roster: <span className="font-bold text-slate-900 dark:text-white">{evaluations.length} Candidates</span>
        </span>
      </div>

      {/* Evaluation Results Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Rank</th>
              <th className="p-3">Roll Number</th>
              <th className="p-3">Candidate Name</th>
              <th className="p-3">Objective Score</th>
              <th className="p-3">Descriptive Score</th>
              <th className="p-3">Grace Marks</th>
              <th className="p-3">Total Score / Grade</th>
              <th className="p-3 text-right">Moderation Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredEvaluations.map((ev) => (
              <tr key={ev.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">#{ev.rank || "-"}</td>
                <td className="p-3 font-mono font-bold text-slate-700 dark:text-slate-300">{ev.rollNumber}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{ev.candidateName}</td>
                <td className="p-3 font-mono">{ev.objectiveScore} / 80</td>
                <td className="p-3 font-mono">{ev.descriptiveScore} / 20</td>
                <td className="p-3 font-mono text-purple-600 font-bold">+{ev.graceMarks}</td>
                <td className="p-3">
                  <span className="font-black text-slate-900 dark:text-white text-sm">{ev.totalScore}</span>
                  <span className="ml-2 font-bold px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 text-[10px]">
                    {ev.grade} ({ev.percentage}%)
                  </span>
                </td>
                <td className="p-3 text-right">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                    ev.status === "Moderated" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"
                  }`}>
                    {ev.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

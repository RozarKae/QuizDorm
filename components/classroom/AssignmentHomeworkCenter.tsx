"use client";

import React, { useState } from "react";
import { Assignment, HomeworkSubmission } from "@/lib/types/classroom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, Plus, Sparkles, Calendar, Clock, CheckCircle2, 
  AlertCircle, Upload, Eye, Award, MessageSquare, Search, FileCheck, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockAssignments: Assignment[] = [
  {
    id: "asg-1",
    classroomId: "cls-101",
    title: "Quantum Entanglement & Bell State Proofs",
    description: "Formulate mathematical proof for Bell's Theorem using 2x2 Pauli matrices and compute expectation values for joint spin measurements.",
    type: "Assignment",
    dueDate: "Feb 28, 2026",
    dueTime: "11:59 PM",
    totalPoints: 100,
    rubrics: [
      { id: "r1", title: "Mathematical Rigor", maxPoints: 50, description: "Precision in matrix algebra and operator steps" },
      { id: "r2", title: "Clarity & Explanation", maxPoints: 30, description: "Written interpretation of physical consequences" },
      { id: "r3", title: "Formatting & LaTeX", maxPoints: 20, description: "Clean presentation of notation" },
    ],
    attachedFiles: [{ name: "Bell_State_Template.pdf", size: "1.2 MB", url: "#" }],
    submittedCount: 36,
    gradedCount: 22,
    totalStudents: 42,
    status: "Active",
    createdAt: "Feb 14, 2026",
  },
  {
    id: "asg-2",
    classroomId: "cls-101",
    title: "Weekly Homework 4: Harmonic Oscillator",
    description: "Solve creation and annihilation operator problems 4.1 through 4.8 from Griffiths Chapter 3.",
    type: "Homework",
    dueDate: "Mar 05, 2026",
    dueTime: "05:00 PM",
    totalPoints: 50,
    rubrics: [],
    attachedFiles: [],
    submittedCount: 15,
    gradedCount: 5,
    totalStudents: 42,
    status: "Active",
    createdAt: "Feb 20, 2026",
  },
];

const mockSubmissions: HomeworkSubmission[] = [
  {
    id: "sub-101",
    assignmentId: "asg-1",
    studentId: "s-101",
    studentName: "Alexander Wright",
    submittedAt: "Feb 24, 2026 at 09:30 AM",
    isLate: false,
    files: [{ name: "Alexander_Quantum_Proof.pdf", url: "#" }],
    status: "graded",
    score: 95,
    feedback: "Exceptional proof! Matrix expansions were spotless. Minor typo in equation 4b.",
    aiGradingSuggestion: {
      score: 96,
      feedback: "Demonstrated full mastery of Pauli matrix commutators.",
      strengths: ["Clean step-by-step matrix expansions", "Accurate notation"],
      improvements: ["Elaborate slightly on local hidden variable assumptions"],
    },
  },
  {
    id: "sub-102",
    assignmentId: "asg-1",
    studentId: "s-102",
    studentName: "Beatriz Morales",
    submittedAt: "Feb 25, 2026 at 11:15 PM",
    isLate: false,
    files: [{ name: "Beatriz_Homework.pdf", url: "#" }],
    status: "pending",
    aiGradingSuggestion: {
      score: 88,
      feedback: "Strong mathematical foundation, but tensor product notation has minor gaps.",
      strengths: ["Comprehensive written explanations"],
      improvements: ["Check sign convention on second Pauli Y matrix"],
    },
  },
];

export function AssignmentHomeworkCenter() {
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [submissions, setSubmissions] = useState<HomeworkSubmission[]>(mockSubmissions);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment>(mockAssignments[0]);

  // Create Assignment Modal State
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newType, setNewType] = useState<"Assignment" | "Homework">("Assignment");
  const [newDueDate, setNewDueDate] = useState("2026-03-15");
  const [newPoints, setNewPoints] = useState(100);

  // AI Grading Modal State
  const [selectedSubForGrading, setSelectedSubForGrading] = useState<HomeworkSubmission | null>(null);
  const [givenScore, setGivenScore] = useState<number>(90);
  const [givenFeedback, setGivenFeedback] = useState<string>("");

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newAsg: Assignment = {
      id: `asg-${Date.now()}`,
      classroomId: "cls-101",
      title: newTitle,
      description: newDesc,
      type: newType,
      dueDate: newDueDate,
      dueTime: "11:59 PM",
      totalPoints: newPoints,
      rubrics: [],
      attachedFiles: [],
      submittedCount: 0,
      gradedCount: 0,
      totalStudents: 42,
      status: "Active",
      createdAt: "Just now",
    };
    setAssignments([newAsg, ...assignments]);
    setSelectedAssignment(newAsg);
    setIsCreateModalOpen(false);
    setNewTitle("");
    setNewDesc("");
    toast.success(`${newType} "${newAsg.title}" assigned to classroom!`);
  };

  const handleOpenAiGrading = (sub: HomeworkSubmission) => {
    setSelectedSubForGrading(sub);
    if (sub.aiGradingSuggestion) {
      setGivenScore(sub.aiGradingSuggestion.score);
      setGivenFeedback(sub.aiGradingSuggestion.feedback);
    } else {
      setGivenScore(85);
      setGivenFeedback("Good submission overall.");
    }
  };

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubForGrading) return;
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === selectedSubForGrading.id
          ? { ...s, status: "graded", score: givenScore, feedback: givenFeedback }
          : s
      )
    );
    setSelectedSubForGrading(null);
    toast.success(`Grade of ${givenScore}/${selectedAssignment.totalPoints} saved and sent to student!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Action */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> AI-Assisted Evaluation Pipelines
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" /> Assignment & Homework Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Create coursework, collect student uploads, grade with AI assistance, and provide rich rubric feedback.
          </p>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/30"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create New Coursework
        </Button>
      </div>

      {/* Assignment List & Submissions Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coursework Cards List (Col 1) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Assignments ({assignments.length})</h3>
          {assignments.map((asg) => (
            <div
              key={asg.id}
              onClick={() => setSelectedAssignment(asg)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                selectedAssignment.id === asg.id
                  ? "bg-purple-500/5 border-purple-500/40 ring-2 ring-purple-500/20 shadow-md"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold uppercase">
                  {asg.type}
                </span>
                <span className="text-xs font-mono text-slate-400">{asg.totalPoints} Points</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{asg.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">{asg.description}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-purple-500" /> Due: {asg.dueDate}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {asg.submittedCount}/{asg.totalStudents} Submitted
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Coursework Submissions Manager (Cols 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedAssignment.title}</h3>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                  {selectedAssignment.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">{selectedAssignment.description}</p>
            </div>
            <div className="text-right text-xs">
              <span className="text-slate-400">Total Weight:</span>
              <p className="font-bold text-slate-900 dark:text-white text-base">{selectedAssignment.totalPoints} Marks</p>
            </div>
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">
                Student Submissions ({submissions.length})
              </h4>
              <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">
                {selectedAssignment.gradedCount} Graded
              </span>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{sub.studentName}</span>
                      {sub.isLate ? (
                        <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold">LATE</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 text-[10px] font-bold">ON TIME</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">Submitted: {sub.submittedAt}</p>

                    <div className="flex items-center gap-2 pt-1 text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>{sub.files[0]?.name}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 justify-end">
                    {sub.status === "graded" ? (
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold">Score</span>
                        <p className="text-lg font-black text-purple-600 dark:text-purple-400">
                          {sub.score} / {selectedAssignment.totalPoints}
                        </p>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handleOpenAiGrading(sub)}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" /> AI Grade & Feedback
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal: Create Assignment */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-600" /> Create Coursework
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateAssignment} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title *</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Lab Report 2: Circuit Oscillations"
                  className="rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as "Assignment" | "Homework")}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="Assignment">Formal Assignment</option>
                  <option value="Homework">Weekly Homework</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Instructions & Guidelines</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  rows={3}
                  placeholder="Provide detailed submission requirements..."
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Due Date</label>
                  <Input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Total Marks</label>
                  <Input
                    type="number"
                    value={newPoints}
                    onChange={(e) => setNewPoints(Number(e.target.value))}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 text-white rounded-xl text-xs font-semibold">
                  Publish Coursework
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: AI Assisted Grading Assistant */}
      {selectedSubForGrading && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" /> AI-Assisted Homework Evaluator
              </h3>
              <button onClick={() => setSelectedSubForGrading(null)} className="text-slate-400">✕</button>
            </div>

            <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-purple-700 dark:text-purple-300">AI Suggested Score</span>
                <span className="font-black text-base text-purple-600 dark:text-purple-400">
                  {selectedSubForGrading.aiGradingSuggestion?.score || 85} / {selectedAssignment.totalPoints}
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-300">
                "{selectedSubForGrading.aiGradingSuggestion?.feedback}"
              </p>
            </div>

            <form onSubmit={handleSaveGrade} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Final Score Allocation</label>
                <Input
                  type="number"
                  value={givenScore}
                  onChange={(e) => setGivenScore(Number(e.target.value))}
                  max={selectedAssignment.totalPoints}
                  className="rounded-xl font-mono text-base font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Constructive Written Feedback</label>
                <textarea
                  value={givenFeedback}
                  onChange={(e) => setGivenFeedback(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <Button type="button" variant="ghost" onClick={() => setSelectedSubForGrading(null)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold">
                  Confirm & Post Grade
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

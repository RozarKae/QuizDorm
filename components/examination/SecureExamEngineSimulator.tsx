"use client";

import React, { useState, useEffect } from "react";
import { SecureExamSession, CandidateAnswer } from "@/lib/types/examination";
import { Button } from "@/components/ui/button";
import { 
  Lock, Shield, Clock, CheckCircle2, Bookmark, ArrowRight, 
  ArrowLeft, RefreshCw, AlertTriangle, Maximize2, FileCheck, Check, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockQuestions = [
  {
    id: "q-1",
    section: "Section A: Advanced Physics",
    text: "Which of the following physical quantities remains invariant under Lorentz transformations in Special Relativity?",
    options: [
      { id: "opt-a", text: "Spatial distance Δx between events" },
      { id: "opt-b", text: "Spacetime interval Δs² = (cΔt)² - (Δx)²" },
      { id: "opt-c", text: "Relativistic momentum p = γmv" },
      { id: "opt-d", text: "Total relativistic energy E" },
    ],
    correctOpt: "opt-b",
  },
  {
    id: "q-2",
    section: "Section A: Advanced Physics",
    text: "What is the physical significance of the Heisenberg Uncertainty Principle Δx · Δp ≥ ℏ/2?",
    options: [
      { id: "opt-a", text: "Measurement apparatus imperfection" },
      { id: "opt-b", text: "Intrinsic wave-particle duality property of quantum state vectors" },
      { id: "opt-c", text: "Thermal fluctuation error" },
      { id: "opt-d", text: "Photon scattering momentum loss" },
    ],
    correctOpt: "opt-b",
  },
  {
    id: "q-3",
    section: "Section B: Mathematical Methods",
    text: "Evaluate the determinant of a 3x3 orthogonal matrix Q with det(Q) > 0.",
    options: [
      { id: "opt-a", text: "+1" },
      { id: "opt-b", text: "-1" },
      { id: "opt-c", text: "0" },
      { id: "opt-d", text: "Undefined" },
    ],
    correctOpt: "opt-a",
  },
];

export function SecureExamEngineSimulator() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, CandidateAnswer>>({
    "q-1": { questionId: "q-1", selectedOptionId: "opt-b", status: "answered", savedAt: "10:14:02 AM" },
  });
  const [remainingSeconds, setRemainingSeconds] = useState(5400); // 90 mins
  const [isFullscreen, setIsFullscreen] = useState(true);
  const [isLockdownActive, setIsLockdownActive] = useState(true);
  const [proctorWarningCount, setProctorWarningCount] = useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs > 0 ? hrs + ":" : ""}${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentQ = mockQuestions[currentQIndex];
  const currentAnswer = answers[currentQ.id];

  const handleSelectOption = (optId: string) => {
    const updated: CandidateAnswer = {
      questionId: currentQ.id,
      selectedOptionId: optId,
      status: "answered",
      savedAt: new Date().toLocaleTimeString(),
    };
    setAnswers({ ...answers, [currentQ.id]: updated });
    toast.success("Answer auto-saved to secure vault.", { duration: 1000 });
  };

  const handleToggleMarkReview = () => {
    const existing = answers[currentQ.id] || { questionId: currentQ.id, status: "unvisited", savedAt: "-" };
    const newStatus = existing.status === "marked-for-review" ? "answered" : "marked-for-review";
    setAnswers({ ...answers, [currentQ.id]: { ...existing, status: newStatus } });
    toast.info(newStatus === "marked-for-review" ? "Marked question for review." : "Unmarked question.");
  };

  const handleSimulateTabSwitch = () => {
    setProctorWarningCount((prev) => prev + 1);
    toast.error("SECURITY ALERT: Tab switch detected! Event logged to Proctor Dashboard.", { duration: 4000 });
  };

  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    toast.success("Secure Examination successfully submitted and encrypted!");
  };

  const answeredCount = Object.values(answers).filter((a) => a.status === "answered" && a.selectedOptionId).length;
  const reviewCount = Object.values(answers).filter((a) => a.status === "marked-for-review").length;

  return (
    <div className="space-y-4">
      {/* Lockdown Status Top Bar */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base text-white">NAT-RECRUIT-2026 • Secure Exam Engine</h2>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1">
                <Shield className="w-3 h-3" /> BROWSER LOCKDOWN ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">Candidate: Alexander Wright (Roll: 2026-ENG-9041)</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 font-mono text-amber-400 font-bold">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Time Left: {formatTimer(remainingSeconds)}</span>
          </div>

          <Button
            onClick={handleSimulateTabSwitch}
            variant="ghost"
            size="sm"
            className="text-[11px] text-red-400 hover:bg-red-500/10 rounded-lg"
          >
            <AlertTriangle className="w-3.5 h-3.5 mr-1" /> Test Security Alert ({proctorWarningCount})
          </Button>

          <Button
            onClick={() => setIsSubmitModalOpen(true)}
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg"
          >
            Submit Examination
          </Button>
        </div>
      </div>

      {/* Main Examination Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[500px]">
        {/* Question Area (Cols 3) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                {currentQ.section}
              </span>
              <span className="text-xs text-slate-400">
                Question {currentQIndex + 1} of {mockQuestions.length}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.text}
            </h3>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = currentAnswer?.selectedOptionId === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-semibold ${
                      isSelected
                        ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 text-indigo-900 dark:text-indigo-100 shadow-sm"
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 hover:border-slate-300"
                    }`}
                  >
                    <span>{opt.text}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "bg-indigo-600 border-indigo-600 text-white" : "border-slate-300 dark:border-slate-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Navigation Toolbar */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
            <Button
              variant="outline"
              size="sm"
              disabled={currentQIndex === 0}
              onClick={() => setCurrentQIndex((prev) => prev - 1)}
              className="text-xs rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous Question
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleMarkReview}
              className={`text-xs rounded-xl ${
                currentAnswer?.status === "marked-for-review" ? "bg-amber-500/20 text-amber-600 font-bold" : "text-slate-500"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 mr-1" />
              {currentAnswer?.status === "marked-for-review" ? "Marked for Review" : "Mark for Review"}
            </Button>

            <Button
              disabled={currentQIndex === mockQuestions.length - 1}
              onClick={() => setCurrentQIndex((prev) => prev + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
            >
              Next Question <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Question Palette Sidebar (Col 1) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between shadow-sm space-y-4">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
              Question Palette
            </h4>

            <div className="grid grid-cols-4 gap-2">
              {mockQuestions.map((q, idx) => {
                const ans = answers[q.id];
                let bgClass = "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400";
                if (ans?.status === "answered" && ans.selectedOptionId) {
                  bgClass = "bg-emerald-600 text-white font-bold";
                } else if (ans?.status === "marked-for-review") {
                  bgClass = "bg-amber-500 text-black font-bold";
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-10 h-10 rounded-xl text-xs flex items-center justify-center transition-transform hover:scale-105 ${bgClass} ${
                      currentQIndex === idx ? "ring-2 ring-indigo-500" : ""
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="space-y-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Answered</span>
                <span className="font-bold text-slate-900 dark:text-white">{answeredCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-amber-500 inline-block" /> Marked for Review</span>
                <span className="font-bold text-slate-900 dark:text-white">{reviewCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700 inline-block" /> Unvisited</span>
                <span className="font-bold text-slate-900 dark:text-white">{mockQuestions.length - answeredCount - reviewCount}</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-[11px] text-indigo-700 dark:text-indigo-300">
            <span className="font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Auto-Save Enabled
            </span>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Answers synced to cloud every 5 seconds.</p>
          </div>
        </div>
      </div>

      {/* Confirmation Submit Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" /> Confirm Exam Submission
              </h3>
              <button onClick={() => setIsSubmitModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Are you sure you want to finalize and submit your examination? Once submitted, your answers will be encrypted and transmitted to the Examination Board.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs space-y-1">
              <p className="font-bold text-slate-900 dark:text-white">Summary:</p>
              <p className="text-slate-500">{answeredCount} of {mockQuestions.length} Questions Answered</p>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setIsSubmitModalOpen(false)} className="rounded-xl text-xs">
                Back to Exam
              </Button>
              <Button onClick={handleConfirmSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold">
                Submit & Encrypt Test
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

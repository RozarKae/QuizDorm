import React, { useState } from "react";
import { QuizItem } from "@/lib/types/quiz";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, Monitor, Smartphone, RotateCcw } from "lucide-react";

interface QuizPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quiz?: Partial<QuizItem>;
}

export function QuizPreviewModal({ open, onOpenChange, quiz }: QuizPreviewModalProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = quiz?.questions || [];
  const currentQuestion = questions[currentIdx];

  const handleSelectOption = (optId: string) => {
    setAnswers({ ...answers, [currentIdx]: optId });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-gray-900 dark:text-white text-lg">
              <Clock className="w-5 h-5 text-indigo-600 mr-2" /> Live Student Exam Simulator
            </DialogTitle>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center ${device === "desktop" ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-400"}`}
              >
                <Monitor className="w-3.5 h-3.5 mr-1" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center ${device === "mobile" ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-400"}`}
              >
                <Smartphone className="w-3.5 h-3.5 mr-1" /> Mobile
              </button>
            </div>
          </div>
          <DialogDescription>
            Simulating exact student exam UI for: <span className="font-bold text-gray-800 dark:text-gray-200">{quiz?.title || "Untitled Quiz"}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Device Container */}
        <div className={`mx-auto transition-all ${device === "mobile" ? "max-w-sm" : "w-full"}`}>
          <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900 shadow-xl space-y-6">
            {/* Exam Topbar */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-900">
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Question {currentIdx + 1} of {questions.length || 1}
                </span>
                <p className="text-[11px] text-gray-400">Total Marks: {quiz?.totalMarks || 10}</p>
              </div>

              {/* Timer Pill */}
              <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 text-amber-700 dark:text-amber-300 text-xs font-mono font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{quiz?.durationMinutes || 30}:00</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / (questions.length || 1)) * 100}%` }}
              />
            </div>

            {/* Question Content */}
            {currentQuestion ? (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">
                  {currentQuestion.title}
                </h3>

                {/* Options */}
                <div className="space-y-2.5">
                  {currentQuestion.options.map((opt, idx) => {
                    const isSelected = answers[currentIdx] === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() => handleSelectOption(opt.id)}
                        className={`p-3.5 rounded-2xl border text-xs font-medium cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 font-bold ring-1 ring-indigo-500"
                            : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic text-center py-6">No questions added to this quiz yet.</p>
            )}

            {/* Question Navigation Navigator */}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="text-xs"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>

              <div className="flex items-center space-x-1 overflow-x-auto max-w-[150px] px-1">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-6 h-6 rounded-lg text-[10px] font-bold transition-all ${
                      currentIdx === i
                        ? "bg-indigo-600 text-white"
                        : answers[i]
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <Button
                size="sm"
                disabled={currentIdx === questions.length - 1 || questions.length === 0}
                onClick={() => setCurrentIdx(currentIdx + 1)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
              >
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

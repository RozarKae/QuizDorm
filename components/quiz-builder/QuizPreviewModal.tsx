"use client";

import React, { useState } from "react";
import { QuizItem } from "@/lib/types/quiz";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, Monitor, Smartphone } from "lucide-react";

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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] text-[#F2F7F3]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center text-[#F2F7F3] font-display font-bold text-base">
              <Clock className="w-5 h-5 text-[#FF4D6D] mr-2" /> Live Student Exam Simulator
            </DialogTitle>
            <div className="flex items-center space-x-1 bg-[#1D1013] border border-[rgba(240, 160, 180,0.16)] p-1 rounded-[4px]">
              <button
                type="button"
                onClick={() => setDevice("desktop")}
                className={`px-2.5 py-1 rounded-[3px] text-xs font-mono font-semibold flex items-center transition-colors ${
                  device === "desktop"
                    ? "bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] shadow-xs"
                    : "text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5 mr-1" /> Desktop
              </button>
              <button
                type="button"
                onClick={() => setDevice("mobile")}
                className={`px-2.5 py-1 rounded-[3px] text-xs font-mono font-semibold flex items-center transition-colors ${
                  device === "mobile"
                    ? "bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] shadow-xs"
                    : "text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 mr-1" /> Mobile
              </button>
            </div>
          </div>
          <DialogDescription className="text-xs text-[#A0AEA5]">
            Simulating exact student exam runtime for: <span className="font-bold text-[#F2F7F3]">{quiz?.title || "Untitled Assessment"}</span>
          </DialogDescription>
        </DialogHeader>

        {/* Device Container */}
        <div className={`mx-auto transition-all ${device === "mobile" ? "max-w-sm" : "w-full"}`}>
          <div className="bg-[#0B0708] p-6 rounded-[8px] border border-[rgba(240, 160, 180,0.14)] shadow-xl space-y-6">
            {/* Exam Topbar */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(240, 160, 180,0.12)]">
              <div>
                <span className="text-xs font-mono font-bold text-[#FF4D6D] uppercase tracking-wider">
                  Question {currentIdx + 1} of {questions.length || 1}
                </span>
                <p className="text-[11px] font-mono text-[#A0AEA5]">Total Marks: {quiz?.totalMarks || 10}</p>
              </div>

              {/* Timer Pill */}
              <div className="flex items-center space-x-2 px-3 py-1 rounded-[4px] bg-[#1D1013] border border-[rgba(255, 77, 109,0.3)] text-[#FF4D6D] text-xs font-mono font-bold shadow-[0_0_8px_rgba(255, 77, 109,0.1)]">
                <Clock className="w-3.5 h-3.5" />
                <span>{quiz?.durationMinutes || 30}:00</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 w-full bg-[#1D1013] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF758F] to-[#FF4D6D] transition-all duration-300 shadow-[0_0_8px_rgba(255, 77, 109,0.3)]"
                style={{ width: `${((currentIdx + 1) / (questions.length || 1)) * 100}%` }}
              />
            </div>

            {/* Question Content */}
            {currentQuestion ? (
              <div className="space-y-4">
                <h3 className="text-base font-bold font-display text-[#F2F7F3] leading-relaxed">
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
                        className={`p-3.5 rounded-[4px] border text-xs font-mono cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? "border-[#FF4D6D] bg-[#2A141A] text-[#F2F7F3] font-bold ring-1 ring-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.12)]"
                            : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:border-[#FF4D6D]/30 hover:text-[#F2F7F3]"
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span
                            className={`w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                                : "bg-[#2A141A] text-[#A0AEA5] border-[rgba(240, 160, 180,0.2)]"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt.text}</span>
                        </div>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF4D6D] shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-xs font-mono text-[#A0AEA5] italic text-center py-6">No questions added to this quiz yet.</p>
            )}

            {/* Question Navigation Navigator */}
            <div className="pt-4 border-t border-[rgba(240, 160, 180,0.12)] flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="text-xs font-mono border-[rgba(240, 160, 180,0.18)] rounded-[4px] h-8 text-[#A0AEA5] hover:text-[#F2F7F3] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>

              <div className="flex items-center space-x-1 overflow-x-auto max-w-[150px] px-1">
                {questions.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`w-6 h-6 rounded-[3px] text-[10px] font-mono font-bold transition-all border ${
                      currentIdx === i
                        ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                        : answers[i]
                        ? "bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border-[rgba(255, 77, 109,0.3)]"
                        : "bg-[#1D1013] text-[#A0AEA5] border-[rgba(240, 160, 180,0.14)]"
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
                className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono text-xs font-bold rounded-[4px] h-8 shadow-[0_0_10px_rgba(255, 77, 109,0.15)] disabled:opacity-30"
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

"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, HelpCircle, Award, ShieldCheck, Play, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getQuizById, ALL_DEFAULT_QUIZZES } from "@/lib/data/quizzes";

export default function QuizStartLobbyPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();

  const unwrappedParams = typeof (params as any)?.then === "function" ? React.use(params as Promise<{ id: string }>) : (params as { id: string });
  const quizId = unwrappedParams.id;

  const quiz = useMemo(() => {
    return getQuizById(quizId) || ALL_DEFAULT_QUIZZES[0];
  }, [quizId]);

  const questionsCount = quiz.questions?.length || 0;
  const totalMarks = quiz.totalMarks || questionsCount;
  const passMarksPercent = quiz.passMarks ? Math.round((quiz.passMarks / (totalMarks || 1)) * 100) : 60;

  const handleStart = () => {
    router.push(`/dashboard/quizzes/${quiz.id}/take/live`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link
          href="/dashboard/quizzes"
          className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#A0AEA5] hover:text-[#65F59A] mb-4 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to The Dorm Vault
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-2 font-mono">
          {quiz.topic && (
            <span className="bg-[rgba(101,245,154,0.12)] text-[#65F59A] font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[3px] border border-[rgba(101,245,154,0.3)]">
              {quiz.topic}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3] font-medium">
            {quiz.subject || quiz.category}
          </span>
          {(quiz.gradeLevel || quiz.grade) && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#A0AEA5] font-medium">
              {quiz.gradeLevel || quiz.grade}
            </span>
          )}
          {quiz.difficulty === "Hard" ? (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] font-bold bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.3)]">
              Hard
            </span>
          ) : quiz.difficulty === "Medium" ? (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] font-bold bg-[#111B17] text-[#38D9B0] border border-[rgba(56,217,176,0.3)]">
              Medium
            </span>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] font-bold bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.3)]">
              Easy
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F2F7F3] tracking-tight">
          {quiz.title}
        </h1>
        <p className="text-xs font-mono text-[#A0AEA5] mt-2">
          {quiz.description || "Official cognitive sprint evaluating conceptual retention, accuracy, and accelerated reasoning under timer pressure."}
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] text-center shadow-xs">
          <HelpCircle className="w-4 h-4 text-[#38D9B0] mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-[#F2F7F3] tabular-nums">{questionsCount}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#69786F]">Questions</p>
        </div>
        <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] text-center shadow-xs">
          <Clock className="w-4 h-4 text-[#65F59A] mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-[#F2F7F3] tabular-nums">{quiz.durationMinutes}m</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#69786F]">Duration</p>
        </div>
        <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] text-center shadow-xs">
          <Award className="w-4 h-4 text-[#65F59A] mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-[#F2F7F3] tabular-nums">{totalMarks}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#69786F]">Marks</p>
        </div>
        <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] text-center shadow-xs">
          <ShieldCheck className="w-4 h-4 text-[#38D9B0] mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-[#F2F7F3] tabular-nums">{passMarksPercent}%</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-[#69786F]">Passing Score</p>
        </div>
      </div>

      {/* Rules & Instructions */}
      <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-4">
        <h3 className="text-sm font-bold font-display text-[#F2F7F3] flex items-center">
          <AlertCircle className="w-4 h-4 text-[#65F59A] mr-2" /> Assessment Protocols & Instructions
        </h3>
        <ul className="space-y-2 text-xs font-mono text-[#A0AEA5] leading-relaxed list-disc list-inside">
          <li>Questions are freshly randomized for each attempt to test true recall.</li>
          <li>Answer options are randomized while preserving the original correct answer mapping.</li>
          <li>The countdown timer starts as soon as you click <strong>Commence Cognitive Sprint</strong>.</li>
          <li>Your progress is safely stored in browser session storage.</li>
          <li>You can mark questions for review and jump across items using the question palette.</li>
          <li>The assessment will automatically submit when the countdown timer reaches zero.</li>
        </ul>
      </div>

      {/* Action CTA */}
      <div className="flex justify-end space-x-3 pt-2">
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="px-5 rounded-[4px] font-mono text-xs border-[rgba(160,190,170,0.18)] h-9 hover:border-[#65F59A]/30">
            Cancel
          </Button>
        </Link>
        <Button
          onClick={handleStart}
          className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-[4px] px-6 h-9 shadow-[0_0_15px_rgba(101,245,154,0.18)] transition-all hover:shadow-[0_0_22px_rgba(101,245,154,0.3)]"
        >
          <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Commence Cognitive Sprint
        </Button>
      </div>
    </div>
  );
}

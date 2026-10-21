"use client";

import React from "react";
import Link from "next/link";
import { PerformanceChart } from "@/components/quiz-engine/PerformanceChart";
import { Button } from "@/components/ui/button";
import { Award, CheckCircle2, XCircle, HelpCircle, Clock, ArrowRight, RotateCcw, Home } from "lucide-react";

export default function QuizResultPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }> | { id: string; attemptId: string };
}) {
  const unwrappedParams =
    typeof (params as any)?.then === "function"
      ? React.use(params as Promise<{ id: string; attemptId: string }>)
      : (params as { id: string; attemptId: string });
  const { id, attemptId } = unwrappedParams;

  // Mock result data
  const result = {
    quizTitle: "Advanced Algebra & Calculus Challenge",
    score: 85,
    totalMarks: 100,
    percentage: 85,
    isPassed: true,
    correctCount: 21,
    incorrectCount: 3,
    unansweredCount: 1,
    timeTakenMinutes: 32,
    submittedAt: "Jul 23, 2026, 7:45 PM",
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Result Header */}
      <div className="text-center space-y-2 border-b border-[rgba(160,190,170,0.14)] pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-[3px] bg-[rgba(101,245,154,0.12)] border border-[rgba(101,245,154,0.3)] text-[#65F59A] text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(101,245,154,0.15)]">
          <Award className="w-3.5 h-3.5 fill-current" />
          <span>ASSESSMENT COMPLETED</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
          {result.quizTitle}
        </h1>
        <p className="text-[11px] font-mono text-[#A0AEA5]">
          ATTEMPT ID: <span className="text-[#38D9B0]">{attemptId}</span> • SUBMITTED: {result.submittedAt}
        </p>
      </div>

      {/* Main Result Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left 5 cols: Circular Progress */}
        <div className="md:col-span-5">
          <PerformanceChart
            percentage={result.percentage}
            isPassed={result.isPassed}
            score={result.score}
            totalMarks={result.totalMarks}
          />
        </div>

        {/* Right 7 cols: Detailed Breakdown Cards */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#65F59A] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#65F59A]">{result.correctCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">CORRECT</p>
            </div>

            <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs">
              <XCircle className="w-5 h-5 text-[#F87171] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#F87171]">{result.incorrectCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">INCORRECT</p>
            </div>

            <div className="p-4 bg-[#0C1210] rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs">
              <HelpCircle className="w-5 h-5 text-[#69786F] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#F2F7F3]">{result.unansweredCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">SKIPPED</p>
            </div>
          </div>

          <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(160,190,170,0.12)]">
              <span className="text-[#A0AEA5] font-mono text-[11px] uppercase tracking-wider">Time Duration:</span>
              <span className="font-mono font-bold text-[#F2F7F3] flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#65F59A]" /> {result.timeTakenMinutes} MINS
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(160,190,170,0.12)]">
              <span className="text-[#A0AEA5] font-mono text-[11px] uppercase tracking-wider">Cohort Rank:</span>
              <span className="font-mono font-bold text-[#38D9B0]">TOP 5% (#3 ESTIMATE)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0AEA5] font-mono text-[11px] uppercase tracking-wider">Status Rating:</span>
              <span className="font-mono font-bold text-[#65F59A]">MASTERY LEVEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[rgba(160,190,170,0.14)]">
        <Link href={`/dashboard/quizzes/${id}/review/${attemptId}`}>
          <Button className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold tracking-wider rounded-[4px] px-6 py-2.5 w-full sm:w-auto shadow-[0_0_15px_rgba(101,245,154,0.18)]">
            REVIEW QUESTION RESPONSES <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="font-mono text-xs tracking-wider rounded-[4px] border-[rgba(160,190,170,0.18)] px-5 py-2.5 w-full sm:w-auto text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#65F59A]/30">
            RETURN TO CATALOG
          </Button>
        </Link>
      </div>
    </div>
  );
}

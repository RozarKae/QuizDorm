"use client";

import React from "react";
import Link from "next/link";
import { PerformanceChart } from "@/components/quiz-engine/PerformanceChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, CheckCircle2, XCircle, HelpCircle, Clock, ArrowRight, RotateCcw, Home } from "lucide-react";

export default function QuizResultPage({ params }: { params: { id: string; attemptId: string } }) {
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
      <div className="text-center space-y-2 border-b border-border pb-6">
        <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-[2px] bg-[#2855F5]/10 border border-[#2855F5]/30 text-[#2855F5] text-[10px] font-mono font-bold uppercase tracking-widest">
          <Award className="w-3.5 h-3.5" />
          <span>ASSESSMENT COMPLETED</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">{result.quizTitle}</h1>
        <p className="text-[11px] font-mono text-muted-foreground">ATTEMPT ID: {params.attemptId} • SUBMITTED: {result.submittedAt}</p>
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
            <div className="p-4 bg-card rounded-[3px] border border-border">
              <CheckCircle2 className="w-5 h-5 text-[#2855F5] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#2855F5]">{result.correctCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">CORRECT</p>
            </div>

            <div className="p-4 bg-card rounded-[3px] border border-border">
              <XCircle className="w-5 h-5 text-[#E85D3F] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#E85D3F]">{result.incorrectCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">INCORRECT</p>
            </div>

            <div className="p-4 bg-card rounded-[3px] border border-border">
              <HelpCircle className="w-5 h-5 text-muted-foreground mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-foreground">{result.unansweredCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">SKIPPED</p>
            </div>
          </div>

          <div className="bg-card p-6 rounded-[3px] border border-border space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-border">
              <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider">Time Duration:</span>
              <span className="font-mono font-bold text-foreground flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#2855F5]" /> {result.timeTakenMinutes} MINS
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-border">
              <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider">Cohort Rank:</span>
              <span className="font-mono font-bold text-[#2855F5]">TOP 5% (#3 ESTIMATE)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-mono text-[11px] uppercase tracking-wider">Status Rating:</span>
              <span className="font-mono font-bold text-foreground">MASTERY LEVEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-border">
        <Link href={`/dashboard/quizzes/${params.id}/review/${params.attemptId}`}>
          <Button className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs tracking-wider rounded-[3px] px-6 py-2.5 w-full sm:w-auto">
            REVIEW QUESTION RESPONSES <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="font-mono text-xs tracking-wider rounded-[3px] border-border px-5 py-2.5 w-full sm:w-auto">
            RETURN TO CATALOG
          </Button>
        </Link>
      </div>
    </div>
  );
}

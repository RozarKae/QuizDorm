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
      <div className="text-center space-y-2">
        <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" /> Assessment Completed
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">{result.quizTitle}</h1>
        <p className="text-xs text-gray-400">Attempt ID: {params.attemptId} • Submitted on {result.submittedAt}</p>
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
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-emerald-600">{result.correctCount}</p>
              <p className="text-[11px] text-emerald-800 dark:text-emerald-300 font-medium">Correct</p>
            </div>

            <div className="p-4 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-100 dark:border-red-900/50">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-red-600">{result.incorrectCount}</p>
              <p className="text-[11px] text-red-800 dark:text-red-300 font-medium">Incorrect</p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <HelpCircle className="w-6 h-6 text-slate-500 mx-auto mb-1" />
              <p className="text-2xl font-extrabold text-slate-600 dark:text-slate-300">{result.unansweredCount}</p>
              <p className="text-[11px] text-slate-500 font-medium">Unanswered</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100 dark:border-gray-900">
              <span className="text-gray-500">Time Duration Spent:</span>
              <span className="font-mono font-bold text-gray-900 dark:text-white flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-indigo-600" /> {result.timeTakenMinutes} minutes
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100 dark:border-gray-900">
              <span className="text-gray-500">Global Class Rank Estimate:</span>
              <span className="font-semibold text-emerald-600">Top 5% (#3 Rank)</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Performance Status:</span>
              <span className="font-bold text-gray-900 dark:text-white">Mastery Level Achieved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link href={`/dashboard/quizzes/${params.id}/review/${params.attemptId}`}>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-8 py-3 text-sm shadow-sm w-full sm:w-auto">
            Review Question Answers <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <Link href="/dashboard/quizzes/history">
          <Button variant="outline" className="rounded-xl px-6 py-3 text-sm w-full sm:w-auto">
            View Attempt History
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="ghost" className="rounded-xl px-6 py-3 text-sm w-full sm:w-auto text-gray-500">
            <Home className="w-4 h-4 mr-2" /> Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

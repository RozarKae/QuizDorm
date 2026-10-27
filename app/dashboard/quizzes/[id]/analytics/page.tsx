"use client";

import { Badge } from "@/components/ui/badge";
import { QuizItemAnalysis } from "@/lib/types/analytics";
import { AlertTriangle,ArrowLeft,BarChart3 } from "lucide-react";
import Link from "next/link";

const mockItemAnalysis: QuizItemAnalysis[] = [
  {
    questionId: "q-1",
    questionTitle: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    topic: "Calculus Derivatives",
    correctRate: 78,
    incorrectRate: 18,
    skipRate: 4,
    avgTimeSec: 42,
    difficultyRating: "Medium",
    isWeakQuestion: false,
  },
  {
    questionId: "q-2",
    questionTitle: "Which organic compounds contain a benzene ring?",
    topic: "Organic Chemistry",
    correctRate: 58,
    incorrectRate: 36,
    skipRate: 6,
    avgTimeSec: 58,
    difficultyRating: "Hard",
    isWeakQuestion: true,
  },
];

export default function QuizItemAnalyticsPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6 py-2">
      <div>
        <Link href={`/dashboard/quizzes/${params.id}`} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quiz Details
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <BarChart3 className="w-6 h-6 text-indigo-600 mr-2" /> Question-Level Item Analysis
        </h1>
        <p className="text-sm text-gray-500">Detailed breakdown of correct rates, response speeds, and difficulty flags per question</p>
      </div>

      <div className="space-y-4">
        {mockItemAnalysis.map((item) => (
          <div
            key={item.questionId}
            className={`p-6 rounded-3xl border transition-all ${
              item.isWeakQuestion
                ? "bg-amber-50/40 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50"
                : "bg-white dark:bg-gray-950 border-gray-100 dark:border-gray-850"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs">
                  {item.topic}
                </Badge>
                {item.isWeakQuestion && (
                  <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-xs">
                    <AlertTriangle className="w-3 h-3 mr-1 text-red-600" /> Weak Question Flagged
                  </Badge>
                )}
              </div>
              <span className="text-xs font-semibold text-gray-400">Difficulty: {item.difficultyRating}</span>
            </div>

            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">{item.questionTitle}</h3>

            <div className="grid grid-cols-4 gap-3 text-center text-xs">
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-100 dark:border-rose-900">
                <p className="text-lg font-extrabold text-rose-600">{item.correctRate}%</p>
                <p className="text-[10px] text-gray-400">Correct Rate</p>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-100 dark:border-red-900">
                <p className="text-lg font-extrabold text-red-600">{item.incorrectRate}%</p>
                <p className="text-[10px] text-gray-400">Incorrect Rate</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-850">
                <p className="text-lg font-extrabold text-gray-600">{item.skipRate}%</p>
                <p className="text-[10px] text-gray-400">Skip Rate</p>
              </div>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900">
                <p className="text-lg font-extrabold text-indigo-600">{item.avgTimeSec}s</p>
                <p className="text-[10px] text-gray-400">Avg Speed</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

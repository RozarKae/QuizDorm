"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  Award,
  Users,
  Play,
  Edit,
  Share2,
  Layers,
  Sparkles,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getQuizById, ALL_DEFAULT_QUIZZES } from "@/lib/data/quizzes";
import { toast } from "sonner";

export default function QuizDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const unwrappedParams =
    typeof (params as any)?.then === "function"
      ? React.use(params as Promise<{ id: string }>)
      : (params as { id: string });
  const quizId = unwrappedParams.id;

  const quiz = useMemo(() => {
    return getQuizById(quizId) || ALL_DEFAULT_QUIZZES[0];
  }, [quizId]);

  const questionsCount = quiz.questions?.length || 0;
  const totalMarks = quiz.totalMarks || questionsCount;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Quiz link copied to clipboard!");
    } else {
      toast.success("Quiz link ready to share!");
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <Link
          href="/dashboard/quizzes"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Quizzes
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {quiz.topic && (
                <Badge className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800">
                  <Layers className="w-3 h-3 mr-1" />
                  {quiz.topic}
                </Badge>
              )}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                {quiz.subject || quiz.category}
              </span>
              {(quiz.gradeLevel || quiz.grade) && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {quiz.gradeLevel || quiz.grade}
                </span>
              )}
              <Badge
                className={
                  quiz.difficulty === "Hard"
                    ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    : quiz.difficulty === "Medium"
                    ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                }
              >
                {quiz.difficulty}
              </Badge>
              <span className="text-xs text-emerald-600 font-semibold">● Published</span>
            </div>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              {quiz.title}
            </h1>
            <p className="text-sm text-gray-500 mt-2 max-w-2xl">
              {quiz.description || "Comprehensive topical assessment challenge designed to test your core mastery."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="outline" onClick={handleShare} className="border-gray-300 dark:border-gray-800">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Link href={`/dashboard/quizzes/${quiz.id}/take`}>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md shadow-indigo-600/20">
                <Play className="w-4 h-4 mr-2 fill-current" /> Start Quiz
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <HelpCircle className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{questionsCount}</p>
          <p className="text-xs text-gray-500">Total Questions</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{quiz.durationMinutes} mins</p>
          <p className="text-xs text-gray-500">Time Limit</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <Award className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalMarks} pts</p>
          <p className="text-xs text-gray-500">Total Points</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {quiz.randomizeQuestions ? "Enabled" : "Standard"}
          </p>
          <p className="text-xs text-gray-500">Question Shuffle</p>
        </div>
      </div>

      {/* Questions Preview List */}
      <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <HelpCircle className="w-4 h-4 mr-2 text-indigo-600" />
            Included Questions ({questionsCount})
          </h2>
          <span className="text-xs text-gray-500">
            Shuffled fresh per attempt on start
          </span>
        </div>

        <div className="space-y-3 divide-y divide-gray-100 dark:divide-gray-900">
          {quiz.questions?.slice(0, 10).map((q, idx) => (
            <div key={q.id || idx} className="pt-3 first:pt-0 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[11px] text-gray-500">
                  <span className="font-semibold text-indigo-600">Q{idx + 1}</span>
                  <span>•</span>
                  <span>{q.topic || q.subject}</span>
                  <span>•</span>
                  <span>{q.marks || 1} mark</span>
                </div>
                <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 line-clamp-2">
                  {q.title}
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] shrink-0">
                {q.difficulty}
              </Badge>
            </div>
          ))}

          {questionsCount > 10 && (
            <div className="pt-3 text-center text-xs text-gray-500 italic">
              + {questionsCount - 10} more questions included in this quiz challenge
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

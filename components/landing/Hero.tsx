"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <div className="py-20 px-4 max-w-4xl mx-auto space-y-6 text-center sm:text-left">
      <div className="inline-flex items-center space-x-2 bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-700 dark:text-indigo-300">
        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
        <span>Next-Generation Assessment & Live Quiz Engine</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
        Master Your Studies & Create Custom Quizzes with <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">QuizDorm</span>
      </h1>

      <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl leading-relaxed">
        A unified platform for interactive quizzes, examinations, classroom assignments, and competitive live arena battles. Build quizzes in seconds or test with 400+ curated questions.
      </p>

      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3.5 pt-4">
        <Link href="/create-quiz">
          <Button className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-sm rounded-xl px-6 py-3 shadow-lg shadow-indigo-500/25 flex items-center gap-2 transform transition hover:-translate-y-0.5">
            <Sparkles className="w-4 h-4 fill-current" />
            Create Own Quiz
          </Button>
        </Link>
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="border-slate-300 dark:border-gray-700 text-slate-700 dark:text-slate-200 text-sm font-semibold rounded-xl px-5 py-3 hover:bg-slate-50 dark:hover:bg-gray-800 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            Explore Question Bank
          </Button>
        </Link>
        <Link href="/auth/register">
          <Button variant="ghost" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-slate-900 flex items-center gap-1">
            Get Started Free <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

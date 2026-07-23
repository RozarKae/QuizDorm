"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, HelpCircle, Award, ShieldCheck, Play, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function QuizStartLobbyPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleStart = () => {
    router.push(`/dashboard/quizzes/${params.id}/take/live`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <Link href="/dashboard/quizzes" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quizzes
        </Link>
        <div className="flex items-center space-x-3 mb-2">
          <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
            Mathematics
          </Badge>
          <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
            Hard
          </Badge>
        </div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Advanced Algebra & Calculus Challenge
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Official assessment for high school and college calculus students covering derivatives, integrals, and algebraic operations.
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 text-center">
          <HelpCircle className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
          <p className="text-xl font-extrabold text-gray-900 dark:text-white">25</p>
          <p className="text-[11px] text-gray-400">Total Questions</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 text-center">
          <Clock className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <p className="text-xl font-extrabold text-gray-900 dark:text-white">45 Mins</p>
          <p className="text-[11px] text-gray-400">Duration</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 text-center">
          <Award className="w-5 h-5 text-amber-500 mx-auto mb-1" />
          <p className="text-xl font-extrabold text-gray-900 dark:text-white">100</p>
          <p className="text-[11px] text-gray-400">Total Marks</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 text-center">
          <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1" />
          <p className="text-xl font-extrabold text-gray-900 dark:text-white">60%</p>
          <p className="text-[11px] text-gray-400">Pass Percentage</p>
        </div>
      </div>

      {/* Rules & Instructions */}
      <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <AlertCircle className="w-5 h-5 text-amber-500 mr-2" /> Exam Rules & Instructions
        </h3>
        <ul className="space-y-2 text-xs text-gray-600 dark:text-gray-300 leading-relaxed list-disc list-inside">
          <li>Ensure a stable internet connection before launching the exam.</li>
          <li>The countdown timer starts as soon as you click <strong>Start Quiz Now</strong>.</li>
          <li>Your answers are automatically saved to your browser session.</li>
          <li>You can mark questions for review and jump using the question palette.</li>
          <li>The quiz will automatically submit when the countdown timer reaches zero.</li>
        </ul>
      </div>

      {/* Action CTA */}
      <div className="flex justify-end space-x-3">
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="px-6 rounded-xl">
            Cancel
          </Button>
        </Link>
        <Button onClick={handleStart} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-8 py-3 text-sm shadow-md">
          <Play className="w-4 h-4 mr-2 fill-current" /> Start Quiz Now
        </Button>
      </div>
    </div>
  );
}

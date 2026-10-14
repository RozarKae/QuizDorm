import React from "react";
import Link from "next/link";
import { QuizAttempt } from "@/lib/types/attempt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, CheckCircle2, ArrowRight } from "lucide-react";

interface AttemptCardProps {
  attempt: QuizAttempt;
}

export function AttemptCard({ attempt }: AttemptCardProps) {
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <Badge
            className={
              attempt.isPassed
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
            }
          >
            {attempt.isPassed ? "PASSED" : "FAILED"}
          </Badge>
          <span className="text-xs text-gray-400 font-mono">{attempt.percentage}% Score</span>
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white">{attempt.quizTitle}</h3>

        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            {new Date(attempt.submittedAt || attempt.startedAt).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            {formatTime(attempt.timeTakenSeconds)}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3 shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100 dark:border-gray-900">
        <div className="text-right mr-2 hidden sm:block">
          <p className="text-sm font-extrabold text-indigo-600 font-mono">{attempt.score} / {attempt.totalMarks} pts</p>
          <p className="text-[10px] text-gray-400">{attempt.correctCount} Correct</p>
        </div>

        <Link href={`/dashboard/quizzes/${attempt.quizId}/review/${attempt.id}`}>
          <Button size="sm" variant="outline" className="text-xs font-semibold">
            Review Answers <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
}

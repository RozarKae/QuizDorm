"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QuizAttempt } from "@/lib/types/attempt";
import { AttemptCard } from "@/components/quiz-engine/AttemptCard";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { History, Search, ArrowLeft } from "lucide-react";

const mockAttempts: QuizAttempt[] = [
  {
    id: "att-901",
    quizId: "q-101",
    quizTitle: "Advanced Algebra & Calculus Challenge",
    userId: "usr-101",
    userName: "Rozar Khan",
    status: "submitted",
    startedAt: "2026-07-23T12:00:00Z",
    submittedAt: "2026-07-23T12:32:00Z",
    timeTakenSeconds: 1920,
    durationMinutes: 45,
    answers: {},
    markedForReview: [],
    score: 85,
    totalMarks: 100,
    passMarks: 60,
    percentage: 85,
    isPassed: true,
    correctCount: 21,
    incorrectCount: 3,
    unansweredCount: 1,
    questions: [],
  },
  {
    id: "att-902",
    quizId: "q-102",
    quizTitle: "Organic Chemistry & Molecular Structures",
    userId: "usr-101",
    userName: "Rozar Khan",
    status: "submitted",
    startedAt: "2026-07-20T10:00:00Z",
    submittedAt: "2026-07-20T10:28:00Z",
    timeTakenSeconds: 1680,
    durationMinutes: 30,
    answers: {},
    markedForReview: [],
    score: 45,
    totalMarks: 100,
    passMarks: 60,
    percentage: 45,
    isPassed: false,
    correctCount: 12,
    incorrectCount: 10,
    unansweredCount: 3,
    questions: [],
  },
];

export default function AttemptHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filtered = mockAttempts.filter((att) => {
    const matchesSearch = att.quizTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Passed" && att.isPassed) ||
      (statusFilter === "Failed" && !att.isPassed);
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/quizzes" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quizzes
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <History className="w-6 h-6 text-indigo-600 mr-2" /> Attempt History & Records
        </h1>
        <p className="text-sm text-gray-500">Track and review all your previous quiz submissions and test performance</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search quiz attempts..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-10 text-xs font-medium w-full sm:w-44"
          options={[
            { value: "All", label: "All Results" },
            { value: "Passed", label: "Passed Only" },
            { value: "Failed", label: "Failed Only" },
          ]}
        />
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          title="No Quiz Attempts Found"
          description="You haven't completed any quizzes matching the selected filters."
          actionLabel="Explore Quizzes"
          onAction={() => (window.location.href = "/dashboard/quizzes")}
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((att) => (
            <AttemptCard key={att.id} attempt={att} />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
    </div>
  );
}

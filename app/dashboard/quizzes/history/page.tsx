"use client";

import { AttemptCard } from "@/components/quiz-engine/AttemptCard";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Select } from "@/components/ui/select";
import { QuizAttempt } from "@/lib/types/attempt";
import { AlertCircle, ArrowLeft, History, Loader2, RefreshCw, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function AttemptHistoryPage() {
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAttempts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/quizzes/attempts");
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error || "Failed to load attempt history");
      }
      setAttempts(json.attempts || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load attempt history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchAttempts();
    });
  }, [fetchAttempts]);

  const filtered = attempts.filter((att) => {
    const matchesSearch = (att.quizTitle || "").toLowerCase().includes(searchTerm.toLowerCase());
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

      {/* Error notification */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-3 text-red-700 dark:text-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchAttempts} className="text-xs">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
          </Button>
        </div>
      )}

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

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-3" />
          <p className="text-sm text-gray-500">Loading your attempt records from database...</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No Quiz Attempts Found"
          description={
            attempts.length === 0
              ? "You haven't completed any quizzes yet. Start a quiz to build your history."
              : "No attempts match your current search and filter settings."
          }
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
      {!loading && filtered.length > 0 && (
        <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}

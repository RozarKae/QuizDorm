"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit,
  Eye,
  Clock,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

interface QuizItem {
  id: string;
  title: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionsCount: number;
  durationMinutes: number;
  status: "Published" | "Draft";
  createdAt: string;
}

const mockQuizzes: QuizItem[] = [
  {
    id: "q-101",
    title: "Advanced Algebra & Calculus Challenge",
    category: "Mathematics",
    difficulty: "Hard",
    questionsCount: 25,
    durationMinutes: 45,
    status: "Published",
    createdAt: "Jul 20, 2026",
  },
  {
    id: "q-102",
    title: "Organic Chemistry Fundamentals",
    category: "Science",
    difficulty: "Medium",
    questionsCount: 20,
    durationMinutes: 30,
    status: "Published",
    createdAt: "Jul 18, 2026",
  },
  {
    id: "q-103",
    title: "World History & Geography Quiz 2026",
    category: "History",
    difficulty: "Easy",
    questionsCount: 15,
    durationMinutes: 20,
    status: "Draft",
    createdAt: "Jul 15, 2026",
  },
  {
    id: "q-104",
    title: "Python Data Structures & Algorithms",
    category: "Computer Science",
    difficulty: "Hard",
    questionsCount: 30,
    durationMinutes: 60,
    status: "Published",
    createdAt: "Jul 12, 2026",
  },
  {
    id: "q-105",
    title: "Physics Mechanics & Kinematics",
    category: "Science",
    difficulty: "Medium",
    questionsCount: 18,
    durationMinutes: 35,
    status: "Published",
    createdAt: "Jul 10, 2026",
  },
];

export default function QuizzesListPage() {
  const [quizzes, setQuizzes] = useState<QuizItem[]>(mockQuizzes);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const filteredQuizzes = quizzes.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase()) || q.id.includes(searchTerm);
    const matchesCat = categoryFilter === "All" || q.category === categoryFilter;
    const matchesDiff = difficultyFilter === "All" || q.difficulty === difficultyFilter;
    return matchesSearch && matchesCat && matchesDiff;
  });

  const handleDelete = (id: string) => {
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    setDeleteTargetId(null);
    toast.success("Quiz deleted successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quizzes</h1>
          <p className="text-sm text-gray-500">Create, edit, and organize assessment quizzes</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/dashboard/quizzes/builder">
            <Button variant="outline" className="border-gray-300 dark:border-gray-800 text-sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Question Builder
            </Button>
          </Link>
          <Link href="/dashboard/quizzes/new">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search quizzes by title or ID..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 text-xs font-medium"
            options={[
              { value: "All", label: "All Categories" },
              { value: "Mathematics", label: "Mathematics" },
              { value: "Science", label: "Science" },
              { value: "Computer Science", label: "Computer Science" },
              { value: "History", label: "History" },
            ]}
          />

          <Select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="h-10 text-xs font-medium"
            options={[
              { value: "All", label: "All Difficulties" },
              { value: "Easy", label: "Easy" },
              { value: "Medium", label: "Medium" },
              { value: "Hard", label: "Hard" },
            ]}
          />
        </div>
      </div>

      {/* Quiz Grid / List */}
      {filteredQuizzes.length === 0 ? (
        <EmptyState
          title="No Quizzes Found"
          description="Try adjusting your search criteria or create a brand new quiz to get started."
          actionLabel="Create Quiz"
          onAction={() => window.location.href = "/dashboard/quizzes/new"}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                    {quiz.category}
                  </span>
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
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2">
                  {quiz.title}
                </h3>

                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-6">
                  <span className="flex items-center">
                    <HelpCircle className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    {quiz.questionsCount} Questions
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                    {quiz.durationMinutes} mins
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
                <span
                  className={`text-xs font-medium flex items-center ${
                    quiz.status === "Published" ? "text-emerald-600 dark:text-emerald-400" : "text-gray-400"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                  {quiz.status}
                </span>

                <div className="flex items-center space-x-1">
                  <Link href={`/dashboard/quizzes/${quiz.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900" title="View Details">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href={`/dashboard/quizzes/${quiz.id}/edit`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50" title="Edit Quiz">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTargetId(quiz.id)}
                    className="h-8 w-8 text-red-600 hover:bg-red-50"
                    title="Delete Quiz"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Delete Quiz Confirmation
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quiz? This action cannot be undone and will remove all student attempts associated with it.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteTargetId(null)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold"
              onClick={() => deleteTargetId && handleDelete(deleteTargetId)}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

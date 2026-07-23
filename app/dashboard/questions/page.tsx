"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QuestionItem, QuestionType, DifficultyLevel } from "@/lib/types/question";
import { QuestionCard } from "@/components/question-bank/QuestionCard";
import { BulkActionToolbar } from "@/components/question-bank/BulkActionToolbar";
import { ImportDialog } from "@/components/question-bank/ImportDialog";
import { ExportDialog } from "@/components/question-bank/ExportDialog";
import { CategoryManagerModal } from "@/components/question-bank/CategoryManagerModal";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Plus,
  Search,
  LayoutGrid,
  List,
  Upload,
  Download,
  BookOpen,
  Trash2,
  Edit,
  Tag,
  CheckSquare,
  Database,
} from "lucide-react";
import { toast } from "sonner";

const mockQuestions: QuestionItem[] = [
  {
    id: "q-101",
    title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Algebra",
    topic: "Calculus",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 60,
    options: [
      { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
      { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
      { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
    ],
    tags: ["calculus", "derivatives"],
    createdAt: "Jul 20, 2026",
    updatedAt: "Jul 23, 2026",
  },
  {
    id: "q-102",
    title: "Which of the following organic compounds contain a benzene ring?",
    type: "mcq_multiple",
    subject: "Science",
    category: "Chemistry",
    topic: "Organic Chemistry",
    difficulty: "Hard",
    marks: 5,
    timeLimitSeconds: 90,
    options: [
      { id: "o1", text: "Toluene", isCorrect: true },
      { id: "o2", text: "Phenol", isCorrect: true },
      { id: "o3", text: "Methane", isCorrect: false },
    ],
    tags: ["chemistry", "benzene"],
    createdAt: "Jul 18, 2026",
    updatedAt: "Jul 23, 2026",
  },
  {
    id: "q-103",
    title: "Light travels faster in water than in vacuum.",
    type: "true_false",
    subject: "Science",
    category: "Physics",
    topic: "Optics",
    difficulty: "Easy",
    marks: 2,
    timeLimitSeconds: 30,
    options: [],
    tags: ["physics", "optics"],
    createdAt: "Jul 15, 2026",
    updatedAt: "Jul 23, 2026",
  },
];

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>(mockQuestions);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog States
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === "All" || q.category === selectedCategory;
    const matchesDiff = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    const matchesType = selectedType === "All" || q.type === selectedType;
    return matchesSearch && matchesCat && matchesDiff && matchesType;
  });

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === filteredQuestions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredQuestions.map((q) => q.id));
    }
  };

  const handleBulkDelete = () => {
    setQuestions((prev) => prev.filter((q) => !selectedIds.includes(q.id)));
    setSelectedIds([]);
    toast.success("Selected questions deleted");
  };

  const handleBulkCategoryChange = (newCat: string) => {
    setQuestions((prev) => prev.map((q) => (selectedIds.includes(q.id) ? { ...q, category: newCat } : q)));
    setSelectedIds([]);
    toast.success(`Updated category to ${newCat}`);
  };

  const handleBulkDifficultyChange = (newDiff: string) => {
    setQuestions((prev) => prev.map((q) => (selectedIds.includes(q.id) ? { ...q, difficulty: newDiff as DifficultyLevel } : q)));
    setSelectedIds([]);
    toast.success(`Updated difficulty to ${newDiff}`);
  };

  return (
    <div className="space-y-6">
      {/* Header & Main Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Database className="w-6 h-6 text-indigo-600 mr-2" /> Question Bank
          </h1>
          <p className="text-sm text-gray-500">Repository of reusable assessment questions across all subjects</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setCategoryOpen(true)} className="text-xs">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Taxonomy Manager
          </Button>
          <Button variant="outline" size="sm" onClick={() => setImportOpen(true)} className="text-xs">
            <Upload className="w-3.5 h-3.5 mr-1.5" /> Import
          </Button>
          <Button variant="outline" size="sm" onClick={() => setExportOpen(true)} className="text-xs">
            <Download className="w-3.5 h-3.5 mr-1.5" /> Export
          </Button>
          <Link href="/dashboard/questions/new">
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
              <Plus className="w-4 h-4 mr-1.5" /> Add Question
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by statement or #tag..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-10 text-xs font-medium"
            options={[
              { value: "All", label: "All Categories" },
              { value: "Algebra", label: "Algebra" },
              { value: "Chemistry", label: "Chemistry" },
              { value: "Physics", label: "Physics" },
            ]}
          />

          <Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="h-10 text-xs font-medium"
            options={[
              { value: "All", label: "All Difficulties" },
              { value: "Easy", label: "Easy" },
              { value: "Medium", label: "Medium" },
              { value: "Hard", label: "Hard" },
            ]}
          />

          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="h-10 text-xs font-medium"
            options={[
              { value: "All", label: "All Formats" },
              { value: "mcq_single", label: "MCQ Single" },
              { value: "mcq_multiple", label: "MCQ Multiple" },
              { value: "true_false", label: "True / False" },
            ]}
          />

          {/* View mode toggle */}
          <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`h-8 w-8 ${viewMode === "grid" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("table")}
              className={`h-8 w-8 ${viewMode === "table" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"}`}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Question List View */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          title="No Questions Found"
          description="Try clearing filters or add a new question to your question bank."
          actionLabel="Create Question"
          onAction={() => (window.location.href = "/dashboard/questions/new")}
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuestions.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              isSelected={selectedIds.includes(q.id)}
              onSelectToggle={handleSelectToggle}
              onDelete={(id) => {
                setQuestions(questions.filter((item) => item.id !== id));
                toast.success("Question deleted");
              }}
            />
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white dark:bg-gray-950 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm overflow-hidden p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
              <thead className="bg-gray-50 dark:bg-gray-900 text-xs uppercase font-semibold text-gray-500 border-b border-gray-100 dark:border-gray-850">
                <tr>
                  <th className="py-3.5 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === filteredQuestions.length && filteredQuestions.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Question</th>
                  <th className="py-3.5 px-4">Subject / Category</th>
                  <th className="py-3.5 px-4">Difficulty</th>
                  <th className="py-3.5 px-4">Marks</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
                {filteredQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(q.id)}
                        onChange={() => handleSelectToggle(q.id)}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <QuestionTypeBadge type={q.type} />
                    </td>
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white max-w-xs truncate">
                      {q.title}
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-gray-500">
                      {q.subject} ➔ {q.category}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold">{q.difficulty}</td>
                    <td className="py-4 px-4 font-mono text-xs font-bold text-indigo-600">{q.marks} pts</td>
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link href={`/dashboard/questions/${q.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setQuestions(questions.filter((item) => item.id !== q.id));
                            toast.success("Question deleted");
                          }}
                          className="h-8 w-8 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />

      {/* Bulk Toolbar */}
      <BulkActionToolbar
        selectedCount={selectedIds.length}
        onClearSelection={() => setSelectedIds([])}
        onBulkDelete={handleBulkDelete}
        onBulkCategoryChange={handleBulkCategoryChange}
        onBulkDifficultyChange={handleBulkDifficultyChange}
      />

      {/* Dialogs */}
      <ImportDialog open={importOpen} onOpenChange={setImportOpen} />
      <ExportDialog open={exportOpen} onOpenChange={setExportOpen} count={selectedIds.length || filteredQuestions.length} />
      <CategoryManagerModal open={categoryOpen} onOpenChange={setCategoryOpen} />
    </div>
  );
}

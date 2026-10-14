"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import { Badge } from "@/components/ui/badge";
import {
  getStoredQuestions,
  saveStoredQuestions,
  deleteQuestion,
  getAllTopics,
  getAllGradeLevels,
  getAllSubjects,
} from "@/lib/data/question-bank";
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
  Database,
  ScanText,
  Layers,
  Filter,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const PAGE_SIZE = 24;

export default function QuestionBankPage() {
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Dialog States
  const [importOpen, setImportOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  // Sync with persistent question bank
  const reloadQuestions = () => {
    const list = getStoredQuestions();
    setQuestions(list);
    setIsLoaded(true);
  };

  useEffect(() => {
    reloadQuestions();

    const handleUpdate = () => {
      reloadQuestions();
    };

    window.addEventListener("quizdorm:questions-updated", handleUpdate);
    return () => {
      window.removeEventListener("quizdorm:questions-updated", handleUpdate);
    };
  }, []);

  const topicsList = useMemo(() => {
    return getAllTopics();
  }, [questions]);

  const gradesList = useMemo(() => {
    return getAllGradeLevels();
  }, [questions]);

  const subjectsList = useMemo(() => {
    return getAllSubjects();
  }, [questions]);

  // Topic pill options (top 10 most frequent + All)
  const topTopics = useMemo(() => {
    const topicCounts: Record<string, number> = {};
    questions.forEach((q) => {
      if (q.topic) {
        topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
      }
    });
    return Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([t]) => t);
  }, [questions]);

  // Filtering
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesSearch =
        !searchTerm ||
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTopic =
        selectedTopic === "All" ||
        (q.topic && q.topic.toLowerCase() === selectedTopic.toLowerCase());

      const matchesGrade =
        selectedGrade === "All" ||
        (q.gradeLevel && q.gradeLevel.toLowerCase() === selectedGrade.toLowerCase()) ||
        (q.grade && q.grade.toLowerCase() === selectedGrade.toLowerCase());

      const matchesSubject =
        selectedSubject === "All" ||
        (q.subject && q.subject.toLowerCase() === selectedSubject.toLowerCase());

      const matchesDiff =
        selectedDifficulty === "All" ||
        (q.difficulty && q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase());

      const matchesType = selectedType === "All" || q.type === selectedType;

      return matchesSearch && matchesTopic && matchesGrade && matchesSubject && matchesDiff && matchesType;
    });
  }, [questions, searchTerm, selectedTopic, selectedGrade, selectedSubject, selectedDifficulty, selectedType]);

  // Reset page on filter changes
  useEffect(() => {
    setCurrentPage(1);
    setSelectedIds([]);
  }, [searchTerm, selectedTopic, selectedGrade, selectedSubject, selectedDifficulty, selectedType]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredQuestions.slice(start, start + PAGE_SIZE);
  }, [filteredQuestions, currentPage]);

  const handleSelectToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedQuestions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedQuestions.map((q) => q.id));
    }
  };

  const handleDeleteOne = (id: string) => {
    deleteQuestion(id);
    setQuestions((prev) => prev.filter((item) => item.id !== id));
    toast.success("Question deleted from question bank");
  };

  const handleBulkDelete = () => {
    const updated = questions.filter((q) => !selectedIds.includes(q.id));
    saveStoredQuestions(updated);
    setQuestions(updated);
    setSelectedIds([]);
    toast.success(`Deleted ${selectedIds.length} questions`);
  };

  const handleBulkCategoryChange = (newCat: string) => {
    const updated = questions.map((q) =>
      selectedIds.includes(q.id) ? { ...q, category: newCat, subject: newCat } : q
    );
    saveStoredQuestions(updated);
    setQuestions(updated);
    setSelectedIds([]);
    toast.success(`Updated subject/category to ${newCat}`);
  };

  const handleBulkDifficultyChange = (newDiff: string) => {
    const updated = questions.map((q) =>
      selectedIds.includes(q.id) ? { ...q, difficulty: newDiff as DifficultyLevel } : q
    );
    saveStoredQuestions(updated);
    setQuestions(updated);
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
            {isLoaded && (
              <span className="ml-3 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                {questions.length} Questions
              </span>
            )}
          </h1>
          <p className="text-sm text-gray-500">
            Topic-organized repository of reusable assessment questions across all subjects
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/ocr">
            <Button size="sm" variant="outline" className="text-xs bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold">
              <ScanText className="w-3.5 h-3.5 mr-1.5 text-indigo-600" /> AI OCR Digitizer
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => setCategoryOpen(true)} className="text-xs">
            <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Taxonomy
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

      {/* Primary Organization: Topic Selector Pills */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-semibold flex items-center text-gray-700 dark:text-gray-300">
            <Layers className="w-3.5 h-3.5 mr-1.5 text-indigo-600" /> Primary Topic Browse
          </span>
          <span className="text-xs">
            Showing {filteredQuestions.length} of {questions.length} questions
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedTopic("All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTopic === "All"
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            All Topics ({questions.length})
          </button>
          {topTopics.map((topic) => {
            const count = questions.filter((q) => q.topic === topic).length;
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(isSelected ? "All" : topic)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-100 dark:border-gray-800"
                }`}
              >
                {topic} <span className="opacity-75 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar with Secondary Filters */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions, answers, #tags..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          {/* Topic Select */}
          <Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="h-10 text-xs font-medium min-w-[150px]"
            options={[
              { value: "All", label: "All Topics" },
              ...topicsList.map((t) => ({ value: t, label: t })),
            ]}
          />

          {/* Optional Grade / Level Filter */}
          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="h-10 text-xs font-medium min-w-[140px]"
            options={[
              { value: "All", label: "Grade: All Levels" },
              ...gradesList.map((g) => ({ value: g, label: g })),
            ]}
          />

          {/* Subject Filter */}
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-10 text-xs font-medium min-w-[140px]"
            options={[
              { value: "All", label: "All Subjects" },
              ...subjectsList.map((s) => ({ value: s, label: s })),
            ]}
          />

          {/* Difficulty Filter */}
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

          {/* Format / Type */}
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

      {/* Active Filter Indicator */}
      {(selectedTopic !== "All" || selectedGrade !== "All" || selectedSubject !== "All" || selectedDifficulty !== "All" || searchTerm) && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span>Active filters:</span>
          {selectedTopic !== "All" && (
            <Badge className="bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              Topic: {selectedTopic}
            </Badge>
          )}
          {selectedGrade !== "All" && (
            <Badge className="bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
              Grade: {selectedGrade}
            </Badge>
          )}
          {selectedSubject !== "All" && (
            <Badge className="bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              Subject: {selectedSubject}
            </Badge>
          )}
          {selectedDifficulty !== "All" && (
            <Badge className="bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
              Difficulty: {selectedDifficulty}
            </Badge>
          )}
          {searchTerm && (
            <Badge className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
              Query: &quot;{searchTerm}&quot;
            </Badge>
          )}
          <button
            onClick={() => {
              setSelectedTopic("All");
              setSelectedGrade("All");
              setSelectedSubject("All");
              setSelectedDifficulty("All");
              setSelectedType("All");
              setSearchTerm("");
            }}
            className="text-xs text-indigo-600 hover:underline font-semibold ml-2"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Question List View */}
      {filteredQuestions.length === 0 ? (
        <EmptyState
          title="No Questions Found"
          description="Try clearing your topic or grade filters, or add a new question to the bank."
          actionLabel="Clear Filters"
          onAction={() => {
            setSelectedTopic("All");
            setSelectedGrade("All");
            setSelectedSubject("All");
            setSelectedDifficulty("All");
            setSelectedType("All");
            setSearchTerm("");
          }}
        />
      ) : viewMode === "grid" ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                isSelected={selectedIds.includes(q.id)}
                onSelectToggle={handleSelectToggle}
                onDelete={handleDeleteOne}
              />
            ))}
          </div>
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
                      checked={selectedIds.length === paginatedQuestions.length && paginatedQuestions.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">Format</th>
                  <th className="py-3.5 px-4">Question</th>
                  <th className="py-3.5 px-4">Topic / Subject</th>
                  <th className="py-3.5 px-4">Grade / Level</th>
                  <th className="py-3.5 px-4">Difficulty</th>
                  <th className="py-3.5 px-4">Marks</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-900">
                {paginatedQuestions.map((q) => (
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
                    <td className="py-4 px-4 font-semibold text-gray-900 dark:text-white max-w-xs">
                      <div className="line-clamp-2">{q.title}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-gray-600 dark:text-gray-400">
                      <div className="font-bold text-gray-900 dark:text-gray-200">{q.topic || "General"}</div>
                      <div className="text-[11px] text-gray-400">{q.subject}</div>
                    </td>
                    <td className="py-4 px-4 text-xs font-medium text-gray-500">
                      {q.gradeLevel || q.grade || "All Levels"}
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
                          onClick={() => handleDeleteOne(q.id)}
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
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

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

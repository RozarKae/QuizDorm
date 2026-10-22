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
import { doesQuestionMatchTopic } from "@/lib/data/taxonomy";
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

      const matchesTopic = doesQuestionMatchTopic(q, selectedTopic);

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold font-display text-[#F2F7F3] flex items-center">
            <Database className="w-5 h-5 text-[#65F59A] mr-2" /> Question Bank
            {isLoaded && (
              <span className="ml-3 font-mono text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.15)] text-[#65F59A] border border-[rgba(101,245,154,0.3)] shadow-[0_0_8px_rgba(101,245,154,0.2)]">
                {questions.length} Items // Verified
              </span>
            )}
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5] mt-1">
            Systematic question taxonomy and specimen repository across 18 academic domains
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/dashboard/ocr">
            <Button size="sm" variant="outline" className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] bg-[#111B17] text-[#F2F7F3] hover:text-[#65F59A] hover:bg-[#17251E] h-8 transition-colors">
              <ScanText className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> AI OCR Digitizer
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => setCategoryOpen(true)} className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] bg-[#111B17] text-[#F2F7F3] hover:text-[#65F59A] hover:bg-[#17251E] h-8 transition-colors">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" /> Taxonomy
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setImportOpen(true)}
            className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] bg-[#111B17] text-[#F2F7F3] hover:text-[#65F59A] hover:bg-[#17251E] h-8 transition-colors"
            title="Import questions from CSV, Excel, or JSON into Question Bank"
          >
            <Upload className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> Import
          </Button>
          <Button variant="outline" size="sm" onClick={() => setExportOpen(true)} className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] bg-[#111B17] text-[#F2F7F3] hover:text-[#65F59A] hover:bg-[#17251E] h-8 transition-colors">
            <Download className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" /> Export
          </Button>
          <Link href="/dashboard/questions/new">
            <Button size="sm" className="bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono text-xs font-bold rounded-[4px] h-8 shadow-[0_0_12px_rgba(101,245,154,0.25)] transition-all">
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Question
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Organization: Topic Selector Pills */}
      <div className="bg-card p-4 rounded-[3px] border border-border shadow-xs space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span className="font-semibold flex items-center text-foreground uppercase tracking-wider text-[11px]">
            <Layers className="w-3.5 h-3.5 mr-1.5 text-cobalt" /> Knowledge Domains
          </span>
          <span className="text-[11px]">
            Showing {filteredQuestions.length} of {questions.length} items
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin font-mono">
          <button
            onClick={() => setSelectedTopic("All")}
            className={`px-2.5 py-1 rounded-[2px] text-xs font-medium whitespace-nowrap transition-colors border ${
              selectedTopic === "All"
                ? "bg-foreground text-background font-bold border-foreground shadow-xs"
                : "bg-background text-muted-foreground border-border hover:border-cobalt/50"
            }`}
          >
            All Domains ({questions.length})
          </button>
          {topTopics.map((topic) => {
            const count = questions.filter((q) => q.topic === topic).length;
            const isSelected = selectedTopic === topic;
            return (
              <button
                key={topic}
                onClick={() => setSelectedTopic(isSelected ? "All" : topic)}
                className={`px-2.5 py-1 rounded-[2px] text-xs whitespace-nowrap transition-colors border ${
                  isSelected
                    ? "bg-foreground text-background font-bold border-foreground shadow-xs"
                    : "bg-background text-muted-foreground border-border hover:border-cobalt/50"
                }`}
              >
                {topic} <span className="opacity-75 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Bar with Secondary Filters */}
      <div className="bg-card p-4 rounded-[3px] border border-border shadow-xs flex flex-col lg:flex-row items-center justify-between gap-3">
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions, answers, #tags..."
            className="pl-8 h-8 bg-background border-border text-xs rounded-[3px] font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Topic Select */}
          <Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="h-8 text-xs font-mono min-w-[140px] rounded-[3px]"
            options={[
              { value: "All", label: "All Topics" },
              ...topicsList.map((t) => ({ value: t, label: t })),
            ]}
          />

          {/* Optional Grade / Level Filter */}
          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="h-8 text-xs font-mono min-w-[130px] rounded-[3px]"
            options={[
              { value: "All", label: "Grade: All" },
              ...gradesList.map((g) => ({ value: g, label: g })),
            ]}
          />

          {/* Subject Filter */}
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="h-8 text-xs font-mono min-w-[130px] rounded-[3px]"
            options={[
              { value: "All", label: "All Subjects" },
              ...subjectsList.map((s) => ({ value: s, label: s })),
            ]}
          />

          {/* Difficulty Filter */}
          <Select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="h-8 text-xs font-mono rounded-[3px]"
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
            className="h-8 text-xs font-mono rounded-[3px]"
            options={[
              { value: "All", label: "All Formats" },
              { value: "mcq_single", label: "MCQ Single" },
              { value: "mcq_multiple", label: "MCQ Multiple" },
              { value: "true_false", label: "True / False" },
            ]}
          />

          {/* View mode toggle */}
          <div className="flex items-center space-x-0.5 bg-muted p-0.5 rounded-[2px] border border-border">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={`h-7 w-7 rounded-[2px] ${viewMode === "grid" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground"}`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("table")}
              className={`h-7 w-7 rounded-[2px] ${viewMode === "table" ? "bg-card text-foreground shadow-xs font-bold" : "text-muted-foreground"}`}
            >
              <List className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {(selectedTopic !== "All" || selectedGrade !== "All" || selectedSubject !== "All" || selectedDifficulty !== "All" || searchTerm) && (
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="uppercase text-[10px]">Filters:</span>
          {selectedTopic !== "All" && (
            <span className="bg-muted text-foreground border border-border px-1.5 py-0.5 rounded-[2px] text-[10px]">
              Domain: {selectedTopic}
            </span>
          )}
          {selectedGrade !== "All" && (
            <span className="bg-muted text-foreground border border-border px-1.5 py-0.5 rounded-[2px] text-[10px]">
              Grade: {selectedGrade}
            </span>
          )}
          {selectedSubject !== "All" && (
            <span className="bg-muted text-foreground border border-border px-1.5 py-0.5 rounded-[2px] text-[10px]">
              Subject: {selectedSubject}
            </span>
          )}
          {selectedDifficulty !== "All" && (
            <span className="bg-muted text-foreground border border-border px-1.5 py-0.5 rounded-[2px] text-[10px]">
              Diff: {selectedDifficulty}
            </span>
          )}
          {searchTerm && (
            <span className="bg-muted text-foreground border border-border px-1.5 py-0.5 rounded-[2px] text-[10px]">
              Query: &quot;{searchTerm}&quot;
            </span>
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
        <div className="bg-card rounded-[3px] border border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono text-foreground">
              <thead className="bg-muted/40 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground border-b border-border">
                <tr>
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === paginatedQuestions.length && paginatedQuestions.length > 0}
                      onChange={handleSelectAll}
                      className="w-3.5 h-3.5 text-cobalt rounded-[2px] border-border cursor-pointer"
                    />
                  </th>
                  <th className="py-3 px-4">Format</th>
                  <th className="py-3 px-4">Question</th>
                  <th className="py-3 px-4">Domain / Subject</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Difficulty</th>
                  <th className="py-3 px-4">Marks</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {paginatedQuestions.map((q) => (
                  <tr key={q.id} className="hover:bg-muted/40 transition-colors">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(q.id)}
                        onChange={() => handleSelectToggle(q.id)}
                        className="w-3.5 h-3.5 text-cobalt rounded-[2px] border-border cursor-pointer"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <QuestionTypeBadge type={q.type} />
                    </td>
                    <td className="py-3 px-4 font-semibold text-foreground max-w-xs font-display">
                      <div className="line-clamp-2">{q.title}</div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono">
                      <div className="font-bold text-foreground">{q.topic || "General"}</div>
                      <div className="text-[10px] text-muted-foreground">{q.subject}</div>
                    </td>
                    <td className="py-3 px-4 text-xs font-mono text-muted-foreground">
                      {q.gradeLevel || q.grade || "All Levels"}
                    </td>
                    <td className="py-3 px-4 text-xs">
                      {q.difficulty === "Hard" ? (
                        <span className="text-coral font-bold uppercase text-[10px]">Hard</span>
                      ) : q.difficulty === "Medium" ? (
                        <span className="text-foreground uppercase text-[10px]">Medium</span>
                      ) : (
                        <span className="text-acid dark:text-acid font-bold uppercase text-[10px]">Easy</span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs font-bold">{q.marks} pts</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <Link href={`/dashboard/questions/${q.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[2px] text-muted-foreground hover:text-foreground">
                            <Edit className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteOne(q.id)}
                          className="h-7 w-7 rounded-[2px] text-coral hover:bg-coral/10"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
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

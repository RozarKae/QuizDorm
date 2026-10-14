"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Zap,
  Play,
  Layers,
  GraduationCap,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { QuizItem } from "@/lib/types/quiz";
import {
  getAllQuizzes,
  deleteQuiz as removeStoredQuiz,
  generateInstantQuiz,
  getTopicsSummary,
  TopicSummary,
} from "@/lib/data/quizzes";
import { getAllTopics, getAllSubjects, getAllGradeLevels } from "@/lib/data/question-bank";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination } from "@/components/ui/pagination";
import { EmptyState } from "@/components/ui/empty-state";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function QuizzesListPage() {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<QuizItem[]>([]);
  const [topicsSummary, setTopicsSummary] = useState<TopicSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Topic is the PRIMARY organization and filter
  const [topicFilter, setTopicFilter] = useState("All");
  // Optional secondary filters
  const [gradeFilter, setGradeFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [subjectFilter, setSubjectFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  // Instant Quiz modal state
  const [instantModalOpen, setInstantModalOpen] = useState(false);
  const [instantTopic, setInstantTopic] = useState("All");
  const [instantGrade, setInstantGrade] = useState("All");
  const [instantDifficulty, setInstantDifficulty] = useState("All");
  const [instantCount, setInstantCount] = useState(10);

  // Load quizzes from persistent repository
  const loadData = () => {
    const list = getAllQuizzes();
    setQuizzes(list);
    setTopicsSummary(getTopicsSummary());
  };

  useEffect(() => {
    loadData();

    const handleUpdate = () => loadData();
    window.addEventListener("quizdorm:quizzes-updated", handleUpdate);
    return () => window.removeEventListener("quizdorm:quizzes-updated", handleUpdate);
  }, []);

  const allTopicsList = useMemo(() => ["All", ...getAllTopics()], []);
  const allSubjectsList = useMemo(() => ["All", ...getAllSubjects()], []);
  const allGradesList = useMemo(() => ["All", ...getAllGradeLevels()], []);

  // Filter quizzes primarily by topic, then optional filters
  const filteredQuizzes = useMemo(() => {
    return quizzes.filter((q) => {
      const qTitle = (q.title || "").toLowerCase();
      const qDesc = (q.description || "").toLowerCase();
      const qTopic = (q.topic || "").toLowerCase();
      const term = searchTerm.toLowerCase();

      const matchesSearch =
        !term ||
        qTitle.includes(term) ||
        qDesc.includes(term) ||
        qTopic.includes(term) ||
        q.id.toLowerCase().includes(term);

      // Primary Topic matching
      const matchesTopic =
        topicFilter === "All" ||
        (q.topic && q.topic.toLowerCase() === topicFilter.toLowerCase()) ||
        qTitle.toLowerCase().includes(topicFilter.toLowerCase());

      // Optional Grade Level matching
      const qGrade = q.gradeLevel || q.grade || "";
      const matchesGrade =
        gradeFilter === "All" ||
        qGrade.toLowerCase() === gradeFilter.toLowerCase();

      // Optional Difficulty matching
      const matchesDiff =
        difficultyFilter === "All" ||
        q.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

      // Optional Subject matching
      const matchesSubject =
        subjectFilter === "All" ||
        q.subject.toLowerCase() === subjectFilter.toLowerCase() ||
        q.category.toLowerCase() === subjectFilter.toLowerCase();

      return matchesSearch && matchesTopic && matchesGrade && matchesDiff && matchesSubject;
    });
  }, [quizzes, searchTerm, topicFilter, gradeFilter, difficultyFilter, subjectFilter]);

  const handleDelete = (id: string) => {
    removeStoredQuiz(id);
    setQuizzes((prev) => prev.filter((q) => q.id !== id));
    setDeleteTargetId(null);
    toast.success("Quiz deleted successfully");
  };

  const handleLaunchInstantQuiz = (customTopic?: string) => {
    const targetTopic = customTopic || (topicFilter !== "All" ? topicFilter : instantTopic);
    const newQuiz = generateInstantQuiz({
      topic: targetTopic,
      gradeLevel: instantGrade !== "All" ? instantGrade : undefined,
      difficulty: instantDifficulty !== "All" ? instantDifficulty : undefined,
      questionCount: instantCount,
    });

    toast.success(`Generated instant quiz with ${newQuiz.questions.length} shuffled questions!`);
    setInstantModalOpen(false);
    // Navigate straight to distraction-free exam engine
    router.push(`/dashboard/quizzes/${newQuiz.id}/take/live`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Topic-Based Quizzes</h1>
            <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-medium text-xs">
              Primary Organization
            </Badge>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Browse and take assessments organized primarily by subject topic, with optional grade and difficulty filters.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => {
              setInstantTopic(topicFilter !== "All" ? topicFilter : "All");
              setInstantModalOpen(true);
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-sm"
          >
            <Zap className="w-4 h-4 mr-1.5 fill-current" />
            Instant Quiz
          </Button>
          <Link href="/dashboard/quizzes/builder">
            <Button variant="outline" className="border-gray-300 dark:border-gray-800 text-sm">
              <HelpCircle className="w-4 h-4 mr-2" />
              Builder
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

      {/* TOPIC BROWSER PILLS (Primary Way Users Browse) */}
      <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Browse By Topic ({topicsSummary.length} Topics)</span>
          </div>
          {topicFilter !== "All" && (
            <button
              onClick={() => setTopicFilter("All")}
              className="text-xs text-indigo-600 hover:underline font-semibold"
            >
              Reset to All Topics
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setTopicFilter("All")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
              topicFilter === "All"
                ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-900"
                : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
            }`}
          >
            All Topics ({quizzes.length})
          </button>
          {topicsSummary.slice(0, 12).map((ts) => (
            <button
              key={ts.topic}
              onClick={() => setTopicFilter(ts.topic)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 ${
                topicFilter === ts.topic
                  ? "bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-300 dark:ring-indigo-900 font-bold"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              <span>{ts.topic}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  topicFilter === ts.topic
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 dark:bg-gray-800 text-gray-500"
                }`}
              >
                {ts.questionCount} Qs
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search title, topic, ID..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900"
          />
        </div>

        {/* Filter Controls: Topic (Primary), Grade, Difficulty, Subject */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
          {/* Topic Select */}
          <div className="min-w-[140px]">
            <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Topic</label>
            <Select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="h-9 text-xs font-medium"
              options={allTopicsList.map((t) => ({ value: t, label: t === "All" ? "All Topics" : t }))}
            />
          </div>

          {/* Optional Grade Filter */}
          <div className="min-w-[130px]">
            <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Grade Filter</label>
            <Select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="h-9 text-xs font-medium"
              options={allGradesList.map((g) => ({ value: g, label: g === "All" ? "All Grades" : g }))}
            />
          </div>

          {/* Optional Difficulty Filter */}
          <div className="min-w-[120px]">
            <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Difficulty</label>
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="h-9 text-xs font-medium"
              options={[
                { value: "All", label: "All Difficulties" },
                { value: "Easy", label: "Easy" },
                { value: "Medium", label: "Medium" },
                { value: "Hard", label: "Hard" },
              ]}
            />
          </div>

          {/* Optional Subject Filter */}
          <div className="min-w-[130px]">
            <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase">Subject</label>
            <Select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="h-9 text-xs font-medium"
              options={allSubjectsList.map((s) => ({ value: s, label: s === "All" ? "All Subjects" : s }))}
            />
          </div>
        </div>
      </div>

      {/* QUIZZES GRID */}
      {filteredQuizzes.length === 0 ? (
        <EmptyState
          title="No Quizzes Found"
          description={
            topicFilter !== "All"
              ? `No pre-made quizzes under topic "${topicFilter}". Click below to generate an instant shuffled quiz from this topic!`
              : "Try adjusting your search filters or generate a quick topic quiz."
          }
          actionLabel="Launch Instant Quiz"
          onAction={() => handleLaunchInstantQuiz(topicFilter !== "All" ? topicFilter : undefined)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredQuizzes.map((quiz) => {
            const questionsCount = quiz.questions?.length || 0;
            return (
              <div
                key={quiz.id}
                className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-100 dark:border-gray-850 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Topic and Difficulty Header */}
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 truncate max-w-[180px]">
                      {quiz.topic || quiz.category}
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

                  {/* Title */}
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 group-hover:text-indigo-600 transition-colors">
                    {quiz.title}
                  </h3>

                  {/* Metadata Chips: Grade, Subject, Questions, Duration */}
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
                    {(quiz.gradeLevel || quiz.grade) && (
                      <span className="flex items-center text-slate-600 dark:text-slate-400 font-medium bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-lg text-[11px]">
                        <GraduationCap className="w-3 h-3 mr-1 text-slate-500" />
                        {quiz.gradeLevel || quiz.grade}
                      </span>
                    )}
                    <span className="flex items-center">
                      <HelpCircle className="w-3.5 h-3.5 mr-1 text-gray-400" />
                      {questionsCount} Questions
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
                      {quiz.durationMinutes} mins
                    </span>
                  </div>

                  {quiz.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
                      {quiz.description}
                    </p>
                  )}
                </div>

                {/* Card Footer with Instant Play & Controls */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
                  <Link href={`/dashboard/quizzes/${quiz.id}/take`}>
                    <Button
                      size="sm"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl px-4 shadow-sm"
                    >
                      <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Take Quiz
                    </Button>
                  </Link>

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
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <Pagination currentPage={currentPage} totalPages={1} onPageChange={setCurrentPage} />

      {/* INSTANT QUIZ MODAL */}
      <Dialog open={instantModalOpen} onOpenChange={setInstantModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-gray-900 dark:text-white">
              <Zap className="w-5 h-5 text-emerald-600 mr-2 fill-current" />
              Start Instant Shuffled Quiz
            </DialogTitle>
            <DialogDescription>
              Launch an instant quiz attempt with fresh randomized question order and shuffled options.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Select Topic (Primary)
              </label>
              <Select
                value={instantTopic}
                onChange={(e) => setInstantTopic(e.target.value)}
                options={allTopicsList.map((t) => ({ value: t, label: t === "All" ? "All Topics (Multi-Topic)" : t }))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Optional Grade Filter
              </label>
              <Select
                value={instantGrade}
                onChange={(e) => setInstantGrade(e.target.value)}
                options={allGradesList.map((g) => ({ value: g, label: g === "All" ? "All Grade Levels" : g }))}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Optional Difficulty
              </label>
              <Select
                value={instantDifficulty}
                onChange={(e) => setInstantDifficulty(e.target.value)}
                options={[
                  { value: "All", label: "All Difficulties" },
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" },
                ]}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                Number of Questions
              </label>
              <Select
                value={String(instantCount)}
                onChange={(e) => setInstantCount(Number(e.target.value))}
                options={[
                  { value: "5", label: "5 Questions (Sprint)" },
                  { value: "10", label: "10 Questions (Standard)" },
                  { value: "15", label: "15 Questions (Challenge)" },
                  { value: "20", label: "20 Questions (Comprehensive)" },
                ]}
              />
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setInstantModalOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              onClick={() => handleLaunchInstantQuiz()}
            >
              <Play className="w-4 h-4 mr-1.5 fill-current" />
              Launch Quiz Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteTargetId} onOpenChange={() => setDeleteTargetId(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Delete Quiz Confirmation
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this quiz? This action will remove the quiz from your repository.
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

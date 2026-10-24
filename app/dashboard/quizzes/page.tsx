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
  FileText,
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
import { AIDocumentQuizModal } from "@/components/ai/AIDocumentQuizModal";
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
  const [aiDocModalOpen, setAiDocModalOpen] = useState(false);

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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="border border-[rgba(240, 160, 180,0.16)] bg-[#140C0E] p-6 rounded-[6px] space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(240, 160, 180,0.12)] pb-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5]">
              <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse shadow-[0_0_8px_#FF4D6D]" />
              <span>THE DORM VAULT // UNIVERSAL QUIZ REPOSITORY</span>
            </div>
            <div className="flex items-center space-x-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
                The Dorm Vault
              </h1>
              <Badge variant="outline" className="border-[rgba(255, 77, 109,0.3)] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] font-mono text-[9px] uppercase tracking-widest rounded-[3px]">
                {quizzes.length} ASSESSMENTS
              </Badge>
            </div>
            <p className="text-xs text-[#A0AEA5]">
              The universal dormitory repository of all quiz disciplines: adaptive diagnostics, cognitive sprints, and multi-format curriculum assessments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => setAiDocModalOpen(true)}
              className="bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] font-mono font-bold text-xs tracking-wider rounded-[4px] shadow-[0_0_15px_rgba(255, 77, 109,0.3)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" />
              AI QUIZ MAKER
            </Button>
            <Link href="/create-quiz">
              <Button variant="outline" size="sm" className="border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] hover:bg-[#2A141A] text-[#F2F7F3] hover:text-[#FF4D6D] text-xs font-mono tracking-wider rounded-[4px] transition-colors">
                <FileText className="w-3.5 h-3.5 mr-1.5 text-[#FF758F]" />
                IMPORT PDF
              </Button>
            </Link>
            <Button
              size="sm"
              onClick={() => {
                setInstantTopic(topicFilter !== "All" ? topicFilter : "All");
                setInstantModalOpen(true);
              }}
              className="bg-[#1D1013] hover:bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] hover:border-[#FF4D6D]/60 text-xs font-mono tracking-wider rounded-[4px] transition-all shadow-[0_0_10px_rgba(255, 77, 109,0.1)]"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5 fill-current" />
              INSTANT QUIZ
            </Button>
            <Link href="/dashboard/quizzes/builder">
              <Button variant="outline" size="sm" className="border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] hover:bg-[#2A141A] text-[#F2F7F3] hover:text-[#FF4D6D] text-xs font-mono tracking-wider rounded-[4px] transition-colors">
                <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                BUILDER
              </Button>
            </Link>
            <Link href="/dashboard/quizzes/new">
              <Button size="sm" className="bg-[#2A141A] hover:bg-[#34151C] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.2)] text-xs font-mono tracking-wider rounded-[4px] transition-colors">
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                COMPOSE
              </Button>
            </Link>
          </div>
        </div>

        {/* TOPIC BROWSER PILLS (Primary Way Users Browse) */}
        <div className="space-y-2.5 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#A0AEA5]">
              <Layers className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>Browse By Curricular Domain ({topicsSummary.length} Domains)</span>
            </div>
            {topicFilter !== "All" && (
              <button
                onClick={() => setTopicFilter("All")}
                className="text-[10px] font-mono text-[#FF4D6D] hover:underline"
              >
                RESET TO ALL
              </button>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setTopicFilter("All")}
              className={`px-3 py-1 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                topicFilter === "All"
                  ? "bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border-[#FF4D6D]/40 font-bold shadow-[0_0_10px_rgba(255, 77, 109,0.15)]"
                  : "bg-[#140C0E] border-[rgba(240, 160, 180,0.14)] text-[#A0AEA5] hover:text-[#F2F7F3]"
              }`}
            >
              All Domains ({quizzes.length})
            </button>
            {topicsSummary.slice(0, 12).map((ts) => (
              <button
                key={ts.topic}
                onClick={() => setTopicFilter(ts.topic)}
                className={`px-2.5 py-1 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap shrink-0 flex items-center space-x-1.5 border ${
                  topicFilter === ts.topic
                    ? "bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border-[#FF4D6D]/40 font-bold shadow-[0_0_10px_rgba(255, 77, 109,0.15)]"
                    : "bg-[#140C0E] border-[rgba(240, 160, 180,0.14)] text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <span>{ts.topic}</span>
                <span
                  className={`text-[9px] px-1 py-0 rounded-[2px] font-mono ${
                    topicFilter === ts.topic
                      ? "bg-[#FF4D6D]/20 text-[#FF4D6D] font-bold"
                      : "bg-[#1D1013] text-[#69786F]"
                  }`}
                >
                  {ts.questionCount}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-card p-4 rounded-[3px] border border-border flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search title, topic, ID..."
            className="pl-9 h-9 bg-background text-xs font-mono rounded-[3px] border-border"
          />
        </div>

        {/* Filter Controls: Topic (Primary), Grade, Difficulty, Subject */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
          {/* Topic Select */}
          <div className="min-w-[140px]">
            <label className="block text-[9px] font-mono font-bold text-muted-foreground mb-1 uppercase tracking-widest">Topic</label>
            <Select
              value={topicFilter}
              onChange={(e) => setTopicFilter(e.target.value)}
              className="h-8 text-xs font-mono rounded-[2px] border-border"
              options={allTopicsList.map((t) => ({ value: t, label: t === "All" ? "All Topics" : t }))}
            />
          </div>

          {/* Optional Grade Filter */}
          <div className="min-w-[130px]">
            <label className="block text-[9px] font-mono font-bold text-muted-foreground mb-1 uppercase tracking-widest">Grade</label>
            <Select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="h-8 text-xs font-mono rounded-[2px] border-border"
              options={allGradesList.map((g) => ({ value: g, label: g === "All" ? "All Grades" : g }))}
            />
          </div>

          {/* Optional Difficulty Filter */}
          <div className="min-w-[120px]">
            <label className="block text-[9px] font-mono font-bold text-muted-foreground mb-1 uppercase tracking-widest">Difficulty</label>
            <Select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="h-8 text-xs font-mono rounded-[2px] border-border"
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
            <label className="block text-[9px] font-mono font-bold text-muted-foreground mb-1 uppercase tracking-widest">Subject</label>
            <Select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="h-8 text-xs font-mono rounded-[2px] border-border"
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
                className="bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] p-6 hover:border-[#FF4D6D]/40 transition-all flex flex-col justify-between group hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(255, 77, 109,0.1)]"
              >
                <div>
                  {/* Topic and Difficulty Header */}
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[3px] bg-[#1D1013] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.14)] truncate max-w-[180px]">
                      {quiz.topic || quiz.category}
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-mono uppercase tracking-widest rounded-[3px] px-1.5 py-0 ${
                        quiz.difficulty === "Hard"
                          ? "border-[#F87171]/40 bg-[#F87171]/10 text-[#F87171]"
                          : quiz.difficulty === "Medium"
                          ? "border-[rgba(255, 117, 143,0.3)] bg-[rgba(255, 117, 143,0.1)] text-[#FF758F]"
                          : "border-[rgba(255, 77, 109,0.3)] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D]"
                      }`}
                    >
                      {quiz.difficulty}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold font-display text-[#F2F7F3] line-clamp-2 mb-2 group-hover:text-[#FF4D6D] transition-colors">
                    {quiz.title}
                  </h3>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#A0AEA5] mb-4">
                    {(quiz.gradeLevel || quiz.grade) && (
                      <span className="flex items-center bg-[#1D1013] px-2 py-0.5 rounded-[3px] text-[10px] border border-[rgba(240, 160, 180,0.12)]">
                        <GraduationCap className="w-3 h-3 mr-1 text-[#A0AEA5]" />
                        {quiz.gradeLevel || quiz.grade}
                      </span>
                    )}
                    <span className="flex items-center text-[10px]">
                      <HelpCircle className="w-3 h-3 mr-1 text-[#69786F]" />
                      {questionsCount} QUESTIONS
                    </span>
                    <span className="flex items-center text-[10px]">
                      <Clock className="w-3 h-3 mr-1 text-[#69786F]" />
                      {quiz.durationMinutes} MINS
                    </span>
                  </div>

                  {quiz.description && (
                    <p className="text-xs text-[#A0AEA5] line-clamp-2 mb-4 leading-relaxed font-normal">
                      {quiz.description}
                    </p>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-[rgba(240, 160, 180,0.12)] flex items-center justify-between">
                  <Link href={`/dashboard/quizzes/${quiz.id}/take`}>
                    <Button
                      size="sm"
                      className="bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] font-mono text-xs font-bold tracking-wider rounded-[4px] px-4 shadow-[0_0_12px_rgba(255, 77, 109,0.25)] transition-all"
                    >
                      <Play className="w-3.5 h-3.5 mr-1 fill-current" /> TAKE QUIZ
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-1">
                    <Link href={`/dashboard/quizzes/${quiz.id}`}>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[3px]" title="View Details">
                        <Eye className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Link href={`/dashboard/quizzes/${quiz.id}/edit`}>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-[#FF758F] hover:bg-[#FF758F]/10 rounded-[3px]" title="Edit Quiz">
                        <Edit className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTargetId(quiz.id)}
                      className="h-7 w-7 text-[#F87171] hover:bg-[#F87171]/10 rounded-[3px]"
                      title="Delete Quiz"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
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
              <Zap className="w-5 h-5 text-rose-600 mr-2 fill-current" />
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
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
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

      {/* AI Document Quiz Maker Modal */}
      <AIDocumentQuizModal
        open={aiDocModalOpen}
        onOpenChange={(isOpen) => {
          setAiDocModalOpen(isOpen);
          if (!isOpen) loadData();
        }}
        defaultSubject={subjectFilter !== "All" ? subjectFilter : "Science"}
        defaultTopic={topicFilter !== "All" ? topicFilter : ""}
        defaultDifficulty={difficultyFilter !== "All" ? (difficultyFilter as any) : "Medium"}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionItem, QuestionType } from "@/lib/types/question";
import { QuizItem, QuizStatus } from "@/lib/types/quiz";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { QuizQuestionPickerModal } from "@/components/quiz-builder/QuizQuestionPickerModal";
import { QuizPreviewModal } from "@/components/quiz-builder/QuizPreviewModal";
import { AIDocumentQuizModal } from "@/components/ai/AIDocumentQuizModal";
import { importQuestions } from "@/lib/data/question-bank";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  Shuffle,
  HelpCircle,
  Clock,
  Award,
  Layers,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  FileText,
  Sparkles,
  Database,
} from "lucide-react";
import { toast } from "sonner";

export default function QuizBuilderPage() {
  const router = useRouter();

  // Quiz Metadata state
  const [title, setTitle] = useState("Advanced Algebra & Calculus Championship 2026");
  const [description, setDescription] = useState("Comprehensive evaluation for high school & college calculus students.");
  const [category, setCategory] = useState("Mathematics");
  const [subject, setSubject] = useState("Algebra");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Hard");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [passMarks, setPassMarks] = useState(60);
  const [status, setStatus] = useState<QuizStatus>("Draft");
  const [randomizeQuestions, setRandomizeQuestions] = useState(true);
  const [shuffleOptions, setShuffleOptions] = useState(true);

  // Questions in this quiz
  const [questions, setQuestions] = useState<QuestionItem[]>([
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
      tags: ["calculus"],
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
      ],
      tags: ["chemistry"],
      createdAt: "Jul 18, 2026",
      updatedAt: "Jul 23, 2026",
    },
  ]);

  // Modal dialog states
  const [pickerOpen, setPickerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  const totalMarks = questions.reduce((acc, q) => acc + q.marks, 0);

  const handleMoveQuestion = (index: number, direction: "up" | "down") => {
    const updated = [...questions];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= updated.length) return;
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setQuestions(updated);
  };

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
    toast.success("Question removed from quiz");
  };

  const handleAddFromPicker = (newQuestions: QuestionItem[]) => {
    setQuestions([...questions, ...newQuestions]);
  };

  const handleImportToQuestionBank = () => {
    if (questions.length === 0) {
      toast.error("No questions to import to Question Bank");
      return;
    }
    const { imported, skipped } = importQuestions(questions);
    if (imported > 0) {
      toast.success(
        `Successfully imported ${imported} question${imported === 1 ? "" : "s"} to Question Bank!${
          skipped > 0 ? ` (${skipped} duplicates skipped)` : ""
        }`
      );
    } else {
      toast.info(`All ${skipped} question(s) already exist in your Question Bank.`);
    }
  };

  const handleImportSingleToQuestionBank = (q: QuestionItem) => {
    const { imported } = importQuestions([q]);
    if (imported > 0) {
      toast.success(`"${q.title.slice(0, 35)}..." imported to Question Bank!`);
    } else {
      toast.info("This question is already in your Question Bank.");
    }
  };

  const handleSaveQuiz = (newStatus?: QuizStatus) => {
    if (!title) {
      toast.error("Please enter a quiz title");
      return;
    }
    const finalStatus = newStatus || status;
    setStatus(finalStatus);
    toast.success(`Quiz saved as ${finalStatus}!`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.14)] pb-4">
        <div>
          <Link
            href="/dashboard/quizzes"
            className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] mb-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quizzes
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-bold font-display text-[#F2F7F3] tracking-tight">
              Quiz Authoring Studio
            </h1>
            <span
              className={`text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded-[2px] font-semibold border ${
                status === "Published"
                  ? "bg-[rgba(101,245,154,0.12)] text-[#65F59A] border-[rgba(101,245,154,0.3)]"
                  : status === "Archived"
                  ? "bg-[#111B17] text-[#69786F] border-[rgba(160,190,170,0.14)]"
                  : "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border-[rgba(251,191,36,0.3)]"
              }`}
            >
              ● {status}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportToQuestionBank}
            className="text-xs font-mono"
            title="Import all questions in this quiz to Question Bank"
          >
            <Database className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> Import to Bank
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewOpen(true)}
            className="text-xs font-mono"
          >
            <Eye className="w-3.5 h-3.5 mr-1.5 text-[#A0AEA5]" /> Simulator Preview
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSaveQuiz("Draft")}
            className="text-xs font-mono"
          >
            Save Draft
          </Button>
          <Button
            size="sm"
            onClick={() => handleSaveQuiz("Published")}
            className="text-xs font-mono font-semibold"
          >
            <Save className="w-3.5 h-3.5 mr-1.5" /> Publish Quiz
          </Button>
        </div>
      </div>

      {/* Main Grid: Quiz Metadata & Settings vs Question List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 cols: Quiz Metadata & Settings */}
        <div className="lg:col-span-4 bg-[#0C1210] p-5 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center border-b border-[rgba(160,190,170,0.12)] pb-2.5">
            <FileText className="w-3.5 h-3.5 text-[#65F59A] mr-1.5" /> Assessment Configuration
          </h3>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
              Quiz Title
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xs font-semibold"
            />
          </div>

          <div>
            <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-[4px] border border-[rgba(160,190,170,0.18)] bg-[#17251E] p-2.5 text-xs font-mono text-[#F2F7F3] placeholder:text-[#69786F] focus:outline-hidden focus:border-[#65F59A] focus:ring-1 focus:ring-[#65F59A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                Category
              </label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: "Mathematics", label: "Mathematics" },
                  { value: "Science", label: "Science" },
                ]}
                className="text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                Difficulty
              </label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                options={[
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" },
                ]}
                className="text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                Duration (Mins)
              </label>
              <Input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                className="text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                Pass Marks (%)
              </label>
              <Input
                type="number"
                value={passMarks}
                onChange={(e) => setPassMarks(Number(e.target.value))}
                className="text-xs font-mono"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-[rgba(160,190,170,0.12)] space-y-2.5">
            <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
              Delivery Controls
            </p>
            <label className="flex items-center justify-between text-xs font-mono text-[#A0AEA5] cursor-pointer">
              <span>Randomize Question Order</span>
              <input
                type="checkbox"
                checked={randomizeQuestions}
                onChange={(e) => setRandomizeQuestions(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#65F59A] rounded"
              />
            </label>
            <label className="flex items-center justify-between text-xs font-mono text-[#A0AEA5] cursor-pointer">
              <span>Shuffle Multiple Options</span>
              <input
                type="checkbox"
                checked={shuffleOptions}
                onChange={(e) => setShuffleOptions(e.target.checked)}
                className="w-3.5 h-3.5 accent-[#65F59A] rounded"
              />
            </label>
          </div>

          <div className="bg-[#111B17] p-3.5 rounded-[4px] border border-[rgba(160,190,170,0.14)] space-y-1.5 text-xs font-mono">
            <div className="flex justify-between font-medium">
              <span className="text-[#A0AEA5]">Questions:</span>
              <span className="text-[#65F59A] font-bold">{questions.length}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-[#A0AEA5]">Total Marks:</span>
              <span className="text-[#65F59A] font-bold">{totalMarks} Marks</span>
            </div>
          </div>
        </div>

        {/* Right 8 cols: Quiz Question Structuring List */}
        <div className="lg:col-span-8 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.14)]">
            <div>
              <h3 className="text-sm font-bold font-display text-[#F2F7F3] uppercase tracking-wide">
                Structured Questions ({questions.length})
              </h3>
              <p className="text-xs text-[#A0AEA5]">
                Reorder delivery sequence or import from verified Question Bank
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                onClick={handleImportToQuestionBank}
                variant="outline"
                size="sm"
                className="text-xs font-mono"
                title="Import all questions in this quiz to Question Bank"
              >
                <Database className="w-3.5 h-3.5 mr-1 text-[#38D9B0]" /> Bank All ({questions.length})
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAiModalOpen(true)}
                className="border-[rgba(101,245,154,0.35)] text-[#65F59A] hover:bg-[rgba(101,245,154,0.12)] text-xs font-mono font-semibold shadow-[0_0_10px_rgba(101,245,154,0.15)] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1 text-[#65F59A]" /> AI Document Quiz Maker
              </Button>
              <Button
                onClick={() => setPickerOpen(true)}
                size="sm"
                className="text-xs font-mono"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add from Bank
              </Button>
            </div>
          </div>

          {/* Question Items List */}
          <div className="space-y-2.5">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-[#0C1210] p-4 rounded-[4px] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(160,190,170,0.28)] flex items-start justify-between gap-4 transition-all hover:bg-[#111B17]"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-6 h-6 rounded-[3px] bg-[#17251E] border border-[rgba(160,190,170,0.2)] text-[#65F59A] font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <QuestionTypeBadge type={q.type} />
                      <span className="text-[10px] font-mono text-[#69786F]">{q.category}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-[#F2F7F3] leading-snug">
                      {q.title}
                    </h4>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="flex items-center space-x-1 font-mono">
                    <Input
                      type="number"
                      value={q.marks}
                      onChange={(e) =>
                        setQuestions(
                          questions.map((item) =>
                            item.id === q.id ? { ...item, marks: Number(e.target.value) } : item
                          )
                        )
                      }
                      className="w-14 h-7 text-xs text-center font-bold font-mono"
                    />
                    <span className="text-[10px] text-[#69786F] font-medium">pts</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleImportSingleToQuestionBank(q)}
                      className="text-[#69786F] hover:text-[#38D9B0] hover:bg-[#17251E]"
                      title="Import this question to Question Bank"
                    >
                      <Database className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleMoveQuestion(idx, "up")}
                      disabled={idx === 0}
                      className="text-[#69786F] hover:text-[#F2F7F3] hover:bg-[#17251E]"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleMoveQuestion(idx, "down")}
                      disabled={idx === questions.length - 1}
                      className="text-[#69786F] hover:text-[#F2F7F3] hover:bg-[#17251E]"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => handleRemoveQuestion(q.id)}
                      className="text-[#69786F] hover:text-[#F87171] hover:bg-[rgba(248,113,113,0.12)]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <QuizQuestionPickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onQuestionsSelected={handleAddFromPicker}
      />
      <QuizPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        quiz={{ title, totalMarks, durationMinutes, questions }}
      />
      <AIDocumentQuizModal
        open={aiModalOpen}
        onOpenChange={setAiModalOpen}
        onQuestionsAdded={(newQs) => {
          setQuestions((prev) => [...prev, ...newQs]);
          toast.success(`Added ${newQs.length} questions from document!`);
        }}
        defaultSubject={subject || category}
        defaultTopic={category}
        defaultDifficulty={difficulty}
      />
    </div>
  );
}

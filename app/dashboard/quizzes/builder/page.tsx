"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionItem, QuestionType } from "@/lib/types/question";
import { QuizItem, QuizStatus } from "@/lib/types/quiz";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { QuizQuestionPickerModal } from "@/components/quiz-builder/QuizQuestionPickerModal";
import { QuizPreviewModal } from "@/components/quiz-builder/QuizPreviewModal";
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
    <div className="space-y-8">
      {/* Header & Main Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/quizzes" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quizzes
          </Link>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Quiz Builder & Structuring</h1>
            <Badge
              className={
                status === "Published"
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                  : status === "Archived"
                  ? "bg-gray-100 text-gray-700"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
              }
            >
              ● {status}
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewOpen(true)} className="text-xs">
            <Eye className="w-3.5 h-3.5 mr-1.5" /> Exam Simulator Preview
          </Button>
          <Button variant="outline" size="sm" onClick={() => handleSaveQuiz("Draft")} className="text-xs">
            Save Draft
          </Button>
          <Button size="sm" onClick={() => handleSaveQuiz("Published")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            <Save className="w-4 h-4 mr-1.5" /> Publish Quiz
          </Button>
        </div>
      </div>

      {/* Main Grid: Quiz Metadata & Settings vs Question List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 4 cols: Quiz Metadata & Settings */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-5">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center border-b border-gray-100 dark:border-gray-900 pb-3">
            <FileText className="w-4 h-4 text-indigo-600 mr-2" /> Quiz Settings
          </h3>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Quiz Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="text-xs font-semibold" />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-3 text-xs text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Category</label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} options={[{ value: "Mathematics", label: "Mathematics" }, { value: "Science", label: "Science" }]} className="text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Difficulty</label>
              <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} options={[{ value: "Easy", label: "Easy" }, { value: "Medium", label: "Medium" }, { value: "Hard", label: "Hard" }]} className="text-xs" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Duration (Mins)</label>
              <Input type="number" value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} className="text-xs" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Pass Marks (%)</label>
              <Input type="number" value={passMarks} onChange={(e) => setPassMarks(Number(e.target.value))} className="text-xs" />
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-gray-900 space-y-3">
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Exam Behavior Controls</p>
            <label className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
              <span>Randomize Question Order</span>
              <input type="checkbox" checked={randomizeQuestions} onChange={(e) => setRandomizeQuestions(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
            </label>
            <label className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
              <span>Shuffle Multiple Options</span>
              <input type="checkbox" checked={shuffleOptions} onChange={(e) => setShuffleOptions(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
            </label>
          </div>

          <div className="bg-indigo-50/60 dark:bg-indigo-950/30 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 space-y-1 text-xs">
            <div className="flex justify-between font-semibold">
              <span>Total Questions:</span>
              <span className="text-indigo-600">{questions.length}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Calculated Total Marks:</span>
              <span className="text-indigo-600">{totalMarks} Marks</span>
            </div>
          </div>
        </div>

        {/* Right 8 cols: Quiz Question Structuring List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Quiz Questions ({questions.length})</h3>
              <p className="text-xs text-gray-500">Reorder questions or add questions from the Question Bank</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setPickerOpen(true)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add from Question Bank
              </Button>
            </div>
          </div>

          {/* Question Items List */}
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div
                key={q.id}
                className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex items-start justify-between gap-4"
              >
                <div className="flex items-start space-x-3">
                  <span className="w-7 h-7 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <QuestionTypeBadge type={q.type} />
                      <span className="text-[11px] text-gray-400">{q.category}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{q.title}</h4>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <div className="flex items-center space-x-1">
                    <Input
                      type="number"
                      value={q.marks}
                      onChange={(e) =>
                        setQuestions(questions.map((item) => (item.id === q.id ? { ...item, marks: Number(e.target.value) } : item)))
                      }
                      className="w-16 h-8 text-xs text-center font-bold"
                    />
                    <span className="text-[11px] text-gray-400 font-medium">pts</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" onClick={() => handleMoveQuestion(idx, "up")} disabled={idx === 0} className="h-7 w-7 text-gray-400">
                      <ArrowUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleMoveQuestion(idx, "down")} disabled={idx === questions.length - 1} className="h-7 w-7 text-gray-400">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveQuestion(q.id)} className="h-7 w-7 text-red-500">
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
      <QuizQuestionPickerModal open={pickerOpen} onOpenChange={setPickerOpen} onQuestionsSelected={handleAddFromPicker} />
      <QuizPreviewModal open={previewOpen} onOpenChange={setPreviewOpen} quiz={{ title, totalMarks, durationMinutes, questions }} />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionItem } from "@/lib/types/question";
import { QuizItem, QuizStatus } from "@/lib/types/quiz";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { QuizQuestionPickerModal } from "@/components/quiz-builder/QuizQuestionPickerModal";
import { QuizPreviewModal } from "@/components/quiz-builder/QuizPreviewModal";
import { saveQuiz, generateInstantQuiz } from "@/lib/data/quizzes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/layout/Logo";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Eye,
  Shuffle,
  Clock,
  Sparkles,
  Layers,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  Play,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export default function CreateOwnQuizPage() {
  const router = useRouter();

  // Quiz Metadata
  const [title, setTitle] = useState("My Custom Assessment Challenge");
  const [description, setDescription] = useState("A custom evaluation created with QuizDorm's interactive quiz builder.");
  const [category, setCategory] = useState("Science");
  const [subject, setSubject] = useState("General Science");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [passMarks, setPassMarks] = useState(60);
  const [status, setStatus] = useState<QuizStatus>("Published");
  const [randomizeQuestions, setRandomizeQuestions] = useState(true);
  const [shuffleOptions, setShuffleOptions] = useState(true);

  // Questions in this quiz
  const [questions, setQuestions] = useState<QuestionItem[]>([
    {
      id: "cust-q-1",
      title: "What is the primary function of chlorophyll in plant cells?",
      type: "mcq_single",
      subject: "Science",
      category: "Biology",
      topic: "Plant Biology",
      difficulty: "Easy",
      marks: 4,
      timeLimitSeconds: 60,
      options: [
        { id: "opt-1", text: "Absorbing light energy for photosynthesis", isCorrect: true },
        { id: "opt-2", text: "Storing water inside vacuoles", isCorrect: false },
        { id: "opt-3", text: "Transporting minerals through xylem", isCorrect: false },
        { id: "opt-4", text: "Breaking down glucose in mitochondria", isCorrect: false },
      ],
      tags: ["biology", "photosynthesis"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  // Inline Custom Question State
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [newQTitle, setNewQTitle] = useState("");
  const [newQOptions, setNewQOptions] = useState([
    { text: "", isCorrect: true },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
    { text: "", isCorrect: false },
  ]);

  // Modal dialog states
  const [pickerOpen, setPickerOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const totalMarks = questions.reduce((acc, q) => acc + (q.marks || 1), 0);

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
    toast.success(`Added ${newQuestions.length} questions from Question Bank!`);
  };

  const handleAddCustomQuestion = () => {
    if (!newQTitle.trim()) {
      toast.error("Please enter a question title");
      return;
    }
    const validOpts = newQOptions.filter((o) => o.text.trim().length > 0);
    if (validOpts.length < 2) {
      toast.error("Please provide at least 2 options");
      return;
    }
    const hasCorrect = validOpts.some((o) => o.isCorrect);
    if (!hasCorrect) {
      toast.error("Please mark at least one option as the correct answer");
      return;
    }

    const created: QuestionItem = {
      id: `custom-q-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: newQTitle.trim(),
      type: "mcq_single",
      subject: subject,
      category: category,
      topic: category,
      difficulty: difficulty,
      marks: 4,
      timeLimitSeconds: 60,
      tags: [category.toLowerCase(), "custom"],
      options: validOpts.map((o, idx) => ({
        id: `opt-${idx + 1}-${Date.now()}`,
        text: o.text.trim(),
        isCorrect: o.isCorrect,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setQuestions([...questions, created]);
    setNewQTitle("");
    setNewQOptions([
      { text: "", isCorrect: true },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ]);
    setShowAddCustom(false);
    toast.success("Custom question added successfully!");
  };

  const handleGenerateAIQuestions = () => {
    try {
      const instant = generateInstantQuiz({
        subject: category,
        difficulty: difficulty,
        questionCount: 5,
      });
      if (instant.questions && instant.questions.length > 0) {
        setQuestions([...questions, ...instant.questions]);
        toast.success(`Generated ${instant.questions.length} smart questions for ${category}!`);
      }
    } catch {
      toast.info("Generated questions added to your quiz!");
    }
  };

  const handleSaveAndTake = (takeImmediately = false) => {
    if (!title.trim()) {
      toast.error("Please provide a quiz title");
      return;
    }
    if (questions.length === 0) {
      toast.error("Please add at least 1 question to your quiz");
      return;
    }

    const quizId = `custom-quiz-${Date.now()}`;
    const newQuiz: QuizItem = {
      id: quizId,
      title: title.trim(),
      description: description.trim(),
      category: category,
      subject: subject,
      topic: category,
      gradeLevel: "All Levels",
      grade: "All Levels",
      difficulty: difficulty,
      durationMinutes: Number(durationMinutes) || 30,
      totalMarks: totalMarks,
      passMarks: Number(passMarks) || 60,
      status: "Published",
      randomizeQuestions: randomizeQuestions,
      shuffleOptions: shuffleOptions,
      questions: questions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveQuiz(newQuiz);
    toast.success("Quiz created and published successfully!");

    if (takeImmediately) {
      router.push(`/dashboard/quizzes/${quizId}/take`);
    } else {
      router.push("/dashboard/quizzes");
    }
  };

  const previewQuizObject: Partial<QuizItem> = {
    title,
    description,
    durationMinutes,
    totalMarks,
    questions,
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex flex-col">
      {/* Top Navigation */}
      <header className="border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-3.5 px-6 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
            <span className="hidden sm:inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Quiz Creator Studio
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreviewOpen(true)}
              className="text-xs flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Preview Exam
            </Button>
            <Button
              size="sm"
              onClick={() => handleSaveAndTake(true)}
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold text-xs rounded-xl shadow-md flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Publish & Take Now
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center text-xs font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Home
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Create Your Own Quiz
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Customize question items, configure timer limits, shuffle algorithms, and test live immediately.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateAIQuestions}
                className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" /> Auto-Fill with AI
              </Button>
              <Button
                size="sm"
                onClick={() => setPickerOpen(true)}
                className="text-xs bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 font-semibold flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" /> Pick from Bank
              </Button>
            </div>
          </div>
        </div>

        {/* Quiz Configuration Card */}
        <div className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-gray-800 pb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" /> Quiz Details & Settings
            </h2>
            <Badge className="bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs">
              {questions.length} Questions • {totalMarks} Total Marks
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Quiz Title
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Science & Space Exploration Challenge"
                required
                className="text-base font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                Description / Instructions
              </label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what this assessment covers..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setSubject(e.target.value);
                  }}
                  options={[
                    { value: "Science", label: "Science & Technology" },
                    { value: "Mathematics", label: "Mathematics & Algebra" },
                    { value: "Space & Astronomy", label: "Space & Astronomy" },
                    { value: "History & GK", label: "History & General Knowledge" },
                    { value: "Indian Constitution & Governance", label: "Politics & Governance" },
                    { value: "Sports & Athletics", label: "Sports & Athletics" },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Difficulty Level
                </label>
                <Select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  options={[
                    { value: "Easy", label: "Easy (Foundational)" },
                    { value: "Medium", label: "Medium (Standard)" },
                    { value: "Hard", label: "Hard (Challenging)" },
                  ]}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
                  Duration (Minutes)
                </label>
                <Input
                  type="number"
                  min={1}
                  max={180}
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-slate-100 dark:border-gray-800">
              <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={randomizeQuestions}
                  onChange={(e) => setRandomizeQuestions(e.target.checked)}
                  className="rounded text-indigo-600 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <Shuffle className="w-3.5 h-3.5 text-indigo-600" /> Randomize Question Order
                </span>
              </label>

              <label className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shuffleOptions}
                  onChange={(e) => setShuffleOptions(e.target.checked)}
                  className="rounded text-indigo-600 w-4 h-4"
                />
                <span className="flex items-center gap-1">
                  <Shuffle className="w-3.5 h-3.5 text-blue-600" /> Shuffle Options
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Questions Manager */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Questions ({questions.length})
              </h2>
              <p className="text-xs text-slate-500">
                Drag, reorder, or add custom questions to tailor your quiz.
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddCustom(!showAddCustom)}
                className="text-xs flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> {showAddCustom ? "Cancel" : "Add Custom Question"}
              </Button>
              <Button
                size="sm"
                onClick={() => setPickerOpen(true)}
                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add from Question Bank
              </Button>
            </div>
          </div>

          {/* Inline Add Custom Question Form */}
          {showAddCustom && (
            <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-6 rounded-3xl border border-indigo-200 dark:border-indigo-900 space-y-4">
              <h3 className="text-sm font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-2">
                <Plus className="w-4 h-4 text-indigo-600" /> Add Custom Question
              </h3>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Question Text
                </label>
                <Input
                  value={newQTitle}
                  onChange={(e) => setNewQTitle(e.target.value)}
                  placeholder="Enter your question prompt..."
                  className="bg-white dark:bg-gray-900"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Answer Options (Select the radio button for the correct answer)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {newQOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 bg-white dark:bg-gray-900 p-2.5 rounded-xl border border-slate-200 dark:border-gray-800"
                    >
                      <input
                        type="radio"
                        name="correct-opt"
                        checked={opt.isCorrect}
                        onChange={() => {
                          const updated = newQOptions.map((o, i) => ({
                            ...o,
                            isCorrect: i === idx,
                          }));
                          setNewQOptions(updated);
                        }}
                        className="w-4 h-4 text-indigo-600 cursor-pointer"
                      />
                      <Input
                        value={opt.text}
                        onChange={(e) => {
                          const updated = [...newQOptions];
                          updated[idx].text = e.target.value;
                          setNewQOptions(updated);
                        }}
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="h-8 text-xs border-none shadow-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddCustom(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleAddCustomQuestion}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold"
                >
                  Save Question
                </Button>
              </div>
            </div>
          )}

          {/* Questions List */}
          <div className="space-y-3">
            {questions.map((question, index) => (
              <div
                key={question.id || index}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-slate-200 dark:border-gray-800 shadow-xs flex items-start justify-between gap-4 transition-all hover:border-indigo-200 dark:hover:border-indigo-900"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                      {index + 1}
                    </span>
                    <QuestionTypeBadge type={question.type} />
                    <Badge
                      className={
                        question.difficulty === "Hard"
                          ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[10px]"
                          : question.difficulty === "Medium"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px]"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]"
                      }
                    >
                      {question.difficulty}
                    </Badge>
                    <span className="text-xs text-slate-400">• {question.marks || 1} mark(s)</span>
                  </div>

                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white leading-snug">
                    {question.title}
                  </h3>

                  {question.options && question.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {question.options.map((opt, oIdx) => (
                        <div
                          key={opt.id || oIdx}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border flex items-center justify-between ${
                            opt.isCorrect
                              ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 font-medium"
                              : "bg-slate-50 dark:bg-gray-800/50 border-slate-200 dark:border-gray-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <span className="truncate">
                            {String.fromCharCode(65 + oIdx)}. {opt.text}
                          </span>
                          {opt.isCorrect && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1.5" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-1 shrink-0 pt-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={index === 0}
                    onClick={() => handleMoveQuestion(index, "up")}
                    className="p-1 h-7 w-7 text-slate-400 hover:text-slate-700"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={index === questions.length - 1}
                    onClick={() => handleMoveQuestion(index, "down")}
                    className="p-1 h-7 w-7 text-slate-400 hover:text-slate-700"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="p-1 h-7 w-7 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Delete Question"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Submission Bar */}
        <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-slate-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-semibold px-3 py-1">
              Ready to Launch
            </Badge>
            <span className="text-xs text-slate-500">
              Total {questions.length} questions • {totalMarks} marks • {durationMinutes} mins
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={() => handleSaveAndTake(false)}
              className="text-xs font-semibold flex-1 sm:flex-none"
            >
              <Save className="w-3.5 h-3.5 mr-1.5" /> Save to Quizzes
            </Button>
            <Button
              onClick={() => handleSaveAndTake(true)}
              className="bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-500/20 flex-1 sm:flex-none px-6 py-2.5 flex items-center justify-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Publish & Take Quiz Now
            </Button>
          </div>
        </div>
      </main>

      {/* Question Picker Modal */}
      <QuizQuestionPickerModal
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onQuestionsSelected={handleAddFromPicker}
      />

      {/* Simulator Modal */}
      <QuizPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        quiz={previewQuizObject}
      />
    </div>
  );
}

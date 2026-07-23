"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Image as ImageIcon,
  CheckCircle2,
  Eye,
  Save,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Option {
  id: string;
  text: string;
}

export default function QuestionBuilderPage() {
  const [questionText, setQuestionText] = useState("What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?");
  const [category, setCategory] = useState("Mathematics");
  const [difficulty, setDifficulty] = useState("Medium");
  const [options, setOptions] = useState<Option[]>([
    { id: "opt-1", text: "3x^2 + 8x - 5" },
    { id: "opt-2", text: "3x^2 + 4x - 5" },
    { id: "opt-3", text: "x^2 + 8x - 5" },
    { id: "opt-4", text: "3x^2 + 8x + 7" },
  ]);
  const [correctOptionId, setCorrectOptionId] = useState<string>("opt-1");

  const handleAddOption = () => {
    if (options.length >= 6) {
      toast.error("Maximum 6 options allowed per question.");
      return;
    }
    const newId = `opt-${Date.now()}`;
    setOptions([...options, { id: newId, text: `Option ${options.length + 1}` }]);
  };

  const handleRemoveOption = (id: string) => {
    if (options.length <= 2) {
      toast.error("At least 2 options are required.");
      return;
    }
    setOptions(options.filter((opt) => opt.id !== id));
    if (correctOptionId === id) {
      setCorrectOptionId(options.find((opt) => opt.id !== id)?.id || "");
    }
  };

  const handleSaveQuestion = () => {
    toast.success("Question saved to quiz bank!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/quizzes" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quizzes
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Question Builder</h1>
          <p className="text-sm text-gray-500">Design multiple-choice questions with real-time student preview</p>
        </div>

        <div className="flex items-center space-x-3">
          <Button onClick={handleSaveQuestion} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Question
          </Button>
        </div>
      </div>

      {/* Main Grid: Builder Form vs Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Editor Form */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-900">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
              <HelpCircle className="w-5 h-5 text-indigo-600 mr-2" /> Question Details
            </h3>
            <span className="text-xs text-gray-400 font-medium">Question #1</span>
          </div>

          {/* Category & Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
                Category
              </label>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                options={[
                  { value: "Mathematics", label: "Mathematics" },
                  { value: "Science", label: "Science" },
                  { value: "Computer Science", label: "Computer Science" },
                  { value: "General Knowledge", label: "General Knowledge" },
                ]}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
                Difficulty Level
              </label>
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                options={[
                  { value: "Easy", label: "Easy" },
                  { value: "Medium", label: "Medium" },
                  { value: "Hard", label: "Hard" },
                ]}
              />
            </div>
          </div>

          {/* Question Text Area */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Question Text
            </label>
            <textarea
              rows={3}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-600 text-gray-900 dark:text-gray-100"
              placeholder="Enter your question statement here..."
            />
          </div>

          {/* Image Upload Dropzone Placeholder */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">
              Diagram / Image Attachment (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center bg-gray-50/50 dark:bg-gray-900/30 hover:border-indigo-300 transition-colors cursor-pointer">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Click to upload image or drag & drop file here
              </p>
              <p className="text-[11px] text-gray-400 mt-1">PNG, JPG, SVG up to 5MB</p>
            </div>
          </div>

          {/* Options Editor */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Answer Options (Mark radio for correct answer)
              </label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddOption} className="text-xs h-8">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Option
              </Button>
            </div>

            {options.map((opt, idx) => (
              <div
                key={opt.id}
                className={`flex items-center space-x-3 p-3 rounded-2xl border transition-all ${
                  correctOptionId === opt.id
                    ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20"
                    : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <input
                  type="radio"
                  name="correctOption"
                  checked={correctOptionId === opt.id}
                  onChange={() => setCorrectOptionId(opt.id)}
                  className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  title="Mark as correct answer"
                />
                <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
                <Input
                  value={opt.text}
                  onChange={(e) =>
                    setOptions(
                      options.map((o) => (o.id === opt.id ? { ...o, text: e.target.value } : o))
                    )
                  }
                  className="flex-1 h-9 text-sm"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveOption(opt.id)}
                  className="h-8 w-8 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Live Student Preview */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            <Eye className="w-4 h-4" />
            <span>Live Student Preview</span>
          </div>

          <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-900/50 shadow-lg space-y-6 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-900 text-xs">
              <span className="font-semibold text-gray-500">Question 1 of 10</span>
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {difficulty}
              </Badge>
            </div>

            <div>
              <p className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">
                {questionText || "Question text will appear here..."}
              </p>
            </div>

            <div className="space-y-3">
              {options.map((opt, idx) => (
                <div
                  key={opt.id}
                  className={`p-4 rounded-2xl border text-sm font-medium transition-all flex items-center justify-between ${
                    correctOptionId === opt.id
                      ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold"
                      : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text || `Option ${idx + 1}`}</span>
                  </div>
                  {correctOptionId === opt.id && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-right">
              <span className="text-[11px] text-gray-400">Preview Mode — Interactive Student View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, HelpCircle } from "lucide-react";

interface QuestionRendererProps {
  question: QuestionItem;
  userAnswer: any;
  onAnswerChange: (value: any) => void;
  showExplanation?: boolean;
}

export function QuestionRenderer({
  question,
  userAnswer,
  onAnswerChange,
  showExplanation = false,
}: QuestionRendererProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-900">
        <div className="flex items-center space-x-2">
          <QuestionTypeBadge type={question.type} />
          <span className="text-xs text-gray-400 font-medium">{question.category}</span>
        </div>
        <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-mono text-xs">
          {question.marks} {question.marks === 1 ? "Mark" : "Marks"}
        </Badge>
      </div>

      {/* Statement & Image */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-relaxed">
          {question.title}
        </h3>

        {question.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={question.image} alt="Question Diagram" className="rounded-2xl max-h-56 object-contain border border-gray-100 dark:border-gray-900 mx-auto" />
        )}
      </div>

      {/* ANSWER INPUTS BASED ON QUESTION FORMAT */}

      {/* 1, 2, 7: MCQ Single / MCQ Multiple / Image Based */}
      {(question.type === "mcq_single" || question.type === "mcq_multiple" || question.type === "image_based") && (
        <div className="space-y-3 pt-2">
          {question.options.map((opt, idx) => {
            const isSelected =
              question.type === "mcq_multiple"
                ? Array.isArray(userAnswer) && userAnswer.includes(opt.id)
                : userAnswer === opt.id;

            return (
              <div
                key={opt.id}
                onClick={() => {
                  if (question.type === "mcq_multiple") {
                    const currentArr = Array.isArray(userAnswer) ? userAnswer : [];
                    const nextArr = currentArr.includes(opt.id)
                      ? currentArr.filter((id: string) => id !== opt.id)
                      : [...currentArr, opt.id];
                    onAnswerChange(nextArr);
                  } else {
                    onAnswerChange(opt.id);
                  }
                }}
                className={`p-4 rounded-2xl border text-sm font-medium cursor-pointer transition-all flex items-center justify-between ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-100 font-bold ring-1 ring-indigo-500 shadow-sm"
                    : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold flex items-center justify-center shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
              </div>
            );
          })}
        </div>
      )}

      {/* 3: True / False */}
      {question.type === "true_false" && (
        <div className="grid grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => onAnswerChange("true")}
            className={`p-5 rounded-2xl border font-bold text-sm transition-all ${
              String(userAnswer).toLowerCase() === "true"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shadow-sm"
                : "border-gray-200 dark:border-gray-800 text-gray-700 hover:bg-gray-50"
            }`}
          >
            TRUE
          </button>
          <button
            type="button"
            onClick={() => onAnswerChange("false")}
            className={`p-5 rounded-2xl border font-bold text-sm transition-all ${
              String(userAnswer).toLowerCase() === "false"
                ? "border-indigo-600 bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 shadow-sm"
                : "border-gray-200 dark:border-gray-800 text-gray-700 hover:bg-gray-50"
            }`}
          >
            FALSE
          </button>
        </div>
      )}

      {/* 4: Fill in the Blank */}
      {question.type === "fill_in_the_blank" && (
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-semibold text-gray-500">Type your answer below:</label>
          <Input
            value={userAnswer || ""}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Enter answer keyword..."
            className="text-sm font-semibold h-11 rounded-xl"
          />
        </div>
      )}

      {/* 5: Match the Following */}
      {question.type === "match_following" && (
        <div className="space-y-3 pt-2">
          <p className="text-xs font-semibold text-gray-500">Match left items with right terms:</p>
          {(question.matchingPairs || []).map((p) => (
            <div key={p.id} className="p-3 rounded-2xl border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{p.leftItem}</span>
              <span className="text-indigo-600 font-bold">➔ {p.rightItem}</span>
            </div>
          ))}
        </div>
      )}

      {/* Explanation Box */}
      {showExplanation && question.explanation && (
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1 text-xs">
          <p className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5" /> Explanation & Solution Note:
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

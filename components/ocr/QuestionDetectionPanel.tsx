"use client";

import React, { useState } from "react";
import { ExtractedQuestion } from "@/lib/types/ocr";
import { ConfidenceBadge } from "./ConfidenceBadge";
import { CheckCircle2, AlertTriangle, Layers, Split, Merge, Sparkles, Filter, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QuestionDetectionPanelProps {
  questions: ExtractedQuestion[];
  onMerge: (q1: ExtractedQuestion, q2: ExtractedQuestion) => void;
  onSplit: (q: ExtractedQuestion) => void;
  onDelete: (id: string) => void;
  onSelectQuestion: (id: string) => void;
  selectedId?: string;
}

export function QuestionDetectionPanel({
  questions,
  onMerge,
  onSplit,
  onDelete,
  onSelectQuestion,
  selectedId,
}: QuestionDetectionPanelProps) {
  const [filterLowConfidence, setFilterLowConfidence] = useState(false);

  const displayedQuestions = filterLowConfidence
    ? questions.filter((q) => q.confidence.overall < 85 || (q.lowConfidenceFields?.length || 0) > 0 || q.status === "flagged")
    : questions;

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
            <Layers className="w-4 h-4 text-indigo-600 mr-1.5" /> Identified Questions ({questions.length})
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-gray-400">Click any question to edit text, options, or metadata.</p>
        </div>

        <button
          onClick={() => setFilterLowConfidence(!filterLowConfidence)}
          className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center transition-all border ${
            filterLowConfidence
              ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300"
              : "border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50"
          }`}
        >
          <Filter className="w-3.5 h-3.5 mr-1" />
          {filterLowConfidence ? "Showing Low Conf" : "Filter Low Conf"}
        </button>
      </div>

      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
        {displayedQuestions.length === 0 ? (
          <p className="text-center py-6 text-xs text-gray-400">No questions match filter criteria.</p>
        ) : (
          displayedQuestions.map((q, idx) => {
            const isSelected = selectedId === q.id;
            const hasDuplicate = Boolean(q.duplicateMatch);
            const isLowConf = q.confidence.overall < 85 || (q.lowConfidenceFields?.length || 0) > 0;

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(q.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                    : isLowConf
                    ? "border-amber-200 dark:border-amber-900 bg-amber-50/20 dark:bg-amber-950/10 hover:border-amber-300"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                      {q.questionNumber || `Q${idx + 1}`}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
                      {q.type.replace(/_/g, " ")}
                    </span>
                    {q.isHandwritten && (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                        Handwritten
                      </span>
                    )}
                  </div>

                  <ConfidenceBadge confidence={q.confidence} size="sm" />
                </div>

                <p className="text-xs text-gray-900 dark:text-gray-100 font-medium line-clamp-2">{q.title}</p>

                {/* Duplicate Badge */}
                {hasDuplicate && (
                  <div className="mt-2 text-[11px] p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center justify-between">
                    <span className="font-semibold flex items-center">
                      <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                      {q.duplicateMatch?.matchType === "exact" ? "Exact Duplicate Match" : "Similar Question Flagged"} ({q.duplicateMatch?.similarityScore}%)
                    </span>
                    <span className="text-[10px] underline cursor-pointer">Compare</span>
                  </div>
                )}

                {/* Quick Split / Merge controls */}
                <div className="mt-2.5 pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px]" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <span>{q.options.length} options</span>
                    <span>•</span>
                    <span>{q.marks} marks</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onSplit(q)}
                      className="p-1 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      title="Split Question into 2 parts"
                    >
                      <Split className="w-3.5 h-3.5" />
                    </button>
                    {idx < questions.length - 1 && (
                      <button
                        onClick={() => onMerge(q, questions[idx + 1])}
                        className="p-1 rounded text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                        title="Merge with next question"
                      >
                        <Merge className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(q.id)}
                      className="p-1 rounded text-gray-500 hover:text-rose-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                      title="Delete question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

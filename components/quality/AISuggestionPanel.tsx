"use client";

import { Button } from "@/components/ui/button";
import { QuestionImprovementSuggestion } from "@/lib/types/quality";
import { Check,Sparkles,Wand2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AISuggestionPanelProps {
  suggestions: QuestionImprovementSuggestion[];
  onApplySuggestion?: (suggestion: QuestionImprovementSuggestion) => void;
}

export function AISuggestionPanel({ suggestions, onApplySuggestion }: AISuggestionPanelProps) {
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const handleAccept = (sug: QuestionImprovementSuggestion) => {
    setAppliedIds([...appliedIds, sug.id]);
    if (onApplySuggestion) onApplySuggestion(sug);
    toast.success(`Applied AI recommendation: "${sug.title}"`);
  };

  if (suggestions.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-xs text-gray-500 italic">
        No AI wording or distractor recommendations generated. Item quality is optimal!
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center">
          <Sparkles className="w-4 h-4 text-indigo-600 mr-1.5" /> AI Recommendations for Educator Review ({suggestions.length})
        </span>
      </div>

      {suggestions.map((sug) => {
        const isApplied = appliedIds.includes(sug.id);

        return (
          <div
            key={sug.id}
            className={`p-4 rounded-2xl border transition-all space-y-3 text-xs ${
              isApplied
                ? "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800 opacity-70"
                : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white flex items-center">
                <Wand2 className="w-3.5 h-3.5 text-indigo-500 mr-1.5" /> {sug.title}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 uppercase">
                {sug.type}
              </span>
            </div>

            <p className="text-gray-500 dark:text-gray-400">{sug.description}</p>

            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 font-mono text-[11px] space-y-1">
              {sug.originalSnippet && (
                <div className="text-rose-600 dark:text-rose-400 line-through">
                  - {sug.originalSnippet}
                </div>
              )}
              <div className="text-rose-600 dark:text-rose-400 font-semibold">
                + {sug.suggestedSnippet}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-1">
              <Button
                size="sm"
                variant={isApplied ? "outline" : "default"}
                disabled={isApplied}
                onClick={() => handleAccept(sug)}
                className={`text-xs rounded-xl ${
                  isApplied
                    ? "border-rose-300 text-rose-700"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                }`}
              >
                {isApplied ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" /> Accepted
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1" /> Accept & Apply
                  </>
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

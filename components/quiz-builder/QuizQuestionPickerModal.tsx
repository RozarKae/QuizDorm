"use client";

import React, { useState, useEffect, useMemo } from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search, Plus, Check } from "lucide-react";
import { getStoredQuestions, getAllTopics, getAllGradeLevels } from "@/lib/data/question-bank";
import { doesQuestionMatchTopic } from "@/lib/data/taxonomy";
import { toast } from "sonner";

interface QuizQuestionPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuestionsSelected: (questions: QuestionItem[]) => void;
}

export function QuizQuestionPickerModal({ open, onOpenChange, onQuestionsSelected }: QuizQuestionPickerModalProps) {
  const [bankQuestions, setBankQuestions] = useState<QuestionItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [selectedGrade, setSelectedGrade] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setBankQuestions(getStoredQuestions());
    }
  }, [open]);

  const topicsList = useMemo(() => {
    return getAllTopics();
  }, [bankQuestions]);

  const gradesList = useMemo(() => {
    return getAllGradeLevels();
  }, [bankQuestions]);

  const filtered = useMemo(() => {
    return bankQuestions.filter((q) => {
      const matchesSearch =
        !searchTerm ||
        q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.subject?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTopic = doesQuestionMatchTopic(q, selectedTopic);

      const matchesGrade =
        selectedGrade === "All" ||
        (q.gradeLevel && q.gradeLevel.toLowerCase() === selectedGrade.toLowerCase()) ||
        (q.grade && q.grade.toLowerCase() === selectedGrade.toLowerCase());

      return matchesSearch && matchesTopic && matchesGrade;
    });
  }, [bankQuestions, searchTerm, selectedTopic, selectedGrade]);

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleSelectAllFiltered = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((q) => q.id));
    }
  };

  const handleConfirm = () => {
    const picked = bankQuestions.filter((q) => selectedIds.includes(q.id));
    onQuestionsSelected(picked);
    toast.success(`Added ${picked.length} questions to quiz!`);
    onOpenChange(false);
    setSelectedIds([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col bg-[#0C1210] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-[#F2F7F3] font-display font-bold text-base">
            <Plus className="w-5 h-5 text-[#65F59A] mr-2" /> Add Questions from Question Bank
          </DialogTitle>
          <DialogDescription className="text-xs text-[#A0AEA5]">
            Browse by domain or search the catalog of {bankQuestions.length} verified questions.
          </DialogDescription>
        </DialogHeader>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#69786F]" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search statements..."
              className="pl-9 h-9 text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A]"
            />
          </div>

          <Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="h-9 text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px]"
            options={[
              { value: "All", label: "All Topics" },
              ...topicsList.map((t) => ({ value: t, label: t })),
            ]}
          />

          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="h-9 text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px]"
            options={[
              { value: "All", label: "Grade: All Levels" },
              ...gradesList.map((g) => ({ value: g, label: g })),
            ]}
          />
        </div>

        <div className="flex items-center justify-between text-xs font-mono text-[#A0AEA5] px-1">
          <span>Found {filtered.length} questions</span>
          <button
            onClick={handleSelectAllFiltered}
            className="text-xs text-[#65F59A] hover:underline font-semibold"
          >
            {selectedIds.length === filtered.length && filtered.length > 0 ? "Deselect All" : "Select All Filtered"}
          </button>
        </div>

        {/* Question Pick List */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1 flex-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-[#69786F] text-xs font-mono">
              No questions match the selected topic and filters.
            </div>
          ) : (
            filtered.map((q) => {
              const isChecked = selectedIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => handleToggle(q.id)}
                  className={`p-3 rounded-[4px] border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? "border-[#65F59A] bg-[#17251E] ring-1 ring-[#65F59A] shadow-[0_0_10px_rgba(101,245,154,0.1)]"
                      : "border-[rgba(160,190,170,0.14)] bg-[#111B17]/60 hover:border-[#65F59A]/30 hover:bg-[#111B17]"
                  }`}
                >
                  <div className="space-y-1 max-w-lg min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                      <QuestionTypeBadge type={q.type} />
                      <span className="font-bold text-[#65F59A]">{q.topic || q.subject}</span>
                      {(q.gradeLevel || q.grade) && (
                        <span className="text-[#A0AEA5]">• {q.gradeLevel || q.grade}</span>
                      )}
                      <span className="text-[#69786F]">• {q.marks || 1} Marks</span>
                    </div>
                    <p className="text-xs font-semibold text-[#F2F7F3] line-clamp-2">{q.title}</p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-[3px] shrink-0 flex items-center justify-center border transition-all ${
                      isChecked ? "bg-[#65F59A] border-[#65F59A] text-[#070B0A]" : "border-[rgba(160,190,170,0.3)] bg-[#111B17]"
                    }`}
                  >
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <DialogFooter className="mt-2 flex items-center justify-between sm:justify-between w-full">
          <span className="text-xs text-[#A0AEA5] font-mono">
            {selectedIds.length} question{selectedIds.length === 1 ? "" : "s"} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] h-8 text-[#A0AEA5] hover:text-[#F2F7F3]">
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedIds.length === 0}
              className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-[4px] h-8 shadow-[0_0_12px_rgba(101,245,154,0.18)]"
            >
              Add Selected ({selectedIds.length})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

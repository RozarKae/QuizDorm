import React, { useState, useEffect, useMemo } from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search, Plus, Check, Layers, Filter } from "lucide-react";
import { getStoredQuestions, getAllTopics, getAllGradeLevels } from "@/lib/data/question-bank";
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

      const matchesTopic =
        selectedTopic === "All" ||
        (q.topic && q.topic.toLowerCase() === selectedTopic.toLowerCase());

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
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <Plus className="w-5 h-5 text-indigo-600 mr-2" /> Add Questions from Question Bank
          </DialogTitle>
          <DialogDescription>
            Browse by topic or search our question bank of {bankQuestions.length} questions.
          </DialogDescription>
        </DialogHeader>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search statements..."
              className="pl-9 h-9 text-xs"
            />
          </div>

          <Select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="h-9 text-xs"
            options={[
              { value: "All", label: "All Topics" },
              ...topicsList.map((t) => ({ value: t, label: t })),
            ]}
          />

          <Select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="h-9 text-xs"
            options={[
              { value: "All", label: "Grade: All Levels" },
              ...gradesList.map((g) => ({ value: g, label: g })),
            ]}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <span>Found {filtered.length} questions</span>
          <button
            onClick={handleSelectAllFiltered}
            className="text-xs text-indigo-600 hover:underline font-semibold"
          >
            {selectedIds.length === filtered.length && filtered.length > 0 ? "Deselect All" : "Select All Filtered"}
          </button>
        </div>

        {/* Question Pick List */}
        <div className="space-y-2 max-h-96 overflow-y-auto pr-1 flex-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs">
              No questions match the selected topic and filters.
            </div>
          ) : (
            filtered.map((q) => {
              const isChecked = selectedIds.includes(q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => handleToggle(q.id)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    isChecked
                      ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 ring-1 ring-indigo-500"
                      : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                  }`}
                >
                  <div className="space-y-1 max-w-lg min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <QuestionTypeBadge type={q.type} />
                      <span className="font-bold text-indigo-600 dark:text-indigo-400">{q.topic || q.subject}</span>
                      {(q.gradeLevel || q.grade) && (
                        <span className="text-gray-400">• {q.gradeLevel || q.grade}</span>
                      )}
                      <span className="text-gray-400">• {q.marks || 1} Marks</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2">{q.title}</p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center border transition-all ${
                      isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    {isChecked && <Check className="w-3 h-3" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <DialogFooter className="mt-2 flex items-center justify-between sm:justify-between w-full">
          <span className="text-xs text-gray-500 font-medium">
            {selectedIds.length} question{selectedIds.length === 1 ? "" : "s"} selected
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={selectedIds.length === 0}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
            >
              Add Selected ({selectedIds.length})
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

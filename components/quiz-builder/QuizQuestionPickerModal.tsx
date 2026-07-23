import React, { useState } from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Search, Plus, Check } from "lucide-react";
import { toast } from "sonner";

interface QuizQuestionPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuestionsSelected: (questions: QuestionItem[]) => void;
}

const mockBankQuestions: QuestionItem[] = [
  {
    id: "qb-1",
    title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Algebra",
    topic: "Calculus",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 60,
    options: [{ id: "o1", text: "3x^2 + 8x - 5", isCorrect: true }],
    tags: ["calculus"],
    createdAt: "Jul 20, 2026",
    updatedAt: "Jul 23, 2026",
  },
  {
    id: "qb-2",
    title: "Which of the following organic compounds contain a benzene ring?",
    type: "mcq_multiple",
    subject: "Science",
    category: "Chemistry",
    topic: "Organic Chemistry",
    difficulty: "Hard",
    marks: 5,
    timeLimitSeconds: 90,
    options: [{ id: "o1", text: "Toluene", isCorrect: true }],
    tags: ["chemistry"],
    createdAt: "Jul 18, 2026",
    updatedAt: "Jul 23, 2026",
  },
  {
    id: "qb-3",
    title: "Light travels faster in water than in vacuum.",
    type: "true_false",
    subject: "Science",
    category: "Physics",
    topic: "Optics",
    difficulty: "Easy",
    marks: 2,
    timeLimitSeconds: 30,
    options: [],
    tags: ["physics"],
    createdAt: "Jul 15, 2026",
    updatedAt: "Jul 23, 2026",
  },
];

export function QuizQuestionPickerModal({ open, onOpenChange, onQuestionsSelected }: QuizQuestionPickerModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = mockBankQuestions.filter((q) => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || q.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleToggle = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleConfirm = () => {
    const picked = mockBankQuestions.filter((q) => selectedIds.includes(q.id));
    onQuestionsSelected(picked);
    toast.success(`Added ${picked.length} questions to quiz!`);
    onOpenChange(false);
    setSelectedIds([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <Plus className="w-5 h-5 text-indigo-600 mr-2" /> Add Questions from Question Bank
          </DialogTitle>
          <DialogDescription>
            Select questions from your saved Question Bank repository to include in this quiz.
          </DialogDescription>
        </DialogHeader>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 py-2">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions..."
              className="pl-9 h-9 text-xs"
            />
          </div>
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-9 text-xs w-full sm:w-44"
            options={[
              { value: "All", label: "All Categories" },
              { value: "Algebra", label: "Algebra" },
              { value: "Chemistry", label: "Chemistry" },
              { value: "Physics", label: "Physics" },
            ]}
          />
        </div>

        {/* Question Pick List */}
        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {filtered.map((q) => {
            const isChecked = selectedIds.includes(q.id);
            return (
              <div
                key={q.id}
                onClick={() => handleToggle(q.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isChecked
                    ? "border-indigo-600 bg-indigo-50/40 dark:bg-indigo-950/40 ring-1 ring-indigo-500"
                    : "border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                }`}
              >
                <div className="space-y-1 max-w-lg">
                  <div className="flex items-center space-x-2">
                    <QuestionTypeBadge type={q.type} />
                    <span className="text-[11px] text-gray-500 font-semibold">{q.category} • {q.marks} Marks</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{q.title}</p>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                    isChecked ? "bg-indigo-600 border-indigo-600 text-white" : "border-gray-300 dark:border-gray-700"
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={selectedIds.length === 0} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
            Add Selected ({selectedIds.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React from "react";
import { Trash2, FolderEdit, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

interface BulkActionToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkDelete: () => void;
  onBulkCategoryChange: (category: string) => void;
  onBulkDifficultyChange: (difficulty: string) => void;
}

export function BulkActionToolbar({
  selectedCount,
  onClearSelection,
  onBulkDelete,
  onBulkCategoryChange,
  onBulkDifficultyChange,
}: BulkActionToolbarProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl border border-gray-800 flex items-center space-x-6 animate-in slide-in-from-bottom-5">
      <div className="flex items-center space-x-2 text-sm font-semibold">
        <span className="bg-indigo-600 text-white px-2.5 py-0.5 rounded-full text-xs">{selectedCount}</span>
        <span>Questions Selected</span>
      </div>

      <div className="h-4 w-px bg-gray-700" />

      <div className="flex items-center space-x-3">
        <Select
          className="h-8 text-xs bg-gray-800 text-white border-gray-700 rounded-lg w-36"
          onChange={(e) => e.target.value && onBulkCategoryChange(e.target.value)}
          options={[
            { value: "", label: "Update Category" },
            { value: "Mathematics", label: "Mathematics" },
            { value: "Science", label: "Science" },
            { value: "Computer Science", label: "Computer Science" },
            { value: "History", label: "History" },
          ]}
        />

        <Select
          className="h-8 text-xs bg-gray-800 text-white border-gray-700 rounded-lg w-36"
          onChange={(e) => e.target.value && onBulkDifficultyChange(e.target.value)}
          options={[
            { value: "", label: "Update Difficulty" },
            { value: "Easy", label: "Easy" },
            { value: "Medium", label: "Medium" },
            { value: "Hard", label: "Hard" },
          ]}
        />

        <Button
          onClick={onBulkDelete}
          variant="ghost"
          size="sm"
          className="h-8 text-red-400 hover:text-red-300 hover:bg-red-950/50 text-xs font-semibold"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Bulk Delete
        </Button>
      </div>

      <Button onClick={onClearSelection} variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-white">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

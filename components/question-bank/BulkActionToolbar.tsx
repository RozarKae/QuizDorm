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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#140C0E]/95 backdrop-blur-xl text-[#F2F7F3] px-6 py-3 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(255, 77, 109,0.15)] border border-[rgba(240, 160, 180,0.22)] flex items-center space-x-6 animate-in slide-in-from-bottom-5">
      <div className="flex items-center space-x-2 text-xs font-mono font-semibold">
        <span className="bg-[rgba(255, 77, 109,0.18)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] px-2.5 py-0.5 rounded-full text-xs">
          {selectedCount}
        </span>
        <span className="text-[#F2F7F3]">Items Selected</span>
      </div>

      <div className="h-4 w-px bg-[rgba(240, 160, 180,0.16)]" />

      <div className="flex items-center space-x-3">
        <Select
          className="h-8 text-xs bg-[#1D1013] text-[#F2F7F3] border-[rgba(240, 160, 180,0.18)] rounded-[4px] w-36 font-mono"
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
          className="h-8 text-xs bg-[#1D1013] text-[#F2F7F3] border-[rgba(240, 160, 180,0.18)] rounded-[4px] w-36 font-mono"
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
          className="h-8 text-[#F87171] hover:text-[#FCA5A5] hover:bg-[#F87171]/10 text-xs font-mono font-semibold rounded-[4px]"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Bulk Delete
        </Button>
      </div>

      <Button onClick={onClearSelection} variant="ghost" size="icon" className="h-7 w-7 text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[3px]">
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}

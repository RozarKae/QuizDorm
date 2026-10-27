"use client";

import { BloomsTaxonomyLevel } from "@/lib/types/quality";
import { Brain } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface BloomsIndicatorProps {
  level: BloomsTaxonomyLevel;
  onOverride?: (newLevel: BloomsTaxonomyLevel) => void;
}

export function BloomsIndicator({ level: initialLevel, onOverride }: BloomsIndicatorProps) {
  const [currentLevel, setCurrentLevel] = useState<BloomsTaxonomyLevel>(initialLevel);

  const bloomsConfigs: Record<BloomsTaxonomyLevel, { label: string; color: string; desc: string }> = {
    Remember: { label: "1. Remember (Recall)", color: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300", desc: "Recall facts and basic concepts" },
    Understand: { label: "2. Understand (Comprehend)", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300", desc: "Explain ideas or concepts" },
    Apply: { label: "3. Apply (Execute)", color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300", desc: "Use information in new situations" },
    Analyze: { label: "4. Analyze (Dissect)", color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300", desc: "Draw connections among ideas" },
    Evaluate: { label: "5. Evaluate (Judge)", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300", desc: "Justify a stand or decision" },
    Create: { label: "6. Create (Design & Build)", color: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300", desc: "Produce new or original work" },
  };

  const handleSelect = (l: BloomsTaxonomyLevel) => {
    setCurrentLevel(l);
    if (onOverride) onOverride(l);
    toast.success(`Bloom's cognitive level updated to [${l}]`);
  };

  const config = bloomsConfigs[currentLevel] || bloomsConfigs.Remember;

  return (
    <div className="inline-flex items-center space-x-1.5">
      <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center ${config.color}`}>
        <Brain className="w-3.5 h-3.5 mr-1" />
        <span>{config.label}</span>
      </span>

      <select
        value={currentLevel}
        onChange={(e) => handleSelect(e.target.value as BloomsTaxonomyLevel)}
        className="text-[10px] font-semibold border-none bg-transparent text-gray-500 cursor-pointer focus:ring-0"
      >
        <option value="Remember">Override: Remember</option>
        <option value="Understand">Override: Understand</option>
        <option value="Apply">Override: Apply</option>
        <option value="Analyze">Override: Analyze</option>
        <option value="Evaluate">Override: Evaluate</option>
        <option value="Create">Override: Create</option>
      </select>
    </div>
  );
}

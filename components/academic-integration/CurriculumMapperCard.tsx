"use client";

import React from "react";
import { CurriculumMappingEngine } from "@/lib/academic-integration/curriculumMapper";
import { Target, CheckCircle2, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

export function CurriculumMapperCard() {
  const frameworks = CurriculumMappingEngine.getFrameworks();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Target className="w-5 h-5 text-indigo-600 mr-2" /> Curriculum Alignment & Standards Mapping Engine
        </h3>
        <span className="text-xs font-mono font-bold text-indigo-600">CBSE • IB • Cambridge • ICSE</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {frameworks.map((fw) => (
          <div key={fw.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm font-extrabold">{fw.name} Standard</span>
              <span className="text-rose-600 font-mono text-[11px]">{fw.coveragePercent}% Aligned</span>
            </div>

            <p className="text-gray-500 font-medium text-[11px]">{fw.subject}</p>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1">
              <span>Units Mapped: {fw.mappedUnitsCount}</span>
              <span>Questions: {fw.mappedQuestionsCount}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

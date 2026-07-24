"use client";

import React, { useState } from "react";
import { CurriculumExchangePackage } from "@/lib/types/global-network";
import { Share2, Download, BookOpen, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CurriculumPackageCardProps {
  pkg: CurriculumExchangePackage;
}

export function CurriculumPackageCard({ pkg }: CurriculumPackageCardProps) {
  const [downloads, setDownloads] = useState(pkg.downloadsCount);

  const handleImport = () => {
    setDownloads((prev) => prev + 1);
    toast.success(`Imported curriculum package "${pkg.title}" into Institution Syllabi!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            {pkg.country}
          </span>
          <span className="text-[10px] font-mono text-gray-400">{pkg.gradeLevel}</span>
        </div>

        <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">{pkg.title}</h3>
        <p className="text-xs text-gray-500 font-mono">Publisher: {pkg.institutionName}</p>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>License: {pkg.licensingType}</span>
          <span className="font-bold text-indigo-600">{downloads.toLocaleString()} Imports</span>
        </div>

        <Button onClick={handleImport} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl h-8">
          <Download className="w-3.5 h-3.5 mr-1" /> Import Curriculum Framework
        </Button>
      </div>
    </div>
  );
}

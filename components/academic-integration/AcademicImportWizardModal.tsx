"use client";

import React, { useState } from "react";
import { AcademicImportExportService } from "@/lib/academic-integration/importExportService";
import { Upload, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AcademicImportWizardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AcademicImportWizardModal({ open, onOpenChange }: AcademicImportWizardModalProps) {
  const [recordType, setRecordType] = useState<"students" | "teachers" | "questions">("students");
  const [fileSelected, setFileSelected] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  if (!open) return null;

  const handleStartImport = async () => {
    setImporting(true);
    const res = await AcademicImportExportService.processImport(fileSelected || "students_roster_2026.csv", recordType);
    setImporting(false);
    toast.success(`Import complete! Processed ${res.recordsCount} ${recordType} records.`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Upload className="w-5 h-5 text-indigo-600 mr-2" /> Bulk Academic Import Wizard
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Target Record Type</label>
            <select
              value={recordType}
              onChange={(e) => setRecordType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
            >
              <option value="students">Student Roster (CSV / JSON)</option>
              <option value="teachers">Faculty Roster (CSV / JSON)</option>
              <option value="questions">Question Bank Set (QTI / JSON / CSV)</option>
            </select>
          </div>

          <div
            onClick={() => setFileSelected("academic_roster_import_v2.csv")}
            className="p-6 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-center cursor-pointer hover:border-indigo-500 transition-colors"
          >
            <FileText className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <span className="font-bold text-gray-900 dark:text-white block">
              {fileSelected ? fileSelected : "Click to select CSV / JSON / QTI File"}
            </span>
            <span className="text-[10px] text-gray-400">Supports PowerSchool, Canvas, and custom exports</span>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
            <Button
              onClick={handleStartImport}
              disabled={importing}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl"
            >
              {importing ? "Processing..." : "Process Import"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Upload, FileSpreadsheet, FileCode, FileText, Download, ScanText, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImportSuccess?: () => void;
}

export function ImportDialog({ open, onOpenChange, onImportSuccess }: ImportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<"csv" | "excel" | "json">("csv");
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleImport = () => {
    if (!fileName) {
      toast.error("Please select a file to import");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Successfully imported questions from ${fileName}`);
      onOpenChange(false);
      setFileName(null);
      if (onImportSuccess) onImportSuccess();
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <Upload className="w-5 h-5 text-indigo-600 mr-2" /> Import Questions
          </DialogTitle>
          <DialogDescription className="text-xs">
            Bulk import questions from CSV, Excel, JSON or launch the AI OCR Document Intelligence Workspace.
          </DialogDescription>
        </DialogHeader>

        {/* AI OCR Callout */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-900 to-slate-900 text-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold flex items-center">
              <ScanText className="w-4 h-4 mr-1.5 text-indigo-300" /> AI Document Digitizer & OCR
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500 text-white">
              Phase 2.1
            </span>
          </div>
          <p className="text-[11px] text-indigo-100/80">
            Import scanned PDFs, Word docs, photos & handwritten notes with automated math, table, and question detection.
          </p>
          <Link
            href="/dashboard/ocr"
            onClick={() => onOpenChange(false)}
            className="inline-flex items-center text-xs font-bold text-indigo-300 hover:text-white pt-1"
          >
            Open OCR Workspace <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="space-y-4 py-2">
          {/* Format selection */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setSelectedFormat("csv")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                selectedFormat === "csv"
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 font-bold"
                  : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileSpreadsheet className="w-5 h-5" />
              <span className="text-xs">CSV</span>
            </button>

            <button
              onClick={() => setSelectedFormat("excel")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                selectedFormat === "excel"
                  ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                  : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileText className="w-5 h-5" />
              <span className="text-xs">Excel</span>
            </button>

            <button
              onClick={() => setSelectedFormat("json")}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                selectedFormat === "json"
                  ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-600 font-bold"
                  : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FileCode className="w-5 h-5" />
              <span className="text-xs">JSON</span>
            </button>
          </div>

          {/* Upload Dropzone */}
          <label className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center bg-gray-50/50 dark:bg-gray-900/30 hover:border-indigo-400 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2">
            <Upload className="w-8 h-8 text-indigo-500" />
            <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {fileName ? fileName : `Choose ${selectedFormat.toUpperCase()} file to upload`}
            </span>
            <span className="text-[11px] text-gray-400">Click to browse or drag & drop</span>
            <input type="file" accept=".csv,.xlsx,.xls,.json" onChange={handleFileSelect} className="hidden" />
          </label>

          {/* Sample template download link */}
          <div className="flex items-center justify-between text-xs pt-1 text-gray-500">
            <span>Need sample format?</span>
            <button
              type="button"
              onClick={() => toast.info(`Downloading sample ${selectedFormat.toUpperCase()} template...`)}
              className="text-indigo-600 font-semibold hover:underline flex items-center"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Download Sample
            </button>
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl text-xs">
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            {loading ? "Importing..." : "Start Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

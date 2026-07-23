import React, { useState } from "react";
import { Download, FileSpreadsheet, FileCode, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  count: number;
}

export function ExportDialog({ open, onOpenChange, count }: ExportDialogProps) {
  const [selectedFormat, setSelectedFormat] = useState<"csv" | "excel" | "json" | "pdf">("csv");
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Exported ${count} questions as ${selectedFormat.toUpperCase()}`);
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <Download className="w-5 h-5 text-indigo-600 mr-2" /> Export Questions
          </DialogTitle>
          <DialogDescription>
            Export {count} selected questions from your question bank into your desired format.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 py-4">
          <button
            onClick={() => setSelectedFormat("csv")}
            className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
              selectedFormat === "csv"
                ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 font-bold"
                : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileSpreadsheet className="w-6 h-6" />
            <span className="text-xs">CSV Spreadsheet</span>
          </button>

          <button
            onClick={() => setSelectedFormat("excel")}
            className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
              selectedFormat === "excel"
                ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-600 font-bold"
                : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">Excel Document</span>
          </button>

          <button
            onClick={() => setSelectedFormat("json")}
            className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
              selectedFormat === "json"
                ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-600 font-bold"
                : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileCode className="w-6 h-6" />
            <span className="text-xs">JSON Data</span>
          </button>

          <button
            onClick={() => setSelectedFormat("pdf")}
            className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
              selectedFormat === "pdf"
                ? "border-red-600 bg-red-50/50 dark:bg-red-950/40 text-red-600 font-bold"
                : "border-gray-200 dark:border-gray-800 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <FileText className="w-6 h-6" />
            <span className="text-xs">PDF Printable Report</span>
          </button>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
            {loading ? "Exporting..." : "Download Export"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import React, { useState } from "react";
import { Download, FileText, FileSpreadsheet, FileCode, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ExportReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reportTitle?: string;
}

export function ExportReportDialog({ open, onOpenChange, reportTitle = "Class Academic Performance Report" }: ExportReportDialogProps) {
  const [format, setFormat] = useState<"PDF" | "Excel" | "CSV">("PDF");
  const [dateRange, setDateRange] = useState("Jul 2026");
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Generated and downloaded ${reportTitle} as ${format}`);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <Download className="w-5 h-5 text-indigo-600 mr-2" /> Generate & Export Report
          </DialogTitle>
          <DialogDescription>
            Export <span className="font-bold text-gray-800 dark:text-gray-200">{reportTitle}</span> into your desired format.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Select Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat("PDF")}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  format === "PDF" ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 text-indigo-600 font-bold" : "border-gray-200"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs">PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("Excel")}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  format === "Excel" ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-600 font-bold" : "border-gray-200"
                }`}
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span className="text-xs">Excel</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("CSV")}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center space-y-1 ${
                  format === "CSV" ? "border-purple-600 bg-purple-50/50 dark:bg-purple-950/40 text-purple-600 font-bold" : "border-gray-200"
                }`}
              >
                <FileCode className="w-5 h-5" />
                <span className="text-xs">CSV</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Date Range</label>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              options={[
                { value: "Jul 2026", label: "Current Month (July 2026)" },
                { value: "Q2 2026", label: "Second Quarter 2026" },
                { value: "Full Term", label: "Full Academic Term 2025-2026" },
              ]}
              className="text-xs h-10"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleDownload} disabled={loading} className="bg-indigo-600 text-white font-bold">
            {loading ? "Exporting..." : "Download File"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
          <DialogTitle className="flex items-center text-[#F2F7F3] font-display">
            <Download className="w-5 h-5 text-[#65F59A] mr-2" /> Generate & Export Report
          </DialogTitle>
          <DialogDescription className="text-[#A0AEA5] text-xs">
            Export <span className="font-bold text-[#F2F7F3]">{reportTitle}</span> into your desired format.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A0AEA5] mb-2">Select Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat("PDF")}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                  format === "PDF"
                    ? "border-[#65F59A] bg-[#17251E] text-[#65F59A] font-bold shadow-md shadow-[#65F59A]/10"
                    : "border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="text-xs font-mono">PDF</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("Excel")}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                  format === "Excel"
                    ? "border-[#38D9B0] bg-[#111B17] text-[#38D9B0] font-bold shadow-md shadow-[#38D9B0]/10"
                    : "border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <FileSpreadsheet className="w-5 h-5" />
                <span className="text-xs font-mono">Excel</span>
              </button>

              <button
                type="button"
                onClick={() => setFormat("CSV")}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-1.5 ${
                  format === "CSV"
                    ? "border-[#65F59A] bg-[#17251E] text-[#65F59A] font-bold shadow-md shadow-[#65F59A]/10"
                    : "border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <FileCode className="w-5 h-5" />
                <span className="text-xs font-mono">CSV</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A0AEA5] mb-2">Date Range</label>
            <Select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              options={[
                { value: "Jul 2026", label: "Current Month (July 2026)" },
                { value: "Q2 2026", label: "Second Quarter 2026" },
                { value: "Full Term", label: "Full Academic Term 2025-2026" },
              ]}
              className="text-xs h-10 bg-[#111B17] border-[rgba(160,190,170,0.15)] text-[#F2F7F3] rounded-xl font-mono"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3]">Cancel</Button>
          <Button onClick={handleDownload} disabled={loading} className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-bold shadow-md shadow-[#65F59A]/15">
            {loading ? "Exporting..." : "Download Dossier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Select } from "@/components/ui/select";
import { Download,FileCode,FileSpreadsheet,FileText } from "lucide-react";
import { useState } from "react";
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
            <Download className="w-5 h-5 text-[#FF4D6D] mr-2" /> Generate & Export Report
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
                    ? "border-[#FF4D6D] bg-[#2A141A] text-[#FF4D6D] font-bold shadow-md shadow-[#FF4D6D]/10"
                    : "border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
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
                    ? "border-[#FF758F] bg-[#1D1013] text-[#FF758F] font-bold shadow-md shadow-[#FF758F]/10"
                    : "border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
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
                    ? "border-[#FF4D6D] bg-[#2A141A] text-[#FF4D6D] font-bold shadow-md shadow-[#FF4D6D]/10"
                    : "border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
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
              className="text-xs h-10 bg-[#1D1013] border-[rgba(240, 160, 180,0.15)] text-[#F2F7F3] rounded-xl font-mono"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3]">Cancel</Button>
          <Button onClick={handleDownload} disabled={loading} className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-bold shadow-md shadow-[#FF4D6D]/15">
            {loading ? "Exporting..." : "Download Dossier"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

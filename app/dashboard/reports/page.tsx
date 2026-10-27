"use client";

import { ExportReportDialog } from "@/components/analytics/ExportReportDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ReportItem } from "@/lib/types/analytics";
import { Calendar,Download,FileText,Plus,Search } from "lucide-react";
import { useState } from "react";

const mockReports: ReportItem[] = [
  { id: "rep-1", title: "Class 12-A Academic Performance Digest", type: "Class", generatedDate: "Jul 23, 2026", format: "PDF", fileSize: "2.4 MB" },
  { id: "rep-2", title: "Science Department Monthly Growth Report", type: "Department", generatedDate: "Jul 20, 2026", format: "Excel", fileSize: "1.8 MB" },
  { id: "rep-3", title: "Calculus Derivatives Quiz Item Analysis", type: "Quiz", generatedDate: "Jul 18, 2026", format: "CSV", fileSize: "450 KB" },
  { id: "rep-4", title: "Student Roster & Pass Percentage Summary", type: "Organization", generatedDate: "Jul 15, 2026", format: "PDF", fileSize: "3.1 MB" },
];

export default function ReportsPage() {
  const [reports] = useState<ReportItem[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeReportTitle, setActiveReportTitle] = useState("");

  const filtered = reports.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleOpenExport = (title: string) => {
    setActiveReportTitle(title);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-6 h-6 text-indigo-600 mr-2" /> Report Generator & Downloads Center
          </h1>
          <p className="text-sm text-gray-500">Generate, customize, and export PDF, Excel, and CSV academic reports</p>
        </div>

        <Button onClick={() => handleOpenExport("Custom Academic Digest")} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
          <Plus className="w-4 h-4 mr-1.5" /> Generate New Report
        </Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search report templates..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 text-xs font-medium w-full sm:w-44"
          options={[
            { value: "All", label: "All Report Types" },
            { value: "Class", label: "Class Reports" },
            { value: "Department", label: "Department Reports" },
            { value: "Quiz", label: "Quiz Reports" },
            { value: "Organization", label: "Organization Reports" },
          ]}
        />
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((rep) => (
          <div
            key={rep.id}
            className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all flex items-start justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Badge className="bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] font-bold">
                  {rep.type} Report
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {rep.format}
                </Badge>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">{rep.title}</h3>

              <div className="flex items-center space-x-3 text-xs text-gray-400">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {rep.generatedDate}
                </span>
                <span>•</span>
                <span>Size: {rep.fileSize}</span>
              </div>
            </div>

            <Button
              onClick={() => handleOpenExport(rep.title)}
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shrink-0"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Download
            </Button>
          </div>
        ))}
      </div>

      <ExportReportDialog open={dialogOpen} onOpenChange={setDialogOpen} reportTitle={activeReportTitle} />
    </div>
  );
}

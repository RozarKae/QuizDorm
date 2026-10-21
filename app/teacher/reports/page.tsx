"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Download,
  ArrowUpRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Users,
  Search,
  Filter,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TeacherReportsPage() {
  const [selectedCohort, setSelectedCohort] = useState("all");

  const reports = [
    {
      id: "rep-1",
      title: "AP Chemistry — Midterm Synthesis",
      cohort: "Section 12-A",
      date: "2026-10-18",
      submissions: 34,
      avgScore: 86.4,
      passRate: 97.1,
      topScore: 100,
      status: "Finalized",
    },
    {
      id: "rep-2",
      title: "Advanced Physics — Electromagnetic Induction",
      cohort: "Section 12-B",
      date: "2026-10-15",
      submissions: 28,
      avgScore: 78.9,
      passRate: 89.3,
      topScore: 98,
      status: "Review Pending",
    },
    {
      id: "rep-3",
      title: "STEM Foundations — Periodic Orbitals & Trends",
      cohort: "Section 10-A",
      date: "2026-10-12",
      submissions: 36,
      avgScore: 91.2,
      passRate: 100,
      topScore: 100,
      status: "Finalized",
    },
    {
      id: "rep-4",
      title: "Organic Chemistry — Functional Groups Lab Quiz",
      cohort: "Section 11-A",
      date: "2026-10-08",
      submissions: 30,
      avgScore: 83.0,
      passRate: 93.3,
      topScore: 96,
      status: "Finalized",
    },
  ];

  const filteredReports =
    selectedCohort === "all"
      ? reports
      : reports.filter((r) => r.cohort.toLowerCase().includes(selectedCohort.toLowerCase()));

  const handleExport = (title: string) => {
    toast.success(`Export generated: ${title}.csv`, {
      description: "Gradebook telemetry and student performance downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Masthead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(160,190,170,0.14)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#65F59A] tracking-widest">
              ACADEMIC TELEMETRY // GRADEBOOK AUDIT
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
            Gradebook & Diagnostics Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
            Generate and export cohort performance summaries, average pass rates, and individualized assessment diagnostics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleExport("Master-Cohort-Gradebook-2026")}
            className="h-9 px-4 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(101,245,154,0.2)]"
          >
            <Download className="mr-2 h-3.5 w-3.5" />
            Export Master CSV
          </Button>
        </div>
      </div>

      {/* 2. Key Performance Indicators */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Cohort Median Score
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F2F7F3] tabular-nums">84.9%</p>
            <span className="font-mono text-[10px] text-[#65F59A] bg-[rgba(101,245,154,0.1)] px-1.5 py-0.5 rounded-[2px]">
              +4.1% term gain
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Overall Pass Rate
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#65F59A] tabular-nums">94.9%</p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">122/128 Scholars</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Perfect Submissions
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#38D9B0] tabular-nums">18</p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">100% Mark achieved</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Scholars Requiring Review
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FBBF24] tabular-nums">6</p>
            <span className="font-mono text-[10px] text-[#FBBF24] bg-[rgba(251,191,36,0.1)] px-1.5 py-0.5 rounded-[2px]">
              Intervention recommended
            </span>
          </div>
        </div>
      </div>

      {/* 3. Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)]">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#65F59A]" />
          <span className="font-mono text-xs uppercase font-bold text-[#F2F7F3]">Filter by Cohort:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {[
            { id: "all", label: "All Classrooms" },
            { id: "12-a", label: "Section 12-A" },
            { id: "12-b", label: "Section 12-B" },
            { id: "10-a", label: "Section 10-A" },
            { id: "11-a", label: "Section 11-A" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCohort(c.id)}
              className={`px-3 py-1 rounded-[3px] font-mono text-[11px] font-bold uppercase transition-all ${
                selectedCohort === c.id
                  ? "bg-[#65F59A] text-[#070B0A]"
                  : "bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(160,190,170,0.14)]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Assessment Reports Table */}
      <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#111B17] border-b border-[rgba(160,190,170,0.14)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Assessment Title</th>
                <th className="px-4 py-3">Cohort</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Submissions</th>
                <th className="px-4 py-3">Average</th>
                <th className="px-4 py-3">Pass Rate</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(160,190,170,0.08)]">
              {filteredReports.map((rep) => (
                <tr key={rep.id} className="hover:bg-[#111B17]/60 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-[#F2F7F3]">
                    {rep.title}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#A0AEA5]">
                    {rep.cohort}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#69786F]">
                    {rep.date}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#F2F7F3]">
                    {rep.submissions}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#65F59A]">
                    {rep.avgScore}%
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#38D9B0]">
                    {rep.passRate}%
                  </td>
                  <td className="px-4 py-3.5">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                        rep.status === "Finalized"
                          ? "bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.2)]"
                          : "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.2)]"
                      }`}
                    >
                      {rep.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleExport(rep.title)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#65F59A] hover:underline uppercase"
                    >
                      <Download className="h-3 w-3" />
                      Export
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
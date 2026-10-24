"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Download,
  Users,
  GraduationCap,
  Building,
  Filter,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SchoolReportsPage() {
  const [selectedDept, setSelectedDept] = useState("all");

  const departmentReports = [
    {
      id: "dept-1",
      department: "Science & Technology",
      lead: "Dr. K. Saravanan",
      facultyCount: 12,
      studentsCount: 320,
      completionRate: 96.2,
      proficiencyAvg: 84.6,
      topCohort: "Grade 12-A",
      quizzesAdministered: 64,
    },
    {
      id: "dept-2",
      department: "Mathematics & Analytics",
      lead: "Prof. Marcus Vance",
      facultyCount: 8,
      studentsCount: 290,
      completionRate: 93.8,
      proficiencyAvg: 81.2,
      topCohort: "Grade 11-B",
      quizzesAdministered: 52,
    },
    {
      id: "dept-3",
      department: "Humanities & Social Sciences",
      lead: "Dr. Clara Chen",
      facultyCount: 6,
      studentsCount: 180,
      completionRate: 98.1,
      proficiencyAvg: 88.4,
      topCohort: "Grade 10-A",
      quizzesAdministered: 38,
    },
    {
      id: "dept-4",
      department: "Language & Literature",
      lead: "Mr. Arthur Pendelton",
      facultyCount: 6,
      studentsCount: 240,
      completionRate: 95.4,
      proficiencyAvg: 86.0,
      topCohort: "Grade 12-C",
      quizzesAdministered: 44,
    },
  ];

  const filtered =
    selectedDept === "all"
      ? departmentReports
      : departmentReports.filter((d) => d.department.toLowerCase().includes(selectedDept.toLowerCase()));

  const handleExport = (name: string) => {
    toast.success(`Exporting ${name}`, {
      description: "Institutional accreditation and performance metrics downloaded.",
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[rgba(240, 160, 180,0.14)]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-[10px] uppercase font-bold text-[#FF758F] tracking-widest">
              INSTITUTIONAL METRICS // ACCREDITATION & COMPLIANCE
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
            Campus Academic Diagnostics & Reports
          </h1>
          <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
            Review cross-departmental completion rates, median mastery indexes, and export official board reporting packages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleExport("Institutional-Accreditation-Audit-2026.pdf")}
            className="h-9 px-4 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(255, 77, 109,0.2)]"
          >
            <Download className="mr-2 h-3.5 w-3.5" />
            Export Board Package
          </Button>
        </div>
      </div>

      {/* 2. Campus Scorecard HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Campus Average Mastery
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#F2F7F3] tabular-nums">85.1%</p>
            <span className="font-mono text-[10px] text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] px-1.5 py-0.5 rounded-[2px]">
              Exceeds State Benchmarks
            </span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Assessment Completion Rate
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF4D6D] tabular-nums">95.8%</p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">1,890 / 1,972 attempted</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            Total Faculty Active
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF758F] tabular-nums">32 / 32</p>
            <span className="font-mono text-[10px] text-[#A0AEA5]">100% active this month</span>
          </div>
        </div>

        <div className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
            State Standard Alignment
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <p className="font-display text-3xl font-extrabold text-[#FF4D6D] tabular-nums">99.4%</p>
            <span className="font-mono text-[10px] text-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] px-1.5 py-0.5 rounded-[2px]">
              Accredited
            </span>
          </div>
        </div>
      </div>

      {/* 3. Departmental Table */}
      <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] overflow-hidden">
        <div className="p-4 bg-[#1D1013] border-b border-[rgba(240, 160, 180,0.14)] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-3 bg-[#FF4D6D] rounded-[1px] shadow-[0_0_6px_#FF4D6D]" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
              Department Performance Breakdown
            </h3>
          </div>
          <span className="font-mono text-[10px] text-[#69786F]">4 Academic Divisions</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[rgba(240, 160, 180,0.12)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
              <tr>
                <th className="px-4 py-3">Academic Division</th>
                <th className="px-4 py-3">Department Head</th>
                <th className="px-4 py-3">Faculty</th>
                <th className="px-4 py-3">Students</th>
                <th className="px-4 py-3">Quizzes Held</th>
                <th className="px-4 py-3">Completion</th>
                <th className="px-4 py-3">Proficiency</th>
                <th className="px-4 py-3 text-right">Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)]">
              {filtered.map((dept) => (
                <tr key={dept.id} className="hover:bg-[#1D1013]/60 transition-colors">
                  <td className="px-4 py-3.5 font-medium text-[#F2F7F3]">
                    {dept.department}
                  </td>
                  <td className="px-4 py-3.5 text-[#A0AEA5]">
                    {dept.lead}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#F2F7F3]">
                    {dept.facultyCount}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#F2F7F3]">
                    {dept.studentsCount}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#FF758F]">
                    {dept.quizzesAdministered}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs text-[#F2F7F3]">
                    {dept.completionRate}%
                  </td>
                  <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#FF4D6D]">
                    {dept.proficiencyAvg}%
                  </td>
                  <td className="px-4 py-3.5 text-right">
                    <button
                      onClick={() => handleExport(`${dept.department}-Report.csv`)}
                      className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#FF4D6D] hover:underline uppercase"
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
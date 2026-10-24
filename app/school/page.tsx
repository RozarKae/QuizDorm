"use client";

import React from "react";
import Link from "next/link";
import {
  School,
  GraduationCap,
  Users,
  FileText,
  BarChart3,
  ShieldCheck,
  Building,
  ArrowUpRight,
  Download,
  Settings,
  Calendar,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SchoolPage() {
  const stats = [
    {
      title: "Campus Enrollment",
      value: "840",
      subtext: "24 active cohorts",
      change: "+4.2% YoY",
      icon: <GraduationCap className="h-4 w-4 text-blue-400" />,
    },
    {
      title: "Faculty Staff",
      value: "32",
      subtext: "100% verified credentials",
      change: "Full capacity",
      icon: <Users className="h-4 w-4 text-sky-400" />,
    },
    {
      title: "Active Laboratories",
      value: "24",
      subtext: "Grades 9 through 12",
      change: "All active",
      icon: <School className="h-4 w-4 text-blue-400" />,
    },
    {
      title: "Curriculum Proficiency",
      value: "85.2%",
      subtext: "Median campus benchmark",
      change: "Top decile",
      icon: <BarChart3 className="h-4 w-4 text-emerald-400" />,
    },
  ];

  const departments = [
    {
      name: "Department of Physical & Natural Sciences",
      code: "SCI-PHYS",
      head: "Dr. Alistair Vance",
      facultyCount: 12,
      studentLoad: 320,
      proficiency: "86.4%",
      quizzesRun: 420,
      status: "Accredited",
    },
    {
      name: "Mathematics & Algorithmic Logic",
      code: "MATH-ALG",
      head: "Prof. Sarah Jenkins",
      facultyCount: 8,
      studentLoad: 290,
      proficiency: "82.8%",
      quizzesRun: 380,
      status: "Accredited",
    },
    {
      name: "Humanities & Global Civilizations",
      code: "HUM-GEO",
      head: "Dr. Evelyn Reed",
      facultyCount: 6,
      studentLoad: 180,
      proficiency: "88.9%",
      quizzesRun: 210,
      status: "Accredited",
    },
    {
      name: "Clinical Medicine & Anatomy Preparatory",
      code: "MED-CLIN",
      head: "Dr. Kabir Menon",
      facultyCount: 6,
      studentLoad: 240,
      proficiency: "84.1%",
      quizzesRun: 310,
      status: "Accredited",
    },
  ];

  const campusCompliance = [
    { label: "Institutional Syllabus Accreditation", status: "Compliant & Verified", date: "Expires Dec 2027" },
    { label: "Student Data Privacy & FERPA Sandbox", status: "Fully Sealed (Zero PII Leaks)", date: "Audited Daily" },
    { label: "Faculty Mentor Question Authoring", status: "Enabled by Platform Superadmin", date: "Governance Active" },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Executive Corporate Academic Masthead (Midnight Navy & Sapphire) */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#080E1A] border border-blue-500/25 p-6 sm:p-8 shadow-[0_0_35px_rgba(37,99,235,0.06)]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(37,99,235,0.12)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-blue-500/15 border border-blue-500/30 text-blue-300 font-mono text-[10px] font-bold uppercase tracking-widest">
                <Building className="w-3 h-3 text-blue-400" />
                Academy Directorate // Campus Operations
              </span>
              <span className="text-[#64748B]">&bull;</span>
              <span className="font-mono text-xs text-[#94A3B8]">Government Model Matriculation</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#F8FAFC]">
              Institutional Command & Governance
            </h1>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
              Executive oversight of enrolled student cohorts, faculty mentor allocations, departmental performance indices, and board compliance audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/school/settings">
              <Button className="h-10 px-5 rounded-[4px] bg-blue-600 text-white hover:bg-blue-500 font-medium text-xs tracking-wider shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Users className="mr-2 h-4 w-4" />
                Faculty Directory
              </Button>
            </Link>
            <Link href="/school/reports">
              <Button
                variant="outline"
                className="h-10 px-4 rounded-[4px] border-slate-700 bg-[#0F172A] text-slate-300 hover:text-white text-xs font-medium"
              >
                <Download className="mr-1.5 h-3.5 w-3.5 text-blue-400" />
                Accreditation Export
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Compact Metric Ribbon */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-4 rounded-[6px] bg-[#080E1A] border border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                {stat.title}
              </span>
              <div className="p-1 rounded-[3px] bg-slate-850">{stat.icon}</div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl font-bold text-[#F8FAFC] tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#64748B] mt-0.5">{stat.subtext}</p>
              </div>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Department Summary Matrix (Compact & High-Density) */}
      <div className="rounded-[6px] bg-[#080E1A] border border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-3 bg-blue-500 rounded-[1px]" />
            <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F8FAFC]">
              Academic Departments Performance Matrix
            </h2>
          </div>
          <span className="text-xs font-mono text-blue-400">
            4 Registered Faculties
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-[#060A14] font-mono text-[10px] uppercase text-[#64748B] tracking-wider">
                <th className="px-4 py-3">Academic Department</th>
                <th className="px-4 py-3">Department Head</th>
                <th className="px-4 py-3">Faculty / Students</th>
                <th className="px-4 py-3">Proficiency Index</th>
                <th className="px-4 py-3">Assessments</th>
                <th className="px-4 py-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-xs">
              {departments.map((dept) => (
                <tr key={dept.code} className="hover:bg-slate-900/40 transition-colors">
                  <td className="px-4 py-3.5">
                    <span className="font-semibold text-[#F8FAFC] block">{dept.name}</span>
                    <span className="font-mono text-[10px] text-blue-400">{dept.code}</span>
                  </td>
                  <td className="px-4 py-3.5 text-[#94A3B8] font-medium">
                    {dept.head}
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#94A3B8]">
                    {dept.facultyCount} Faculty &bull; {dept.studentLoad} Enrolled
                  </td>
                  <td className="px-4 py-3.5 font-mono">
                    <span className="font-bold text-emerald-400">{dept.proficiency}</span>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-[#64748B]">
                    {dept.quizzesRun} completed
                  </td>
                  <td className="px-4 py-3.5 text-right font-mono">
                    <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {dept.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Campus Compliance & Administrative Governance */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-[6px] bg-[#080E1A] border border-slate-800 p-5 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <ShieldCheck className="h-4 w-4 text-blue-400" />
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F8FAFC]">
              Campus Compliance & Regulatory Standards
            </h3>
          </div>

          <div className="space-y-3">
            {campusCompliance.map((comp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[4px] bg-[#0D1424] border border-slate-800 flex items-center justify-between text-xs"
              >
                <div>
                  <h4 className="font-semibold text-[#F8FAFC]">{comp.label}</h4>
                  <p className="font-mono text-[10px] text-[#64748B] mt-0.5">{comp.date}</p>
                </div>
                <span className="font-mono text-[10px] font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20">
                  {comp.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Quick Administrative Portals */}
        <div className="rounded-[6px] bg-[#080E1A] border border-slate-800 p-5 space-y-3">
          <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[#F8FAFC] pb-2 border-b border-slate-800">
            Directorate Toolkit
          </h3>

          <div className="space-y-2">
            <Link
              href="/school/analytics"
              className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#0D1424] hover:bg-slate-800 text-xs text-[#94A3B8] hover:text-white transition-colors"
            >
              <span>Longitudinal Analytics</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-blue-400" />
            </Link>
            <Link
              href="/school/settings"
              className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#0D1424] hover:bg-slate-800 text-xs text-[#94A3B8] hover:text-white transition-colors"
            >
              <span>SSO & Campus Domains</span>
              <Settings className="h-3.5 w-3.5 text-blue-400" />
            </Link>
            <Link
              href="/school/reports"
              className="flex items-center justify-between p-2.5 rounded-[4px] bg-[#0D1424] hover:bg-slate-800 text-xs text-[#94A3B8] hover:text-white transition-colors"
            >
              <span>Board Examination Exports</span>
              <FileText className="h-3.5 w-3.5 text-blue-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

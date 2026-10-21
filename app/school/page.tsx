"use client";

import Link from "next/link";
import {
  Users,
  GraduationCap,
  School,
  FileText,
  BarChart3,
  Shield,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Calendar,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SchoolPage() {
  const stats = [
    {
      title: "Total Enrolled",
      value: "840",
      subtext: "Across 24 active sections",
      change: "+4% this term",
      isPositive: true,
      icon: <GraduationCap className="h-4 w-4 text-[#65F59A]" />,
    },
    {
      title: "Active Faculty",
      value: "32",
      subtext: "6 academic departments",
      change: "100% active",
      isPositive: true,
      icon: <Users className="h-4 w-4 text-[#38D9B0]" />,
    },
    {
      title: "Operational Classes",
      value: "24",
      subtext: "Grades 9 through 12",
      change: "+2 new labs",
      isPositive: true,
      icon: <School className="h-4 w-4 text-[#65F59A]" />,
    },
    {
      title: "Assessments Completed",
      value: "1,890",
      subtext: "14m 20s avg duration",
      change: "+120 today",
      isPositive: true,
      icon: <FileText className="h-4 w-4 text-[#38D9B0]" />,
    },
  ];

  const departments = [
    {
      name: "Science & Technology",
      faculty: 12,
      students: 320,
      proficiency: 84.6,
      color: "from-[#65F59A] to-[#38D9B0]",
    },
    {
      name: "Mathematics & Analytics",
      faculty: 8,
      students: 290,
      proficiency: 81.2,
      color: "from-[#38D9B0] to-blue-500",
    },
    {
      name: "Humanities & Social Sciences",
      faculty: 6,
      students: 180,
      proficiency: 88.4,
      color: "from-emerald-400 to-[#65F59A]",
    },
    {
      name: "Language & Literature",
      faculty: 6,
      students: 240,
      proficiency: 86.0,
      color: "from-teal-400 to-[#38D9B0]",
    },
  ];

  const quickActions = [
    {
      title: "Faculty & Student Directories",
      description: "Manage institutional rosters, invite new teachers, and configure role authorizations.",
      href: "/school/settings",
      icon: <Users className="h-4 w-4" />,
      actionLabel: "Manage Directory",
    },
    {
      title: "Academic Reports & Diagnostics",
      description: "Inspect campus-wide grade averages, subject proficiencies, and export compliance audits.",
      href: "/school/reports",
      icon: <BarChart3 className="h-4 w-4 text-[#65F59A]" />,
      actionLabel: "Open Reports",
    },
    {
      title: "Examination Authority Hub",
      description: "Administer high-stakes institutional examinations with strict proctoring verification.",
      href: "/dashboard/examination",
      icon: <Shield className="h-4 w-4" />,
      actionLabel: "Exam Platform",
    },
    {
      title: "LMS & SIS Integration",
      description: "Synchronize student rosters and gradebook outcomes directly with Google Classroom & Canvas.",
      href: "/dashboard/lms",
      icon: <Layers className="h-4 w-4" />,
      actionLabel: "LMS Hub",
    },
  ];

  const activities = [
    {
      id: "1",
      title: "Faculty credential added",
      description: "Dr. Elena Rostova assigned to Department of Science & Technology.",
      time: "45 mins ago",
    },
    {
      id: "2",
      title: "Term II Exam schedule published",
      description: "Broadcasted to all 32 teachers and 840 student accounts.",
      time: "Yesterday",
    },
    {
      id: "3",
      title: "Canvas LMS roster sync finished",
      description: "Updated 840 student enrollment IDs with zero synchronization conflicts.",
      time: "2 days ago",
    },
    {
      id: "4",
      title: "Platform compliance audit passed",
      description: "Annual security and student privacy verification certificate renewed.",
      time: "3 days ago",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(56,217,176,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(56,217,176,0.1)] border border-[rgba(56,217,176,0.25)] text-[#38D9B0] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38D9B0] animate-pulse" />
                Campus Administration
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">Enterprise Tier</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Institutional Operations Hub
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Supervise campus faculty rosters, cross-departmental curriculum progress, licensing quotas, and term gradebook performance across all academic cohorts.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/school/reports">
              <Button className="h-10 px-5 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,154,0.25)]">
                <BarChart3 className="mr-2 h-3.5 w-3.5" />
                Campus Reports
              </Button>
            </Link>
            <Link href="/school/settings">
              <Button
                variant="outline"
                className="h-10 px-5 rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#F2F7F3] hover:border-[#65F59A]/50 hover:text-[#65F59A] font-mono text-xs uppercase font-bold tracking-wider"
              >
                Directories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Precision Telemetry HUD */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="p-4 rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(160,190,170,0.28)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(160,190,170,0.1)]">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
                {stat.title}
              </span>
              <div className="p-1 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
                {stat.icon}
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F7F3] tabular-nums tracking-tight">
                  {stat.value}
                </p>
                <p className="text-[11px] text-[#A0AEA5] mt-0.5 font-sans">{stat.subtext}</p>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.25)]">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Workspace Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Departmental Radar & Operations */}
        <div className="lg:col-span-2 space-y-6">
          {/* Departmental Proficiency */}
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#65F59A] rounded-[1px] shadow-[0_0_6px_#65F59A]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Departmental Proficiency & Faculty Distribution
                </h2>
              </div>
              <span className="font-mono text-[11px] text-[#69786F]">Term II Benchmark</span>
            </div>

            <div className="space-y-4">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className="p-3.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] hover:border-[rgba(160,190,170,0.22)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F2F7F3]">{dept.name}</h4>
                      <p className="text-[11px] text-[#A0AEA5] mt-0.5">
                        {dept.faculty} Faculty • {dept.students} Active Scholars
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#F2F7F3] tabular-nums">
                        {dept.proficiency}%
                      </span>
                      <span className="px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.2)]">
                        Proficient
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#17251E] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${dept.color}`}
                      style={{ width: `${dept.proficiency}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Matrix */}
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[rgba(160,190,170,0.12)]">
              <div className="w-1.5 h-3 bg-[#38D9B0] rounded-[1px] shadow-[0_0_6px_#38D9B0]" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                Campus Administrative Operations
              </h2>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <Link
                  key={action.title}
                  href={action.href}
                  className="group block p-4 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)] hover:border-[#65F59A]/50 hover:bg-[#17251E] transition-all relative"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-[#65F59A]">
                      {action.icon}
                      <h4 className="font-display text-sm font-bold text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors">
                        {action.title}
                      </h4>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#69786F] group-hover:text-[#65F59A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <p className="mt-2 text-xs text-[#A0AEA5] leading-relaxed line-clamp-2">
                    {action.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-[#65F59A] tracking-wider">
                    <span>{action.actionLabel}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Real-time Campus Audit Stream */}
        <div className="space-y-6">
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#65F59A]" />
                <h3 className="font-display text-xs uppercase font-bold tracking-wider text-[#F2F7F3]">
                  Campus Audit Log
                </h3>
              </div>
              <span className="font-mono text-[10px] text-[#65F59A] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-ping" />
                Live
              </span>
            </div>

            <div className="divide-y divide-[rgba(160,190,170,0.08)]">
              {activities.map((act) => (
                <div key={act.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-[#F2F7F3] leading-snug">{act.title}</p>
                    <span className="font-mono text-[10px] text-[#69786F] shrink-0">{act.time}</span>
                  </div>
                  <p className="text-[11px] text-[#A0AEA5] leading-relaxed">{act.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Compliance Card */}
          <div className="p-4 rounded-[6px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#65F59A]" />
              <h4 className="font-display text-xs uppercase font-bold text-[#F2F7F3]">
                FERPA & GDPR Compliance Status
              </h4>
            </div>
            <p className="text-xs text-[#A0AEA5] leading-relaxed">
              All student assessment data is encrypted at rest with zero unauthorized access events recorded over the last 90 days.
            </p>
            <div className="pt-2 border-t border-[rgba(160,190,170,0.1)] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#65F59A]">STATUS: VERIFIED</span>
              <span className="font-mono text-[10px] text-[#69786F]">VALID THROUGH 2027</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
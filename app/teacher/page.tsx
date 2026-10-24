"use client";

import Link from "next/link";
import {
  Award,
  BookOpen,
  Clock,
  Users,
  School,
  Megaphone,
  Calendar,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeacherPage() {
  const stats = [
    {
      title: "Enrolled Scholars",
      value: "128",
      subtext: "Across 4 active sections",
      change: "+6 new",
      isPositive: true,
      icon: <Users className="h-4 w-4 text-[#65F59A]" />,
    },
    {
      title: "Quizzes Created",
      value: "14",
      subtext: "2 active, 3 drafted",
      change: "+2 this week",
      isPositive: true,
      icon: <BookOpen className="h-4 w-4 text-[#38D9B0]" />,
    },
    {
      title: "Pending Review",
      value: "8",
      subtext: "Needs manual evaluation",
      change: "Action required",
      isPositive: false,
      icon: <Clock className="h-4 w-4 text-[#FBBF24]" />,
    },
    {
      title: "Cohort Mastery",
      value: "82.4%",
      subtext: "Class median score",
      change: "+3.2% gain",
      isPositive: true,
      icon: <Award className="h-4 w-4 text-[#65F59A]" />,
    },
  ];

  const cohorts = [
    {
      name: "AP Chemistry — Section 12-A",
      students: 34,
      mastery: 86,
      status: "Excelling",
      recentTopic: "Thermodynamics & Reaction Kinetics",
      color: "from-[#65F59A] to-[#38D9B0]",
    },
    {
      name: "Advanced Physics — Section 12-B",
      students: 28,
      mastery: 79,
      status: "Review Required",
      recentTopic: "Electromagnetism & Wave Mechanics",
      color: "from-[#38D9B0] to-blue-500",
    },
    {
      name: "Foundations of STEM — Section 10-A",
      students: 36,
      mastery: 91,
      status: "Mastered",
      recentTopic: "Stoichiometry & Atomic Orbitals",
      color: "from-[#65F59A] to-emerald-400",
    },
    {
      name: "Organic Chemistry Lab — Section 11-A",
      students: 30,
      mastery: 83,
      status: "On Track",
      recentTopic: "Alkanes & Functional Groups",
      color: "from-teal-400 to-[#38D9B0]",
    },
  ];

  const quickActions = [
    {
      title: "Classrooms & Rosters",
      description: "Manage Grade 12-A & 11-B classrooms, student rosters, and co-instructors.",
      href: "/dashboard/classes",
      icon: <School className="h-4 w-4" />,
      actionLabel: "Manage Classes",
    },
    {
      title: "Omni-Curriculum AI Studio",
      description: "Synthesize high-rigor multi-format assessments from syllabus notes or PDFs in seconds.",
      href: "/dashboard/quizzes/create",
      icon: <Sparkles className="h-4 w-4 text-[#65F59A]" />,
      actionLabel: "Launch Studio",
    },
    {
      title: "Assign Assessment",
      description: "Publish quizzes with strict deadlines, attempt rules, and proctoring safeguards.",
      href: "/dashboard/assignments",
      icon: <Layers className="h-4 w-4" />,
      actionLabel: "Assign Quiz",
    },
    {
      title: "Announcements Publisher",
      description: "Broadcast targeted instructions, exam schedules, and curriculum updates.",
      href: "/dashboard/announcements",
      icon: <Megaphone className="h-4 w-4" />,
      actionLabel: "Post Notice",
    },
    {
      title: "Academic Calendar",
      description: "Track scheduled quiz dates, assignment milestones, and live tournaments.",
      href: "/dashboard/calendar",
      icon: <Calendar className="h-4 w-4" />,
      actionLabel: "Open Schedule",
    },
    {
      title: "Gradebook & Diagnostics",
      description: "Inspect cohort score distributions, pass rates, and individualized report cards.",
      href: "/teacher/reports",
      icon: <BarChart3 className="h-4 w-4" />,
      actionLabel: "View Diagnostics",
    },
  ];

  const activities = [
    {
      id: "1",
      title: "12 submissions for AP Chemistry Midterm",
      description: "Automatic scoring processed 10 MCQs; 2 subjective questions flagged for review.",
      time: "14 mins ago",
      type: "submission",
    },
    {
      id: "2",
      title: "New quiz published: Organic Chemistry Basics",
      description: "Quiz generated from notes with 25 questions across 4 formats.",
      time: "2 hours ago",
      type: "draft",
    },
    {
      id: "3",
      title: "Exam notice broadcasted to Grade 12-A",
      description: "Live arena competition scheduled for Thursday at 09:00 UTC.",
      time: "Yesterday",
      type: "notice",
    },
    {
      id: "4",
      title: "Gradebook sync completed",
      description: "Synced 128 student records to the school academic record ledger.",
      time: "2 days ago",
      type: "sync",
    },
  ];

  return (
    <div className="space-y-6">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(101,245,154,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.1)] border border-[rgba(101,245,154,0.25)] text-[#65F59A] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
                Faculty Mentor Console
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">v2.6 OS</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Faculty &amp; Cohort Command Console
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Oversee academic classrooms, host synchronized battle arenas, track cohort cognitive trajectories, and synthesize assessments with QuizDorm Intelligence.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link href="/dashboard/quizzes/create">
              <Button className="h-10 px-5 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(101,245,154,0.25)]">
                <Sparkles className="mr-2 h-3.5 w-3.5" />
                Synthesize Assessment
              </Button>
            </Link>
            <Link href="/dashboard/competitions">
              <Button
                variant="outline"
                className="h-10 px-5 rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#F2F7F3] hover:border-[#65F59A]/50 hover:text-[#65F59A] font-mono text-xs uppercase font-bold tracking-wider"
              >
                Launch Arena
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Precision Brain Stats HUD */}
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
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold ${
                  stat.isPositive
                    ? "bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.25)]"
                    : "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]"
                }`}
              >
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Workspace Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Cohorts & Operations Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* Cohort Mastery Radar */}
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-3 bg-[#65F59A] rounded-[1px] shadow-[0_0_6px_#65F59A]" />
                <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                  Classroom Squads & Topic Mastery
                </h2>
              </div>
              <Link
                href="/dashboard/classes"
                className="font-mono text-[11px] text-[#65F59A] hover:underline flex items-center gap-1"
              >
                Roster Details <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-4">
              {cohorts.map((cohort) => (
                <div
                  key={cohort.name}
                  className="p-3.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] hover:border-[rgba(160,190,170,0.22)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm font-semibold text-[#F2F7F3]">{cohort.name}</h4>
                      <p className="text-[11px] text-[#A0AEA5] mt-0.5">
                        {cohort.students} Scholars • Topic: <span className="text-[#F2F7F3]">{cohort.recentTopic}</span>
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[#F2F7F3] tabular-nums">
                        {cohort.mastery}%
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                          cohort.mastery >= 85
                            ? "bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.2)]"
                            : cohort.mastery >= 80
                            ? "bg-[rgba(56,217,176,0.1)] text-[#38D9B0] border border-[rgba(56,217,176,0.2)]"
                            : "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.2)]"
                        }`}
                      >
                        {cohort.status}
                      </span>
                    </div>
                  </div>
                  {/* Progress Track */}
                  <div className="w-full h-1.5 rounded-full bg-[#17251E] overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${cohort.color}`}
                      style={{ width: `${cohort.mastery}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Action Matrix */}
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[rgba(160,190,170,0.12)]">
              <div className="w-1.5 h-3 bg-[#38D9B0] rounded-[1px] shadow-[0_0_6px_#38D9B0]" />
              <h2 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3]">
                Teacher Tools & Actions
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

        {/* Right Column: Real-time Telemetry Stream */}
        <div className="space-y-6">
          <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-5">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-[rgba(160,190,170,0.12)]">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-[#65F59A]" />
                <h3 className="font-display text-xs uppercase font-bold tracking-wider text-[#F2F7F3]">
                  Live Class Activity
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

          {/* Quick Grading Action Alert */}
          <div className="p-4 rounded-[6px] bg-[rgba(251,191,36,0.06)] border border-[rgba(251,191,36,0.25)] flex items-start gap-3">
            <AlertCircle className="h-4 w-4 text-[#FBBF24] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <p className="font-semibold text-[#F2F7F3]">8 Pending Subjective Evaluations</p>
              <p className="text-[#A0AEA5]">
                Submissions from Chemistry Midterm are pending teacher sign-off to finalize gradebook averages.
              </p>
              <Link
                href="/dashboard/assignments"
                className="inline-block mt-1 font-mono text-[10px] text-[#FBBF24] hover:underline font-bold uppercase tracking-wider"
              >
                Open Review Queue →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
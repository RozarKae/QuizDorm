"use client";

import { AdaptiveLearningPaths } from "@/components/lms/AdaptiveLearningPaths";
import { AssessmentsPracticeHub } from "@/components/lms/AssessmentsPracticeHub";
import { CourseManagementHub } from "@/components/lms/CourseManagementHub";
import { EnterpriseLMSConsole } from "@/components/lms/EnterpriseLMSConsole";
import { InstructorWorkspaceConsole } from "@/components/lms/InstructorWorkspaceConsole";
import { LessonStudioPlayer } from "@/components/lms/LessonStudioPlayer";
import { LMSAnalyticsDashboard } from "@/components/lms/LMSAnalyticsDashboard";
import { LMSCommunityHub } from "@/components/lms/LMSCommunityHub";
import { LMSContentLibrary } from "@/components/lms/LMSContentLibrary";
import { StudentLearningDashboard } from "@/components/lms/StudentLearningDashboard";
import React,{ useState } from "react";

import {
BarChart3,
BookOpen,
Building2,
FileCode,
Folder,
GraduationCap,
Target,
Users,
Video
} from "lucide-react";

export type LMSModuleTab =
  | "courses"
  | "lessons"
  | "content-library"
  | "learning-paths"
  | "assessments"
  | "student-dashboard"
  | "instructor-workspace"
  | "community"
  | "analytics"
  | "enterprise";

export default function LearningManagementSuitePage() {
  const [activeTab, setActiveTab] = useState<LMSModuleTab>("courses");

  const tabs: { id: LMSModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "lessons", label: "Lesson Studio", icon: Video },
    { id: "content-library", label: "Content Vault", icon: Folder },
    { id: "learning-paths", label: "Adaptive Paths", icon: Target, badge: "AI" },
    { id: "assessments", label: "Labs & Practice", icon: FileCode },
    { id: "student-dashboard", label: "Student Hub", icon: GraduationCap },
    { id: "instructor-workspace", label: "Instructor HQ", icon: Users },
    { id: "community", label: "Community", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "enterprise", label: "Enterprise LMS", icon: Building2 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                Curriculum Matrix // LMS Engine
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">v4.3 Suite</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Learning Management Suite (LMS)
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Complete digital learning ecosystem with multi-level courses, rich lessons, adaptive skill paths, interactive laboratories, student learning dashboards, and enterprise LMS interoperability.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 shrink-0 font-mono">
            <div className="p-2.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Active Courses</div>
              <div className="text-sm font-bold text-[#FF4D6D]">42 Published</div>
            </div>
            <div className="p-2.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Enrolled</div>
              <div className="text-sm font-bold text-[#F2F7F3]">3,240 Scholars</div>
            </div>
            <div className="p-2.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Curriculum</div>
              <div className="text-sm font-bold text-[#FF758F]">148 Hours</div>
            </div>
            <div className="p-2.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Completion</div>
              <div className="text-sm font-bold text-[#FF4D6D]">92.4% Avg</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Future OS Module Navigation Tabs */}
      <div className="bg-[#140C0E] p-1.5 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] flex items-center gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-[4px] text-xs font-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] shadow-[0_0_12px_rgba(255, 77, 109,0.15)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1D1013]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-bold px-1 py-0.2 rounded-[2px] ${
                    isActive
                      ? "bg-[#FF4D6D] text-[#0B0708]"
                      : "bg-[#1D1013] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "courses" && <CourseManagementHub />}
        {activeTab === "lessons" && <LessonStudioPlayer />}
        {activeTab === "content-library" && <LMSContentLibrary />}
        {activeTab === "learning-paths" && <AdaptiveLearningPaths />}
        {activeTab === "assessments" && <AssessmentsPracticeHub />}
        {activeTab === "student-dashboard" && <StudentLearningDashboard />}
        {activeTab === "instructor-workspace" && <InstructorWorkspaceConsole />}
        {activeTab === "community" && <LMSCommunityHub />}
        {activeTab === "analytics" && <LMSAnalyticsDashboard />}
        {activeTab === "enterprise" && <EnterpriseLMSConsole />}
      </div>
    </div>
  );
}
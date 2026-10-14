"use client";

import React, { useState } from "react";
import { CourseManagementHub } from "@/components/lms/CourseManagementHub";
import { LessonStudioPlayer } from "@/components/lms/LessonStudioPlayer";
import { LMSContentLibrary } from "@/components/lms/LMSContentLibrary";
import { AdaptiveLearningPaths } from "@/components/lms/AdaptiveLearningPaths";
import { AssessmentsPracticeHub } from "@/components/lms/AssessmentsPracticeHub";
import { StudentLearningDashboard } from "@/components/lms/StudentLearningDashboard";
import { InstructorWorkspaceConsole } from "@/components/lms/InstructorWorkspaceConsole";
import { LMSCommunityHub } from "@/components/lms/LMSCommunityHub";
import { LMSAnalyticsDashboard } from "@/components/lms/LMSAnalyticsDashboard";
import { EnterpriseLMSConsole } from "@/components/lms/EnterpriseLMSConsole";

import { 
  BookOpen, Video, Folder, Target, FileCode, GraduationCap, 
  Users, BarChart3, Building2, Sparkles
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
    { id: "courses", label: "Course Management", icon: BookOpen },
    { id: "lessons", label: "Lesson Player Studio", icon: Video },
    { id: "content-library", label: "Content Vault", icon: Folder },
    { id: "learning-paths", label: "Adaptive Paths", icon: Target, badge: "AI" },
    { id: "assessments", label: "Practice & Labs", icon: FileCode },
    { id: "student-dashboard", label: "Student Learning Hub", icon: GraduationCap },
    { id: "instructor-workspace", label: "Instructor Workspace", icon: Users },
    { id: "community", label: "Community & Groups", icon: Users },
    { id: "analytics", label: "Learning Analytics", icon: BarChart3 },
    { id: "enterprise", label: "Enterprise LMS", icon: Building2 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Learning Management Suite (LMS) <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 ml-2">PHASE 4.3</span>
              </h1>
              <p className="text-xs text-slate-500">
                Complete digital learning ecosystem with multi-level courses, rich lessons, adaptive skill paths, coding sandboxes, student dashboards, instructor tools, and enterprise LMS administration.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-indigo-500 text-white">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
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

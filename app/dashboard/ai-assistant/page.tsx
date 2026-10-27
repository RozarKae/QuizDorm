"use client";

import { AIAssessmentAssistantConsole } from "@/components/ai-assistant/AIAssessmentAssistantConsole";
import { AIClassroomCopilot } from "@/components/ai-assistant/AIClassroomCopilot";
import { AICommunicationAssistant } from "@/components/ai-assistant/AICommunicationAssistant";
import { AIContentGeneratorStudio } from "@/components/ai-assistant/AIContentGeneratorStudio";
import { AILessonPlannerHub } from "@/components/ai-assistant/AILessonPlannerHub";
import { AIResourceRecommendationEngine } from "@/components/ai-assistant/AIResourceRecommendationEngine";
import { AIStudentSupportHub } from "@/components/ai-assistant/AIStudentSupportHub";
import { AITeacherWorkspaceDashboard } from "@/components/ai-assistant/AITeacherWorkspaceDashboard";
import { AITeachingAnalyticsConsole } from "@/components/ai-assistant/AITeachingAnalyticsConsole";
import { AutonomousAIAgentsConsole } from "@/components/ai-assistant/AutonomousAIAgentsConsole";
import React,{ useState } from "react";

import {
BarChart3,BookOpen,
Bot,
Calendar,
FileCheck,
FileText,
Mail,
Sparkles,
UserCheck,
Zap
} from "lucide-react";

export type AIAssistantModuleTab = 
  | "lesson-planner" 
  | "content-generator" 
  | "assessment-assistant" 
  | "classroom-copilot" 
  | "student-support" 
  | "communication" 
  | "analytics" 
  | "resources" 
  | "teacher-workspace" 
  | "autonomous-agents";

export default function AITeachingAssistantPlatformPage() {
  const [activeTab, setActiveTab] = useState<AIAssistantModuleTab>("lesson-planner");

  const tabs: { id: AIAssistantModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "lesson-planner", label: "AI Lesson Planner", icon: Sparkles, badge: "AI" },
    { id: "content-generator", label: "Content Generator", icon: FileText },
    { id: "assessment-assistant", label: "Assessment Assistant", icon: FileCheck },
    { id: "classroom-copilot", label: "Classroom Copilot", icon: Zap, badge: "LIVE" },
    { id: "student-support", label: "Student Remediation", icon: UserCheck },
    { id: "communication", label: "Stakeholder Comms", icon: Mail },
    { id: "analytics", label: "Instructional Analytics", icon: BarChart3 },
    { id: "resources", label: "Resource Recommender", icon: BookOpen },
    { id: "teacher-workspace", label: "Teacher Workspace", icon: Calendar },
    { id: "autonomous-agents", label: "Autonomous Agents", icon: Bot, badge: "AGENT" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                AI Teaching Assistant Platform <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 ml-2">PHASE 4.4</span>
              </h1>
              <p className="text-xs text-slate-500">
                Intelligent teaching copilot automating lesson planning, study material synthesis, quiz generation, real-time in-class copilot prompts, parent drafts, gap analytics, and autonomous AI agents.
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
                <span
                  className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-full ${
                    tab.badge === "LIVE"
                      ? "bg-rose-500 text-white animate-pulse"
                      : tab.badge === "AGENT"
                      ? "bg-amber-500 text-black"
                      : "bg-indigo-500 text-white"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "lesson-planner" && <AILessonPlannerHub />}
        {activeTab === "content-generator" && <AIContentGeneratorStudio />}
        {activeTab === "assessment-assistant" && <AIAssessmentAssistantConsole />}
        {activeTab === "classroom-copilot" && <AIClassroomCopilot />}
        {activeTab === "student-support" && <AIStudentSupportHub />}
        {activeTab === "communication" && <AICommunicationAssistant />}
        {activeTab === "analytics" && <AITeachingAnalyticsConsole />}
        {activeTab === "resources" && <AIResourceRecommendationEngine />}
        {activeTab === "teacher-workspace" && <AITeacherWorkspaceDashboard />}
        {activeTab === "autonomous-agents" && <AutonomousAIAgentsConsole />}
      </div>
    </div>
  );
}

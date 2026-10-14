"use client";

import React, { useState } from "react";
import { ResearchWorkspaceHub } from "@/components/research-studio/ResearchWorkspaceHub";
import { CurriculumDesignerStudio } from "@/components/research-studio/CurriculumDesignerStudio";
import { ContentAuthoringStudio } from "@/components/research-studio/ContentAuthoringStudio";
import { AIContentCreationEngine } from "@/components/research-studio/AIContentCreationEngine";
import { DigitalPublishingPlatform } from "@/components/research-studio/DigitalPublishingPlatform";
import { CollaborationWorkspaceConsole } from "@/components/research-studio/CollaborationWorkspaceConsole";
import { VersionControlContentManagement } from "@/components/research-studio/VersionControlContentManagement";
import { DigitalResourceLibraryVault } from "@/components/research-studio/DigitalResourceLibraryVault";
import { ResearchAnalyticsDashboard } from "@/components/research-studio/ResearchAnalyticsDashboard";
import { AcademicPublishingEcosystem } from "@/components/research-studio/AcademicPublishingEcosystem";

import { 
  BookOpen, Layers, Edit3, Sparkles, Globe, Users, 
  GitBranch, Folder, BarChart3, ShieldCheck
} from "lucide-react";

export type ResearchStudioModuleTab = 
  | "research-workspace" 
  | "curriculum-designer" 
  | "authoring-studio" 
  | "ai-content-creation" 
  | "digital-publishing" 
  | "collaboration" 
  | "version-control" 
  | "resource-library" 
  | "research-analytics" 
  | "publishing-ecosystem";

export default function ResearchStudioPage() {
  const [activeTab, setActiveTab] = useState<ResearchStudioModuleTab>("research-workspace");

  const tabs: { id: ResearchStudioModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "research-workspace", label: "Research Projects & BibTeX", icon: BookOpen, badge: "CORE" },
    { id: "curriculum-designer", label: "Curriculum & OBE", icon: Layers },
    { id: "authoring-studio", label: "Authoring Studio & LaTeX", icon: Edit3 },
    { id: "ai-content-creation", label: "AI Content Engine", icon: Sparkles, badge: "AI" },
    { id: "digital-publishing", label: "Digital Publishing & ISBN", icon: Globe },
    { id: "collaboration", label: "Multi-Author Review", icon: Users },
    { id: "version-control", label: "Version Control & Git", icon: GitBranch },
    { id: "resource-library", label: "Resource Vault & Vectors", icon: Folder },
    { id: "research-analytics", label: "Citation & Impact Analytics", icon: BarChart3 },
    { id: "publishing-ecosystem", label: "OER & Peer Review Journals", icon: ShieldCheck, badge: "DOI" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Research & Content Studio <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 ml-2">PHASE 4.6</span>
              </h1>
              <p className="text-xs text-slate-500">
                Enterprise educational research and digital publishing studio featuring BibTeX/IEEE literature workspaces, Bloom's outcome curriculum builders, LaTeX authoring tools, AI content generators, ISBN publishers, Git versioning, and CrossRef DOI peer-reviewed journals.
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
        {activeTab === "research-workspace" && <ResearchWorkspaceHub />}
        {activeTab === "curriculum-designer" && <CurriculumDesignerStudio />}
        {activeTab === "authoring-studio" && <ContentAuthoringStudio />}
        {activeTab === "ai-content-creation" && <AIContentCreationEngine />}
        {activeTab === "digital-publishing" && <DigitalPublishingPlatform />}
        {activeTab === "collaboration" && <CollaborationWorkspaceConsole />}
        {activeTab === "version-control" && <VersionControlContentManagement />}
        {activeTab === "resource-library" && <DigitalResourceLibraryVault />}
        {activeTab === "research-analytics" && <ResearchAnalyticsDashboard />}
        {activeTab === "publishing-ecosystem" && <AcademicPublishingEcosystem />}
      </div>
    </div>
  );
}

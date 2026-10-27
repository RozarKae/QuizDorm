"use client";

import { AccreditationComplianceHub } from "@/components/certifications/AccreditationComplianceHub";
import { AICertificationAssistantHub } from "@/components/certifications/AICertificationAssistantHub";
import { CertificationAnalyticsConsole } from "@/components/certifications/CertificationAnalyticsConsole";
import { CertificationProgramBuilder } from "@/components/certifications/CertificationProgramBuilder";
import { CredentialVerificationPortal } from "@/components/certifications/CredentialVerificationPortal";
import { DigitalCertificateGenerator } from "@/components/certifications/DigitalCertificateGenerator";
import { DigitalCredentialWallet } from "@/components/certifications/DigitalCredentialWallet";
import { EmployerRecruiterPortal } from "@/components/certifications/EmployerRecruiterPortal";
import { GlobalCredentialEcosystem } from "@/components/certifications/GlobalCredentialEcosystem";
import { SkillAssessmentPlatform } from "@/components/certifications/SkillAssessmentPlatform";
import React,{ useState } from "react";

import {
Award,
BarChart3,
Building2,
CheckCircle2,
Cpu,
QrCode,Share2,
ShieldCheck,
Sparkles
} from "lucide-react";

export type CertModuleTab = 
  | "program-builder" 
  | "certificate-generator" 
  | "verification-portal" 
  | "credential-wallet" 
  | "skill-assessment" 
  | "employer-portal" 
  | "accreditation" 
  | "ai-assistant" 
  | "analytics" 
  | "global-ecosystem";

export default function GlobalCertificationsPage() {
  const [activeTab, setActiveTab] = useState<CertModuleTab>("program-builder");

  const tabs: { id: CertModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "program-builder", label: "Program Builder", icon: Award, badge: "CORE" },
    { id: "certificate-generator", label: "Certificate Studio", icon: ShieldCheck },
    { id: "verification-portal", label: "Public Verification", icon: QrCode },
    { id: "credential-wallet", label: "Digital Wallet & Badges", icon: Share2 },
    { id: "skill-assessment", label: "Skill Assessments", icon: Sparkles },
    { id: "employer-portal", label: "Employer Talent Search", icon: Building2 },
    { id: "accreditation", label: "ISO Accreditation", icon: CheckCircle2 },
    { id: "ai-assistant", label: "AI Cert Assistant", icon: Sparkles, badge: "AI" },
    { id: "analytics", label: "Certification Analytics", icon: BarChart3 },
    { id: "global-ecosystem", label: "Blockchain Ecosystem", icon: Cpu, badge: "WEB3" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Global Certification Platform <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 ml-2">PHASE 4.7</span>
              </h1>
              <p className="text-xs text-slate-500">
                Enterprise digital credentialing ecosystem issuing, managing, verifying, and tracking academic, professional, corporate, and government digital certificates backed by Open Badges, employer validation, and blockchain registry.
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
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-slate-950 text-amber-400">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "program-builder" && <CertificationProgramBuilder />}
        {activeTab === "certificate-generator" && <DigitalCertificateGenerator />}
        {activeTab === "verification-portal" && <CredentialVerificationPortal />}
        {activeTab === "credential-wallet" && <DigitalCredentialWallet />}
        {activeTab === "skill-assessment" && <SkillAssessmentPlatform />}
        {activeTab === "employer-portal" && <EmployerRecruiterPortal />}
        {activeTab === "accreditation" && <AccreditationComplianceHub />}
        {activeTab === "ai-assistant" && <AICertificationAssistantHub />}
        {activeTab === "analytics" && <CertificationAnalyticsConsole />}
        {activeTab === "global-ecosystem" && <GlobalCredentialEcosystem />}
      </div>
    </div>
  );
}

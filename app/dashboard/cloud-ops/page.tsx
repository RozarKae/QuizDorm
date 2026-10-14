"use client";

import React, { useState } from "react";
import { MultiTenantCloudConsole } from "@/components/cloud-ops/MultiTenantCloudConsole";
import { GlobalInfrastructureTelemetry } from "@/components/cloud-ops/GlobalInfrastructureTelemetry";
import { DisasterRecoveryControlCenter } from "@/components/cloud-ops/DisasterRecoveryControlCenter";
import { GlobalIdentitySecurityConsole } from "@/components/cloud-ops/GlobalIdentitySecurityConsole";
import { GlobalDataPlatformHub } from "@/components/cloud-ops/GlobalDataPlatformHub";
import { AICloudServicesConsole } from "@/components/cloud-ops/AICloudServicesConsole";
import { GlobalIntegrationsPlatform } from "@/components/cloud-ops/GlobalIntegrationsPlatform";
import { EnterpriseOperationsCenter } from "@/components/cloud-ops/EnterpriseOperationsCenter";
import { ComplianceGovernanceDashboard } from "@/components/cloud-ops/ComplianceGovernanceDashboard";
import { GlobalEducationEcosystem } from "@/components/cloud-ops/GlobalEducationEcosystem";

import { 
  Cloud, Server, ShieldCheck, Lock, Database, Sparkles, 
  Code2, Activity, FileText, Globe
} from "lucide-react";

export type CloudOpsModuleTab = 
  | "multi-tenant" 
  | "infrastructure" 
  | "disaster-recovery" 
  | "identity-security" 
  | "data-platform" 
  | "ai-services" 
  | "api-integrations" 
  | "operations-center" 
  | "compliance" 
  | "global-ecosystem";

export default function GlobalEducationCloudPage() {
  const [activeTab, setActiveTab] = useState<CloudOpsModuleTab>("multi-tenant");

  const tabs: { id: CloudOpsModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "multi-tenant", label: "Multi-Tenant Cloud", icon: Cloud, badge: "CORE" },
    { id: "infrastructure", label: "K8s Telemetry", icon: Server },
    { id: "disaster-recovery", label: "HA & Failover", icon: ShieldCheck },
    { id: "identity-security", label: "Zero-Trust SSO", icon: Lock },
    { id: "data-platform", label: "Data Lake & Vector", icon: Database },
    { id: "ai-services", label: "AI GPU Hosting", icon: Sparkles, badge: "GPU" },
    { id: "api-integrations", label: "API Gateway", icon: Code2 },
    { id: "operations-center", label: "Operations Center", icon: Activity, badge: "EOC" },
    { id: "compliance", label: "GDPR / FERPA Compliance", icon: FileText },
    { id: "global-ecosystem", label: "EduOS Mainnet", icon: Globe, badge: "OS" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-900 via-indigo-700 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Global Education Cloud (EduOS) <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 ml-2">PHASE 4.9</span>
              </h1>
              <p className="text-xs text-slate-500">
                Cloud-native Education Operating System (EduOS) providing hyperscale multi-tenant isolation, multi-region Kubernetes telemetry, zero-trust SAML SSO, AI GPU model hosting, and international compliance.
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
                  ? "bg-indigo-600 text-white shadow-md font-extrabold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-slate-950 text-emerald-400">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "multi-tenant" && <MultiTenantCloudConsole />}
        {activeTab === "infrastructure" && <GlobalInfrastructureTelemetry />}
        {activeTab === "disaster-recovery" && <DisasterRecoveryControlCenter />}
        {activeTab === "identity-security" && <GlobalIdentitySecurityConsole />}
        {activeTab === "data-platform" && <GlobalDataPlatformHub />}
        {activeTab === "ai-services" && <AICloudServicesConsole />}
        {activeTab === "api-integrations" && <GlobalIntegrationsPlatform />}
        {activeTab === "operations-center" && <EnterpriseOperationsCenter />}
        {activeTab === "compliance" && <ComplianceGovernanceDashboard />}
        {activeTab === "global-ecosystem" && <GlobalEducationEcosystem />}
      </div>
    </div>
  );
}

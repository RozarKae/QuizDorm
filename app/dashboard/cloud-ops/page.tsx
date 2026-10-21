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
  Cloud,
  Server,
  ShieldCheck,
  Lock,
  Database,
  Sparkles,
  Code2,
  Activity,
  FileText,
  Globe,
  Radio,
  Cpu,
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
    { id: "compliance", label: "GDPR / FERPA", icon: FileText },
    { id: "global-ecosystem", label: "EduOS Mesh", icon: Globe, badge: "OS" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Futuristic Cinematic Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(101,245,154,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.1)] border border-[rgba(101,245,154,0.25)] text-[#65F59A] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
                Global Cloud Mesh // EduOS Core
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">v4.9 Platform</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Cloud Infrastructure & Ops Center
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Hyperscale multi-tenant isolation, multi-region Kubernetes node telemetry, zero-trust SAML SSO, AI GPU inference pipelines, and international compliance verification.
            </p>
          </div>

          {/* Quick HUD Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 shrink-0 font-mono">
            <div className="p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">K8s Nodes</div>
              <div className="text-sm font-bold text-[#65F59A]">3 / 3 Ready</div>
            </div>
            <div className="p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Active Pods</div>
              <div className="text-sm font-bold text-[#F2F7F3]">450 Pods</div>
            </div>
            <div className="p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Edge Latency</div>
              <div className="text-sm font-bold text-[#38D9B0]">18ms Avg</div>
            </div>
            <div className="p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.12)]">
              <div className="text-[10px] uppercase text-[#69786F]">Cloud Status</div>
              <div className="text-sm font-bold text-[#65F59A]">99.99% Up</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Future OS Module Navigation Tabs */}
      <div className="bg-[#0C1210] p-1.5 rounded-[6px] border border-[rgba(160,190,170,0.14)] flex items-center gap-1 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-2 rounded-[4px] text-xs font-mono uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] shadow-[0_0_12px_rgba(101,245,154,0.15)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#111B17]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`text-[9px] font-bold px-1 py-0.2 rounded-[2px] ${
                    isActive
                      ? "bg-[#65F59A] text-[#070B0A]"
                      : "bg-[#111B17] text-[#65F59A] border border-[rgba(101,245,154,0.25)]"
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
"use client";

import React, { useState } from "react";
import { Tenant } from "@/lib/types/enterprise";
import { TenantManagerCard } from "@/components/enterprise/TenantManagerCard";
import { SecurityOperationsCenterCard } from "@/components/enterprise/SecurityOperationsCenterCard";
import { AuditLogTable } from "@/components/enterprise/AuditLogTable";
import { ProviderHealthMonitorCard } from "@/components/enterprise/ProviderHealthMonitorCard";
import { WhiteLabelDesignerModal } from "@/components/enterprise/WhiteLabelDesignerModal";

import { ShieldCheck, Building, Activity, FileText, Lock, Sparkles, Server } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnterpriseControlCenterPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Futuristic Cinematic Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                Enterprise Security Core // SOC Matrix
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">v2.0 Enterprise OS</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Enterprise Assessment OS Control Center
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Multi-tenant data isolation, white-label configurations, SAML 2.0 / Okta SSO, SOC security operations, live infrastructure health monitoring, and compliance logging.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="px-3 py-1.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] font-mono text-xs text-[#FF4D6D] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF4D6D]" />
              SOC-2 Type II Certified
            </span>
          </div>
        </div>
      </div>

      {/* 2. Live Provider Health Monitor Grid */}
      <ProviderHealthMonitorCard />

      {/* 3. Tenant Directory & Security SOC Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <TenantManagerCard onOpenWhiteLabel={(t) => setSelectedTenant(t)} />
        </div>
        <div className="lg:col-span-6">
          <SecurityOperationsCenterCard />
        </div>
      </div>

      {/* 4. Audit Log Table & FERPA/GDPR Compliance */}
      <AuditLogTable />

      {/* 5. White Label Customizer Modal */}
      <WhiteLabelDesignerModal
        tenant={selectedTenant}
        open={!!selectedTenant}
        onOpenChange={(open) => !open && setSelectedTenant(null)}
      />
    </div>
  );
}
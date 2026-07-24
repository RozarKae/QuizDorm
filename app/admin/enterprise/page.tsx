"use client";

import React, { useState } from "react";
import { Tenant } from "@/lib/types/enterprise";
import { TenantManagerCard } from "@/components/enterprise/TenantManagerCard";
import { SecurityOperationsCenterCard } from "@/components/enterprise/SecurityOperationsCenterCard";
import { AuditLogTable } from "@/components/enterprise/AuditLogTable";
import { ProviderHealthMonitorCard } from "@/components/enterprise/ProviderHealthMonitorCard";
import { WhiteLabelDesignerModal } from "@/components/enterprise/WhiteLabelDesignerModal";

import { ShieldCheck, Building, Activity, FileText, Lock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EnterpriseControlCenterPage() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300">
              <ShieldCheck className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              QuizDorm Version 2.0 Enterprise OS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Enterprise Assessment Operating System Control Center
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Multi-tenant data isolation, white-label configuration, SAML 2.0/Okta SSO, SOC security operations, live infrastructure health monitoring, and compliance logging.
          </p>
        </div>
      </div>

      {/* Live Provider Health Monitor Grid */}
      <ProviderHealthMonitorCard />

      {/* Tenant Directory & Security SOC Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <TenantManagerCard onOpenWhiteLabel={(t) => setSelectedTenant(t)} />
        </div>
        <div className="lg:col-span-6">
          <SecurityOperationsCenterCard />
        </div>
      </div>

      {/* Audit Log Table & FERPA/GDPR Compliance */}
      <AuditLogTable />

      {/* White Label Customizer Modal */}
      <WhiteLabelDesignerModal
        tenant={selectedTenant}
        open={!!selectedTenant}
        onOpenChange={(open) => !open && setSelectedTenant(null)}
      />
    </div>
  );
}

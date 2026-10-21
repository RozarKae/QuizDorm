"use client";

import React, { useState } from "react";
import { CloudTenant } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Globe,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Sparkles,
  Server,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

const mockTenants: CloudTenant[] = [
  {
    tenantId: "t-101",
    institutionName: "Metropolitan Institute of Technology",
    customDomain: "metrotech.quizdorm.edu",
    region: "US-East (N. Virginia)",
    isolatedDatabase: true,
    allocatedCpuCores: 64,
    allocatedRamGB: 256,
    activeUsersCount: 18450,
    status: "Active",
  },
  {
    tenantId: "t-102",
    institutionName: "European Quantum Academy",
    customDomain: "quantum.quizdorm.de",
    region: "EU-Central (Frankfurt)",
    isolatedDatabase: true,
    allocatedCpuCores: 32,
    allocatedRamGB: 128,
    activeUsersCount: 6200,
    status: "Active",
  },
];

export function MultiTenantCloudConsole() {
  const [tenants, setTenants] = useState<CloudTenant[]>(mockTenants);
  const [newInstName, setNewInstName] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const handleOnboardTenant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInstName.trim()) return;
    const newT: CloudTenant = {
      tenantId: `t-${Date.now()}`,
      institutionName: newInstName,
      customDomain: newDomain || `${newInstName.toLowerCase().replace(/\s+/g, "")}.quizdorm.edu`,
      region: "US-East (N. Virginia)",
      isolatedDatabase: true,
      allocatedCpuCores: 16,
      allocatedRamGB: 64,
      activeUsersCount: 1,
      status: "Provisioning",
    };
    setTenants([newT, ...tenants]);
    setNewInstName("");
    setNewDomain("");
    toast.success(`Provisioning Isolated Cloud Cluster for "${newT.institutionName}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(101,245,154,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.1)] text-[#65F59A] text-[10px] font-mono font-bold uppercase tracking-wider border border-[rgba(101,245,154,0.2)]">
              <Building2 className="w-3.5 h-3.5" />
              Multi-Tenant White-Label EduOS Cloud
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F2F7F3]">
              Multi-Tenant Education Cloud Platform
            </h2>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-xl leading-relaxed">
              Provision isolated institutional cloud environments, white-label custom domains, dedicated database instances, and regional CPU/RAM resource quotas.
            </p>
          </div>

          <Button
            onClick={() => toast.info("Opening Enterprise Cloud Provisioner...")}
            className="h-10 px-5 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(101,245,154,0.2)] shrink-0"
          >
            <Server className="w-4 h-4 mr-1.5" />
            Enterprise Provisioning
          </Button>
        </div>
      </div>

      {/* Tenant Onboarding Form Bar */}
      <form
        onSubmit={handleOnboardTenant}
        className="bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.14)] flex flex-col sm:flex-row items-center gap-3 text-xs"
      >
        <Input
          value={newInstName}
          onChange={(e) => setNewInstName(e.target.value)}
          placeholder="Institution Name (e.g. Oxford STEM Academy)"
          className="h-9 rounded-[4px] bg-[#111B17] border-[rgba(160,190,170,0.14)] text-[#F2F7F3] placeholder:text-[#69786F] text-xs font-mono"
          required
        />
        <Input
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          placeholder="Custom Domain (e.g. oxford.quizdorm.edu)"
          className="h-9 rounded-[4px] bg-[#111B17] border-[rgba(160,190,170,0.14)] text-[#F2F7F3] placeholder:text-[#69786F] text-xs font-mono w-full sm:w-72"
        />
        <Button
          type="submit"
          className="h-9 px-4 rounded-[4px] bg-[#65F59A] text-[#070B0A] hover:bg-[#65F59A]/90 font-mono text-xs uppercase font-bold tracking-wider shrink-0"
        >
          <Plus className="w-3.5 h-3.5 mr-1" />
          Onboard Tenant Cluster
        </Button>
      </form>

      {/* Active Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tenants.map((t) => (
          <div
            key={t.tenantId}
            className="bg-[#0C1210] p-5 rounded-[6px] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(160,190,170,0.28)] transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-[11px] font-bold text-[#65F59A] px-2 py-0.5 rounded-[2px] bg-[rgba(101,245,154,0.08)] border border-[rgba(101,245,154,0.2)]">
                    {t.customDomain}
                  </span>
                  <h3 className="font-display font-bold text-[#F2F7F3] text-base mt-2">{t.institutionName}</h3>
                  <p className="text-xs text-[#A0AEA5] mt-0.5 font-mono">Region: {t.region}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-[2px] font-mono font-bold text-[10px] uppercase ${
                    t.status === "Active"
                      ? "bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.2)]"
                      : "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.2)] animate-pulse"
                  }`}
                >
                  {t.status}
                </span>
              </div>

              <div className="p-3 bg-[#111B17] rounded-[4px] border border-[rgba(160,190,170,0.1)] space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-[#69786F]">Allocated Hardware:</span>
                  <span className="font-bold text-[#F2F7F3]">
                    {t.allocatedCpuCores} CPU Cores • {t.allocatedRamGB} GB RAM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#69786F]">Database Isolation:</span>
                  <span className="text-[#65F59A] font-bold">Dedicated Supabase Cluster</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[rgba(160,190,170,0.1)] text-xs font-mono">
              <span className="text-[#A0AEA5]">{t.activeUsersCount.toLocaleString()} Active Learners</span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#F2F7F3] hover:border-[#65F59A]/50 hover:text-[#65F59A] text-xs font-mono uppercase tracking-wider"
              >
                Manage Quotas
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
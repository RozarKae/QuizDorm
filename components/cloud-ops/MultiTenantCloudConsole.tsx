"use client";

import React, { useState } from "react";
import { CloudTenant } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, Globe, Cpu, ShieldCheck, CheckCircle2, Plus, Sparkles, Server
} from "lucide-react";
import { toast } from "sonner";

const mockTenants: CloudTenant[] = [
  { tenantId: "t-101", institutionName: "Metropolitan Institute of Technology", customDomain: "metrotech.quizdorm.edu", region: "US-East (N. Virginia)", isolatedDatabase: true, allocatedCpuCores: 64, allocatedRamGB: 256, activeUsersCount: 18450, status: "Active" },
  { tenantId: "t-102", institutionName: "European Quantum Academy", customDomain: "quantum.quizdorm.de", region: "EU-Central (Frankfurt)", isolatedDatabase: true, allocatedCpuCores: 32, allocatedRamGB: 128, activeUsersCount: 6200, status: "Active" },
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
    toast.success(`Provisioning Isolated Multi-Tenant Cloud Cluster for "${newT.institutionName}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Multi-Tenant White-Label EduOS Cloud
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Multi-Tenant Education Cloud Platform</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Provision isolated institutional cloud environments, white-label custom domains, dedicated database instances, and regional CPU/RAM resource quotas.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Enterprise Cloud Provisioner...")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Server className="w-4 h-4 mr-1.5" /> Enterprise Cloud Provisioning
        </Button>
      </div>

      {/* Tenant Onboarding Form Bar */}
      <form onSubmit={handleOnboardTenant} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center gap-3 text-xs">
        <Input
          value={newInstName}
          onChange={(e) => setNewInstName(e.target.value)}
          placeholder="Institution Name (e.g. Oxford STEM Academy)"
          className="rounded-xl bg-slate-50 dark:bg-slate-800"
          required
        />
        <Input
          value={newDomain}
          onChange={(e) => setNewDomain(e.target.value)}
          placeholder="Custom Domain (e.g. oxford.quizdorm.edu)"
          className="rounded-xl bg-slate-50 dark:bg-slate-800 w-full sm:w-64"
        />
        <Button type="submit" className="bg-indigo-600 text-white font-bold text-xs rounded-xl shrink-0">
          <Plus className="w-4 h-4 mr-1" /> Onboard Tenant Cluster
        </Button>
      </form>

      {/* Active Tenants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tenants.map((t) => (
          <div key={t.tenantId} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {t.customDomain}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{t.institutionName}</h3>
                  <p className="text-xs text-slate-500">Region: {t.region}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${t.status === "Active" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600 animate-pulse"}`}>
                  {t.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Allocated Hardware:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{t.allocatedCpuCores} CPU Cores • {t.allocatedRamGB} GB RAM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Database Isolation:</span>
                  <span className="text-emerald-500 font-bold">Isolated Supabase Instance</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-400">{t.activeUsersCount.toLocaleString()} Active Learners</span>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                Manage Quotas
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

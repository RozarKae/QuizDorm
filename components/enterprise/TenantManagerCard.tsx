"use client";

import React, { useState } from "react";
import { Tenant } from "@/lib/types/enterprise";
import { TenantManager } from "@/lib/enterprise/tenantManager";
import { Building, ShieldCheck, Globe, Users, Sliders, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TenantManagerCardProps {
  onOpenWhiteLabel?: (tenant: Tenant) => void;
}

export function TenantManagerCard({ onOpenWhiteLabel }: TenantManagerCardProps) {
  const [tenants, setTenants] = useState<Tenant[]>(TenantManager.getTenants());

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Building className="w-5 h-5 text-indigo-600 mr-2" /> Enterprise Multi-Tenant Directory
          </h3>
          <p className="text-xs text-gray-500">
            Isolated tenant databases, dedicated domain routing, and regional cloud residency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {tenants.map((t) => (
          <div key={t.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{t.name}</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                {t.status}
              </span>
            </div>

            <div className="space-y-1 font-mono text-[11px] text-gray-500">
              <div>Domain: <span className="font-bold text-indigo-600 dark:text-indigo-400">{t.domain}</span></div>
              <div>Isolation: <span className="font-bold text-gray-900 dark:text-white uppercase">{t.isolationMode}</span></div>
              <div>Region: <span className="font-bold text-gray-900 dark:text-white uppercase">{t.region}</span></div>
              <div>Users: <span className="font-bold text-gray-900 dark:text-white">{t.userCount.toLocaleString()} Users</span></div>
            </div>

            {onOpenWhiteLabel && (
              <Button onClick={() => onOpenWhiteLabel(t)} variant="outline" className="w-full text-xs h-8 rounded-xl font-bold">
                <Sliders className="w-3.5 h-3.5 mr-1 text-indigo-500" /> White-Label Settings
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

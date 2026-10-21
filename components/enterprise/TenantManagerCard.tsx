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
    <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.14)] rounded-[6px] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
            <Building className="w-4 h-4 text-[#65F59A] mr-2" />
            Enterprise Multi-Tenant Directory
          </h3>
          <p className="text-xs text-[#A0AEA5] mt-0.5">
            Isolated tenant databases, dedicated domain routing, and regional cloud residency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {tenants.map((t) => (
          <div
            key={t.id}
            className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] hover:border-[rgba(160,190,170,0.22)] transition-all space-y-3"
          >
            <div className="flex items-center justify-between font-bold">
              <span className="text-[#F2F7F3] text-sm font-sans">{t.name}</span>
              <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold bg-[rgba(101,245,154,0.1)] text-[#65F59A] border border-[rgba(101,245,154,0.2)] uppercase">
                {t.status}
              </span>
            </div>

            <div className="space-y-1 font-mono text-[11px] text-[#A0AEA5]">
              <div>
                Domain: <span className="font-bold text-[#65F59A]">{t.domain}</span>
              </div>
              <div>
                Isolation: <span className="font-bold text-[#F2F7F3] uppercase">{t.isolationMode}</span>
              </div>
              <div>
                Region: <span className="font-bold text-[#F2F7F3] uppercase">{t.region}</span>
              </div>
              <div>
                Active Seats: <span className="font-bold text-[#F2F7F3]">{t.userCount.toLocaleString()} Users</span>
              </div>
            </div>

            {onOpenWhiteLabel && (
              <Button
                onClick={() => onOpenWhiteLabel(t)}
                variant="outline"
                className="w-full text-xs h-8 rounded-[4px] font-mono uppercase tracking-wider border-[rgba(160,190,170,0.2)] bg-[#0C1210] text-[#F2F7F3] hover:border-[#65F59A]/50 hover:text-[#65F59A]"
              >
                <Sliders className="w-3.5 h-3.5 mr-1 text-[#65F59A]" />
                White-Label Settings
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
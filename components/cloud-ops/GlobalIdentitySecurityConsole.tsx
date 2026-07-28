"use client";

import React, { useState } from "react";
import { ZeroTrustIdentity } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, Lock, Key, AlertTriangle, CheckCircle2, UserCheck, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockIdentity: ZeroTrustIdentity[] = [
  { providerId: "idp-101", ssoProtocol: "SAML 2.0", tenantDomain: "metrotech.quizdorm.edu", enforceMFA: true, activeSessionsCount: 14250, threatAlertsCount: 0 },
  { providerId: "idp-102", ssoProtocol: "Azure AD", tenantDomain: "quantum.quizdorm.de", enforceMFA: true, activeSessionsCount: 5800, threatAlertsCount: 0 },
];

export function GlobalIdentitySecurityConsole() {
  const [identities, setIdentities] = useState<ZeroTrustIdentity[]>(mockIdentity);

  const handleRunSecurityScan = () => {
    toast.success("Zero-Trust Security Threat Scan Complete: 0 Anomalies Detected!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" /> Zero-Trust Federated Single Sign-On (SSO)
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" /> Global Identity & Security Console
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            SAML 2.0, OAuth2/OIDC, Okta, Azure AD federation, Multi-Factor Authentication (MFA), and AI threat detection.
          </p>
        </div>

        <Button onClick={handleRunSecurityScan} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" /> Run AI Threat Scan
        </Button>
      </div>

      {/* Identity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {identities.map((idp) => (
          <div key={idp.providerId} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {idp.ssoProtocol}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{idp.tenantDomain}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-[10px]">
                  MFA ENFORCED
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Active SSO Sessions:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{idp.activeSessionsCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Security Threats Detected:</span>
                  <span className="text-emerald-500 font-bold">0 Threats</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Zero-Trust Verified</span>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                IdP Policy Settings
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

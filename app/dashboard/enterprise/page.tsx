"use client";

import React, { useState } from "react";
import { SSOManager } from "@/lib/enterprise/ssoManager";
import { FeatureFlagManager } from "@/lib/enterprise/featureFlagManager";
import { EnterpriseWorkflowCard } from "@/components/enterprise/EnterpriseWorkflowCard";
import { Building, Sliders, Lock, CheckCircle2, ShieldCheck, ToggleLeft, ToggleRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TenantControlsPage() {
  const ssoConfigs = SSOManager.getSSOConfigs();
  const [flags, setFlags] = useState(FeatureFlagManager.getFlags());

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
              <Building className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Tenant & Organization Administration
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Tenant Controls, SSO & Approval Workflows
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Configure SAML 2.0 / Okta SSO, manage tenant-level feature flags, and monitor multi-role approval workflow chains.
          </p>
        </div>
      </div>

      {/* Grid: SSO & Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SSO Settings */}
        <div className="lg:col-span-6">
          <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
                <Lock className="w-5 h-5 text-indigo-600 mr-2" /> SAML 2.0 / OpenID / Okta SSO Directory Sync
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              {ssoConfigs.map((sso) => (
                <div key={sso.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-gray-900 dark:text-white text-sm uppercase">{sso.provider} Single Sign-On</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold uppercase">
                      ACTIVE
                    </span>
                  </div>

                  <div className="space-y-1 font-mono text-[11px] text-gray-500">
                    <div>Issuer URL: <span className="text-indigo-600 font-bold">{sso.issuerUrl}</span></div>
                    <div>Client ID: <span className="text-gray-900 dark:text-white font-bold">{sso.clientId}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Workflows */}
        <div className="lg:col-span-6">
          <EnterpriseWorkflowCard />
        </div>
      </div>

      {/* Tenant Feature Flags */}
      <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Sliders className="w-5 h-5 text-indigo-600 mr-2" /> Tenant Feature Flags & Module Toggles
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {flags.map((f) => (
            <div key={f.key} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-gray-900 dark:text-white block">{f.name}</span>
                <span className="text-[10px] text-gray-400 font-mono">Key: {f.key}</span>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-600">ENABLED</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

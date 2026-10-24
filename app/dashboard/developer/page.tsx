"use client";

import React from "react";
import { ApiKeyManagerCard } from "@/components/developer/ApiKeyManagerCard";
import { WebhookManagerCard } from "@/components/developer/WebhookManagerCard";
import { ApiExplorerWidget } from "@/components/developer/ApiExplorerWidget";
import { SDKDownloadCard } from "@/components/developer/SDKDownloadCard";
import { Code2, Terminal, Globe, Key, FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DeveloperPortalPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <Code2 className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.8 Open Platform
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Developer Portal, REST APIs & Webhook Platform
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Build custom integrations, generate API keys, configure event webhooks, explore OpenAPI 3.0 endpoints, and download client SDKs.
            </p>
          </div>

          <Link href="/api/v1/openapi" target="_blank">
            <Button className="bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-500/30">
              <FileText className="w-4 h-4 mr-1.5" /> View OpenAPI 3.0 JSON
            </Button>
          </Link>
        </div>
      </div>

      {/* Interactive Swagger Explorer */}
      <ApiExplorerWidget />

      {/* Grid: API Keys & Webhooks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <ApiKeyManagerCard />
        </div>
        <div className="lg:col-span-6">
          <WebhookManagerCard />
        </div>
      </div>

      {/* SDK Downloads */}
      <SDKDownloadCard />
    </div>
  );
}

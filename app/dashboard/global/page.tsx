"use client";

import React, { useState } from "react";
import { GlobalInstitutionDirectory } from "@/lib/global-network/institutionDirectory";
import { GlobalInstitution, InstitutionType } from "@/lib/types/global-network";
import { GlobalInstitutionCard } from "@/components/global-network/GlobalInstitutionCard";
import { CredentialWalletCard } from "@/components/global-network/CredentialWalletCard";
import { Version3MilestoneCard } from "@/components/global-network/Version3MilestoneCard";

import { Globe, Search, Share2, Award, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function GlobalEducationHubPage() {
  const [selectedType, setSelectedType] = useState<InstitutionType | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const institutions = GlobalInstitutionDirectory.getInstitutions(selectedType === "all" ? undefined : selectedType);
  const filtered = institutions.filter((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()) || i.country.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <Globe className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.9 Global Education Cloud (Version 3.0 Final Release)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Global Institution Directory & Worldwide Education Network
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Connect with accredited universities, school networks, and certification bodies across 140+ countries. Participate in international Olympiads and curriculum exchanges.
            </p>
          </div>

          <Link href="/dashboard/global/exchange">
            <Button className="bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-500/30">
              <Share2 className="w-4 h-4 mr-1.5" /> Launch Curriculum Exchange & Cloud Node Status
            </Button>
          </Link>
        </div>
      </div>

      {/* Version 3.0 Release Summary Card */}
      <Version3MilestoneCard />

      {/* Global Digital Credential Wallet Card */}
      <CredentialWalletCard />

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-950 p-4 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search universities, countries..."
            className="pl-9 text-xs rounded-xl"
          />
        </div>

        <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl text-[11px] font-bold w-full sm:w-auto">
          {(["all", "university", "certification_body", "school_group"] as (InstitutionType | "all")[]).map((t) => (
            <button
              key={t}
              onClick={() => setSelectedType(t)}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                selectedType === t ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {t.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Institution Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((inst) => (
          <GlobalInstitutionCard key={inst.id} institution={inst} />
        ))}
      </div>
    </div>
  );
}

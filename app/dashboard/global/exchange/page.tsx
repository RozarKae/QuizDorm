"use client";

import { CurriculumPackageCard } from "@/components/global-network/CurriculumPackageCard";
import { FederatedCloudCard } from "@/components/global-network/FederatedCloudCard";
import { CurriculumExchangeEngine } from "@/lib/global-network/curriculumExchange";

import { Share2 } from "lucide-react";

export default function CurriculumExchangePage() {
  const packages = CurriculumExchangeEngine.getPackages();

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
              <Share2 className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Curriculum Exchange & Federated Cloud Platform
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Multi-Country Curriculum Exchange & Open Educational Frameworks
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Import accredited syllabi frameworks, map learning outcomes to international standards, and monitor multi-region federated cloud deployment nodes.
          </p>
        </div>
      </div>

      {/* Federated Cloud Region Monitor */}
      <FederatedCloudCard />

      {/* Curriculum Packages Grid */}
      <div className="space-y-3 pt-2">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Share2 className="w-5 h-5 text-indigo-600 mr-2" /> Open International Curriculum Frameworks
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <CurriculumPackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </div>
  );
}

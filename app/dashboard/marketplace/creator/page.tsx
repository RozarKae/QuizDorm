"use client";

import { CreatorRevenueCard } from "@/components/marketplace/CreatorRevenueCard";
import { CreatorStorefrontHeader } from "@/components/marketplace/CreatorStorefrontHeader";
import { ProductPublishWizardModal } from "@/components/marketplace/ProductPublishWizardModal";
import { CreatorProfileManager } from "@/lib/marketplace/creatorManager";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus,Store } from "lucide-react";

export default function CreatorStudioPage() {
  const profile = CreatorProfileManager.getProfile();
  const [publishModalOpen, setPublishModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <Store className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Creator Economy Studio & Payouts
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Creator Storefront & Content Monetization Studio
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Publish educational products, configure license tiers, track sales revenue, and request instant earnings payouts.
            </p>
          </div>

          <Button onClick={() => setPublishModalOpen(true)} className="bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-500/30">
            <Plus className="w-4 h-4 mr-1.5" /> Publish New Resource
          </Button>
        </div>
      </div>

      {/* Creator Public Storefront Header */}
      <CreatorStorefrontHeader profile={profile} />

      {/* Revenue Analytics & 80/20 Revenue Share */}
      <CreatorRevenueCard totalSalesUSD={profile.totalSalesUSD ?? profile.totalEarningsUSD ?? 0} />

      {/* Product Publish Wizard Modal */}
      <ProductPublishWizardModal open={publishModalOpen} onOpenChange={setPublishModalOpen} />
    </div>
  );
}

"use client";

import { AIMarketplaceAssistantHub } from "@/components/marketplace/AIMarketplaceAssistantHub";
import { CreatorPortalStorefront } from "@/components/marketplace/CreatorPortalStorefront";
import { DigitalProductMarketplace } from "@/components/marketplace/DigitalProductMarketplace";
import { EducationalServiceMarketplace } from "@/components/marketplace/EducationalServiceMarketplace";
import { GlobalCommercePlatform } from "@/components/marketplace/GlobalCommercePlatform";
import { InstitutionMarketplaceExchange } from "@/components/marketplace/InstitutionMarketplaceExchange";
import { MarketplaceAnalyticsConsole } from "@/components/marketplace/MarketplaceAnalyticsConsole";
import { MarketplacePlatformHub } from "@/components/marketplace/MarketplacePlatformHub";
import { ReviewsCommunityHub } from "@/components/marketplace/ReviewsCommunityHub";
import { SubscriptionCommerceEngine } from "@/components/marketplace/SubscriptionCommerceEngine";
import React,{ useState } from "react";

import {
BarChart3,
Building2,
CreditCard,
FileText,
Globe,
ShoppingBag,
Sparkles,
Star,
Store,
Users
} from "lucide-react";

export type MarketplaceModuleTab = 
  | "platform-hub" 
  | "digital-products" 
  | "creator-portal" 
  | "institution-exchange" 
  | "services" 
  | "commerce-checkout" 
  | "reviews" 
  | "ai-assistant" 
  | "analytics" 
  | "global-commerce";

export default function EducationMarketplacePage() {
  const [activeTab, setActiveTab] = useState<MarketplaceModuleTab>("platform-hub");

  const tabs: { id: MarketplaceModuleTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: "platform-hub", label: "Marketplace Hub", icon: ShoppingBag, badge: "HOT" },
    { id: "digital-products", label: "Question Banks & Products", icon: FileText },
    { id: "creator-portal", label: "Creator Storefront", icon: Store },
    { id: "institution-exchange", label: "Institutional Bulk Licensing", icon: Building2 },
    { id: "services", label: "Services & Tutoring", icon: Users },
    { id: "commerce-checkout", label: "Cart & Subscriptions", icon: CreditCard },
    { id: "reviews", label: "Verified Reviews", icon: Star },
    { id: "ai-assistant", label: "AI Buying Assistant", icon: Sparkles, badge: "AI" },
    { id: "analytics", label: "Commerce Analytics", icon: BarChart3 },
    { id: "global-commerce", label: "Global Multi-Currency", icon: Globe },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-rose-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                Education Marketplace <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 ml-2">PHASE 4.8</span>
              </h1>
              <p className="text-xs text-slate-500">
                Thriving global educational commerce ecosystem enabling creators, institutions, publishers, and consultants to monetize digital resources, question banks, courses, site licenses, tutoring services, and AI prompts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap transition-all ${
                isActive
                  ? "bg-purple-600 text-white shadow-md font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Module Workspace Content */}
      <div className="pt-2">
        {activeTab === "platform-hub" && <MarketplacePlatformHub />}
        {activeTab === "digital-products" && <DigitalProductMarketplace />}
        {activeTab === "creator-portal" && <CreatorPortalStorefront />}
        {activeTab === "institution-exchange" && <InstitutionMarketplaceExchange />}
        {activeTab === "services" && <EducationalServiceMarketplace />}
        {activeTab === "commerce-checkout" && <SubscriptionCommerceEngine />}
        {activeTab === "reviews" && <ReviewsCommunityHub />}
        {activeTab === "ai-assistant" && <AIMarketplaceAssistantHub />}
        {activeTab === "analytics" && <MarketplaceAnalyticsConsole />}
        {activeTab === "global-commerce" && <GlobalCommercePlatform />}
      </div>
    </div>
  );
}

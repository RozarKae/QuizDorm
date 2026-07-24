"use client";

import React, { useState } from "react";
import { MarketplaceProductManager } from "@/lib/marketplace/productManager";
import { MarketplaceProduct, ProductCategory } from "@/lib/types/marketplace";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { DigitalLicenseModal } from "@/components/marketplace/DigitalLicenseModal";
import { ShoppingBag, Search, Sparkles, Store, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function MarketplaceHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);

  const products = MarketplaceProductManager.getProducts(selectedCategory === "all" ? undefined : selectedCategory);

  const filtered = products.filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300">
                <ShoppingBag className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.5 Global Creator Economy & Digital Commerce
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Global Educational Content & AI Prompt Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Discover, license, and acquire verified Question Banks, Quiz Packs, Olympiad Mock Sets, and AI Prompt Libraries from master educators worldwide.
            </p>
          </div>

          <Link href="/dashboard/marketplace/creator">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-500/30">
              <Store className="w-4 h-4 mr-1.5" /> Launch Creator Storefront & Revenue Studio
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-gray-950 p-4 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search STEM banks, AI prompts..."
            className="pl-9 text-xs rounded-xl"
          />
        </div>

        <div className="flex flex-wrap gap-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-2xl text-[11px] font-bold w-full sm:w-auto">
          {(["all", "question_bank", "ai_prompt_library", "competition_pack"] as (ProductCategory | "all")[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl capitalize transition-all ${
                selectedCategory === cat ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <MarketplaceProductCard key={prod.id} product={prod} onBuyNow={(p) => setSelectedProduct(p)} />
        ))}
      </div>

      {/* License Modal */}
      <DigitalLicenseModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />
    </div>
  );
}

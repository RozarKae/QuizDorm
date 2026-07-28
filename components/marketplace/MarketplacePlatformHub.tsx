"use client";

import React, { useState } from "react";
import { MarketplaceProduct, ProductCategory } from "@/lib/types/marketplace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, Search, Star, Download, Heart, Sparkles, 
  Tag, Filter, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const mockProducts: MarketplaceProduct[] = [
  {
    id: "prod-101",
    title: "1,000+ Verified Quantum Physics MCQs & Numerical Solutions Bank",
    category: "Question Banks",
    creatorName: "MIT Open & Dr. Vance",
    creatorAvatarUrl: "#",
    priceUSD: 49.99,
    rating: 4.9,
    reviewsCount: 128,
    downloadCount: 1420,
    previewUrl: "#",
    isFeatured: true,
    isInstitutionalEligible: true,
  },
  {
    id: "prod-102",
    title: "PyTorch & Neural Network Full Curriculum & Lesson Plan Bundle",
    category: "Lesson Plans",
    creatorName: "AI Academy Press",
    creatorAvatarUrl: "#",
    priceUSD: 79.00,
    rating: 4.8,
    reviewsCount: 94,
    downloadCount: 890,
    previewUrl: "#",
    isFeatured: true,
    isInstitutionalEligible: true,
  },
];

export function MarketplacePlatformHub() {
  const [products, setProducts] = useState<MarketplaceProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleAddToCart = (title: string) => {
    toast.success(`Added "${title}" to your Shopping Cart!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <ShoppingBag className="w-3.5 h-3.5 text-amber-400" /> Global Education Economy
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Central Education Marketplace</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Discover, sell, and purchase verified question banks, courseware, e-books, lesson plans, AI prompts, and institutional site licenses.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Creator Storefront Publisher...")} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Sell Your Content
        </Button>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search 10,000+ question banks, courses, e-books, and lesson plans..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Question Banks", "Courses", "Lesson Plans", "E-books", "AI Prompts"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat ? "bg-purple-600 text-white shadow-sm" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{p.title}</h3>
                  <p className="text-xs text-slate-500">By {p.creatorName}</p>
                </div>
                <span className="font-mono text-xl font-black text-emerald-600 dark:text-emerald-400">
                  ${p.priceUSD}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500" /> {p.rating} ({p.reviewsCount} reviews)
                </span>
                <span className="text-slate-400">{(p.downloadCount ?? p.downloadsCount ?? 0).toLocaleString()} Sales</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Instant Download</span>
              <Button onClick={() => handleAddToCart(p.title)} className="bg-purple-600 hover:bg-purple-700 text-white text-xs rounded-xl font-bold">
                <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Add to Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

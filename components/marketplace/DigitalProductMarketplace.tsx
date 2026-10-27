"use client";

import { Button } from "@/components/ui/button";
import { MarketplaceProduct } from "@/lib/types/marketplace";
import {
Download,
FileText
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockDigitalProducts: MarketplaceProduct[] = [
  {
    id: "dp-1",
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
];

export function DigitalProductMarketplace() {
  const [products] = useState<MarketplaceProduct[]>(mockDigitalProducts);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-purple-600" /> Digital Product Store & Downloads
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Browse verified question banks, e-books, quiz templates, and AI prompts with instant file downloads.
          </p>
        </div>
      </div>

      {/* Digital Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">{p.category}</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">{p.title}</h4>
              <p className="text-xs text-slate-500">Author: {p.creatorName}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="font-mono font-bold text-rose-600 text-base">${p.priceUSD}</span>
              <Button onClick={() => toast.success(`Purchased & Downloaded "${p.title}"`)} size="sm" className="bg-purple-600 text-white text-xs rounded-xl font-bold">
                <Download className="w-3.5 h-3.5 mr-1" /> Buy & Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { MarketplaceProduct } from "@/lib/types/marketplace";
import { Star, Download, Tag, ShoppingCart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MarketplaceProductCardProps {
  product: MarketplaceProduct;
  onBuyNow: (product: MarketplaceProduct) => void;
}

export function MarketplaceProductCard({ product, onBuyNow }: MarketplaceProductCardProps) {
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm hover:border-indigo-500/50 transition-all space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            {product.category.replace("_", " ")}
          </span>
          <span className="text-sm font-extrabold font-mono text-rose-600 dark:text-rose-400">
            ${product.priceUSD.toFixed(2)}
          </span>
        </div>

        <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-2">{product.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center text-amber-500 font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> {product.rating} ({product.reviewsCount})
          </span>
          <span className="font-mono">{(product.downloadsCount ?? product.downloadCount ?? 0).toLocaleString()} Downloads</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold">
            By {product.creatorName}
          </span>
          <Button onClick={() => onBuyNow(product)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl h-8">
            <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Buy License
          </Button>
        </div>
      </div>
    </div>
  );
}

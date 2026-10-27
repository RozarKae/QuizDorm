"use client";

import { Button } from "@/components/ui/button";
import { DigitalLicensingEngine } from "@/lib/marketplace/licensingEngine";
import { LicenseType,MarketplaceProduct } from "@/lib/types/marketplace";
import { ShieldCheck,ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface DigitalLicenseModalProps {
  product: MarketplaceProduct | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DigitalLicenseModal({ product, open, onOpenChange }: DigitalLicenseModalProps) {
  const [selectedTier, setSelectedTier] = useState<LicenseType>("classroom");
  const [purchasedKey, setPurchasedKey] = useState<string | null>(null);

  if (!open || !product) return null;

  const getPriceMultiplier = (tier: LicenseType) => {
    return tier === "personal" ? 1 : tier === "classroom" ? 2.5 : tier === "school" ? 8 : 20;
  };

  const finalPrice = product.priceUSD * getPriceMultiplier(selectedTier);

  const handleCheckout = () => {
    const res = DigitalLicensingEngine.generateLicenseKey(product.id, selectedTier);
    setPurchasedKey(res.licenseKey);
    toast.success(`License purchased for "${product.title}"! License Key: ${res.licenseKey}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <ShieldCheck className="w-5 h-5 text-indigo-600 mr-2" /> Digital License & Checkout
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        {purchasedKey ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 space-y-2">
              <span className="text-xs text-rose-800 font-bold uppercase block">Digital DRM License Key Issued</span>
              <div className="text-xl font-extrabold font-mono text-rose-600 tracking-wider">
                {purchasedKey}
              </div>
              <p className="text-xs text-gray-500">Unlocked full access to {product.previewQuestionsCount}+ questions with DRM watermark.</p>
            </div>

            <Button onClick={() => onOpenChange(false)} className="w-full bg-indigo-600 text-white font-bold text-xs rounded-xl py-5">
              Access Product in Question Bank
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <span className="font-extrabold text-sm text-gray-900 dark:text-white block">{product.title}</span>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-2">Select Educational License Tier</label>
              <div className="grid grid-cols-2 gap-2">
                {(["personal", "classroom", "school", "enterprise"] as LicenseType[]).map((tier) => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-3 rounded-2xl border text-left capitalize transition-all ${
                      selectedTier === tier
                        ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 font-bold"
                        : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50"
                    }`}
                  >
                    <span className="block font-bold text-gray-900 dark:text-white">{tier} License</span>
                    <span className="text-[10px] text-indigo-600 font-mono">${(product.priceUSD * getPriceMultiplier(tier)).toFixed(2)}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex justify-between items-center font-bold">
              <span>Total Price:</span>
              <span className="text-base text-rose-600 font-mono">${finalPrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
              <Button onClick={handleCheckout} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Pay & Issue License
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { ProductReview } from "@/lib/types/marketplace";
import {
ShieldCheck,
Star
} from "lucide-react";
import { useState } from "react";

const mockReviews: ProductReview[] = [
  { id: "rev-1", productId: "prod-101", reviewerName: "Prof. Alan Turing", ratingStars: 5, comment: "Exceptional quality! The Pauli matrix numerical derivations saved our department hours of exam prep time.", date: "Feb 22, 2026", isVerifiedPurchase: true },
];

export function ReviewsCommunityHub() {
  const [reviews] = useState<ProductReview[]>(mockReviews);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-amber-500" /> Verified Reviews & Product Ratings
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Community ratings, verified purchaser feedback, Q&A threads, and creator trust scores.
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-3">
        {reviews.map((rev) => (
          <div key={rev.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{rev.reviewerName}</span>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-bold text-[10px] flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Verified Buyer
                </span>
              </div>
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" /> {rev.ratingStars}.0
              </div>
            </div>
            <p className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{rev.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

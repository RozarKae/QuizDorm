"use client";

import React, { useState } from "react";
import { ShoppingCartItem } from "@/lib/types/marketplace";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShoppingBag, CreditCard, Tag, CheckCircle2, Trash2, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockCart: ShoppingCartItem[] = [
  { productId: "prod-101", title: "1,000+ Quantum Physics MCQs Bank", priceUSD: 49.99, quantity: 1 },
  { productId: "prod-102", title: "PyTorch & Neural Network Lesson Plans", priceUSD: 79.00, quantity: 1 },
];

export function SubscriptionCommerceEngine() {
  const [cart, setCart] = useState<ShoppingCartItem[]>(mockCart);
  const [coupon, setCoupon] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.priceUSD * item.quantity, 0);
  const netTotal = subtotal * (1 - discountPercent / 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === "QUIZDORM20") {
      setDiscountPercent(20);
      toast.success("Coupon 'QUIZDORM20' applied! 20% Discount unlocked.");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleCheckout = () => {
    toast.success("Checkout Complete! Invoice & Receipt generated. Downloads unlocked.");
    setCart([]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-purple-600" /> Shopping Cart & Commerce Checkout
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review shopping cart items, apply promotional discount coupons, and complete secure checkout.
          </p>
        </div>
      </div>

      {/* Cart & Summary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items List (Cols 2) */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item.productId} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.title}</h4>
                <p className="text-slate-400">Qty: {item.quantity}</p>
              </div>
              <span className="font-mono text-base font-black text-rose-600 dark:text-rose-400">${item.priceUSD}</span>
            </div>
          ))}
        </div>

        {/* Checkout Summary (Col 1) */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-wider text-amber-400">Order Summary</h3>

          <form onSubmit={handleApplyCoupon} className="flex gap-2 text-xs">
            <Input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon Code (e.g. QUIZDORM20)"
              className="bg-slate-900 border-slate-700 text-white rounded-xl"
            />
            <Button type="submit" className="bg-purple-600 text-white text-xs font-bold rounded-xl shrink-0">
              Apply
            </Button>
          </form>

          <div className="p-3 bg-slate-900 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountPercent > 0 && (
              <div className="flex justify-between text-rose-400">
                <span>Discount ({discountPercent}%):</span>
                <span>-${(subtotal * (discountPercent / 100)).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-800 pt-2 text-base font-bold text-amber-400">
              <span>Total Payable:</span>
              <span>${netTotal.toFixed(2)}</span>
            </div>
          </div>

          <Button onClick={handleCheckout} disabled={cart.length === 0} className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-lg">
            <CreditCard className="w-4 h-4 mr-1.5" /> Complete Secure Purchase
          </Button>
        </div>
      </div>
    </div>
  );
}

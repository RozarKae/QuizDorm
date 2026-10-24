"use client";

import React, { useState } from "react";
import { SUBSCRIPTION_PLANS } from "@/lib/billing/subscriptionManager";
import { SubscriptionPlanId } from "@/lib/types/billing";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { CurrencySelector } from "@/components/billing/CurrencySelector";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingTableProps {
  currentPlanId: SubscriptionPlanId;
  onSelectPlan?: (planId: SubscriptionPlanId, isAnnual: boolean) => void;
}

export function PricingTable({ currentPlanId, onSelectPlan }: PricingTableProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const { formatPrice, currency } = useCurrency();

  return (
    <div className="space-y-6 text-[#F2F7F3]">
      {/* Controls Bar: Billing Cycle & Currency Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)]">
        {/* Monthly vs Annual Toggle */}
        <div className="flex items-center space-x-3 text-xs font-mono">
          <span className={!isAnnual ? "text-[#FF4D6D] font-bold" : "text-[#A0AEA5]"}>
            Monthly Sprints
          </span>

          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-[#2A141A] p-1 border border-[rgba(240, 160, 180,0.2)] flex items-center transition-all cursor-pointer"
            aria-label="Toggle annual billing discount"
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#FF4D6D] shadow-[0_0_8px_#FF4D6D] transition-transform ${
                isAnnual ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>

          <span className={isAnnual ? "text-[#FF4D6D] font-bold" : "text-[#A0AEA5]"}>
            Annual Commitment{" "}
            <span className="ml-1 text-[10px] px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] font-bold">
              2 MONTHS FREE
            </span>
          </span>
        </div>

        {/* Dynamic Currency Selector */}
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-mono text-[#A0AEA5]">Currency:</span>
          <CurrencySelector />
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentPlanId === plan.id;
          const monthlyRateINR = isAnnual ? plan.priceAnnualINR / 12 : plan.priceMonthlyINR;

          return (
            <div
              key={plan.id}
              className={`p-5 rounded-[6px] border flex flex-col justify-between space-y-4 text-xs transition-all relative ${
                plan.popular
                  ? "bg-[#1D1013] border-[#FF4D6D]/60 shadow-[0_0_24px_rgba(255, 77, 109,0.15)]"
                  : "bg-[#140C0E] border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.3)]"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-[2px] bg-[#FF4D6D] text-[#0B0708] font-extrabold font-mono text-[9px] uppercase tracking-wider shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-bold text-sm text-[#F2F7F3] font-display pt-1">{plan.name}</h4>
                <p className="text-[11px] text-[#A0AEA5] leading-snug">{plan.description}</p>

                <div className="pt-2">
                  <span className="text-2xl font-extrabold text-[#F2F7F3] font-mono tracking-tight">
                    {formatPrice(monthlyRateINR)}
                  </span>
                  <span className="text-[#69786F] text-[11px] font-mono"> / mo</span>
                  {isAnnual && plan.priceAnnualINR > 0 && (
                    <p className="text-[10px] font-mono text-[#FF758F] mt-0.5">
                      Billed {formatPrice(plan.priceAnnualINR)} annually
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[rgba(240, 160, 180,0.1)] text-[11px]">
                <span className="font-bold font-mono text-[10px] uppercase text-[#69786F] block tracking-wider">
                  Features:
                </span>
                <ul className="space-y-1.5 text-[#A0AEA5] font-mono text-[11px]">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-start space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-[#FF4D6D] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/checkout?plan=${plan.id}&cycle=${isAnnual ? "annual" : "monthly"}`}>
                <Button
                  disabled={isCurrent}
                  className={`w-full text-xs font-mono font-bold rounded-[3px] h-8 tracking-wider ${
                    isCurrent
                      ? "bg-[#2A141A] text-[#69786F] border border-[rgba(240, 160, 180,0.12)] cursor-not-allowed"
                      : plan.popular
                      ? "bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] shadow-[0_0_12px_rgba(255, 77, 109,0.25)]"
                      : "bg-[#2A141A] hover:bg-[#1D1013] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.2)] hover:border-[#FF4D6D]/40"
                  }`}
                >
                  {isCurrent ? "ACTIVE PLAN" : "UPGRADE"}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

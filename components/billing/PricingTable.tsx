"use client";

import React, { useState } from "react";
import { SUBSCRIPTION_PLANS } from "@/lib/billing/subscriptionManager";
import { SubscriptionPlanId } from "@/lib/types/billing";
import { Check, Zap, Sparkles, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PricingTableProps {
  currentPlanId: SubscriptionPlanId;
  onSelectPlan?: (planId: SubscriptionPlanId, isAnnual: boolean) => void;
}

export function PricingTable({ currentPlanId, onSelectPlan }: PricingTableProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="space-y-6">
      {/* Monthly vs Annual Toggle */}
      <div className="flex items-center justify-center space-x-3 text-xs font-bold">
        <span className={!isAnnual ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : "text-gray-500"}>
          Monthly Billing
        </span>

        <button
          onClick={() => setIsAnnual(!isAnnual)}
          className="w-12 h-6 rounded-full bg-indigo-600 p-1 flex items-center transition-all cursor-pointer"
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform ${
              isAnnual ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>

        <span className={isAnnual ? "text-indigo-600 dark:text-indigo-400 font-extrabold" : "text-gray-500"}>
          Annual Billing <span className="ml-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold">SAVE 20%</span>
        </span>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = currentPlanId === plan.id;
          const price = isAnnual ? plan.priceAnnualUSD / 12 : plan.priceMonthlyUSD;

          return (
            <div
              key={plan.id}
              className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 text-xs transition-all relative ${
                plan.popular
                  ? "bg-gradient-to-b from-indigo-950/20 via-white to-white dark:from-indigo-950/60 dark:via-gray-950 dark:to-gray-950 border-indigo-500 shadow-xl ring-2 ring-indigo-500/20"
                  : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 shadow-sm hover:border-gray-300"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] uppercase shadow-md">
                  {plan.badge}
                </div>
              )}

              <div className="space-y-2">
                <h4 className="font-extrabold text-base text-gray-900 dark:text-white pt-1">{plan.name}</h4>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">{plan.description}</p>

                <div className="pt-2">
                  <span className="text-3xl font-extrabold text-gray-900 dark:text-white font-mono">
                    ${Math.round(price)}
                  </span>
                  <span className="text-gray-400 text-[11px]"> / month</span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px]">
                <span className="font-bold text-gray-700 dark:text-gray-300 block">Plan Features:</span>
                <ul className="space-y-1.5 text-gray-600 dark:text-gray-400">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center space-x-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span className="line-clamp-1">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/checkout?plan=${plan.id}&cycle=${isAnnual ? "annual" : "monthly"}`}>
                <Button
                  disabled={isCurrent}
                  className={`w-full text-xs font-bold rounded-xl ${
                    isCurrent
                      ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                      : plan.popular
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                      : "bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  }`}
                >
                  {isCurrent ? "Current Active Plan" : "Upgrade Plan"}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

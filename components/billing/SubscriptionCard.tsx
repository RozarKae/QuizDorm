"use client";

import { Card } from "@/components/ui/card";
import { SubscriptionManager } from "@/lib/billing/subscriptionManager";
import { UserSubscription } from "@/lib/types/billing";
import { CreditCard,ShieldCheck } from "lucide-react";

interface SubscriptionCardProps {
  subscription: UserSubscription;
}

export function SubscriptionCard({ subscription }: SubscriptionCardProps) {
  const plan = SubscriptionManager.getPlan(subscription.planId);

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Active SaaS Plan
            </span>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
              {plan.name} <ShieldCheck className="w-4 h-4 text-rose-500 ml-1.5" />
            </h3>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 uppercase">
          Status: {subscription.status}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Billing Cycle</span>
          <span className="font-bold text-gray-900 dark:text-white uppercase">{subscription.billingCycle}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Allocated Seats</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400">
            {subscription.seatsUsed} / {subscription.seatsAllocated} Seats
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Current Period End</span>
          <span className="font-bold text-gray-900 dark:text-white">{subscription.currentPeriodEnd}</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
          <span className="text-gray-400 text-[10px] block font-sans">Auto Renewal</span>
          <span className="font-bold text-rose-600">
            {subscription.autoRenew ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </Card>
  );
}

"use client";

import { PaymentHistoryTable } from "@/components/billing/PaymentHistoryTable";
import { Button } from "@/components/ui/button";
import {
AdminSubscriptionItem,
AdminSubscriptionManager,
} from "@/lib/admin/subscriptionOverrideManager";
import { SUBSCRIPTION_PLANS } from "@/lib/billing/subscriptionManager";
import {
BillingAnalytics,
BillingCycle,
SubscriptionPlanId,
} from "@/lib/types/billing";
import {
AlertTriangle,
CheckCircle2,
FileText,
Layers,
RefreshCw,
Search,
Sliders,
Sparkles,
TrendingUp,
Users
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

type AdminBillingTab = "subscribers" | "revenue" | "transactions";

export default function AdminBillingPage() {
  const [activeTab, setActiveTab] = useState<AdminBillingTab>("subscribers");

  const [subscriptions, setSubscriptions] = useState<AdminSubscriptionItem[]>(
    () => AdminSubscriptionManager.getSubscriptions()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Modal States
  const [selectedForQuotas, setSelectedForQuotas] =
    useState<AdminSubscriptionItem | null>(null);
  const [selectedForPlan, setSelectedForPlan] =
    useState<AdminSubscriptionItem | null>(null);

  // Quotas Form State
  const [editAiCredits, setEditAiCredits] = useState<number>(0);
  const [editOcrScans, setEditOcrScans] = useState<number>(0);
  const [editSeats, setEditSeats] = useState<number>(0);
  const [overrideNote, setOverrideNote] = useState<string>("");

  // Plan Form State
  const [targetPlanId, setTargetPlanId] =
    useState<SubscriptionPlanId>("professional");
  const [targetCycle, setTargetCycle] = useState<BillingCycle>("annual");
  const [planChangeNote, setPlanChangeNote] = useState<string>("");

  const refreshSubscriptions = () => {
    setSubscriptions(AdminSubscriptionManager.getSubscriptions());
  };

  // Open Quotas Override Modal
  const openQuotasModal = (sub: AdminSubscriptionItem) => {
    setSelectedForQuotas(sub);
    setEditAiCredits(sub.aiCreditsTotal);
    setEditOcrScans(sub.ocrCreditsTotal);
    setEditSeats(sub.seatsAllocated);
    setOverrideNote(sub.adminOverrideNote || "");
  };

  // Open Plan Change Modal
  const openPlanModal = (sub: AdminSubscriptionItem) => {
    setSelectedForPlan(sub);
    setTargetPlanId(sub.planId);
    setTargetCycle(sub.billingCycle);
    setPlanChangeNote(sub.adminOverrideNote || "");
  };

  // Handle Quota Save
  const handleSaveQuotas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForQuotas) return;

    const updated = AdminSubscriptionManager.overrideQuotas(
      selectedForQuotas.id,
      Number(editSeats),
      Number(editAiCredits),
      Number(editOcrScans),
      overrideNote.trim() || undefined
    );
    setSubscriptions(updated);
    toast.success(`Quotas Overridden for ${selectedForQuotas.organizationName}`, {
      description: `New limits: ${editSeats} seats, ${Number(
        editAiCredits
      ).toLocaleString()} AI credits, ${Number(
        editOcrScans
      ).toLocaleString()} OCR scans.`,
    });
    setSelectedForQuotas(null);
  };

  // Handle Plan Save
  const handleSavePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedForPlan) return;

    const updated = AdminSubscriptionManager.updatePlan(
      selectedForPlan.id,
      targetPlanId,
      targetCycle,
      planChangeNote.trim() || undefined
    );
    setSubscriptions(updated);
    const planName =
      SUBSCRIPTION_PLANS.find((p) => p.id === targetPlanId)?.name || targetPlanId;
    toast.success(`Tier Elevated to [${planName}]`, {
      description: `Updated subscription for ${selectedForPlan.organizationName}.`,
    });
    setSelectedForPlan(null);
  };

  // Quick Grant 1,000 AI Credits
  const handleQuickGrantAi = (sub: AdminSubscriptionItem) => {
    const updated = AdminSubscriptionManager.grantCredits(
      sub.id,
      1000,
      100,
      "Superadmin 1-Click Fast Grant (+1,000 AI Credits, +100 OCR Scans)"
    );
    setSubscriptions(updated);
    toast.success(`+1,000 AI Credits Injected!`, {
      description: `Added to ${sub.organizationName} (${sub.subscriberName}).`,
    });
  };

  // Toggle Status
  const handleToggleStatus = (sub: AdminSubscriptionItem) => {
    const nextStatus = sub.status === "active" ? "canceled" : "active";
    const updated = AdminSubscriptionManager.updateStatus(
      sub.id,
      nextStatus,
      `Superadmin manual status toggle to ${nextStatus.toUpperCase()}`
    );
    setSubscriptions(updated);
    if (nextStatus === "canceled") {
      toast.error(`Subscription Canceled: ${sub.organizationName}`, {
        description: "Services suspended pending renewal.",
      });
    } else {
      toast.success(`Subscription Activated: ${sub.organizationName}`, {
        description: "Platform access restored.",
      });
    }
  };

  // Filter Logic
  const filteredSubscriptions = subscriptions.filter((s) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      s.subscriberName.toLowerCase().includes(q) ||
      s.subscriberEmail.toLowerCase().includes(q) ||
      s.organizationName.toLowerCase().includes(q) ||
      s.id.toLowerCase().includes(q);

    const matchesPlan = planFilter === "all" || s.planId === planFilter;
    const matchesStatus = statusFilter === "all" || s.status === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const analytics: BillingAnalytics = {
    monthlyRecurringRevenueUSD: 14850,
    annualRecurringRevenueUSD: 178200,
    activeSubscribersCount: subscriptions.filter((s) => s.status === "active")
      .length,
    churnRatePercent: 1.2,
    totalTransactionsCount: 1840,
    aiCreditsConsumedTotal: 420000,
    ocrScansConsumedTotal: 84000,
  };

  const metrics = [
    {
      label: "Monthly Recurring (MRR)",
      value: "₹12,32,550",
      subtext: "~$14,850 USD (+14.2% MoM)",
      change: "+14.2%",
      isPositive: true,
      icon: <TrendingUp className="w-4 h-4 text-[#FF4D6D]" />,
    },
    {
      label: "Annual Run-Rate (ARR)",
      value: "₹1,47,90,600",
      subtext: "~$178,200 USD (Contracted)",
      change: "+18.6%",
      isPositive: true,
      icon: <TrendingUp className="w-4 h-4 text-[#FF758F]" />,
    },
    {
      label: "Active Subscriptions",
      value: `${analytics.activeSubscribersCount} Active`,
      subtext: `${subscriptions.length} total registered accounts`,
      change: "+4 this month",
      isPositive: true,
      icon: <Users className="w-4 h-4 text-[#FF4D6D]" />,
    },
    {
      label: "Subscriber Churn Rate",
      value: `${analytics.churnRatePercent}%`,
      subtext: "Top-decile SaaS benchmark",
      change: "-0.4% delta",
      isPositive: true,
      icon: <RefreshCw className="w-4 h-4 text-[#FF758F]" />,
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Cinematic Hero Masthead */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(255, 77, 109,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] font-mono text-[10px] font-bold uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                Subscription Core // Quota Overrides
              </span>
              <span className="font-mono text-[11px] text-[#69786F]">
                PCI-DSS Tier 1
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-[#F2F7F3]">
              Financial Suite & Subscription Overrides
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Superadmin command to manually elevate institutional plan tiers, grant AI & OCR credits, adjust faculty seat quotas, and audit billing transactions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button
              onClick={refreshSubscriptions}
              variant="outline"
              className="h-10 px-4 rounded-[4px] border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:border-[#FF4D6D]/40 font-mono text-xs uppercase font-bold tracking-wider"
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5 text-[#FF4D6D]" />
              Sync Ledger
            </Button>
          </div>
        </div>
      </div>

      {/* 2. Precision Financial HUD Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="p-4 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.28)] transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[rgba(240, 160, 180,0.1)]">
              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#69786F]">
                {m.label}
              </span>
              <div className="p-1 rounded-[3px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)]">
                {m.icon}
              </div>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <div>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#F2F7F3] tabular-nums tracking-tight">
                  {m.value}
                </p>
                <p className="text-[11px] text-[#A0AEA5] mt-0.5 font-sans">
                  {m.subtext}
                </p>
              </div>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]">
                {m.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-[rgba(240, 160, 180,0.14)] pb-2 overflow-x-auto scrollbar-none">
        {[
          {
            id: "subscribers",
            label: "Subscriber Directory & Quota Overrides",
            icon: <Sliders className="w-3.5 h-3.5" />,
            badge: `${subscriptions.length} Accounts`,
          },
          {
            id: "transactions",
            label: "Payment Ledgers & Invoices",
            icon: <FileText className="w-3.5 h-3.5" />,
          },
          {
            id: "revenue",
            label: "Plan Limits & SaaS Pricing Matrix",
            icon: <Layers className="w-3.5 h-3.5" />,
          },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as AdminBillingTab)}
              className={`px-3.5 py-2 rounded-[4px] text-xs font-mono font-medium flex items-center space-x-2 transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-[#2A141A] border-[#FF4D6D]/40 text-[#FF4D6D] shadow-sm shadow-[#FF4D6D]/10 font-bold"
                  : "bg-transparent border-transparent text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1D1013]"
              }`}
            >
              <span className={isActive ? "text-[#FF4D6D]" : "text-[#69786F]"}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="px-1.5 py-0.2 rounded-[2px] text-[9px] font-mono bg-[#1D1013] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.2)]">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SUBSCRIBER DIRECTORY & QUOTA OVERRIDES */}
      {activeTab === "subscribers" && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search */}
              <div className="md:col-span-6 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by institution name, contact email, or sub ID..."
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#FF4D6D]/50 transition-colors"
                />
              </div>

              {/* Plan Filter */}
              <div className="md:col-span-3">
                <select
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
                >
                  <option value="all">All Plans</option>
                  <option value="enterprise">Enterprise Custom</option>
                  <option value="institution">School & College</option>
                  <option value="professional">Pro Institute</option>
                  <option value="basic">Teacher Starter</option>
                  <option value="free">Free Educator</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="md:col-span-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono focus:outline-none focus:border-[#FF4D6D]/50"
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active Tiers</option>
                  <option value="trial">Trial Accounts</option>
                  <option value="past_due">Past Due</option>
                  <option value="canceled">Canceled / Inactive</option>
                </select>
              </div>

              {/* Reset */}
              <div className="md:col-span-1 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setPlanFilter("all");
                    setStatusFilter("all");
                    refreshSubscriptions();
                  }}
                  className="h-9 w-full md:w-auto px-2.5 border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
                  title="Reset Filters"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1D1013] border-b border-[rgba(240, 160, 180,0.14)] text-[#69786F] font-mono uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Subscriber & Campus</th>
                    <th className="px-4 py-3">Assigned Plan & Cycle</th>
                    <th className="px-4 py-3">AI Credits Quota</th>
                    <th className="px-4 py-3">OCR Scans Quota</th>
                    <th className="px-4 py-3">Faculty Seats</th>
                    <th className="px-4 py-3">State</th>
                    <th className="px-4 py-3 text-right">Superadmin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)]">
                  {filteredSubscriptions.map((sub) => {
                    const aiPct = Math.min(
                      100,
                      Math.round((sub.aiCreditsUsed / (sub.aiCreditsTotal || 1)) * 100)
                    );
                    const ocrPct = Math.min(
                      100,
                      Math.round(
                        (sub.ocrCreditsUsed / (sub.ocrCreditsTotal || 1)) * 100
                      )
                    );
                    const isHighAi = aiPct >= 90;

                    return (
                      <tr
                        key={sub.id}
                        className="hover:bg-[#1D1013]/60 transition-colors"
                      >
                        {/* Subscriber */}
                        <td className="px-4 py-3.5">
                          <span className="font-semibold text-[#F2F7F3] block">
                            {sub.organizationName}
                          </span>
                          <span className="font-mono text-[10px] text-[#A0AEA5] block mt-0.5">
                            {sub.subscriberName} • {sub.subscriberEmail}
                          </span>
                          <span className="font-mono text-[9px] text-[#69786F]">
                            ID: {sub.id}
                          </span>
                        </td>

                        {/* Plan & Cycle */}
                        <td className="px-4 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-bold uppercase tracking-wider ${
                                sub.planId === "enterprise"
                                  ? "bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[#FF4D6D]/30"
                                  : sub.planId === "institution"
                                  ? "bg-[rgba(255, 117, 143,0.15)] text-[#FF758F] border border-[#FF758F]/30"
                                  : sub.planId === "professional"
                                  ? "bg-[rgba(251,191,36,0.15)] text-[#FBBF24] border border-[#FBBF24]/30"
                                  : "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.15)]"
                              }`}
                            >
                              {sub.planId}
                            </span>
                            <span className="font-mono text-[10px] text-[#69786F] uppercase">
                              {sub.billingCycle}
                            </span>
                          </div>
                          <span className="font-mono text-[9px] text-[#69786F] block mt-1">
                            Renews: {sub.currentPeriodEnd}
                          </span>
                        </td>

                        {/* AI Credits */}
                        <td className="px-4 py-3.5 font-mono text-xs">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[#F2F7F3] font-bold">
                              {sub.aiCreditsUsed.toLocaleString()} /{" "}
                              {sub.aiCreditsTotal.toLocaleString()}
                            </span>
                            <span
                              className={`text-[9px] font-bold ${
                                isHighAi ? "text-[#F87171]" : "text-[#FF4D6D]"
                              }`}
                            >
                              {aiPct}%
                            </span>
                          </div>
                          <div className="w-full bg-[#1D1013] h-1.5 rounded-full overflow-hidden border border-[rgba(240, 160, 180,0.12)]">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isHighAi
                                  ? "bg-[#F87171]"
                                  : aiPct > 70
                                  ? "bg-[#FBBF24]"
                                  : "bg-[#FF4D6D]"
                              }`}
                              style={{ width: `${aiPct}%` }}
                            />
                          </div>
                        </td>

                        {/* OCR Scans */}
                        <td className="px-4 py-3.5 font-mono text-xs">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[#F2F7F3]">
                              {sub.ocrCreditsUsed.toLocaleString()} /{" "}
                              {sub.ocrCreditsTotal.toLocaleString()}
                            </span>
                            <span className="text-[9px] text-[#A0AEA5]">
                              {ocrPct}%
                            </span>
                          </div>
                          <div className="w-full bg-[#1D1013] h-1.5 rounded-full overflow-hidden border border-[rgba(240, 160, 180,0.12)]">
                            <div
                              className="h-full rounded-full bg-[#FF758F] transition-all"
                              style={{ width: `${ocrPct}%` }}
                            />
                          </div>
                        </td>

                        {/* Seats */}
                        <td className="px-4 py-3.5 font-mono text-xs">
                          <span className="font-bold text-[#F2F7F3]">
                            {sub.seatsUsed} / {sub.seatsAllocated}
                          </span>
                          <span className="text-[10px] text-[#69786F] block mt-0.5">
                            {sub.seatsAllocated - sub.seatsUsed} seats free
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold uppercase ${
                              sub.status === "active"
                                ? "bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]"
                                : sub.status === "trial"
                                ? "bg-[rgba(255, 117, 143,0.1)] text-[#FF758F] border border-[rgba(255, 117, 143,0.25)]"
                                : sub.status === "past_due"
                                ? "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]"
                                : "bg-[rgba(248,113,113,0.1)] text-[#F87171] border border-[rgba(248,113,113,0.25)]"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                sub.status === "active"
                                  ? "bg-[#FF4D6D]"
                                  : sub.status === "past_due"
                                  ? "bg-[#FBBF24]"
                                  : "bg-[#F87171]"
                              }`}
                            />
                            {sub.status}
                          </span>
                        </td>

                        {/* Superadmin Actions */}
                        <td className="px-4 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* Fast Grant +1,000 AI credits */}
                            <button
                              onClick={() => handleQuickGrantAi(sub)}
                              className="px-2 py-1 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] hover:bg-[#FF4D6D] hover:text-[#0B0708] font-mono text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer"
                              title="Inject +1,000 AI Credits immediately"
                            >
                              <Sparkles className="h-3 w-3" />
                              <span>+1k AI</span>
                            </button>

                            {/* Change Plan Tier */}
                            <button
                              onClick={() => openPlanModal(sub)}
                              className="px-2 py-1 rounded-[3px] border border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:text-[#FF4D6D] hover:border-[#FF4D6D]/40 font-mono text-[10px] font-semibold uppercase transition-all flex items-center gap-1 cursor-pointer"
                              title="Change Subscription Tier"
                            >
                              <Layers className="h-3 w-3" />
                              <span>Tier</span>
                            </button>

                            {/* Override Quotas */}
                            <button
                              onClick={() => openQuotasModal(sub)}
                              className="px-2 py-1 rounded-[3px] border border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:text-[#FF758F] hover:border-[#FF758F]/40 font-mono text-[10px] font-semibold uppercase transition-all flex items-center gap-1 cursor-pointer"
                              title="Override Seat, AI, and OCR Quotas"
                            >
                              <Sliders className="h-3 w-3" />
                              <span>Quota</span>
                            </button>

                            {/* Toggle Status */}
                            <button
                              onClick={() => handleToggleStatus(sub)}
                              className={`p-1 rounded-[3px] border transition-colors cursor-pointer ${
                                sub.status === "active"
                                  ? "border-[rgba(248,113,113,0.25)] text-[#F87171] hover:bg-[rgba(248,113,113,0.12)]"
                                  : "border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] hover:bg-[rgba(255, 77, 109,0.12)]"
                              }`}
                              title={
                                sub.status === "active"
                                  ? "Cancel / Suspend Subscription"
                                  : "Reactivate Subscription"
                              }
                            >
                              <AlertTriangle className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTION LEDGERS */}
      {activeTab === "transactions" && <PaymentHistoryTable />}

      {/* TAB 3: PLAN LIMITS & SAAS PRICING MATRIX */}
      {activeTab === "revenue" && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <div
              key={plan.id}
              className="p-5 rounded-[6px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-sm uppercase font-bold text-[#F2F7F3]">
                    {plan.name}
                  </h3>
                  {plan.badge && (
                    <span className="px-1.5 py-0.2 rounded-[2px] font-mono text-[9px] font-extrabold uppercase bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[#FF4D6D]/30">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#A0AEA5] leading-relaxed">
                  {plan.description}
                </p>
                <div className="pt-2 flex items-baseline gap-2">
                  <span className="font-display text-2xl font-black text-[#F2F7F3]">
                    ${plan.priceMonthlyUSD}
                  </span>
                  <span className="font-mono text-xs text-[#69786F]">/ month</span>
                  <span className="font-mono text-[11px] text-[#FF758F] ml-auto">
                    ${plan.priceAnnualUSD} / yr
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.1)] font-mono text-[11px] space-y-1.5">
                <div className="flex justify-between text-[#A0AEA5]">
                  <span>Faculty Seats:</span>
                  <span className="text-[#F2F7F3] font-bold">
                    {plan.limits.maxUsers} Users
                  </span>
                </div>
                <div className="flex justify-between text-[#A0AEA5]">
                  <span>Monthly AI Tokens:</span>
                  <span className="text-[#FF4D6D] font-bold">
                    {plan.limits.aiCreditsPerMonth.toLocaleString()} Credits
                  </span>
                </div>
                <div className="flex justify-between text-[#A0AEA5]">
                  <span>OCR Scans / Mo:</span>
                  <span className="text-[#FF758F] font-bold">
                    {plan.limits.ocrScansPerMonth.toLocaleString()} Docs
                  </span>
                </div>
                <div className="flex justify-between text-[#A0AEA5]">
                  <span>Question Bank Quota:</span>
                  <span className="text-[#F2F7F3] font-bold">
                    {plan.limits.questionBankLimit.toLocaleString()} Qs
                  </span>
                </div>
              </div>

              <ul className="space-y-1 text-xs text-[#A0AEA5]">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-[#FF4D6D] shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* 4. MODAL: OVERRIDE QUOTAS */}
      {selectedForQuotas && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0708]/85 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-[8px] bg-[#140C0E] border border-[#FF758F]/30 p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#FF758F] uppercase font-bold tracking-widest block">
                  SUPERADMIN OVERRIDE
                </span>
                <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                  Adjust Quota Limits: {selectedForQuotas.organizationName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForQuotas(null)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveQuotas} className="space-y-4 text-xs font-mono">
              {/* Quick Chips */}
              <div className="space-y-1">
                <span className="text-[10px] text-[#69786F] uppercase block">
                  Quick Add Presets
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditAiCredits((prev) => prev + 1000)}
                    className="px-2 py-1 rounded-[3px] bg-[#1D1013] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] text-[10px] hover:bg-[#FF4D6D]/10 font-bold"
                  >
                    +1,000 AI Credits
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditAiCredits((prev) => prev + 5000)}
                    className="px-2 py-1 rounded-[3px] bg-[#1D1013] border border-[rgba(255, 77, 109,0.25)] text-[#FF4D6D] text-[10px] hover:bg-[#FF4D6D]/10 font-bold"
                  >
                    +5,000 AI Credits
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditOcrScans((prev) => prev + 500)}
                    className="px-2 py-1 rounded-[3px] bg-[#1D1013] border border-[rgba(255, 117, 143,0.25)] text-[#FF758F] text-[10px] hover:bg-[#FF758F]/10 font-bold"
                  >
                    +500 OCR Scans
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditSeats((prev) => prev + 5)}
                    className="px-2 py-1 rounded-[3px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.25)] text-[#F2F7F3] text-[10px] hover:bg-[#2A141A] font-bold"
                  >
                    +5 Faculty Seats
                  </button>
                </div>
              </div>

              {/* Input fields */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px] block">
                    Total AI Credits
                  </label>
                  <input
                    type="number"
                    value={editAiCredits}
                    onChange={(e) => setEditAiCredits(Number(e.target.value))}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#FF4D6D] font-bold focus:outline-none focus:border-[#FF4D6D]/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px] block">
                    Total OCR Scans
                  </label>
                  <input
                    type="number"
                    value={editOcrScans}
                    onChange={(e) => setEditOcrScans(Number(e.target.value))}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#FF758F] font-bold focus:outline-none focus:border-[#FF758F]/50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#A0AEA5] uppercase text-[10px] block">
                    Allocated Seats
                  </label>
                  <input
                    type="number"
                    value={editSeats}
                    onChange={(e) => setEditSeats(Number(e.target.value))}
                    className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-bold focus:outline-none focus:border-[#FF4D6D]/50"
                  />
                </div>
              </div>

              {/* Reason / Audit Note */}
              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px] block">
                  Admin Audit Justification
                </label>
                <input
                  type="text"
                  placeholder="e.g. Contract expansion, pilot grant, or goodwill top-up"
                  value={overrideNote}
                  onChange={(e) => setOverrideNote(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] focus:outline-none focus:border-[#FF758F]/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[rgba(240, 160, 180,0.1)]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedForQuotas(null)}
                  className="border-[rgba(240, 160, 180,0.2)] text-[#A0AEA5] text-xs font-mono h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF758F] text-[#0B0708] hover:bg-[#FF758F]/90 text-xs font-mono font-bold h-9 uppercase tracking-wider"
                >
                  Save Quotas
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: CHANGE SUBSCRIPTION TIER */}
      {selectedForPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B0708]/85 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-[8px] bg-[#140C0E] border border-[#FF4D6D]/30 p-6 shadow-2xl space-y-5 animate-in fade-in-50 zoom-in-95">
            <div className="flex items-start justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
              <div>
                <span className="font-mono text-[10px] text-[#FF4D6D] uppercase font-bold tracking-widest block">
                  PLAN TIER UPGRADE
                </span>
                <h3 className="font-display text-base font-bold text-[#F2F7F3]">
                  Elevate Plan: {selectedForPlan.organizationName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedForPlan(null)}
                className="text-[#69786F] hover:text-[#F2F7F3] text-sm font-mono p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePlan} className="space-y-4 text-xs font-mono">
              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">
                  Select Subscription Plan
                </label>
                <select
                  value={targetPlanId}
                  onChange={(e) =>
                    setTargetPlanId(e.target.value as SubscriptionPlanId)
                  }
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#FF4D6D] font-bold focus:outline-none focus:border-[#FF4D6D]/50"
                >
                  <option value="enterprise">Enterprise Custom ($199/mo / $1,900/yr)</option>
                  <option value="institution">School & College ($79/mo / $750/yr)</option>
                  <option value="professional">Pro Institute ($29/mo / $250/yr)</option>
                  <option value="basic">Teacher Starter ($12/mo / $100/yr)</option>
                  <option value="free">Free Educator ($0)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">
                  Billing Cadence
                </label>
                <select
                  value={targetCycle}
                  onChange={(e) =>
                    setTargetCycle(e.target.value as BillingCycle)
                  }
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] focus:outline-none focus:border-[#FF4D6D]/50"
                >
                  <option value="annual">Annual Billing Cycle</option>
                  <option value="monthly">Monthly Cycle</option>
                  <option value="quarterly">Quarterly Cycle</option>
                  <option value="lifetime">Lifetime License Grant</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[#A0AEA5] uppercase text-[10px]">
                  Internal Governance Note
                </label>
                <input
                  type="text"
                  placeholder="e.g. Approved by Dean / Enterprise agreement signed"
                  value={planChangeNote}
                  onChange={(e) => setPlanChangeNote(e.target.value)}
                  className="w-full p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] focus:outline-none focus:border-[#FF4D6D]/50"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-[rgba(240, 160, 180,0.1)]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setSelectedForPlan(null)}
                  className="border-[rgba(240, 160, 180,0.2)] text-[#A0AEA5] text-xs font-mono h-9"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 text-xs font-mono font-bold h-9 uppercase tracking-wider"
                >
                  Confirm Plan Elevation
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

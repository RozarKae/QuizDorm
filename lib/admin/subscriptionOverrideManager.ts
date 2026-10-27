import { SUBSCRIPTION_PLANS } from "@/lib/billing/subscriptionManager";
import {
BillingCycle,
SubscriptionPlanId
} from "@/lib/types/billing";

export interface AdminSubscriptionItem {
  id: string; // e.g. "sub-101"
  subscriberName: string;
  subscriberEmail: string;
  organizationName: string;
  subscriberType: "institution" | "teacher" | "individual";
  planId: SubscriptionPlanId;
  billingCycle: BillingCycle;
  status: "active" | "trial" | "past_due" | "canceled" | "expired";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  seatsAllocated: number;
  seatsUsed: number;
  aiCreditsTotal: number;
  aiCreditsUsed: number;
  ocrCreditsTotal: number;
  ocrCreditsUsed: number;
  autoRenew: boolean;
  adminOverrideNote?: string;
  lastOverriddenAt?: string;
}

const STORAGE_KEY_ADMIN_SUBSCRIPTIONS = "quizdorm_admin_subscriptions_db";

export const SEED_ADMIN_SUBSCRIPTIONS: AdminSubscriptionItem[] = [
  {
    id: "sub-101",
    subscriberName: "Government Model Higher Secondary School",
    subscriberEmail: "school@quizdorm.com",
    organizationName: "Government Model Higher Secondary School",
    subscriberType: "institution",
    planId: "institution",
    billingCycle: "annual",
    status: "active",
    currentPeriodStart: "2026-01-01",
    currentPeriodEnd: "2027-01-01",
    seatsAllocated: 25,
    seatsUsed: 18,
    aiCreditsTotal: 10000,
    aiCreditsUsed: 3420,
    ocrCreditsTotal: 2000,
    ocrCreditsUsed: 480,
    autoRenew: true,
    adminOverrideNote: "State school license grant verified.",
    lastOverriddenAt: "2026-01-15T10:00:00Z",
  },
  {
    id: "sub-102",
    subscriberName: "St. Jude International School District",
    subscriberEmail: "alan.vance@stjude.org",
    organizationName: "St. Jude International School District",
    subscriberType: "institution",
    planId: "enterprise",
    billingCycle: "annual",
    status: "active",
    currentPeriodStart: "2026-02-15",
    currentPeriodEnd: "2027-02-15",
    seatsAllocated: 100,
    seatsUsed: 42,
    aiCreditsTotal: 50000,
    aiCreditsUsed: 12850,
    ocrCreditsTotal: 10000,
    ocrCreditsUsed: 1420,
    autoRenew: true,
    adminOverrideNote: "Enterprise contract with dedicated AI router SLA.",
    lastOverriddenAt: "2026-02-15T12:30:00Z",
  },
  {
    id: "sub-103",
    subscriberName: "Prof. Sarah Jenkins (Physics Chair)",
    subscriberEmail: "teacher@quizdorm.com",
    organizationName: "Government Model Higher Secondary School",
    subscriberType: "teacher",
    planId: "professional",
    billingCycle: "annual",
    status: "active",
    currentPeriodStart: "2026-03-01",
    currentPeriodEnd: "2027-03-01",
    seatsAllocated: 5,
    seatsUsed: 2,
    aiCreditsTotal: 2500,
    aiCreditsUsed: 620,
    ocrCreditsTotal: 500,
    ocrCreditsUsed: 84,
    autoRenew: true,
    adminOverrideNote: "Lead educator research grant.",
    lastOverriddenAt: "2026-03-01T08:00:00Z",
  },
  {
    id: "sub-104",
    subscriberName: "Delhi Public Global Academy",
    subscriberEmail: "admin@delhipublic.org",
    organizationName: "Delhi Public Global Academy",
    subscriberType: "institution",
    planId: "institution",
    billingCycle: "monthly",
    status: "active",
    currentPeriodStart: "2026-10-01",
    currentPeriodEnd: "2026-11-01",
    seatsAllocated: 25,
    seatsUsed: 24,
    aiCreditsTotal: 10000,
    aiCreditsUsed: 9800,
    ocrCreditsTotal: 2000,
    ocrCreditsUsed: 1890,
    autoRenew: true,
    adminOverrideNote: "Approaching AI quota threshold (98% utilized).",
    lastOverriddenAt: "2026-10-01T09:15:00Z",
  },
  {
    id: "sub-105",
    subscriberName: "Dr. Rajesh Kumar (Mathematics)",
    subscriberEmail: "rajesh.kumar@saidapetmodel.edu.in",
    organizationName: "Government Model Higher Secondary School",
    subscriberType: "teacher",
    planId: "basic",
    billingCycle: "monthly",
    status: "active",
    currentPeriodStart: "2026-10-10",
    currentPeriodEnd: "2026-11-10",
    seatsAllocated: 1,
    seatsUsed: 1,
    aiCreditsTotal: 500,
    aiCreditsUsed: 490,
    ocrCreditsTotal: 100,
    ocrCreditsUsed: 92,
    autoRenew: true,
    adminOverrideNote: "Individual teacher starter seat.",
    lastOverriddenAt: "2026-10-10T14:00:00Z",
  },
  {
    id: "sub-106",
    subscriberName: "Cambridge International Partner Campus",
    subscriberEmail: "elena.rostova@cambridge-intl.ac.uk",
    organizationName: "Cambridge International Partner Campus",
    subscriberType: "institution",
    planId: "professional",
    billingCycle: "quarterly",
    status: "trial",
    currentPeriodStart: "2026-10-15",
    currentPeriodEnd: "2026-11-15",
    seatsAllocated: 5,
    seatsUsed: 1,
    aiCreditsTotal: 2500,
    aiCreditsUsed: 120,
    ocrCreditsTotal: 500,
    ocrCreditsUsed: 10,
    autoRenew: false,
    adminOverrideNote: "30-day institutional trial.",
    lastOverriddenAt: "2026-10-15T11:00:00Z",
  },
  {
    id: "sub-107",
    subscriberName: "Apex Coaching & Test Prep",
    subscriberEmail: "accounts@apexprep.edu",
    organizationName: "Apex Coaching Institute",
    subscriberType: "institution",
    planId: "basic",
    billingCycle: "monthly",
    status: "past_due",
    currentPeriodStart: "2026-09-01",
    currentPeriodEnd: "2026-10-01",
    seatsAllocated: 1,
    seatsUsed: 1,
    aiCreditsTotal: 500,
    aiCreditsUsed: 500,
    ocrCreditsTotal: 100,
    ocrCreditsUsed: 100,
    autoRenew: false,
    adminOverrideNote: "Payment failed; service grace period expired.",
    lastOverriddenAt: "2026-10-02T16:20:00Z",
  },
];

export class AdminSubscriptionManager {
  public static getSubscriptions(): AdminSubscriptionItem[] {
    if (typeof window === "undefined") return SEED_ADMIN_SUBSCRIPTIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_SUBSCRIPTIONS);
      if (!saved) {
        localStorage.setItem(
          STORAGE_KEY_ADMIN_SUBSCRIPTIONS,
          JSON.stringify(SEED_ADMIN_SUBSCRIPTIONS)
        );
        return SEED_ADMIN_SUBSCRIPTIONS;
      }
      return JSON.parse(saved);
    } catch {
      return SEED_ADMIN_SUBSCRIPTIONS;
    }
  }

  private static save(items: AdminSubscriptionItem[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_SUBSCRIPTIONS, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist admin subscriptions:", e);
    }
  }

  public static getSubscriptionById(id: string): AdminSubscriptionItem | undefined {
    return this.getSubscriptions().find((s) => s.id === id);
  }

  public static updatePlan(
    id: string,
    newPlanId: SubscriptionPlanId,
    cycle: BillingCycle = "annual",
    adminNote?: string
  ): AdminSubscriptionItem[] {
    const plan = SUBSCRIPTION_PLANS.find((p) => p.id === newPlanId) || SUBSCRIPTION_PLANS[0];
    const items = this.getSubscriptions().map((sub) => {
      if (sub.id !== id) return sub;
      return {
        ...sub,
        planId: newPlanId,
        billingCycle: cycle,
        status: "active" as const,
        seatsAllocated: Math.max(sub.seatsAllocated, plan.limits.maxUsers),
        aiCreditsTotal: Math.max(sub.aiCreditsTotal, plan.limits.aiCreditsPerMonth),
        ocrCreditsTotal: Math.max(sub.ocrCreditsTotal, plan.limits.ocrScansPerMonth),
        adminOverrideNote: adminNote || `Plan manually elevated to ${plan.name} by Superadmin.`,
        lastOverriddenAt: new Date().toISOString(),
      };
    });

    this.save(items);
    return items;
  }

  public static grantCredits(
    id: string,
    aiDelta: number,
    ocrDelta: number,
    adminNote?: string
  ): AdminSubscriptionItem[] {
    const items = this.getSubscriptions().map((sub) => {
      if (sub.id !== id) return sub;
      return {
        ...sub,
        aiCreditsTotal: sub.aiCreditsTotal + aiDelta,
        ocrCreditsTotal: sub.ocrCreditsTotal + ocrDelta,
        adminOverrideNote:
          adminNote ||
          `Manually granted +${aiDelta.toLocaleString()} AI credits and +${ocrDelta.toLocaleString()} OCR scans.`,
        lastOverriddenAt: new Date().toISOString(),
      };
    });

    this.save(items);
    return items;
  }

  public static overrideQuotas(
    id: string,
    seatsAllocated: number,
    aiCreditsTotal: number,
    ocrCreditsTotal: number,
    adminNote?: string
  ): AdminSubscriptionItem[] {
    const items = this.getSubscriptions().map((sub) => {
      if (sub.id !== id) return sub;
      return {
        ...sub,
        seatsAllocated,
        aiCreditsTotal,
        ocrCreditsTotal,
        adminOverrideNote:
          adminNote ||
          `Direct quota override: ${seatsAllocated} seats, ${aiCreditsTotal.toLocaleString()} AI credits, ${ocrCreditsTotal.toLocaleString()} OCR scans.`,
        lastOverriddenAt: new Date().toISOString(),
      };
    });

    this.save(items);
    return items;
  }

  public static updateStatus(
    id: string,
    newStatus: AdminSubscriptionItem["status"],
    adminNote?: string
  ): AdminSubscriptionItem[] {
    const items = this.getSubscriptions().map((sub) => {
      if (sub.id !== id) return sub;
      return {
        ...sub,
        status: newStatus,
        adminOverrideNote: adminNote || `Status changed to ${newStatus.toUpperCase()} by Superadmin.`,
        lastOverriddenAt: new Date().toISOString(),
      };
    });

    this.save(items);
    return items;
  }

  public static resetToSeed(): AdminSubscriptionItem[] {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_ADMIN_SUBSCRIPTIONS);
    }
    return SEED_ADMIN_SUBSCRIPTIONS;
  }
}

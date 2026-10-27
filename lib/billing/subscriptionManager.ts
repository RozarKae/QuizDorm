import { SubscriptionPlan,SubscriptionPlanId,UserSubscription } from "@/lib/types/billing";

const STORAGE_KEY_SUBSCRIPTION = "quizdorm_user_subscription";

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    id: "free",
    name: "Free Educator",
    description: "Essential quiz creation tools for individual teachers and students.",
    priceMonthlyUSD: 0,
    priceAnnualUSD: 0,
    priceMonthlyINR: 0,
    priceAnnualINR: 0,
    limits: {
      maxUsers: 1,
      aiCreditsPerMonth: 50,
      ocrScansPerMonth: 10,
      questionBankLimit: 100,
      activeQuizzesLimit: 5,
      competitionParticipantsLimit: 25,
      multimediaStorageGB: 1,
      certificateIssuanceLimit: 5,
    },
    features: [
      "Standard MCQ & True/False Builder",
      "50 Monthly AI Credits",
      "10 OCR Document Scans",
      "Basic Student Results",
    ],
  },
  {
    id: "basic",
    name: "Teacher Starter",
    description: "Expanded question bank and automated grading for school teachers.",
    priceMonthlyUSD: 1.19,
    priceAnnualUSD: 10,
    priceMonthlyINR: 99,
    priceAnnualINR: 990,
    limits: {
      maxUsers: 1,
      aiCreditsPerMonth: 500,
      ocrScansPerMonth: 100,
      questionBankLimit: 1000,
      activeQuizzesLimit: 25,
      competitionParticipantsLimit: 100,
      multimediaStorageGB: 5,
      certificateIssuanceLimit: 100,
    },
    features: [
      "500 Monthly AI Credits",
      "100 OCR Document Scans",
      "Spaced Repetition Revision Center",
      "PDF & Print Invoices",
    ],
  },
  {
    id: "professional",
    name: "Pro Institute",
    description: "Advanced AI Generation, Quality Auditor, Adaptive Engine & Verification.",
    priceMonthlyUSD: 2.99,
    priceAnnualUSD: 25,
    priceMonthlyINR: 249,
    priceAnnualINR: 2490,
    popular: true,
    badge: "MOST POPULAR",
    limits: {
      maxUsers: 5,
      aiCreditsPerMonth: 2500,
      ocrScansPerMonth: 500,
      questionBankLimit: 10000,
      activeQuizzesLimit: 100,
      competitionParticipantsLimit: 500,
      multimediaStorageGB: 25,
      certificateIssuanceLimit: 1000,
    },
    features: [
      "2,500 Monthly AI Credits",
      "500 OCR Document Scans",
      "AI Quality & Validation Engine",
      "Adaptive Learning Dashboard",
      "Digital Certificates & QR Verification",
      "5 Team Teacher Seats",
    ],
  },
  {
    id: "institution",
    name: "School & College",
    description: "Complete institution suite with white-labeling, bulk issuance, and analytics.",
    priceMonthlyUSD: 7.99,
    priceAnnualUSD: 75,
    priceMonthlyINR: 649,
    priceAnnualINR: 6490,
    limits: {
      maxUsers: 25,
      aiCreditsPerMonth: 10000,
      ocrScansPerMonth: 2000,
      questionBankLimit: 50000,
      activeQuizzesLimit: 500,
      competitionParticipantsLimit: 2500,
      multimediaStorageGB: 100,
      certificateIssuanceLimit: 5000,
    },
    features: [
      "10,000 Monthly AI Credits",
      "2,000 OCR Document Scans",
      "25 Faculty Seats & License Manager",
      "Custom Template Designer & QR Verifier",
      "Teacher AI Intervention Insights",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise Custom",
    description: "Dedicated server infrastructure, custom SLA, API access, and unlimited limits.",
    priceMonthlyUSD: 19.99,
    priceAnnualUSD: 190,
    priceMonthlyINR: 1599,
    priceAnnualINR: 15990,
    limits: {
      maxUsers: 100,
      aiCreditsPerMonth: 50000,
      ocrScansPerMonth: 10000,
      questionBankLimit: 999999,
      activeQuizzesLimit: 9999,
      competitionParticipantsLimit: 50000,
      multimediaStorageGB: 1000,
      certificateIssuanceLimit: 100000,
    },
    features: [
      "50,000 Monthly AI Credits",
      "10,000 OCR Document Scans",
      "Dedicated Gemini/OpenAI API Router",
      "Custom SSL & White Labeling",
      "24/7 Dedicated Support & SLA",
    ],
  },
];

export const DEFAULT_USER_SUBSCRIPTION: UserSubscription = {
  id: "sub-default-free",
  userId: "usr-current",
  userName: "Educator",
  userEmail: "",
  organizationName: "Personal Workspace",
  planId: "free",
  billingCycle: "monthly",
  status: "active",
  currentPeriodStart: "2026-01-01",
  currentPeriodEnd: "2099-12-31",
  autoRenew: false,
  seatsAllocated: 1,
  seatsUsed: 1,
  aiCreditsTotal: 50,
  aiCreditsUsed: 0,
  ocrCreditsTotal: 10,
  ocrCreditsUsed: 0,
};

export class SubscriptionManager {
  /**
   * Authoritative getter for current user subscription.
   * Client-side storage has NO authority to grant paid entitlements.
   * Any client-modified record attempting to claim a paid tier (basic, professional, institution, enterprise)
   * is rejected and reverts to the default free tier.
   */
  public static getSubscription(): UserSubscription {
    if (typeof window === "undefined") return DEFAULT_USER_SUBSCRIPTION;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SUBSCRIPTION);
      if (!saved) return DEFAULT_USER_SUBSCRIPTION;
      const parsed = JSON.parse(saved);

      // Security check: Client-side storage cannot grant paid subscription entitlements.
      if (parsed.planId && parsed.planId !== "free") {
        console.warn("[SECURITY] Client-side paid subscription entitlement rejected: localStorage cannot grant paid plans.");
        return DEFAULT_USER_SUBSCRIPTION;
      }

      return {
        ...DEFAULT_USER_SUBSCRIPTION,
        ...parsed,
        planId: "free",
        aiCreditsTotal: 50,
        ocrCreditsTotal: 10,
        seatsAllocated: 1,
      };
    } catch {
      return DEFAULT_USER_SUBSCRIPTION;
    }
  }

  public static getPlan(planId: SubscriptionPlanId): SubscriptionPlan {
    return SUBSCRIPTION_PLANS.find((p) => p.id === planId) || SUBSCRIPTION_PLANS[0];
  }

  /**
   * Updates subscription.
   * In production or secure environments, client code is strictly forbidden from granting paid entitlements.
   */
  public static updateSubscription(planId: SubscriptionPlanId, cycle: UserSubscription["billingCycle"]): UserSubscription {
    if (planId !== "free") {
      if (process.env.NODE_ENV === "production") {
        throw new Error(
          "Client-side subscription modification is forbidden in production. Subscriptions must be provisioned via verified server-side billing."
        );
      }
      // In development/sandbox demonstration, log security warning and do NOT store paid entitlement
      console.warn(
        `[SECURITY] Attempted client-side subscription upgrade to '${planId}'. Client-side paid plan activation is disabled.`
      );
      return DEFAULT_USER_SUBSCRIPTION;
    }

    const plan = this.getPlan("free");
    const current = this.getSubscription();

    const updated: UserSubscription = {
      ...current,
      planId: "free",
      billingCycle: cycle,
      status: "active",
      seatsAllocated: plan.limits.maxUsers,
      aiCreditsTotal: plan.limits.aiCreditsPerMonth,
      aiCreditsUsed: 0,
      ocrCreditsTotal: plan.limits.ocrScansPerMonth,
      ocrCreditsUsed: 0,
      currentPeriodEnd: new Date(Date.now() + 365 * 86400000).toISOString().split("T")[0],
    };

    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_SUBSCRIPTION, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update subscription", e);
      }
    }
    return updated;
  }
}

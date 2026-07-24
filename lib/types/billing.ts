export type SubscriptionPlanId =
  | "free"
  | "basic"
  | "professional"
  | "premium"
  | "institution"
  | "enterprise";

export type BillingCycle = "monthly" | "quarterly" | "annual" | "lifetime";

export type PaymentProviderType =
  | "razorpay"
  | "stripe"
  | "paypal"
  | "gpay"
  | "upi"
  | "mock";

export interface PlanLimits {
  maxUsers: number;
  aiCreditsPerMonth: number;
  ocrScansPerMonth: number;
  questionBankLimit: number;
  activeQuizzesLimit: number;
  competitionParticipantsLimit: number;
  multimediaStorageGB: number;
  certificateIssuanceLimit: number;
}

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  description: string;
  priceMonthlyUSD: number;
  priceAnnualUSD: number;
  priceMonthlyINR: number;
  limits: PlanLimits;
  features: string[];
  popular?: boolean;
  badge?: string;
}

export interface UserSubscription {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  organizationName?: string;
  planId: SubscriptionPlanId;
  billingCycle: BillingCycle;
  status: "active" | "trial" | "past_due" | "canceled" | "expired";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  autoRenew: boolean;
  seatsAllocated: number;
  seatsUsed: number;
  aiCreditsTotal: number;
  aiCreditsUsed: number;
  ocrCreditsTotal: number;
  ocrCreditsUsed: number;
}

export interface PaymentTransaction {
  id: string;
  subscriptionId: string;
  userId: string;
  provider: PaymentProviderType;
  amountUSD: number;
  amountINR: number;
  currency: "USD" | "INR";
  status: "success" | "pending" | "failed" | "refunded";
  paymentMethod: string;
  timestamp: string;
  invoiceNumber: string;
  taxAmountUSD: number;
  appliedCouponCode?: string;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPriceUSD: number;
  totalUSD: number;
}

export interface Invoice {
  invoiceNumber: string;
  recipientName: string;
  recipientOrg?: string;
  GSTIN?: string;
  billingAddress: string;
  items: InvoiceItem[];
  subtotalUSD: number;
  taxRatePercent: number;
  taxAmountUSD: number;
  totalAmountUSD: number;
  paymentStatus: "paid" | "unpaid" | "refunded";
  issuedDate: string;
  dueDate: string;
  pdfUrl?: string;
}

export interface Coupon {
  code: string;
  discountType: "percent" | "fixed";
  discountValue: number; // e.g. 20 for 20% or 10 for $10 off
  validUntil: string;
  usageCount: number;
  maxUsage: number;
}

export interface BillingAnalytics {
  monthlyRecurringRevenueUSD: number;
  annualRecurringRevenueUSD: number;
  activeSubscribersCount: number;
  churnRatePercent: number;
  totalTransactionsCount: number;
  aiCreditsConsumedTotal: number;
  ocrScansConsumedTotal: number;
}

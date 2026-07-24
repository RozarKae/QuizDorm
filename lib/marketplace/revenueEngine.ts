import { CreatorPayout } from "@/lib/types/marketplace";

export const DEFAULT_PAYOUTS: CreatorPayout[] = [
  { id: "po-101", creatorId: "cr-1", amountUSD: 2450, status: "completed", requestedAt: "2026-07-01T00:00:00Z" },
  { id: "po-102", creatorId: "cr-1", amountUSD: 3120, status: "processing", requestedAt: "2026-07-24T10:00:00Z" },
];

export class CreatorRevenueEngine {
  public static getPayouts(): CreatorPayout[] {
    return DEFAULT_PAYOUTS;
  }

  public static calculateEarnings(totalSalesUSD: number): { netEarningsUSD: number; platformFeeUSD: number } {
    const netEarningsUSD = Math.round(totalSalesUSD * 0.8 * 100) / 100;
    const platformFeeUSD = Math.round(totalSalesUSD * 0.2 * 100) / 100;
    return { netEarningsUSD, platformFeeUSD };
  }
}

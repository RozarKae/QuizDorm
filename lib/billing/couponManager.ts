import { Coupon } from "@/lib/types/billing";

export const VALID_COUPONS: Coupon[] = [
  { code: "TEACHER50", discountType: "percent", discountValue: 50, validUntil: "2026-12-31", usageCount: 142, maxUsage: 1000 },
  { code: "DISCOUNT20", discountType: "percent", discountValue: 20, validUntil: "2026-12-31", usageCount: 88, maxUsage: 500 },
  { code: "QUIZPRO10", discountType: "fixed", discountValue: 10, validUntil: "2026-12-31", usageCount: 45, maxUsage: 200 },
];

export class CouponManager {
  /**
   * Validate coupon code and return discount calculation
   */
  public static validateCoupon(code: string, originalAmountUSD: number): { valid: boolean; discountAmountUSD: number; finalAmountUSD: number; message: string } {
    const cleanCode = code.trim().toUpperCase();
    const coupon = VALID_COUPONS.find((c) => c.code === cleanCode);

    if (!coupon) {
      return {
        valid: false,
        discountAmountUSD: 0,
        finalAmountUSD: originalAmountUSD,
        message: "Invalid or expired coupon code.",
      };
    }

    let discountUSD = 0;
    if (coupon.discountType === "percent") {
      discountUSD = (originalAmountUSD * coupon.discountValue) / 100;
    } else {
      discountUSD = coupon.discountValue;
    }

    const finalUSD = Math.max(0, Number((originalAmountUSD - discountUSD).toFixed(2)));

    return {
      valid: true,
      discountAmountUSD: Number(discountUSD.toFixed(2)),
      finalAmountUSD: finalUSD,
      message: `Coupon [${coupon.code}] applied successfully! You saved $${discountUSD.toFixed(2)}.`,
    };
  }
}

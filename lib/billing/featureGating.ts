import { SubscriptionPlanId } from "@/lib/types/billing";
import { SubscriptionManager } from "./subscriptionManager";

export type FeatureKey =
  | "ai_generation"
  | "ocr_intelligence"
  | "multimedia_builder"
  | "quality_engine"
  | "adaptive_learning"
  | "certificate_issuance"
  | "team_collaboration"
  | "api_access";

export class FeatureGating {
  /**
   * Check if feature key is unlocked for a given plan ID
   */
  public static isFeatureUnlocked(featureKey: FeatureKey, planId?: SubscriptionPlanId): boolean {
    const activePlanId = planId || SubscriptionManager.getSubscription().planId;

    if (activePlanId === "enterprise") return true;

    switch (featureKey) {
      case "ai_generation":
      case "ocr_intelligence":
      case "multimedia_builder":
        return activePlanId !== "free";

      case "quality_engine":
      case "adaptive_learning":
      case "certificate_issuance":
        return activePlanId === "professional" || activePlanId === "institution" || activePlanId === "premium";

      case "team_collaboration":
      case "api_access":
        return activePlanId === "institution";

      default:
        return true;
    }
  }
}

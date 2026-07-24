import { CreatorProfile } from "@/lib/types/marketplace";

export const DEFAULT_CREATOR_PROFILE: CreatorProfile = {
  id: "cr-1",
  name: "Dr. Eleanor Vance",
  bio: "Master Physics & Mathematics Educator. 15+ years experience crafting AP and Olympiad standard question banks.",
  storefrontSlug: "eleanor-vance",
  verifiedBadge: true,
  totalSalesUSD: 14250,
  totalProducts: 8,
  followersCount: 3420,
  rating: 4.9,
};

export class CreatorProfileManager {
  public static getProfile(): CreatorProfile {
    return DEFAULT_CREATOR_PROFILE;
  }
}

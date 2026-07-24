export type ProductCategory = "question_bank" | "quiz_pack" | "exam_paper" | "ai_prompt_library" | "curriculum_kit" | "competition_pack";

export type LicenseType = "personal" | "classroom" | "school" | "organization" | "enterprise";

export interface MarketplaceProduct {
  id: string;
  title: string;
  description: string;
  category: ProductCategory;
  creatorId: string;
  creatorName: string;
  creatorAvatarUrl?: string;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  downloadsCount: number;
  licenseType: LicenseType;
  featured: boolean;
  tags: string[];
  previewQuestionsCount: number;
  createdAt: string;
}

export interface CreatorProfile {
  id: string;
  name: string;
  bio: string;
  storefrontSlug: string;
  verifiedBadge: boolean;
  totalSalesUSD: number;
  totalProducts: number;
  followersCount: number;
  rating: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
  verifiedPurchase: boolean;
}

export interface CreatorPayout {
  id: string;
  creatorId: string;
  amountUSD: number;
  status: "completed" | "processing" | "pending";
  requestedAt: string;
}

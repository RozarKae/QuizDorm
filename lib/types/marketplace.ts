export type LicenseType = 
  | "single_use" 
  | "personal" 
  | "institutional" 
  | "unlimited" 
  | "commercial" 
  | "classroom" 
  | "school"
  | "enterprise";

export type ProductCategory = 
  | "Question Banks" 
  | "Quiz Templates" 
  | "Courses" 
  | "Lesson Plans" 
  | "E-books" 
  | "Worksheets" 
  | "AI Prompts" 
  | "Plugins & API"
  | "question_bank"
  | "ai_prompt_library"
  | "competition_pack"
  | "quiz_template"
  | "course_pack";

export interface MarketplaceProduct {
  id: string;
  creatorId?: string;
  title: string;
  category: ProductCategory;
  creatorName: string;
  creatorAvatarUrl?: string;
  priceUSD: number;
  rating: number;
  reviewsCount: number;
  downloadCount?: number;
  downloadsCount?: number;
  previewUrl?: string;
  isFeatured?: boolean;
  featured?: boolean;
  isInstitutionalEligible?: boolean;
  description?: string;
  previewQuestionsCount?: number;
  licenseType?: LicenseType;
  tags?: string[];
  createdAt?: string;
}

export interface CreatorProfile {
  id?: string;
  creatorId?: string;
  name: string;
  storeName?: string;
  tagline?: string;
  totalProductsCount?: number;
  totalProducts?: number;
  totalEarningsUSD?: number;
  totalSalesUSD?: number;
  ratingAverage?: number;
  rating?: number;
  verifiedCreator?: boolean;
  verifiedBadge?: boolean;
  storefrontSlug?: string;
  followersCount?: number;
  bio?: string;
  topSellingProduct?: string;
}

export interface CreatorPayout {
  id?: string;
  payoutId?: string;
  creatorId: string;
  amountUSD: number;
  payoutDate?: string;
  requestedAt?: string;
  status: "Pending" | "Completed" | "Processing" | "completed" | "processing" | "pending";
}

export interface InstitutionalLicense {
  licenseId: string;
  institutionName: string;
  productTitle: string;
  seatCount: number;
  unitPriceUSD: number;
  totalPriceUSD: number;
  validityMonths: number;
}

export interface EducationalService {
  serviceId: string;
  title: string;
  providerName: string;
  hourlyRateUSD: number;
  rating: number;
  category: "Tutoring" | "Curriculum Consulting" | "Question Paper Drafting" | "AI Education";
  availableSlots: string[];
}

export interface ShoppingCartItem {
  productId: string;
  title: string;
  priceUSD: number;
  quantity: number;
}

export interface ProductReview {
  id: string;
  productId: string;
  reviewerName: string;
  ratingStars: number;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
}

export interface AIMarketplaceRecommendation {
  productId: string;
  title: string;
  matchScorePercent: number;
  recommendationReason: string;
}

export interface MarketplaceSalesAnalytics {
  totalGrossRevenueUSD: number;
  totalOrdersCount: number;
  averageOrderValueUSD: number;
  topCategoryBySales: string;
  activeSellersCount: number;
}

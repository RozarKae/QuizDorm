import { MarketplaceProduct,ProductCategory } from "@/lib/types/marketplace";

const STORAGE_KEY_PRODUCTS = "quizdorm_marketplace_products";

export const DEFAULT_MARKETPLACE_PRODUCTS: MarketplaceProduct[] = [
  {
    id: "prod-101",
    title: "Master Grade 12 Calculus & Physics Question Pack (450 Qs)",
    description: "Complete AP Physics & Calculus derivative question bank created by Master Teacher Dr. Vance.",
    category: "question_bank",
    creatorId: "cr-1",
    creatorName: "Dr. Eleanor Vance",
    priceUSD: 29.99,
    rating: 4.9,
    reviewsCount: 128,
    downloadsCount: 1420,
    licenseType: "classroom",
    featured: true,
    tags: ["Calculus", "Physics", "AP Standard"],
    previewQuestionsCount: 20,
    createdAt: "2026-07-20T00:00:00Z",
  },
  {
    id: "prod-102",
    title: "AI Question Generator Prompt Engineering Toolkit",
    description: "Curated prompt template library for generating Bloom's Taxonomy aligned STEM quizzes.",
    category: "ai_prompt_library",
    creatorId: "cr-2",
    creatorName: "QuizDorm AI Labs",
    priceUSD: 19.99,
    rating: 4.8,
    reviewsCount: 94,
    downloadsCount: 980,
    licenseType: "school",
    featured: true,
    tags: ["AI Prompts", "Bloom Taxonomy", "STEM"],
    previewQuestionsCount: 15,
    createdAt: "2026-07-22T00:00:00Z",
  },
  {
    id: "prod-103",
    title: "International Biology Olympiad Practice Collection",
    description: "15 full-length mock tests for International Biology League competitors with detailed AI explanations.",
    category: "competition_pack",
    creatorId: "cr-3",
    creatorName: "Prof. Arthur Pendelton",
    priceUSD: 39.99,
    rating: 5.0,
    reviewsCount: 210,
    downloadsCount: 2150,
    licenseType: "enterprise",
    featured: true,
    tags: ["Olympiad", "Biology", "Scholarship"],
    previewQuestionsCount: 25,
    createdAt: "2026-07-21T00:00:00Z",
  },
];

export class MarketplaceProductManager {
  public static getProducts(category?: ProductCategory): MarketplaceProduct[] {
    if (typeof window === "undefined") return DEFAULT_MARKETPLACE_PRODUCTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      const list: MarketplaceProduct[] = saved ? JSON.parse(saved) : DEFAULT_MARKETPLACE_PRODUCTS;
      return category ? list.filter((p) => p.category === category) : list;
    } catch {
      return DEFAULT_MARKETPLACE_PRODUCTS;
    }
  }

  public static addProduct(product: Omit<MarketplaceProduct, "id" | "createdAt" | "downloadsCount" | "rating" | "reviewsCount">): MarketplaceProduct {
    const list = this.getProducts();
    const newProd: MarketplaceProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      rating: 5.0,
      reviewsCount: 1,
      downloadsCount: 1,
      createdAt: new Date().toISOString(),
    };
    const updated = [newProd, ...list];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to add product", e);
      }
    }
    return newProd;
  }
}

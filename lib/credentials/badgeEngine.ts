import { AchievementBadge } from "@/lib/types/credentials";

const STORAGE_KEY_BADGES = "quizdorm_user_badges";

export const DEFAULT_BADGES: AchievementBadge[] = [
  {
    id: "badge-streak-7",
    title: "7-Day Study Champion",
    description: "Maintained an active quiz practice streak for 7 consecutive days.",
    category: "streak",
    level: "gold",
    icon: "flame",
    unlockedAt: "2026-07-24",
    progressPercent: 100,
    unlocked: true,
  },
  {
    id: "badge-math-master",
    title: "Calculus Master",
    description: "Achieved >90% accuracy in Algebra & Calculus topic quizzes.",
    category: "mastery",
    level: "platinum",
    icon: "sigma",
    unlockedAt: "2026-07-22",
    progressPercent: 100,
    unlocked: true,
  },
  {
    id: "badge-quiz-100",
    title: "Century Quizzer",
    description: "Successfully completed 100 quizzes across subjects.",
    category: "mastery",
    level: "diamond",
    icon: "trophy",
    unlockedAt: undefined,
    progressPercent: 65,
    unlocked: false,
  },
  {
    id: "badge-speed-demon",
    title: "Lightning Speed",
    description: "Answered 10 questions in under 15 seconds with 100% accuracy.",
    category: "speed",
    level: "silver",
    icon: "zap",
    unlockedAt: "2026-07-15",
    progressPercent: 100,
    unlocked: true,
  },
];

export class BadgeEngine {
  public static getBadges(): AchievementBadge[] {
    if (typeof window === "undefined") return DEFAULT_BADGES;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_BADGES);
      return saved ? JSON.parse(saved) : DEFAULT_BADGES;
    } catch {
      return DEFAULT_BADGES;
    }
  }
}

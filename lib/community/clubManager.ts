import { ClubCategory,QuizClub } from "@/lib/types/community";

const STORAGE_KEY_CLUBS = "quizdorm_community_clubs";

export const DEFAULT_QUIZ_CLUBS: QuizClub[] = [
  {
    id: "club-101",
    name: "International Physics Olympiad Contenders",
    description: "Global community of physics enthusiasts preparing for IPhO and national science championships.",
    category: "olympiad_club",
    membersCount: 1420,
    verifiedBadge: true,
    leaderName: "Dr. Eleanor Vance",
  },
  {
    id: "club-102",
    name: "Chennai & Madurai Student AI & Science Club",
    description: "Regional student club dedicated to STEM research, machine learning quizzes, and Olympiad prep.",
    category: "school_club",
    membersCount: 380,
    verifiedBadge: true,
    leaderName: "Karthik Rajendran",
  },
  {
    id: "club-103",
    name: "Kerala Mathematical & Algorithmic Guild",
    description: "Collaborative study group across Kochi and Trivandrum for calculus, algorithms, and logic challenges.",
    category: "subject_club",
    membersCount: 890,
    verifiedBadge: false,
    leaderName: "Kevin Fernandez",
  },
];

export class QuizClubManager {
  public static getClubs(category?: ClubCategory): QuizClub[] {
    if (typeof window === "undefined") return DEFAULT_QUIZ_CLUBS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CLUBS);
      const list: QuizClub[] = saved ? JSON.parse(saved) : DEFAULT_QUIZ_CLUBS;
      return category ? list.filter((c) => c.category === category) : list;
    } catch {
      return DEFAULT_QUIZ_CLUBS;
    }
  }

  public static joinClub(clubId: string): { success: boolean; newCount: number } {
    const clubs = this.getClubs();
    const target = clubs.find((c) => c.id === clubId);
    if (target) {
      target.membersCount += 1;
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(STORAGE_KEY_CLUBS, JSON.stringify(clubs));
        } catch (e) {
          console.error("Failed to save club membership", e);
        }
      }
      return { success: true, newCount: target.membersCount };
    }
    return { success: false, newCount: 0 };
  }
}

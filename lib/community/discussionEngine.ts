import { CommunityPost,DiscussionTag } from "@/lib/types/community";

const STORAGE_KEY_POSTS = "quizdorm_community_posts";

export const DEFAULT_POSTS: CommunityPost[] = [
  {
    id: "post-101",
    authorName: "Aarav Sharma",
    authorRole: "Student • Gold Medalist",
    title: "How to master Integration by Parts for AP Calculus?",
    content: "When applying ∫u dv = uv - ∫v du, what is the best strategy to select 'u' vs 'dv'? I always get stuck with exponential trig combinations.",
    tags: ["question_answer", "study_notes"],
    upvotesCount: 42,
    commentsCount: 12,
    acceptedAnswer: true,
    timestamp: "2 hours ago",
    aiSummary: "LIATE rule (Logarithmic, Inverse trig, Algebraic, Trig, Exponential) is the recommended prioritization.",
  },
  {
    id: "post-102",
    authorName: "Dr. Eleanor Vance",
    authorRole: "Master Educator & Mentor",
    title: "Official IPhO 2026 Olympiad Practice Guide Released!",
    content: "We have published 50 new multi-choice and numerical physics questions in the QuizDorm Marketplace. Free for verified school clubs!",
    tags: ["competition_prep", "ai_tips"],
    upvotesCount: 128,
    commentsCount: 24,
    acceptedAnswer: false,
    timestamp: "5 hours ago",
    aiSummary: "Announcement of free physics olympiad materials for registered school clubs.",
  },
];

export class DiscussionForumEngine {
  public static getPosts(tag?: DiscussionTag): CommunityPost[] {
    if (typeof window === "undefined") return DEFAULT_POSTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_POSTS);
      const list: CommunityPost[] = saved ? JSON.parse(saved) : DEFAULT_POSTS;
      return tag ? list.filter((p) => p.tags.includes(tag)) : list;
    } catch {
      return DEFAULT_POSTS;
    }
  }

  public static addPost(post: Omit<CommunityPost, "id" | "timestamp" | "upvotesCount" | "commentsCount" | "acceptedAnswer">): CommunityPost {
    const list = this.getPosts();
    const newPost: CommunityPost = {
      ...post,
      id: `post-${Date.now()}`,
      upvotesCount: 1,
      commentsCount: 0,
      acceptedAnswer: false,
      timestamp: "Just now",
      aiSummary: "Community academic discussion entry.",
    };
    const updated = [newPost, ...list];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_POSTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to add post", e);
      }
    }
    return newPost;
  }
}

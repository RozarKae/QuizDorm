import { Announcement } from "@/lib/types/communication";

const STORAGE_KEY_ANNOUNCEMENTS = "quizdorm_announcements";

export const DEFAULT_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "anc-101",
    title: "Mid-Term Physics & Chemistry Live Quiz Competition Announced",
    content: "The National QuizDorm Physics League starts this Friday at 4:00 PM EST. Top 3 winners earn Gold Certification and 500 AI credits.",
    authorName: "Dr. Eleanor Vance",
    authorRole: "Dean of Academics",
    priority: "urgent",
    targetAudience: "all",
    createdAt: "2026-07-24T09:00:00Z",
    expiresAt: "2026-07-30T23:59:59Z",
    pinned: true,
  },
  {
    id: "anc-102",
    title: "System Maintenance & Gemini AI Router Upgrade",
    content: "Scheduled infrastructure maintenance on Saturday 2:00 AM - 3:00 AM EST. Quiz submissions will be queued automatically.",
    authorName: "QuizDorm DevOps",
    authorRole: "Platform System Admin",
    priority: "important",
    targetAudience: "teachers",
    createdAt: "2026-07-23T14:00:00Z",
    pinned: false,
  },
];

export class AnnouncementService {
  public static getAnnouncements(): Announcement[] {
    if (typeof window === "undefined") return DEFAULT_ANNOUNCEMENTS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ANNOUNCEMENTS);
      return saved ? JSON.parse(saved) : DEFAULT_ANNOUNCEMENTS;
    } catch {
      return DEFAULT_ANNOUNCEMENTS;
    }
  }

  public static createAnnouncement(params: {
    title: string;
    content: string;
    authorName: string;
    authorRole: string;
    priority: "normal" | "important" | "urgent";
    targetAudience: "all" | "teachers" | "students" | "organization" | "class";
  }): Announcement {
    const newAnc: Announcement = {
      id: `anc-${Date.now()}`,
      title: params.title,
      content: params.content,
      authorName: params.authorName,
      authorRole: params.authorRole,
      priority: params.priority,
      targetAudience: params.targetAudience,
      createdAt: new Date().toISOString(),
      pinned: params.priority === "urgent",
    };

    const current = this.getAnnouncements();
    const updated = [newAnc, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_ANNOUNCEMENTS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to create announcement", e);
      }
    }
    return newAnc;
  }
}

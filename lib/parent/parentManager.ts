import { ParentGuardian, ChildProfile } from "@/lib/types/parent";

const STORAGE_KEY_PARENT = "quizdorm_parent_profile";
const STORAGE_KEY_ACTIVE_CHILD = "quizdorm_active_child_id";

export const DEFAULT_LINKED_CHILDREN: ChildProfile[] = [
  {
    id: "std-101",
    name: "Alex Rivera",
    grade: "Grade 12 Advanced Science",
    schoolName: "St. Jude International School",
    overallPerformancePercent: 92,
    attendancePercent: 98,
    currentStreak: 7,
    weakSubject: "Circulatory Anatomy",
    strongSubject: "Calculus & Algebra",
  },
  {
    id: "std-102",
    name: "Sofia Rivera",
    grade: "Grade 9 General Science",
    schoolName: "St. Jude Middle School",
    overallPerformancePercent: 86,
    attendancePercent: 95,
    currentStreak: 4,
    weakSubject: "Cellular Respiration",
    strongSubject: "World History",
  },
];

export const DEFAULT_PARENT: ParentGuardian = {
  id: "prn-101",
  name: "Carlos Rivera",
  email: "carlos.rivera@gmail.com",
  phone: "+1 (555) 234-5678",
  relationship: "father",
  linkedChildren: DEFAULT_LINKED_CHILDREN,
  verificationStatus: "verified",
};

export class ParentManager {
  public static getParentProfile(): ParentGuardian {
    if (typeof window === "undefined") return DEFAULT_PARENT;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PARENT);
      return saved ? JSON.parse(saved) : DEFAULT_PARENT;
    } catch {
      return DEFAULT_PARENT;
    }
  }

  public static getActiveChildId(): string {
    if (typeof window === "undefined") return "std-101";
    return localStorage.getItem(STORAGE_KEY_ACTIVE_CHILD) || "std-101";
  }

  public static setActiveChildId(childId: string): void {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_ACTIVE_CHILD, childId);
      } catch (e) {
        console.error("Failed to set active child", e);
      }
    }
  }
}

import { ParentGuardian, ChildProfile } from "@/lib/types/parent";

const STORAGE_KEY_PARENT = "quizdorm_parent_profile";
const STORAGE_KEY_ACTIVE_CHILD = "quizdorm_active_child_id";

export const DEFAULT_LINKED_CHILDREN: ChildProfile[] = [
  {
    id: "std-101",
    name: "Karthik Rajendran",
    grade: "Class 12 Higher Secondary (Maths-Biology)",
    schoolName: "Government Model HSS Saidapet, Chennai",
    overallPerformancePercent: 92,
    attendancePercent: 98,
    currentStreak: 7,
    weakSubject: "Circulatory Anatomy",
    strongSubject: "Calculus & Algebra",
  },
  {
    id: "std-102",
    name: "Meenakshi Rajendran",
    grade: "Class 10 Secondary School",
    schoolName: "Government Girls HSS, Chennai",
    overallPerformancePercent: 86,
    attendancePercent: 95,
    currentStreak: 4,
    weakSubject: "Cellular Respiration",
    strongSubject: "Regional & World History",
  },
];

export const DEFAULT_PARENT: ParentGuardian = {
  id: "prn-101",
  name: "K. Rajendran",
  email: "rajendran.k@gmail.com",
  phone: "+91 94440 12345",
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

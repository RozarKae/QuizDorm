import { ParentApprovalRequest } from "@/lib/types/parent";

const STORAGE_KEY_APPROVALS = "quizdorm_parent_approvals";

export const DEFAULT_APPROVALS: ParentApprovalRequest[] = [
  {
    id: "appr-101",
    studentId: "std-101",
    title: "Tamil Nadu & Kerala Science Olympiad Consent",
    type: "competition_consent",
    description: "Parental consent required for Karthik Rajendran to participate in the Inter-District QuizDorm Physics League.",
    dueDate: "2026-07-28",
    status: "pending",
    requestedBy: "Dr. K. Saravanan (Headmaster)",
  },
  {
    id: "appr-102",
    studentId: "std-101",
    title: "Regional Science Center & Planetarium Field Trip Permission",
    type: "field_trip",
    description: "Digital permission slip for the Class 12 Advanced Biology Science Center excursion.",
    dueDate: "2026-07-30",
    status: "approved",
    requestedBy: "Government Model HSS Administration",
  },
];

export class ParentApprovalService {
  public static getApprovals(studentId: string): ParentApprovalRequest[] {
    if (typeof window === "undefined") return DEFAULT_APPROVALS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPROVALS);
      const list: ParentApprovalRequest[] = saved ? JSON.parse(saved) : DEFAULT_APPROVALS;
      return list.filter((a) => a.studentId === studentId);
    } catch {
      return DEFAULT_APPROVALS;
    }
  }

  public static updateApprovalStatus(id: string, status: "approved" | "declined"): ParentApprovalRequest[] {
    if (typeof window === "undefined") return DEFAULT_APPROVALS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_APPROVALS);
      const list: ParentApprovalRequest[] = saved ? JSON.parse(saved) : DEFAULT_APPROVALS;
      const updated = list.map((a) => (a.id === id ? { ...a, status } : a));
      localStorage.setItem(STORAGE_KEY_APPROVALS, JSON.stringify(updated));
      return updated;
    } catch {
      return DEFAULT_APPROVALS;
    }
  }
}

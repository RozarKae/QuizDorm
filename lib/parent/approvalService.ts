import { ParentApprovalRequest } from "@/lib/types/parent";

const STORAGE_KEY_APPROVALS = "quizdorm_parent_approvals";

export const DEFAULT_APPROVALS: ParentApprovalRequest[] = [
  {
    id: "appr-101",
    studentId: "std-101",
    title: "National Physics & Science Competition Participation",
    type: "competition_consent",
    description: "Parental consent required for Alex Rivera to participate in the National QuizDorm Physics League.",
    dueDate: "2026-07-28",
    status: "pending",
    requestedBy: "Dr. Eleanor Vance",
  },
  {
    id: "appr-102",
    studentId: "std-101",
    title: "Science Museum Field Trip Permission Form",
    type: "field_trip",
    description: "Digital permission slip for the Grade 12 Advanced Biology Science Center excursion.",
    dueDate: "2026-07-30",
    status: "approved",
    requestedBy: "St. Jude Administration",
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

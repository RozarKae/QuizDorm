export type OrganizationType =
  | "School"
  | "College"
  | "Quiz Institute"
  | "Coaching Centre"
  | "NGO"
  | "Corporate"
  | "Training Center";

export interface OrganizationBranding {
  primaryColor: string; // e.g. #4F46E5
  secondaryColor: string; // e.g. #10B981
  logoUrl?: string;
  faviconUrl?: string;
  loginBgUrl?: string;
  dashboardTheme: "light" | "dark" | "system";
}

export interface DepartmentItem {
  id: string;
  orgId: string;
  name: string;
  description?: string;
  headName?: string;
  memberCount: number;
  quizCount: number;
}

export interface AcademicYearItem {
  id: string;
  orgId: string;
  name: string; // e.g. "2025 - 2026 Academic Term"
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface OrgMemberItem {
  id: string;
  orgId: string;
  name: string;
  email: string;
  role: "Owner" | "Administrator" | "Teacher" | "Student";
  department: string;
  status: "Active" | "Pending" | "Suspended";
  joinedDate: string;
  avatar?: string;
}

export interface OrgInvitationItem {
  id: string;
  orgId: string;
  email: string;
  role: "Administrator" | "Teacher" | "Student";
  department: string;
  status: "Pending" | "Accepted" | "Expired";
  sentDate: string;
  joinLink: string;
}

export interface OrganizationItem {
  id: string;
  name: string;
  logo?: string;
  coverImage?: string;
  description: string;
  type: OrganizationType;
  country: string;
  state: string;
  city: string;
  address?: string;
  contactNumber?: string;
  email: string;
  website?: string;
  timezone: string;
  preferredLanguage: string;
  branding: OrganizationBranding;
  teacherCount: number;
  studentCount: number;
  departmentCount: number;
  quizCount: number;
  createdAt: string;
  updatedAt: string;
}

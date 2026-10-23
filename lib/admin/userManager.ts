import { UserRole } from "@/lib/types/user";

export type UserStatus = "active" | "suspended" | "pending";
export type AuthProviderType = "email" | "google" | "sso" | "saml";

export interface AdminUser {
  id: string; // User ID / UUID
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  authProvider: AuthProviderType;
  organizationName?: string;
  organizationId?: string;
  department?: string;
  avatarUrl?: string;
  twoFactorEnabled: boolean;
  activeSessionsCount: number;
  lastLoginAt: string;
  createdAt: string;
  lastKnownIp?: string;
}

const STORAGE_KEY_ADMIN_USERS = "quizdorm_admin_users_db";

export const SEED_ADMIN_USERS: AdminUser[] = [
  {
    id: "usr-admin-01",
    name: "Master Superadmin",
    email: "admin@quizdorm.com",
    role: "admin",
    status: "active",
    authProvider: "email",
    organizationName: "QuizDorm Global Infrastructure",
    organizationId: "tnt-101",
    department: "System Security & Ops",
    twoFactorEnabled: true,
    activeSessionsCount: 2,
    lastLoginAt: "Just now",
    createdAt: "2025-01-01T00:00:00Z",
    lastKnownIp: "127.0.0.1 (Local Node)",
  },
  {
    id: "usr-school-01",
    name: "Govt Model & Matriculation Admin",
    email: "school@quizdorm.com",
    role: "school",
    status: "active",
    authProvider: "email",
    organizationName: "Government Model Higher Secondary School",
    organizationId: "org-101",
    department: "Campus Administration",
    twoFactorEnabled: true,
    activeSessionsCount: 1,
    lastLoginAt: "10 mins ago",
    createdAt: "2025-06-12T14:20:00Z",
    lastKnownIp: "103.21.124.9 (Chennai, IN)",
  },
  {
    id: "usr-teacher-01",
    name: "Prof. Sarah Jenkins",
    email: "teacher@quizdorm.com",
    role: "teacher",
    status: "active",
    authProvider: "email",
    organizationName: "Government Model Higher Secondary School",
    organizationId: "org-101",
    department: "Physics & Natural Sciences",
    twoFactorEnabled: false,
    activeSessionsCount: 1,
    lastLoginAt: "25 mins ago",
    createdAt: "2025-07-04T08:15:00Z",
    lastKnownIp: "103.21.124.12 (Chennai, IN)",
  },
  {
    id: "usr-teacher-02",
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@saidapetmodel.edu.in",
    role: "teacher",
    status: "active",
    authProvider: "google",
    organizationName: "Government Model Higher Secondary School",
    organizationId: "org-101",
    department: "Advanced Mathematics",
    twoFactorEnabled: true,
    activeSessionsCount: 1,
    lastLoginAt: "1 hour ago",
    createdAt: "2025-08-19T11:00:00Z",
    lastKnownIp: "49.207.200.18 (Bangalore, IN)",
  },
  {
    id: "usr-student-01",
    name: "Karthik Rajendran",
    email: "student@quizdorm.com",
    role: "student",
    status: "active",
    authProvider: "email",
    organizationName: "Government Model Higher Secondary School",
    organizationId: "org-101",
    department: "Class 12 - STEM",
    twoFactorEnabled: false,
    activeSessionsCount: 3,
    lastLoginAt: "4 mins ago",
    createdAt: "2025-09-01T10:00:00Z",
    lastKnownIp: "157.49.12.88 (Coimbatore, IN)",
  },
  {
    id: "usr-student-02",
    name: "Ananya Sharma",
    email: "ananya.sharma@delhipublic.org",
    role: "student",
    status: "active",
    authProvider: "google",
    organizationName: "Delhi Public Global Academy",
    organizationId: "org-102",
    department: "Class 11 - Pre-Med",
    twoFactorEnabled: false,
    activeSessionsCount: 1,
    lastLoginAt: "3 hours ago",
    createdAt: "2025-10-14T16:45:00Z",
    lastKnownIp: "182.73.24.102 (New Delhi, IN)",
  },
  {
    id: "usr-school-02",
    name: "Dr. Alan Vance",
    email: "alan.vance@stjude.org",
    role: "school",
    status: "active",
    authProvider: "sso",
    organizationName: "St. Jude International School District",
    organizationId: "tnt-102",
    department: "District Academic Operations",
    twoFactorEnabled: true,
    activeSessionsCount: 2,
    lastLoginAt: "Yesterday",
    createdAt: "2026-02-15T10:00:00Z",
    lastKnownIp: "72.229.28.185 (New York, US)",
  },
  {
    id: "usr-flagged-09",
    name: "Automated Rogue Scraper",
    email: "bot-spammer@crawler-network.net",
    role: "student",
    status: "suspended",
    authProvider: "email",
    organizationName: "Unverified Public",
    department: "None",
    twoFactorEnabled: false,
    activeSessionsCount: 0,
    lastLoginAt: "3 days ago",
    createdAt: "2026-10-18T04:12:00Z",
    lastKnownIp: "185.220.101.4 (Tor Exit Node)",
  },
  {
    id: "usr-pending-12",
    name: "Elena Rostova",
    email: "elena.rostova@cambridge-intl.ac.uk",
    role: "teacher",
    status: "pending",
    authProvider: "saml",
    organizationName: "Cambridge International Partner Campus",
    department: "Modern Languages & Literature",
    twoFactorEnabled: false,
    activeSessionsCount: 0,
    lastLoginAt: "Never (Pending Verification)",
    createdAt: "2026-10-22T09:30:00Z",
    lastKnownIp: "Awaiting activation",
  },
];

export class AdminUserManager {
  public static getUsers(): AdminUser[] {
    if (typeof window === "undefined") return SEED_ADMIN_USERS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_USERS);
      if (!saved) {
        localStorage.setItem(STORAGE_KEY_ADMIN_USERS, JSON.stringify(SEED_ADMIN_USERS));
        return SEED_ADMIN_USERS;
      }
      return JSON.parse(saved);
    } catch {
      return SEED_ADMIN_USERS;
    }
  }

  private static saveUsers(users: AdminUser[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_USERS, JSON.stringify(users));
    } catch (e) {
      console.error("Failed to persist admin users:", e);
    }
  }

  public static getUserById(id: string): AdminUser | undefined {
    return this.getUsers().find((u) => u.id === id);
  }

  public static updateUserRole(id: string, newRole: UserRole): AdminUser[] {
    const users = this.getUsers().map((u) =>
      u.id === id ? { ...u, role: newRole } : u
    );
    this.saveUsers(users);
    return users;
  }

  public static toggleUserStatus(id: string, newStatus: UserStatus): AdminUser[] {
    const users = this.getUsers().map((u) =>
      u.id === id ? { ...u, status: newStatus } : u
    );
    this.saveUsers(users);
    return users;
  }

  public static resetPassword(id: string): { success: boolean; tempCode: string } {
    const tempCode = `QD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return { success: true, tempCode };
  }

  public static deleteUser(id: string): AdminUser[] {
    const users = this.getUsers().filter((u) => u.id !== id);
    this.saveUsers(users);
    return users;
  }

  public static createUser(
    userData: Omit<AdminUser, "id" | "createdAt" | "lastLoginAt" | "activeSessionsCount">
  ): AdminUser {
    const newUser: AdminUser = {
      ...userData,
      id: `usr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString(),
      lastLoginAt: "Never (Newly Provisioned)",
      activeSessionsCount: 0,
      lastKnownIp: "Awaiting First Connection",
    };

    const users = [newUser, ...this.getUsers()];
    this.saveUsers(users);
    return newUser;
  }

  public static resetToSeed(): AdminUser[] {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_ADMIN_USERS);
    }
    return SEED_ADMIN_USERS;
  }
}

import { UserRole, normalizeCanonicalRole } from "@/lib/types/user";

export type SessionStatus = "active" | "idle" | "revoked" | "flagged";
export type SessionRiskScore = "low" | "medium" | "high" | "critical";
export type DeviceCategory = "desktop" | "mobile" | "tablet" | "headless" | "bot";

export interface AdminSession {
  id: string; // Session Node ID e.g. "ses-node-8821"
  userId: string;
  userName: string;
  userEmail: string;
  userRole: UserRole;
  organizationName: string;
  deviceCategory: DeviceCategory;
  browser: string;
  os: string;
  ipAddress: string;
  location: string;
  status: SessionStatus;
  riskScore: SessionRiskScore;
  loginAt: string;
  lastActiveAt: string;
  isCurrentSession?: boolean;
  userAgent: string;
  clientFingerprint: string;
  jwtExpiresAt: string;
}

const STORAGE_KEY_ADMIN_SESSIONS = "quizdorm_admin_sessions_db_v2";

export const SEED_ADMIN_SESSIONS: AdminSession[] = [
  {
    id: "ses-root-01",
    userId: "usr-admin-01",
    userName: "Master Superadmin",
    userEmail: "admin@quizdorm.com",
    userRole: "admin",
    organizationName: "QuizDorm Global Infrastructure",
    deviceCategory: "desktop",
    browser: "Google Chrome 128.0 (ARM64)",
    os: "Windows 11 Pro 64-bit",
    ipAddress: "127.0.0.1 (Local Node)",
    location: "Global Edge // Localhost Gateway",
    status: "active",
    riskScore: "low",
    loginAt: "Just now",
    lastActiveAt: "10s ago",
    isCurrentSession: true,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    clientFingerprint: "fp-sha256-a94f1c9812",
    jwtExpiresAt: "In 6 days 23 hours",
  },
  {
    id: "ses-admin-02",
    userId: "usr-admin-01",
    userName: "Master Superadmin",
    userEmail: "admin@quizdorm.com",
    userRole: "admin",
    organizationName: "QuizDorm Global Infrastructure",
    deviceCategory: "tablet",
    browser: "Safari 17.5 (Mobile)",
    os: "iPadOS 17.5.1",
    ipAddress: "103.21.124.9",
    location: "Chennai, Tamil Nadu, IN",
    status: "idle",
    riskScore: "low",
    loginAt: "2 hours ago",
    lastActiveAt: "48 mins ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
    clientFingerprint: "fp-sha256-b7782da910",
    jwtExpiresAt: "In 6 days 21 hours",
  },
  {
    id: "ses-institution-01",
    userId: "usr-institution-01",
    userName: "Govt Model & Matriculation Admin",
    userEmail: "institution@quizdorm.com",
    userRole: "institution",
    organizationName: "Government Model Higher Secondary School",
    deviceCategory: "desktop",
    browser: "Microsoft Edge 126.0",
    os: "Windows 11 Enterprise",
    ipAddress: "103.21.124.9",
    location: "Chennai, Tamil Nadu, IN",
    status: "active",
    riskScore: "low",
    loginAt: "35 mins ago",
    lastActiveAt: "2 mins ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0",
    clientFingerprint: "fp-sha256-c33190ab71",
    jwtExpiresAt: "In 6 days 23 hours",
  },
  {
    id: "ses-handler-01",
    userId: "usr-handler-01",
    userName: "Prof. Sarah Jenkins",
    userEmail: "handler@quizdorm.com",
    userRole: "handler",
    organizationName: "Government Model Higher Secondary School",
    deviceCategory: "desktop",
    browser: "Mozilla Firefox 130.0",
    os: "macOS 14.6 Sonoma",
    ipAddress: "103.21.124.12",
    location: "Chennai, Tamil Nadu, IN",
    status: "active",
    riskScore: "low",
    loginAt: "1 hour ago",
    lastActiveAt: "Just now",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:130.0) Gecko/20100101 Firefox/130.0",
    clientFingerprint: "fp-sha256-d88190fe32",
    jwtExpiresAt: "In 6 days 22 hours",
  },
  {
    id: "ses-handler-02",
    userId: "usr-handler-02",
    userName: "Dr. Rajesh Kumar",
    userEmail: "rajesh.kumar@saidapetmodel.edu.in",
    userRole: "handler",
    organizationName: "Government Model Higher Secondary School",
    deviceCategory: "mobile",
    browser: "Chrome Mobile 128.0",
    os: "Android 14 (Pixel 8)",
    ipAddress: "49.207.200.18",
    location: "Bangalore, Karnataka, IN",
    status: "active",
    riskScore: "low",
    loginAt: "4 hours ago",
    lastActiveAt: "12 mins ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.6613.88 Mobile Safari/537.36",
    clientFingerprint: "fp-sha256-f91038ba99",
    jwtExpiresAt: "In 6 days 19 hours",
  },
  {
    id: "ses-member-01",
    userId: "usr-member-01",
    userName: "Karthik Rajendran",
    userEmail: "member@quizdorm.com",
    userRole: "member",
    organizationName: "Government Model Higher Secondary School",
    deviceCategory: "desktop",
    browser: "Google Chrome 128.0",
    os: "Windows 11 Home",
    ipAddress: "157.49.12.88",
    location: "Coimbatore, Tamil Nadu, IN",
    status: "active",
    riskScore: "low",
    loginAt: "15 mins ago",
    lastActiveAt: "Just now",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    clientFingerprint: "fp-sha256-1189acbe77",
    jwtExpiresAt: "In 6 days 23 hours",
  },
  {
    id: "ses-member-02",
    userId: "usr-member-01",
    userName: "Karthik Rajendran",
    userEmail: "member@quizdorm.com",
    userRole: "member",
    organizationName: "Government Model Higher Secondary School",
    deviceCategory: "mobile",
    browser: "Mobile Safari 17.4",
    os: "iOS 17.4.1 (iPhone 15)",
    ipAddress: "157.49.12.89",
    location: "Coimbatore, Tamil Nadu, IN",
    status: "active",
    riskScore: "low",
    loginAt: "10 mins ago",
    lastActiveAt: "3 mins ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    clientFingerprint: "fp-sha256-2299bcde88",
    jwtExpiresAt: "In 6 days 23 hours",
  },
  {
    id: "ses-member-03",
    userId: "usr-member-01",
    userName: "Karthik Rajendran",
    userEmail: "member@quizdorm.com",
    userRole: "member",
    organizationName: "Government Model Higher Secondary School",
    deviceCategory: "desktop",
    browser: "Safari 17.1",
    os: "macOS Sonoma (MacBook Air)",
    ipAddress: "157.49.12.92",
    location: "Coimbatore, Tamil Nadu, IN",
    status: "idle",
    riskScore: "low",
    loginAt: "Yesterday",
    lastActiveAt: "18 hours ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
    clientFingerprint: "fp-sha256-3300cdef99",
    jwtExpiresAt: "In 5 days 18 hours",
  },
  {
    id: "ses-member-04",
    userId: "usr-member-02",
    userName: "Ananya Sharma",
    userEmail: "ananya.sharma@delhipublic.org",
    userRole: "member",
    organizationName: "Delhi Public Global Academy",
    deviceCategory: "desktop",
    browser: "Google Chrome 127.0",
    os: "macOS Ventura",
    ipAddress: "182.73.24.102",
    location: "New Delhi, Delhi, IN",
    status: "active",
    riskScore: "low",
    loginAt: "3 hours ago",
    lastActiveAt: "14 mins ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 13.5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
    clientFingerprint: "fp-sha256-4411def001",
    jwtExpiresAt: "In 6 days 20 hours",
  },
  {
    id: "ses-subscriber-01",
    userId: "usr-subscriber-01",
    userName: "Devon Reed",
    userEmail: "subscriber@quizdorm.com",
    userRole: "subscriber",
    organizationName: "Public Subscriber Network",
    deviceCategory: "desktop",
    browser: "Google Chrome 128.0",
    os: "macOS Sonoma",
    ipAddress: "142.250.190.46",
    location: "Mountain View, CA, US",
    status: "active",
    riskScore: "low",
    loginAt: "12 mins ago",
    lastActiveAt: "Just now",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
    clientFingerprint: "fp-sha256-sub998811",
    jwtExpiresAt: "In 6 days 23 hours",
  },
  {
    id: "ses-flagged-09",
    userId: "usr-flagged-09",
    userName: "Automated Rogue Scraper",
    userEmail: "bot-spammer@crawler-network.net",
    userRole: "subscriber",
    organizationName: "Unverified Public",
    deviceCategory: "bot",
    browser: "Headless Chrome 124 (Automated Script)",
    os: "Debian GNU/Linux 12 (Tor Node)",
    ipAddress: "185.220.101.4 (Tor Exit Relay)",
    location: "Amsterdam, North Holland, NL",
    status: "flagged",
    riskScore: "critical",
    loginAt: "3 days ago",
    lastActiveAt: "18 mins ago",
    isCurrentSession: false,
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/124.0.0.0 Safari/537.36",
    clientFingerprint: "fp-sha256-9999badf00",
    jwtExpiresAt: "Revoked / Blacklisted",
  },
];

export class AdminSessionManager {
  public static getSessions(): AdminSession[] {
    if (typeof window === "undefined") return SEED_ADMIN_SESSIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ADMIN_SESSIONS);
      if (!saved) {
        localStorage.setItem(STORAGE_KEY_ADMIN_SESSIONS, JSON.stringify(SEED_ADMIN_SESSIONS));
        return SEED_ADMIN_SESSIONS;
      }
      const parsed: AdminSession[] = JSON.parse(saved);
      return parsed.map((s) => ({
        ...s,
        userRole: normalizeCanonicalRole(s.userRole),
      }));
    } catch {
      return SEED_ADMIN_SESSIONS;
    }
  }

  private static saveSessions(sessions: AdminSession[]): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEY_ADMIN_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error("Failed to persist admin sessions:", e);
    }
  }

  public static getSessionById(id: string): AdminSession | undefined {
    return this.getSessions().find((s) => s.id === id);
  }

  public static revokeSession(id: string): AdminSession[] {
    const sessions = this.getSessions().map((s) =>
      s.id === id ? { ...s, status: "revoked" as SessionStatus } : s
    );
    this.saveSessions(sessions);
    return sessions;
  }

  public static revokeAllForUser(userId: string): AdminSession[] {
    const sessions = this.getSessions().map((s) =>
      s.userId === userId ? { ...s, status: "revoked" as SessionStatus } : s
    );
    this.saveSessions(sessions);
    return sessions;
  }

  public static purgeRevokedAndIdle(): AdminSession[] {
    const sessions = this.getSessions().filter(
      (s) => s.status === "active" || s.isCurrentSession
    );
    this.saveSessions(sessions);
    return sessions;
  }

  public static flagSession(id: string): AdminSession[] {
    const sessions = this.getSessions().map((s) =>
      s.id === id ? { ...s, status: "flagged" as SessionStatus, riskScore: "high" as SessionRiskScore } : s
    );
    this.saveSessions(sessions);
    return sessions;
  }

  public static resetToSeed(): AdminSession[] {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY_ADMIN_SESSIONS);
    }
    return SEED_ADMIN_SESSIONS;
  }
}

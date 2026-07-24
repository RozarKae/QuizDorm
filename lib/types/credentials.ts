export type CertificateCategory =
  | "quiz_completion"
  | "competition_winner"
  | "course_completion"
  | "skill_mastery"
  | "organization_award"
  | "teacher_excellence";

export type BadgeLevel = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export type CertificateBackgroundStyle =
  | "classic_gold"
  | "modern_indigo"
  | "academic_navy"
  | "corporate_emerald";

export interface Certificate {
  id: string;
  verificationId: string;
  recipientName: string;
  recipientId: string;
  title: string;
  category: CertificateCategory;
  subject: string;
  organizationName: string;
  organizationLogo?: string;
  issueDate: string;
  scorePercent?: number;
  rank?: number;
  grade?: string;
  digitalHash: string;
  signatureName: string;
  signatureRole: string;
  sealText: string;
  status: "valid" | "revoked" | "expired";
  templateId: string;
  verificationUrl: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  description: string;
  category: "mastery" | "streak" | "accuracy" | "speed" | "competition";
  level: BadgeLevel;
  icon: string;
  unlockedAt?: string;
  progressPercent: number; // 0-100%
  unlocked: boolean;
}

export interface CertificateTemplate {
  id: string;
  name: string;
  backgroundStyle: CertificateBackgroundStyle;
  borderStyle: string;
  logoUrl?: string;
  sealText: string;
  signatureName: string;
  signatureRole: string;
  fontStyle: string;
  customHeader?: string;
}

export interface CredentialWallet {
  studentId: string;
  studentName: string;
  certificates: Certificate[];
  badges: AchievementBadge[];
  totalCertificatesEarned: number;
  totalBadgesUnlocked: number;
}

export interface VerificationResult {
  valid: boolean;
  status: "valid" | "revoked" | "expired" | "not_found";
  certificate?: Certificate;
  verificationDate: string;
  message: string;
}

export interface BulkIssuanceRequest {
  title: string;
  category: CertificateCategory;
  subject: string;
  organizationName: string;
  recipients: { id: string; name: string; scorePercent?: number; rank?: number }[];
  templateId: string;
}

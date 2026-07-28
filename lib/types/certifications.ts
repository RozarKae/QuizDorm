export interface CertificationProgram {
  id: string;
  title: string;
  category: "Academic" | "Professional" | "Skill-Based" | "Corporate" | "Government";
  issuingAuthority: string; // e.g. "QuizDorm Global Board / MIT Open Learning"
  validityYears: number;
  requiredExamScorePercent: number;
  skillsCovered: string[];
  totalLearnersCertified: number;
  status: "Active" | "Draft" | "Archived";
}

export interface IssuedCertificate {
  id: string;
  credentialIdNumber: string; // e.g. "CERT-2026-9041"
  recipientName: string;
  recipientEmail: string;
  programTitle: string;
  category: string;
  issueDate: string;
  expiryDate: string;
  issuingAuthority: string;
  digitalSignatureHash: string;
  blockchainTxHash: string; // e.g. "0x8a901f442b01e99a44"
  qrVerificationUrl: string;
  status: "Valid" | "Expired" | "Revoked";
}

export interface OpenBadge {
  id: string;
  badgeName: string;
  issuer: string;
  criteria: string;
  imageUrl: string;
  issuedDate: string;
  openBadgeStandardVersion: "v2.0" | "v3.0";
}

export interface VerifiedTalentCandidate {
  candidateId: string;
  name: string;
  email: string;
  primaryRole: string;
  verifiedCertifications: string[];
  topSkills: { skillName: string; proficiencyPercent: number }[];
  matchScorePercent?: number;
}

export interface AccreditationStandard {
  id: string;
  standardName: string; // e.g. "ISO/IEC 17024:2012 Personnel Certification"
  accreditingBody: string;
  auditStatus: "Compliant" | "Renewal Due" | "Under Audit";
  lastAuditDate: string;
  complianceScore: number;
}

export interface AICertificationRoadmap {
  learnerId: string;
  targetRole: string;
  recommendedCertifications: { title: string; priority: "High" | "Medium"; estHours: number }[];
  studyPlanDays: number;
  readinessIndex: number;
}

export interface CertificationAnalyticsData {
  totalCertificatesIssued: number;
  activeLearnersCount: number;
  averagePassRatePercent: number;
  employerVerificationsCount: number;
  topDemandedSkill: string;
}

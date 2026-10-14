export type InstitutionType = "university" | "school_group" | "quiz_institute" | "certification_body" | "ngo" | "government";

export type AccreditationStatus = "fully_accredited" | "verified_partner" | "provisional" | "pending_review";

export interface GlobalInstitution {
  id: string;
  name: string;
  country: string;
  region: string;
  type: InstitutionType;
  accreditation: AccreditationStatus;
  verifiedBadge: boolean;
  studentCount: number;
  programsCount: number;
  logoUrl?: string;
}

export interface CurriculumExchangePackage {
  id: string;
  title: string;
  institutionName: string;
  country: string;
  subject: string;
  gradeLevel: string;
  licensingType: string;
  downloadsCount: number;
}

export interface GlobalPartnership {
  id: string;
  partner1Name: string;
  partner2Name: string;
  type: "academic_exchange" | "joint_olympiad" | "dual_certification";
  status: "active" | "pending";
}

export interface GlobalCredentialWallet {
  id: string;
  studentName: string;
  totalCertificates: number;
  verifiedBadgesCount: number;
  globalVerificationHash: string;
}

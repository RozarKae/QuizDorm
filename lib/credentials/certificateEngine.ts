import { Certificate, CertificateCategory } from "@/lib/types/credentials";

const STORAGE_KEY_CERTIFICATES = "quizdorm_issued_certificates";

export const DEFAULT_CERTIFICATES: Certificate[] = [
  {
    id: "cert-101",
    verificationId: "VER-2026-8A4F29",
    recipientName: "Karthik Rajendran",
    recipientId: "std-101",
    title: "Mastery Certification in Algebra & Calculus",
    category: "skill_mastery",
    subject: "Mathematics",
    organizationName: "Tamil Nadu & Kerala Educational Consortium",
    issueDate: "2026-07-24",
    scorePercent: 92,
    rank: 1,
    grade: "A+",
    digitalHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    signatureName: "Dr. K. Saravanan",
    signatureRole: "Headmaster & Academic Director",
    sealText: "OFFICIAL QUIZDORM VERIFIED CERTIFICATION",
    status: "valid",
    templateId: "tpl-gold-1",
    verificationUrl: typeof window !== "undefined" ? `${window.location.origin}/verify/VER-2026-8A4F29` : "/verify/VER-2026-8A4F29",
  },
  {
    id: "cert-102",
    verificationId: "VER-2026-3C9B71",
    recipientName: "Karthik Rajendran",
    recipientId: "std-101",
    title: "Inter-District Quiz Competition Winner - 1st Rank",
    category: "competition_winner",
    subject: "Computer Science",
    organizationName: "TN & Kerala Science Olympiad Council",
    issueDate: "2026-07-20",
    scorePercent: 98,
    rank: 1,
    grade: "Gold Medal",
    digitalHash: "a458b92d6e3c108428f72c4e9124a56b829e1d3c456a789b012c345d678e901f",
    signatureName: "Marcus Sterling",
    signatureRole: "Tournament Director",
    sealText: "NATIONAL COMPETITION FIRST PLACE SEAL",
    status: "valid",
    templateId: "tpl-indigo-1",
    verificationUrl: typeof window !== "undefined" ? `${window.location.origin}/verify/VER-2026-3C9B71` : "/verify/VER-2026-3C9B71",
  },
];

export class CertificateEngine {
  /**
   * Get all issued certificates from localStorage
   */
  public static getCertificates(): Certificate[] {
    if (typeof window === "undefined") return DEFAULT_CERTIFICATES;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CERTIFICATES);
      return saved ? JSON.parse(saved) : DEFAULT_CERTIFICATES;
    } catch {
      return DEFAULT_CERTIFICATES;
    }
  }

  /**
   * Issue a new dynamic digital certificate
   */
  public static issueCertificate(params: {
    recipientName: string;
    recipientId: string;
    title: string;
    category: CertificateCategory;
    subject: string;
    organizationName: string;
    scorePercent?: number;
    rank?: number;
    templateId?: string;
  }): Certificate {
    const verId = `VER-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const certId = `cert-${Date.now()}`;
    const hashHex = Array.from(new Uint8Array(32))
      .map(() => Math.floor(Math.random() * 256).toString(16).padStart(2, "0"))
      .join("");

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://quizdorm.com";
    const verificationUrl = `${baseUrl}/verify/${verId}`;

    const newCert: Certificate = {
      id: certId,
      verificationId: verId,
      recipientName: params.recipientName,
      recipientId: params.recipientId,
      title: params.title,
      category: params.category,
      subject: params.subject,
      organizationName: params.organizationName,
      issueDate: new Date().toISOString().split("T")[0],
      scorePercent: params.scorePercent || 90,
      rank: params.rank,
      digitalHash: hashHex,
      signatureName: "Dr. Eleanor Vance",
      signatureRole: "Academic Director",
      sealText: "QUIZDORM VERIFIED DIGITAL CREDENTIAL",
      status: "valid",
      templateId: params.templateId || "tpl-gold-1",
      verificationUrl,
    };

    const current = this.getCertificates();
    const updated = [newCert, ...current];
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_CERTIFICATES, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save certificate", e);
      }
    }
    return newCert;
  }
}

import { CertificateTemplate } from "@/lib/types/credentials";

export const DEFAULT_TEMPLATES: CertificateTemplate[] = [
  {
    id: "tpl-gold-1",
    name: "Classic Gold Foil Academic",
    backgroundStyle: "classic_gold",
    borderStyle: "double_gold",
    sealText: "OFFICIAL QUIZDORM VERIFIED CERTIFICATION",
    signatureName: "Dr. Eleanor Vance",
    signatureRole: "Dean of Academic Excellence",
    fontStyle: "serif",
    customHeader: "CERTIFICATE OF EXCELLENCE",
  },
  {
    id: "tpl-indigo-1",
    name: "Modern Indigo Competition Winner",
    backgroundStyle: "modern_indigo",
    borderStyle: "indigo_gradient",
    sealText: "NATIONAL QUIZ COMPETITION WINNER SEAL",
    signatureName: "Marcus Sterling",
    signatureRole: "Tournament Director",
    fontStyle: "sans",
    customHeader: "CERTIFICATE OF ACHIEVEMENT",
  },
  {
    id: "tpl-navy-1",
    name: "Academic Navy Course Completion",
    backgroundStyle: "academic_navy",
    borderStyle: "navy_seal",
    sealText: "UNIVERSITY ACADEMIC CREDENTIAL",
    signatureName: "Prof. Arthur Pendelton",
    signatureRole: "Head of Department",
    fontStyle: "serif",
    customHeader: "DIPLOMA OF COMPLETION",
  },
];

export class CertificateTemplateManager {
  public static getTemplates(): CertificateTemplate[] {
    return DEFAULT_TEMPLATES;
  }
}

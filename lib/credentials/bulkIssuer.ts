import { BulkIssuanceRequest,Certificate } from "@/lib/types/credentials";
import { CertificateEngine } from "./certificateEngine";

export class BulkCertificateIssuer {
  public static async issueBulkCertificates(req: BulkIssuanceRequest): Promise<Certificate[]> {
    const issued: Certificate[] = [];

    for (const recipient of req.recipients) {
      await new Promise((r) => setTimeout(r, 40)); // Simulated processing batch

      const cert = CertificateEngine.issueCertificate({
        recipientName: recipient.name,
        recipientId: recipient.id,
        title: req.title,
        category: req.category,
        subject: req.subject,
        organizationName: req.organizationName,
        scorePercent: recipient.scorePercent || 90,
        rank: recipient.rank,
        templateId: req.templateId,
      });

      issued.push(cert);
    }

    return issued;
  }
}

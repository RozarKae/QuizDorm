"use client";

import React, { useState } from "react";
import { OfficialCertificate } from "@/lib/types/administration";
import { Button } from "@/components/ui/button";
import { 
  FileText, QrCode, Download, ShieldCheck, CheckCircle2, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockDocs: OfficialCertificate[] = [
  { id: "doc-1", certificateType: "Bonafide Certificate", certificateNumber: "BONA-2026-9041", candidateName: "Alexander Wright", rollNumber: "2026-PHY-01", issueDate: "Feb 24, 2026", issuedBy: "Office of the Registrar", qrVerificationUrl: "https://quizdorm.edu/verify/BONA-2026-9041", digitalSignatureHash: "sha256-8a901f442b01" },
  { id: "doc-2", certificateType: "Transfer Certificate", certificateNumber: "TC-2026-1102", candidateName: "Beatriz Morales", rollNumber: "2026-PHY-02", issueDate: "Feb 25, 2026", issuedBy: "Office of the Registrar", qrVerificationUrl: "https://quizdorm.edu/verify/TC-2026-1102", digitalSignatureHash: "sha256-9901e12f44c9" },
];

export function CertificateDocumentManagement() {
  const [docs, setDocs] = useState<OfficialCertificate[]>(mockDocs);

  const handleIssueNewDoc = (type: OfficialCertificate["certificateType"]) => {
    const newDoc: OfficialCertificate = {
      id: `doc-${Date.now()}`,
      certificateType: type,
      certificateNumber: `${type.substring(0, 4).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      candidateName: "Alexander Wright",
      rollNumber: "2026-PHY-01",
      issueDate: "Just now",
      issuedBy: "Office of the Registrar",
      qrVerificationUrl: "https://quizdorm.edu/verify/NEW",
      digitalSignatureHash: "sha256-c44019a8820f",
    };
    setDocs([newDoc, ...docs]);
    toast.success(`Issued official ${type} with digital signature!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" /> Digital Certificate & Document Issuance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Issue Transfer Certificates (TC), Bonafide Certificates, Conduct Certificates, and Graduation Diplomas backed by QR codes and digital signatures.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={() => handleIssueNewDoc("Bonafide Certificate")} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
            Issue Bonafide
          </Button>
          <Button onClick={() => handleIssueNewDoc("Transfer Certificate")} className="bg-purple-600 text-white font-semibold text-xs rounded-xl shadow-lg">
            Issue Transfer Certificate
          </Button>
        </div>
      </div>

      {/* Issued Documents Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {docs.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    {doc.certificateNumber}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{doc.candidateName}</h4>
                </div>
                <div className="w-10 h-10 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>

              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400">{doc.certificateType}</p>
              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Issued By:</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{doc.issuedBy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Digital Signature:</span>
                  <span className="font-mono text-[10px] text-rose-500 font-bold">{doc.digitalSignatureHash}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Issue Date: {doc.issueDate}</span>
              <Button onClick={() => toast.success(`Downloading PDF for ${doc.certificateNumber}...`)} size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

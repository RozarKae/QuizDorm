"use client";

import React, { useState } from "react";
import { DigitalCertificate } from "@/lib/types/examination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Award, QrCode, Download, ShieldCheck, CheckCircle2, 
  Search, Lock, Copy, FileText, Check, ExternalLink
} from "lucide-react";
import { toast } from "sonner";

const mockCertificates: DigitalCertificate[] = [
  {
    id: "cert-101",
    certificateNumber: "CERT-2026-NAT-9041",
    candidateName: "Alexander Wright",
    rollNumber: "2026-ENG-8810",
    examTitle: "National Engineering & Tech Recruitment Examination 2026",
    issuingAuthority: "National Examination Authority (NEA)",
    issueDate: "Feb 24, 2026",
    gradeAchieved: "Distinction (Grade A+)",
    percentageScore: 96.0,
    qrVerificationUrl: "https://quizdorm.edu/verify/CERT-2026-NAT-9041",
    digitalSignatureHash: "sha256-8a9f02b1c4e900a891d4e7",
    isRevoked: false,
  },
  {
    id: "cert-102",
    certificateNumber: "CERT-2026-UNIV-4410",
    candidateName: "Beatriz Morales",
    rollNumber: "2026-ENG-8811",
    examTitle: "University End-Semester Physics & Quantum Mechanics Final",
    issuingAuthority: "Central University Academic Board",
    issueDate: "Feb 25, 2026",
    gradeAchieved: "First Class (Grade A)",
    percentageScore: 88.0,
    qrVerificationUrl: "https://quizdorm.edu/verify/CERT-2026-UNIV-4410",
    digitalSignatureHash: "sha256-4b11f9a2e30124c88902d1",
    isRevoked: false,
  },
];

export function CertificateVerificationPortal() {
  const [certificates, setCertificates] = useState<DigitalCertificate[]>(mockCertificates);
  const [verifySearch, setVerifySearch] = useState("");
  const [verificationResult, setVerificationResult] = useState<DigitalCertificate | null>(null);

  const handleVerifyCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const found = certificates.find(
      (c) => c.certificateNumber.toLowerCase() === verifySearch.toLowerCase() || c.rollNumber.toLowerCase() === verifySearch.toLowerCase()
    );

    if (found) {
      setVerificationResult(found);
      toast.success("Certificate Cryptographically VERIFIED & VALID!");
    } else {
      setVerificationResult(null);
      toast.error("No valid certificate record found for that ID.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Cryptographic Verification Authority
          </div>
          <h2 className="text-2xl font-bold">Certificate & Mark Sheet Verification Portal</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Issue tamper-proof digital certificates, official mark sheets, and QR-verifiable academic credentials backed by digital signature hashes.
          </p>
        </div>
      </div>

      {/* Public QR Verification Simulator Box */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-xl mx-auto">
        <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
          <QrCode className="w-5 h-5 text-indigo-600" /> Public Certificate Verification Simulator
        </h3>
        <p className="text-xs text-slate-500">
          Enter Certificate Number (e.g. CERT-2026-NAT-9041) or Roll Number to inspect official authenticity:
        </p>

        <form onSubmit={handleVerifyCertificate} className="flex gap-2 text-xs">
          <Input
            value={verifySearch}
            onChange={(e) => setVerifySearch(e.target.value)}
            placeholder="e.g. CERT-2026-NAT-9041"
            className="rounded-xl"
            required
          />
          <Button type="submit" className="bg-indigo-600 text-white rounded-xl font-semibold shrink-0">
            Verify Authenticity
          </Button>
        </form>

        {verificationResult && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4" /> OFFICIAL CREDENTIAL VERIFIED
              </span>
              <span className="font-mono text-[10px] text-slate-400">{verificationResult.certificateNumber}</span>
            </div>

            <div className="space-y-1 text-slate-700 dark:text-slate-200">
              <p><span className="font-semibold text-slate-500">Candidate:</span> {verificationResult.candidateName} (Roll: {verificationResult.rollNumber})</p>
              <p><span className="font-semibold text-slate-500">Exam:</span> {verificationResult.examTitle}</p>
              <p><span className="font-semibold text-slate-500">Grade:</span> {verificationResult.gradeAchieved} ({verificationResult.percentageScore}%)</p>
              <p className="font-mono text-[10px] text-slate-400 truncate">Signature Hash: {verificationResult.digitalSignatureHash}</p>
            </div>
          </div>
        )}
      </div>

      {/* Certificates Directory */}
      <div className="space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Issued Digital Credentials ({certificates.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                      {cert.certificateNumber}
                    </span>
                    <h4 className="font-bold text-slate-900 dark:text-white text-base mt-0.5">{cert.candidateName}</h4>
                  </div>
                  <div className="w-10 h-10 bg-white p-1 rounded-lg border border-slate-200 shadow-sm flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-slate-900" />
                  </div>
                </div>

                <p className="text-xs text-slate-500">{cert.examTitle}</p>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Grade:</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{cert.gradeAchieved}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issued By:</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{cert.issuingAuthority}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <span className="text-slate-400">Issue Date: {cert.issueDate}</span>
                <Button
                  onClick={() => toast.success(`Downloading Official Certificate PDF for ${cert.candidateName}...`)}
                  size="sm"
                  variant="outline"
                  className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

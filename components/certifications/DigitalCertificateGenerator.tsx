"use client";

import React, { useState } from "react";
import { IssuedCertificate } from "@/lib/types/certifications";
import { Button } from "@/components/ui/button";
import { 
  Award, QrCode, Download, ShieldCheck, CheckCircle2, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockCertificate: IssuedCertificate = {
  id: "cert-101",
  credentialIdNumber: "CERT-2026-9041",
  recipientName: "Alexander Wright",
  recipientEmail: "alexander.w@example.com",
  programTitle: "Certified Full-Stack Quantum Systems Engineer (CFSQE)",
  category: "Professional",
  issueDate: "Feb 24, 2026",
  expiryDate: "Feb 24, 2029",
  issuingAuthority: "QuizDorm Global Certification Board & MIT Open",
  digitalSignatureHash: "sha256-9a8f4201e88c001f9942",
  blockchainTxHash: "0x8a901f442b01e99a4411a004f2",
  qrVerificationUrl: "https://quizdorm.edu/verify/CERT-2026-9041",
  status: "Valid",
};

export function DigitalCertificateGenerator() {
  const [cert, setCert] = useState<IssuedCertificate>(mockCertificate);

  const handleDownloadPDF = () => {
    toast.success(`Downloaded High-Resolution Digital Certificate (PDF) for ${cert.credentialIdNumber}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold mb-2">
            <Award className="w-3.5 h-3.5" /> High-Security Cryptographic Certificate Studio
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-500" /> Digital Certificate Generator
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic certificate rendering canvas, institutional branding, digital signature hash attachment, and QR verification embedded PDFs.
          </p>
        </div>

        <Button onClick={handleDownloadPDF} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Download Vector Certificate (PDF)
        </Button>
      </div>

      {/* Visual Certificate Frame */}
      <div className="bg-gradient-to-tr from-slate-950 via-indigo-950 to-slate-900 p-8 sm:p-12 rounded-3xl border-4 border-amber-500/40 shadow-2xl text-white space-y-8 text-center relative overflow-hidden">
        {/* Background Emblem Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Award className="w-96 h-96 text-amber-400" />
        </div>

        <div className="space-y-2 relative z-10">
          <span className="font-mono text-xs font-bold text-amber-400 tracking-widest uppercase">
            Official Credential • ID: {cert.credentialIdNumber}
          </span>
          <h2 className="text-xs sm:text-sm font-semibold tracking-widest text-slate-300 uppercase">
            {cert.issuingAuthority}
          </h2>
          <h1 className="text-2xl sm:text-4xl font-black text-amber-300 tracking-tight pt-2">
            CERTIFICATE OF ACHIEVEMENT
          </h1>
          <p className="text-xs text-slate-400">This is to certify that</p>
        </div>

        <div className="relative z-10">
          <h3 className="text-3xl sm:text-5xl font-extrabold text-white underline decoration-amber-500/60 decoration-2 underline-offset-8">
            {cert.recipientName}
          </h3>
          <p className="text-xs text-slate-300 max-w-xl mx-auto mt-4 leading-relaxed">
            has successfully fulfilled all academic, practical skill assessment, and examination requirements for the professional designation of
          </p>
          <p className="text-base sm:text-xl font-bold text-amber-400 mt-2">
            {cert.programTitle}
          </p>
        </div>

        {/* Signatures & QR Code Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800 text-xs relative z-10 items-end">
          <div className="text-center sm:text-left space-y-1">
            <span className="font-mono text-[10px] text-emerald-400 block font-bold">DIGITALLY SIGNED</span>
            <p className="font-mono text-[9px] text-slate-400 truncate">{cert.digitalSignatureHash}</p>
            <p className="text-slate-400 text-[10px]">Issue Date: {cert.issueDate}</p>
          </div>

          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white p-1.5 rounded-xl shadow-lg flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-900" />
            </div>
          </div>

          <div className="text-center sm:text-right space-y-1">
            <span className="font-mono text-[10px] text-purple-400 block font-bold">BLOCKCHAIN VERIFIED</span>
            <p className="font-mono text-[9px] text-slate-400 truncate">{cert.blockchainTxHash}</p>
            <p className="text-slate-400 text-[10px]">Valid Until: {cert.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

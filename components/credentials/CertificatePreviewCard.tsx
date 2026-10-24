"use client";

import React from "react";
import { Certificate } from "@/lib/types/credentials";
import { Award, ShieldCheck, QrCode, Download, Share2, Printer, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface CertificatePreviewCardProps {
  certificate: Certificate;
  onPrint?: () => void;
}

export function CertificatePreviewCard({ certificate, onPrint }: CertificatePreviewCardProps) {
  const handleDownloadPdf = () => {
    toast.success(`Preparing PDF download for ${certificate.verificationId}...`);
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(certificate.verificationUrl);
    toast.success("Verification link copied to clipboard!");
  };

  const bgStyles: Record<string, string> = {
    classic_gold: "bg-gradient-to-b from-amber-50/80 via-white to-amber-50/80 border-amber-500/40 text-amber-950",
    modern_indigo: "bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 border-indigo-400/40 text-white",
    academic_navy: "bg-gradient-to-b from-slate-900 via-sky-950 to-slate-900 border-sky-400/40 text-white",
    corporate_emerald: "bg-gradient-to-b from-rose-950 via-slate-900 to-rose-950 border-rose-400/40 text-white",
  };

  const activeStyle = bgStyles[certificate.templateId] || bgStyles.classic_gold;
  const isDark = certificate.templateId !== "classic_gold";

  return (
    <div className="space-y-4">
      {/* Certificate Frame */}
      <div
        id={`cert-frame-${certificate.id}`}
        className={`p-8 sm:p-12 rounded-3xl border-8 shadow-2xl relative overflow-hidden text-center space-y-6 ${activeStyle}`}
      >
        {/* Corner Watermarks */}
        <div className="absolute top-4 left-4 border-t-2 border-l-2 border-amber-500/40 w-8 h-8" />
        <div className="absolute top-4 right-4 border-t-2 border-r-2 border-amber-500/40 w-8 h-8" />
        <div className="absolute bottom-4 left-4 border-b-2 border-l-2 border-amber-500/40 w-8 h-8" />
        <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-amber-500/40 w-8 h-8" />

        {/* Header Header */}
        <div className="space-y-1">
          <div className="flex items-center justify-center space-x-2 text-amber-500 mb-2">
            <Award className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest opacity-80">
            {certificate.organizationName}
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold tracking-wide uppercase">
            Certificate of Achievement
          </h2>
          <p className="text-xs italic opacity-70">This official credential is proudly presented to</p>
        </div>

        {/* Recipient Name */}
        <div className="py-2 border-b-2 border-amber-500/30 max-w-md mx-auto">
          <h3 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-600 dark:text-amber-300 tracking-wider">
            {certificate.recipientName}
          </h3>
        </div>

        {/* Title & Description */}
        <div className="space-y-2 max-w-xl mx-auto text-xs sm:text-sm">
          <p className="opacity-90">
            For successfully demonstrating academic excellence and mastering all requirements for
          </p>
          <div className="font-bold text-base sm:text-lg text-indigo-600 dark:text-indigo-300 font-sans">
            {certificate.title}
          </div>
          {certificate.scorePercent && (
            <p className="text-xs font-mono opacity-80">Score Achieved: {certificate.scorePercent}% • Subject: {certificate.subject}</p>
          )}
        </div>

        {/* Footer Signatures, Seal & QR Code Grid */}
        <div className="pt-6 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center text-xs">
          {/* Signature */}
          <div className="space-y-1">
            <div className="font-serif italic font-extrabold text-sm border-b border-gray-400/40 pb-1 max-w-[140px] mx-auto">
              {certificate.signatureName}
            </div>
            <span className="text-[10px] opacity-70 block">{certificate.signatureRole}</span>
          </div>

          {/* Official Seal */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500/60 flex items-center justify-center p-1 bg-amber-500/10 shadow-inner">
              <ShieldCheck className="w-8 h-8 text-amber-500" />
            </div>
            <span className="text-[9px] font-bold tracking-tighter mt-1 opacity-70">{certificate.sealText}</span>
          </div>

          {/* QR Code & Verification ID */}
          <div className="flex flex-col items-center justify-center space-y-1 font-mono text-[10px]">
            <div className="p-1 bg-white rounded-lg shadow-sm">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
            <span className="font-bold text-amber-600 dark:text-amber-400">{certificate.verificationId}</span>
            <span className="text-[9px] opacity-60">Issue Date: {certificate.issueDate}</span>
          </div>
        </div>

        {/* Digital Hash */}
        <div className="pt-2 text-[9px] font-mono opacity-50 truncate">
          Digital Hash: {certificate.digitalHash}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button onClick={handleDownloadPdf} variant="outline" className="text-xs rounded-xl">
          <Printer className="w-3.5 h-3.5 mr-1.5" /> Print / PDF
        </Button>
        <Button onClick={handleShare} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm">
          <Share2 className="w-3.5 h-3.5 mr-1.5" /> Share Verification Link
        </Button>
      </div>
    </div>
  );
}

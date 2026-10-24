"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { VerificationService } from "@/lib/credentials/verificationService";
import { VerificationResult } from "@/lib/types/credentials";
import { CertificatePreviewCard } from "@/components/credentials/CertificatePreviewCard";
import Logo from "@/components/layout/Logo";

import { ShieldCheck, AlertTriangle, CheckCircle2, Lock, ExternalLink, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PublicVerificationPage() {
  const params = useParams();
  const verificationId = (params?.id as string) || "VER-2026-8A4F29";
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    if (verificationId) {
      const res = VerificationService.verifyCertificate(verificationId);
      setResult(res);
    }
  }, [verificationId]);

  if (!result) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
        <div className="text-center font-mono">Verifying Digital Signature...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 sm:p-8 space-y-6">
      {/* Top Bar */}
      <div className="max-w-4xl mx-auto flex items-center justify-between border-b border-white/10 pb-4">
        <Logo />
        <span className="text-xs font-mono font-bold text-amber-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
          Official Digital Credential Registry
        </span>
      </div>

      {/* Verification Status Header Banner */}
      <div className="max-w-4xl mx-auto">
        <div
          className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl ${
            result.valid
              ? "bg-rose-950/40 border-rose-500/40 text-rose-100"
              : "bg-rose-950/40 border-rose-500/40 text-rose-100"
          }`}
        >
          <div className="flex items-center space-x-4 text-left">
            <div className={`p-3 rounded-2xl ${result.valid ? "bg-rose-500 text-white" : "bg-rose-500 text-white"}`}>
              {result.valid ? <ShieldCheck className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-extrabold uppercase tracking-wide">
                  {result.valid ? "Official Credential Verified Authentic" : "Verification Warning"}
                </span>
              </div>
              <p className="text-xs opacity-90 max-w-xl">{result.message}</p>
            </div>
          </div>

          <div className="text-right font-mono text-xs shrink-0">
            <span className="text-amber-400 font-bold block">{verificationId}</span>
            <span className="opacity-60 text-[10px]">Audit Time: {new Date(result.verificationDate).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>

      {/* Main Certificate Rendered View */}
      {result.certificate ? (
        <div className="max-w-4xl mx-auto">
          <CertificatePreviewCard certificate={result.certificate} />
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center p-8 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
          <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
          <h3 className="text-lg font-bold">Credential Not Found</h3>
          <p className="text-xs text-slate-400">
            The verification code [{verificationId}] does not correspond to any valid issued certificate in QuizDorm registry.
          </p>
          <Link href="/dashboard/credentials">
            <Button variant="outline" className="text-xs rounded-xl">Back to Credential Center</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

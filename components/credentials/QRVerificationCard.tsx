"use client";

import React, { useState } from "react";
import { QrCode, Search, ShieldCheck, AlertTriangle, ExternalLink } from "lucide-react";
import { VerificationService } from "@/lib/credentials/verificationService";
import { VerificationResult } from "@/lib/types/credentials";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function QRVerificationCard() {
  const [verificationInput, setVerificationInput] = useState("VER-2026-8A4F29");
  const [result, setResult] = useState<VerificationResult | null>(null);

  const handleVerify = () => {
    if (!verificationInput.trim()) return;
    const res = VerificationService.verifyCertificate(verificationInput);
    setResult(res);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <QrCode className="w-5 h-5 text-indigo-600 mr-2" /> Public QR & Verification ID Lookup
          </h3>
          <p className="text-xs text-gray-500">
            Verify authenticity of QuizDorm digital credentials via Verification ID or QR hash.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <Input
            value={verificationInput}
            onChange={(e) => setVerificationInput(e.target.value)}
            placeholder="Enter Verification ID (e.g. VER-2026-8A4F29)..."
            className="pl-9 text-xs font-mono"
          />
        </div>
        <Button onClick={handleVerify} className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
          Verify Authenticity
        </Button>
      </div>

      {result && (
        <div
          className={`p-4 rounded-2xl border space-y-2 text-xs ${
            result.valid
              ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800"
              : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-bold text-gray-900 dark:text-white flex items-center">
              {result.valid ? (
                <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-600 mr-1.5" />
              )}
              {result.message}
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              result.valid ? "bg-emerald-600 text-white" : "bg-rose-600 text-white"
            }`}>
              {result.status}
            </span>
          </div>

          {result.certificate && (
            <div className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 space-y-1 font-mono text-[11px]">
              <div>Recipient: <span className="font-bold text-indigo-600">{result.certificate.recipientName}</span></div>
              <div>Title: {result.certificate.title}</div>
              <div>Issuer: {result.certificate.organizationName}</div>
              <div>Digital Hash: {result.certificate.digitalHash}</div>
              <div className="pt-2">
                <Link href={`/verify/${result.certificate.verificationId}`} target="_blank">
                  <Button size="sm" variant="outline" className="text-xs h-7 rounded-lg">
                    <span>Open Public Verification Page</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

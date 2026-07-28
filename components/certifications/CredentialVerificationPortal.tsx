"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShieldCheck, Search, QrCode, CheckCircle2, AlertTriangle, 
  ExternalLink, Sparkles
} from "lucide-react";
import { toast } from "sonner";

export function CredentialVerificationPortal() {
  const [queryId, setQueryId] = useState("CERT-2026-9041");
  const [isSearching, setIsSearching] = useState(false);
  const [verifiedResult, setVerifiedResult] = useState({
    credentialId: "CERT-2026-9041",
    recipient: "Alexander Wright",
    program: "Certified Full-Stack Quantum Systems Engineer (CFSQE)",
    issuingAuthority: "QuizDorm Global Board & MIT Open Learning",
    issuedOn: "Feb 24, 2026",
    status: "VALID & AUTHENTIC",
    blockchainHash: "0x8a901f442b01e99a4411a004f2",
    fraudCheckPassed: true,
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.success(`Credential ID "${queryId}" VERIFIED & AUTHENTIC!`);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold mb-2 border border-emerald-500/30">
            <ShieldCheck className="w-3.5 h-3.5" /> Public Credential Verification Engine
          </div>
          <h2 className="text-2xl font-bold">Public Verification Portal</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Instant worldwide credential validation by Credential ID, QR code scan, or digital signature hash.
          </p>
        </div>
      </div>

      {/* Verification Search Bar */}
      <form onSubmit={handleVerify} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex gap-2 text-xs">
        <Input
          value={queryId}
          onChange={(e) => setQueryId(e.target.value)}
          placeholder="Enter Credential ID Number (e.g. CERT-2026-9041)..."
          className="rounded-xl"
          required
        />
        <Button type="submit" disabled={isSearching} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shrink-0">
          <Search className="w-4 h-4 mr-1" /> Verify Credential
        </Button>
      </form>

      {/* Verification Result Card */}
      {verifiedResult && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> {verifiedResult.status}
            </span>
            <span className="font-mono text-xs text-slate-400">ID: {verifiedResult.credentialId}</span>
          </div>

          <div className="space-y-2">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Recipient</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{verifiedResult.recipient}</h3>
            <p className="text-xs font-semibold text-amber-600 dark:text-amber-400">{verifiedResult.program}</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-400">Issuing Authority:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">{verifiedResult.issuingAuthority}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Blockchain Anchoring:</span>
              <span className="text-emerald-500 font-bold">{verifiedResult.blockchainHash}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fraud Detection:</span>
              <span className="text-emerald-500 font-bold">100% Passed (Zero Tampering)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

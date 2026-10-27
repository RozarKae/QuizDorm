"use client";

import { AchievementBadge,Certificate } from "@/lib/types/credentials";
import { Award,ShieldCheck } from "lucide-react";
import { useState } from "react";
import { BadgeCard } from "./BadgeCard";
import { CertificatePreviewCard } from "./CertificatePreviewCard";

interface CredentialWalletCardProps {
  certificates: Certificate[];
  badges: AchievementBadge[];
}

export function CredentialWalletCard({ certificates, badges }: CredentialWalletCardProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate>(certificates[0]);

  return (
    <div className="space-y-6">
      {/* Wallet Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-1 shadow-sm">
          <span className="text-gray-500 font-medium flex items-center">
            <Award className="w-3.5 h-3.5 text-amber-500 mr-1" /> Total Certificates
          </span>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
            {certificates.length} Issued
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-1 shadow-sm">
          <span className="text-gray-500 font-medium flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500 mr-1" /> Verified Status
          </span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
            100% Authentic
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-1 shadow-sm">
          <span className="text-gray-500 font-medium flex items-center">
            <Award className="w-3.5 h-3.5 text-purple-500 mr-1" /> Badges Unlocked
          </span>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono">
            {badges.filter((b) => b.unlocked).length} / {badges.length}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-1 shadow-sm">
          <span className="text-gray-500 font-medium flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Highest Rank
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            1st Rank
          </div>
        </div>
      </div>

      {/* Main Certificate Viewer & Selection List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Certificate List */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Issued Credentials ({certificates.length})
          </h3>

          {certificates.map((cert) => {
            const isSel = selectedCert?.id === cert.id;

            return (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSel
                    ? "border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-2 ring-amber-500/20 shadow-md"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{cert.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-1">{cert.organizationName} • {cert.issueDate}</p>
                <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold block pt-1">
                  {cert.verificationId}
                </span>
              </div>
            );
          })}
        </div>

        {/* Dynamic Certificate Preview Renderer */}
        <div className="lg:col-span-8">
          {selectedCert && <CertificatePreviewCard certificate={selectedCert} />}
        </div>
      </div>

      {/* Achievement Badges Gallery */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Award className="w-5 h-5 text-amber-500 mr-2" /> Achievement Badges Gallery
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((b) => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </div>
      </div>
    </div>
  );
}

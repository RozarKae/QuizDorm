"use client";

import { BadgeEngine } from "@/lib/credentials/badgeEngine";
import { CertificateEngine } from "@/lib/credentials/certificateEngine";
import { AchievementBadge,Certificate } from "@/lib/types/credentials";
import { useState } from "react";

import { BulkIssuanceModal } from "@/components/credentials/BulkIssuanceModal";
import { CredentialWalletCard } from "@/components/credentials/CredentialWalletCard";
import { QRVerificationCard } from "@/components/credentials/QRVerificationCard";
import { TemplateDesignerModal } from "@/components/credentials/TemplateDesignerModal";

import { Button } from "@/components/ui/button";
import { Award,Plus,QrCode,Sliders,Users } from "lucide-react";
import { toast } from "sonner";

export default function DigitalCredentialsPage() {
  const [activeTab, setActiveTab] = useState<"wallet" | "verification" | "analytics">("wallet");
  const [certificates, setCertificates] = useState<Certificate[]>(() => CertificateEngine.getCertificates());
  const [badges, setBadges] = useState<AchievementBadge[]>(() => BadgeEngine.getBadges());

  // Modals
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);

  const loadData = () => {
    setCertificates(CertificateEngine.getCertificates());
    setBadges(BadgeEngine.getBadges());
  };

  const handleIssueSingle = () => {
    const cert = CertificateEngine.issueCertificate({
      recipientName: "Karthik Rajendran",
      recipientId: "std-101",
      title: "Excellence Certification in Biological Science",
      category: "skill_mastery",
      subject: "Biology",
      organizationName: "Tamil Nadu & Kerala Educational Consortium",
      scorePercent: 95,
      rank: 1,
    });
    loadData();
    toast.success(`Issued certificate [${cert.verificationId}] to Karthik Rajendran!`);
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300">
                <Award className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.5 Credential Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Digital Credentials, Badges & Verification Center
            </h1>
            <p className="text-xs sm:text-sm text-amber-100/80 max-w-2xl">
              Issue, manage, verify, and showcase secure QR-verified digital certificates, achievement badges, and student credential wallets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setTemplateModalOpen(true)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 rounded-2xl backdrop-blur-md"
            >
              <Sliders className="w-4 h-4 mr-1.5" /> Template Designer
            </Button>

            <Button
              onClick={() => setBulkModalOpen(true)}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-600/30"
            >
              <Users className="w-4 h-4 mr-1.5" /> Bulk Batch Issuance
            </Button>

            <Button
              onClick={handleIssueSingle}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-amber-500/30"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Quick Issue Certificate
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto">
        {[
          { id: "wallet", label: `Student Credential Wallet (${certificates.length})`, icon: <Award className="w-4 h-4" /> },
          { id: "verification", label: "QR & Public Verification Lookup", icon: <QrCode className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "wallet" | "verification" | "analytics")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Wallet & Gallery */}
      {activeTab === "wallet" && (
        <CredentialWalletCard certificates={certificates} badges={badges} />
      )}

      {/* Tab 2: Verification Lookup */}
      {activeTab === "verification" && <QRVerificationCard />}

      {/* Designer & Bulk Modals */}
      <TemplateDesignerModal open={templateModalOpen} onOpenChange={setTemplateModalOpen} />
      <BulkIssuanceModal open={bulkModalOpen} onOpenChange={setBulkModalOpen} onComplete={loadData} />
    </div>
  );
}

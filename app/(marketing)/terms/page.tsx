"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { FileText, Shield, ArrowLeft, CheckCircle2, Scale, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070B0A] text-[#F2F7F3] aurora-grid">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb & Header */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <div className="inline-flex items-center space-x-2 border border-[#65F59A]/30 bg-[#111B17] px-3 py-1 rounded-full text-xs font-mono">
              <Scale className="w-3.5 h-3.5 text-[#65F59A]" />
              <span className="text-[#65F59A] font-bold uppercase tracking-wider">
                LEGAL AGREEMENT &bull; UPDATED OCT 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
              Terms of Service
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#A0AEA5] leading-relaxed">
              These Terms of Service govern your access to and use of the QuizDorm Assessment OS, Live Battle Arenas, AI Question Intelligence Studio, and Institutional Cloud Services.
            </p>
          </div>

          {/* Quick Notice Banner */}
          <div className="p-4 rounded-[6px] border border-[rgba(101,245,154,0.25)] bg-[#0C1210] flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 text-[#65F59A] shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-[#A0AEA5] leading-relaxed">
              <strong className="text-[#F2F7F3]">Summary:</strong> By creating an account, joining a Live Arena session, or using QuizDorm, you agree to uphold academic integrity, protect institutional content, and respect fellow students and educators.
            </div>
          </div>

          {/* Legal Sections */}
          <div className="space-y-8 bg-[#0C1210] p-6 sm:p-10 rounded-[8px] border border-[rgba(160,190,170,0.15)] text-xs sm:text-sm text-[#A0AEA5] leading-relaxed font-sans">
            
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">01.</span> Acceptance of Terms
              </h2>
              <p>
                By accessing, browsing, registering for, or operating any module of the QuizDorm platform (&ldquo;QuizDorm&rdquo;, &ldquo;Service&rdquo;, or &ldquo;Platform&rdquo;), you acknowledge that you have read, understood, and agree to be legally bound by these Terms of Service. If you are entering into this agreement on behalf of a school, educational institution, or enterprise, you warrant that you hold authorized administrative authority to bind that entity.
              </p>
            </section>

            <section className="space-y-3 border-t border-[rgba(160,190,170,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">02.</span> User Accounts &amp; Academic Integrity
              </h2>
              <p>
                QuizDorm provides role-based workspaces for Students, Teachers, School Administrators, and Organizers. You must maintain the confidentiality of your login credentials (passwords, Google OAuth sessions, PINs).
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs font-mono text-[#69786F]">
                <li><strong className="text-[#A0AEA5]">Authentic Identity:</strong> Providing false identities or impersonating instructors, students, or institutional administrators is strictly prohibited.</li>
                <li><strong className="text-[#A0AEA5]">Fair Competition:</strong> The use of automated answering bots, screen-scraping extensions, or coordinated telemetry tampering during Live Battle Arenas will result in disqualification and account termination.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-[rgba(160,190,170,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">03.</span> AI Question Intelligence &amp; Document Ingestion
              </h2>
              <p>
                When you upload curriculum documents, study notes, or PDF textbooks to QuizDorm for AI question synthesis:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs font-mono text-[#69786F]">
                <li>You retain full ownership of all copyrighted curricula and original pedagogical materials uploaded to your workspace.</li>
                <li>QuizDorm processes your documents solely to extract structured questions, distractors, and explanations for your private or classroom use.</li>
                <li>QuizDorm does not sell, license, or publish your proprietary classroom questions to third-party ad networks.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-[rgba(160,190,170,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">04.</span> Live Arena Competitions &amp; Tournament Conduct
              </h2>
              <p>
                Live Battle Arenas are real-time, low-latency testing environments. Organizers hold authoritative control to advance questions, reveal leaderboards, and conclude tournaments. Participants agree to accept the host&apos;s authoritative scoring clock and network state arbitration.
              </p>
            </section>

            <section className="space-y-3 border-t border-[rgba(160,190,170,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">05.</span> Intellectual Property &amp; Platform Architecture
              </h2>
              <p>
                The QuizDorm branding, 3D rough-draw QD logo, user interface design, proprietary 3,700+ standard question taxonomy, and competitive scoring engine are the intellectual property of RK Akbar and QuizDorm. You may not reverse engineer, decompile, or copy the platform source code without written consent.
              </p>
            </section>

            <section className="space-y-3 border-t border-[rgba(160,190,170,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">06.</span> Limitation of Liability &amp; Disclaimers
              </h2>
              <p>
                QuizDorm is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While we strive for 99.9% uptime, we do not guarantee uninterrupted availability during unforeseen network partitions or third-party cloud infrastructure outages.
              </p>
            </section>

            <section className="space-y-3 border-t border-[rgba(160,190,170,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#65F59A] font-mono text-xs">07.</span> Contact &amp; Governing Law
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of India, with primary legal jurisdiction in Tamil Nadu and Kerala. For institutional licensing inquiries or legal notices, contact our administration:
              </p>
              <div className="font-mono text-xs bg-[#111B17] p-3 rounded border border-[rgba(160,190,170,0.15)] text-[#65F59A]">
                QuizDorm Legal &amp; Institutional Governance<br />
                Email: legal@quizdorm.com | Founder: RK Akbar (Chennai &amp; Kochi)
              </div>
            </section>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(160,190,170,0.12)] pt-6 font-mono text-xs text-[#A0AEA5]">
            <Link href="/privacy" className="hover:text-[#65F59A] transition-colors flex items-center gap-1.5">
              <span>View Privacy Policy</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/contact" className="hover:text-[#65F59A] transition-colors">
              Have Questions? Contact Legal Support
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

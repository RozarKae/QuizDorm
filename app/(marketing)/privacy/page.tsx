"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { ShieldCheck, Lock, ArrowLeft, CheckCircle2, UserCheck, EyeOff, Database } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0708] text-[#F2F7F3] aurora-grid">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Breadcrumb & Header */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-mono text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </Link>

            <div className="inline-flex items-center space-x-2 border border-[#FF4D6D]/30 bg-[#1D1013] px-3 py-1 rounded-full text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span className="text-[#FF4D6D] font-bold uppercase tracking-wider">
                STUDENT &amp; INSTITUTIONAL PRIVACY &bull; UPDATED OCT 2026
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm font-mono text-[#A0AEA5] leading-relaxed">
              Your academic data, classroom submissions, and study notes belong to you. Learn how QuizDorm protects your privacy across our platform.
            </p>
          </div>

          {/* Core Privacy Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-[6px] border border-[rgba(255, 77, 109,0.25)] bg-[#140C0E] space-y-2">
              <div className="w-8 h-8 rounded bg-[#1D1013] border border-[#FF4D6D]/20 flex items-center justify-center text-[#FF4D6D]">
                <EyeOff className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs font-bold text-[#F2F7F3] uppercase tracking-wider">
                No Ad Tracking
              </h3>
              <p className="text-[11px] font-mono text-[#A0AEA5] leading-relaxed">
                We never sell, rent, or trade student profiles, quiz scores, or contact information to behavioral ad brokers.
              </p>
            </div>

            <div className="p-4 rounded-[6px] border border-[rgba(255, 77, 109,0.25)] bg-[#140C0E] space-y-2">
              <div className="w-8 h-8 rounded bg-[#1D1013] border border-[#FF4D6D]/20 flex items-center justify-center text-[#FF4D6D]">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs font-bold text-[#F2F7F3] uppercase tracking-wider">
                Encrypted Auth &amp; Data
              </h3>
              <p className="text-[11px] font-mono text-[#A0AEA5] leading-relaxed">
                All data transmission is enforced with HTTPS TLS 1.3, backed by Supabase secure session isolation and PKCE Google OAuth.
              </p>
            </div>

            <div className="p-4 rounded-[6px] border border-[rgba(255, 77, 109,0.25)] bg-[#140C0E] space-y-2">
              <div className="w-8 h-8 rounded bg-[#1D1013] border border-[#FF4D6D]/20 flex items-center justify-center text-[#FF4D6D]">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="font-mono text-xs font-bold text-[#F2F7F3] uppercase tracking-wider">
                Curriculum Isolation
              </h3>
              <p className="text-[11px] font-mono text-[#A0AEA5] leading-relaxed">
                Uploaded PDFs and notes are processed in memory for question synthesis and are strictly isolated to your workspace.
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8 bg-[#140C0E] p-6 sm:p-10 rounded-[8px] border border-[rgba(240, 160, 180,0.15)] text-xs sm:text-sm text-[#A0AEA5] leading-relaxed font-sans">
            
            <section className="space-y-3">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#FF4D6D] font-mono text-xs">01.</span> Information We Collect
              </h2>
              <p>
                QuizDorm collects only the minimal data required to provide seamless educational and competitive features:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs font-mono text-[#69786F]">
                <li><strong className="text-[#A0AEA5]">Account Profile:</strong> Name, email address, selected role (student, teacher, school, admin), and optional avatar picture when logging in with Google.</li>
                <li><strong className="text-[#A0AEA5]">Assessment Telemetry:</strong> Quiz responses, timestamp accuracy metrics, competition rank, and points earned in Live Arenas.</li>
                <li><strong className="text-[#A0AEA5]">Local Client Storage:</strong> Cached question bank versions (<code className="text-[#FF4D6D] bg-[#1D1013] px-1 py-0.5 rounded">quizdorm_question_bank_v16</code>) to ensure instantaneous offline review and zero network lag.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-[rgba(240, 160, 180,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#FF4D6D] font-mono text-xs">02.</span> How We Use Your Information
              </h2>
              <p>
                We use collected information solely to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs font-mono text-[#69786F]">
                <li>Authenticate your identity across authorized student and teacher dashboards.</li>
                <li>Deliver live, synchronized arena competitions and calculate instant podium standings.</li>
                <li>Provide teachers and school administrators with insightful classroom diagnostic analytics.</li>
                <li>Verify and issue digital completion credentials and achievement badges.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-[rgba(240, 160, 180,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#FF4D6D] font-mono text-xs">03.</span> AI Question Generation &amp; Document Ingestion
              </h2>
              <p>
                QuizDorm utilizes enterprise AI providers (Google Gemini / Vertex AI API) for document question extraction. Under enterprise terms, input prompts and uploaded PDF documents are processed ephemerally and are <strong className="text-[#F2F7F3]">never used to train public foundation models</strong>.
              </p>
            </section>

            <section className="space-y-3 border-t border-[rgba(240, 160, 180,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#FF4D6D] font-mono text-xs">04.</span> Cookies &amp; Session Management
              </h2>
              <p>
                QuizDorm employs essential, security-focused cookies:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2 text-xs font-mono text-[#69786F]">
                <li><code className="text-[#FF4D6D]">sb-*-auth-token</code>: Secure, HTTP-only authentication session tokens managed by Supabase.</li>
                <li><code className="text-[#FF4D6D]">quizdorm_demo_session</code>: Ephemeral test session cookie used for demo accounts, automatically cleared upon sign-out.</li>
              </ul>
            </section>

            <section className="space-y-3 border-t border-[rgba(240, 160, 180,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#FF4D6D] font-mono text-xs">05.</span> Your Rights &amp; Data Deletion
              </h2>
              <p>
                You retain full rights to request an export of your personal quiz records or the permanent deletion of your account. Contact our privacy team at <strong className="text-[#FF4D6D]">privacy@quizdorm.com</strong> with your registered email, and your request will be executed within 48 business hours.
              </p>
            </section>

            <section className="space-y-3 border-t border-[rgba(240, 160, 180,0.1)] pt-6">
              <h2 className="text-base sm:text-lg font-bold font-display text-[#F2F7F3] flex items-center gap-2">
                <span className="text-[#FF4D6D] font-mono text-xs">06.</span> Contact the Privacy Officer
              </h2>
              <div className="font-mono text-xs bg-[#1D1013] p-3 rounded border border-[rgba(240, 160, 180,0.15)] text-[#FF4D6D]">
                QuizDorm Data Protection Office<br />
                Email: privacy@quizdorm.com | Founder &amp; Architect: RK Akbar
              </div>
            </section>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[rgba(240, 160, 180,0.12)] pt-6 font-mono text-xs text-[#A0AEA5]">
            <Link href="/terms" className="hover:text-[#FF4D6D] transition-colors flex items-center gap-1.5">
              <span>View Terms of Service</span>
              <span>&rarr;</span>
            </Link>
            <Link href="/contact" className="hover:text-[#FF4D6D] transition-colors">
              Have Privacy Questions? Contact Support
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

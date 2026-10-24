"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Check, Sparkles, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { CurrencySelector } from "@/components/billing/CurrencySelector";
import Link from "next/link";

export default function PricingPage() {
  const { formatPrice, currency } = useCurrency();

  const tiers = [
    {
      name: "Free Scholar",
      priceINR: 0,
      description: "Essential quiz creation tools for individual teachers, students, and trial scholars.",
      features: [
        "Up to 5 active quizzes",
        "50 Monthly AI Credits",
        "10 OCR Document Scans",
        "Single-choice & True/False Builder",
        "Instant score & accuracy reports",
      ],
      cta: "Join The Dorm Free",
      href: "/auth/register",
      highlighted: false,
    },
    {
      name: "Teacher Starter",
      priceINR: 99,
      description: "Expanded question matrix, automated grading, and spaced recall for educators.",
      features: [
        "Up to 25 active quizzes",
        "500 Monthly AI Credits",
        "100 OCR Document Scans",
        "Spaced Repetition Revision Center",
        "Up to 100 arena participants",
      ],
      cta: "Upgrade to Starter",
      href: "/checkout?plan=basic&cycle=monthly",
      highlighted: false,
    },
    {
      name: "Pro Institute",
      priceINR: 249,
      description: "Advanced AI Synthesizer, Quality Auditor, Adaptive Engine & multi-format decathlons.",
      features: [
        "Up to 100 active quizzes",
        "2,500 Monthly AI Credits",
        "500 OCR Document Scans",
        "Omni-Curriculum AI Synthesizer",
        "9 High-Cognition Challenge Formats",
        "5 Team Teacher / Proctor Seats",
        "Digital Certificates with QR Verification",
      ],
      cta: "Launch Pro Academy",
      href: "/checkout?plan=professional&cycle=monthly",
      highlighted: true,
      badge: "MOST POPULAR",
    },
    {
      name: "Campus Directorate",
      priceINR: 649,
      description: "Complete institution suite with white-labeling, bulk issuance, and campus analytics.",
      features: [
        "Up to 500 active quizzes",
        "10,000 Monthly AI Credits",
        "2,000 OCR Document Scans",
        "25 Faculty Seats & License Manager",
        "Campus-wide Leaderboards & Decathlons",
        "Institution Mastery Index",
        "Priority 24/7 Educational SLA",
      ],
      cta: "Equip Campus",
      href: "/checkout?plan=institution&cycle=monthly",
      highlighted: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#0B0708] text-[#F2F7F3]">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header & Currency Selector */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[3px] bg-[#1D1013] text-[#FF4D6D] text-xs font-mono font-semibold uppercase tracking-wider border border-[rgba(255, 77, 109,0.3)] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE COGNITIVE DORMITORY // INVESTMENT TIERS</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
              Transparent Institutional &amp; Scholar Plans
            </h1>
            <p className="text-sm font-mono text-[#A0AEA5] max-w-2xl mx-auto leading-relaxed">
              Base rates anchored in Indian Rupees (INR) with real-time international currency conversion and seamless payment gateway routing.
            </p>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <span className="text-xs font-mono text-[#A0AEA5]">Select Your Billing Currency:</span>
              <CurrencySelector />
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className={`relative rounded-[8px] p-6 transition-all duration-300 flex flex-col justify-between ${
                  tier.highlighted
                    ? "bg-[#1D1013] border-2 border-[#FF4D6D]/60 shadow-[0_0_36px_rgba(255, 77, 109,0.2)] md:-translate-y-2"
                    : "bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.3)]"
                }`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-[2px] bg-[#FF4D6D] text-[#0B0708] text-[10px] font-mono font-extrabold uppercase tracking-wider shadow-md">
                    {tier.badge}
                  </span>
                )}
                <div>
                  <h3 className="text-base font-bold font-display text-[#F2F7F3]">{tier.name}</h3>
                  <p className="mt-1 text-xs text-[#A0AEA5] font-mono leading-snug">{tier.description}</p>

                  <div className="mt-5 flex items-baseline">
                    <span className="text-3xl font-extrabold font-mono tracking-tight text-[#F2F7F3]">
                      {tier.priceINR === 0 ? "Free" : formatPrice(tier.priceINR)}
                    </span>
                    {tier.priceINR > 0 && (
                      <span className="ml-1 text-xs font-mono text-[#69786F]">/ month</span>
                    )}
                  </div>

                  {currency !== "INR" && tier.priceINR > 0 && (
                    <p className="text-[10px] font-mono text-[#FF758F] mt-0.5">
                      Base: ₹{tier.priceINR.toLocaleString("en-IN")}/mo
                    </p>
                  )}

                  <ul className="mt-6 space-y-2.5 border-t border-[rgba(240, 160, 180,0.1)] pt-4 text-xs font-mono text-[#A0AEA5]">
                    {tier.features.map((feat, i) => (
                      <li key={i} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-[#FF4D6D] shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-[rgba(240, 160, 180,0.1)]">
                  <Link href={tier.href}>
                    <Button
                      className={`w-full py-5 rounded-[4px] text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                        tier.highlighted
                          ? "bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] shadow-[0_0_15px_rgba(255, 77, 109,0.3)]"
                          : "bg-[#2A141A] hover:bg-[#1D1013] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.2)] hover:border-[#FF4D6D]/40"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Banner */}
          <div className="p-6 rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#A0AEA5]">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-[#FF4D6D]" />
              <span>Compliant with Indian GST &amp; International Cross-Border Billing Standards.</span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-[#69786F]">
              <span>Supported Rails: UPI • Razorpay • RuPay • Stripe • Cards</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

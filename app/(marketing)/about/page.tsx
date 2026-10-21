"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Award, Users, ShieldCheck, Zap, Sparkles, School, Globe, ArrowRight, HeartHandshake, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070B0A] text-[#F2F7F3] aurora-grid">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Masthead */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center space-x-2 border border-[#65F59A]/30 bg-[#111B17] px-3.5 py-1.5 rounded-full text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-[#65F59A] animate-pulse" />
              <span className="text-[#65F59A] font-bold uppercase tracking-wider">
                FOUNDER DOSSIER // TAMIL NADU &amp; KERALA
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-[#F2F7F3] leading-tight">
              Pioneering Assessment Architecture <br />
              <span className="bg-gradient-to-r from-[#65F59A] via-[#38D9B0] to-[#65F59A] bg-clip-text text-transparent">
                Rooted in South Indian Excellence.
              </span>
            </h1>

            <p className="text-xs sm:text-sm font-mono text-[#A0AEA5] leading-relaxed">
              QuizDorm is an intelligent Assessment Operating System founded and led by <strong className="text-[#F2F7F3]">RK Akbar</strong>, bridging Tamil Nadu and Kerala educational excellence into a unified, high-speed competitive platform.
            </p>
          </div>

          {/* Founder's Desk Spotlight Card */}
          <div className="bg-[#0C1210] p-6 sm:p-10 rounded-[8px] border border-[rgba(101,245,154,0.3)] shadow-[0_0_35px_rgba(101,245,154,0.12)] relative overflow-hidden">
            <div className="absolute top-0 right-1/3 w-96 h-48 bg-[radial-gradient(ellipse_at_center,rgba(101,245,154,0.1)_0%,transparent_70%)] blur-[60px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center space-x-2 text-[10px] font-mono uppercase tracking-widest text-[#38D9B0] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#65F59A]" />
                  <span>FROM THE DESK OF THE FOUNDER &amp; OWNER</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F2F7F3]">
                  RK Akbar
                </h2>
                <p className="text-xs font-mono text-[#65F59A] font-semibold">
                  Founder &amp; Chief Platform Architect • Tamil Nadu &amp; Kerala
                </p>

                <p className="text-xs sm:text-sm text-[#A0AEA5] leading-relaxed font-sans pt-1">
                  &ldquo;Growing up across Tamil Nadu and Kerala, I experienced firsthand the boundless intellectual energy in our classrooms — from government higher secondary schools in Chennai, Madurai, and Trivandrum to prestigious matriculation and global academies in Kochi and Coimbatore. Yet our students were shackled to static paper mock tests and fragmented software.&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-[#A0AEA5] leading-relaxed font-sans">
                  &ldquo;QuizDorm was built to give every South Indian student, teacher, and school principal a world-class assessment cockpit. A platform celebrating our multi-faith heritage — Hindu, Muslim, Christian, Jain, and Saurashtrian communities — united through fair play, instant live arena countdowns, and verifiable academic merit.&rdquo;
                </p>

                <div className="pt-3 flex flex-wrap gap-2 text-[10px] font-mono text-[#69786F]">
                  <span className="px-2.5 py-1 rounded bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3]">
                    • Samacheer Kalvi &amp; Kerala DHSE/SSLC
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3]">
                    • CBSE South Zone &amp; ICSE
                  </span>
                  <span className="px-2.5 py-1 rounded bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3]">
                    • Government &amp; Global Academies
                  </span>
                </div>
              </div>

              {/* Founder Vignette Card */}
              <div className="lg:col-span-4 bg-[#111B17] p-6 rounded-[6px] border border-[rgba(160,190,170,0.18)] text-center space-y-3 shrink-0 shadow-lg">
                <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-tr from-[#17251E] via-[#65F59A]/30 to-[#38D9B0]/20 flex items-center justify-center border-2 border-[#65F59A] text-2xl font-mono font-extrabold text-[#65F59A] shadow-[0_0_20px_rgba(101,245,154,0.3)]">
                  RKA
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-[#F2F7F3]">RK Akbar</h3>
                  <p className="text-[11px] font-mono text-[#A0AEA5]">Visionary Educator &amp; Technologist</p>
                </div>
                <div className="border-t border-[rgba(160,190,170,0.12)] pt-3 text-[10px] font-mono text-[#69786F] space-y-1">
                  <p>Origins: Tamil Nadu &amp; Kerala</p>
                  <p>Platform Architecture: AI Assessment OS</p>
                  <p className="text-[#65F59A] font-semibold">Active &bull; Verified Ownership</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pillars of Regional Educational Impact */}
          <div className="space-y-6 pt-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#65F59A] font-bold">
                SYSTEM PILLARS // REGIONAL INTEGRATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F2F7F3]">
                Empowering Institutions Across South India
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-3">
                <School className="w-7 h-7 text-[#65F59A]" />
                <h3 className="font-display font-bold text-base text-[#F2F7F3]">Government School Access</h3>
                <p className="text-xs text-[#A0AEA5] leading-relaxed font-sans">
                  Built to perform flawlessly even in low-bandwidth rural taluks across Tamil Nadu and high-range schools in Kerala with offline edge caching.
                </p>
              </div>

              <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-3">
                <Award className="w-7 h-7 text-[#38D9B0]" />
                <h3 className="font-display font-bold text-base text-[#F2F7F3]">Multi-Community Inclusivity</h3>
                <p className="text-xs text-[#A0AEA5] leading-relaxed font-sans">
                  Honoring the shared cultural fabric of Hindu, Muslim, Christian, Jain, and Saurashtrian scholars from Chennai, Kochi, Madurai, and Trivandrum.
                </p>
              </div>

              <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-3">
                <Globe className="w-7 h-7 text-[#65F59A]" />
                <h3 className="font-display font-bold text-base text-[#F2F7F3]">Global Competitiveness</h3>
                <p className="text-xs text-[#A0AEA5] leading-relaxed font-sans">
                  Prepares students for national Olympiads, NEET, JEE, and international university assessments with instant microsecond telemetry scoring.
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA */}
          <div className="bg-[#111B17] p-8 rounded-[6px] border border-[rgba(160,190,170,0.18)] text-center space-y-4">
            <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#F2F7F3]">
              Join the Next-Generation Educational Movement
            </h3>
            <p className="text-xs text-[#A0AEA5] font-mono max-w-lg mx-auto">
              Explore live competitions, author AI-assisted questions, or register your institution today.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <Link href="/dashboard">
                <Button className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] px-6 h-10 shadow-[0_0_15px_rgba(101,245,154,0.2)]">
                  Launch Platform OS <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

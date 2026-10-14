"use client";

import React from "react";
import { DownloadManagerCard } from "@/components/mobile/DownloadManagerCard";
import { DeviceManagerCard } from "@/components/mobile/DeviceManagerCard";
import { MobilePreviewFrame } from "@/components/mobile/MobilePreviewFrame";
import { Smartphone, Download, ShieldCheck, HardDrive, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MobilePlatformPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-emerald-300">
                <Smartphone className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                QuizDorm Version 3.0 Mobile Ecosystem
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Cross-Platform Native Mobile & PWA Platform
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Cross-platform applications for Android, iPhone, iPad, and Tablets with zero-latency offline practice and Touch/Face ID biometric authentication.
            </p>
          </div>

          <Link href="/mobile" target="_blank">
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-500/30">
              <Smartphone className="w-4 h-4 mr-1.5" /> Launch Standalone PWA App View
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Phone Simulator */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <MobilePreviewFrame />
        </div>

        {/* Right Column: Download Manager & Devices */}
        <div className="lg:col-span-8 space-y-6">
          <DownloadManagerCard />
          <DeviceManagerCard />
        </div>
      </div>
    </div>
  );
}

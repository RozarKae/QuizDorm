"use client";

import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#070B0A] text-[#F2F7F3] selection:bg-[#65F59A] selection:text-[#070B0A]">
      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 xl:px-24 bg-[#070B0A] border-r border-[rgba(160,190,170,0.12)] z-10 relative overflow-hidden">
        {/* Cybernetic ambient green glow in form background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[28rem] h-[28rem] bg-[radial-gradient(circle,rgba(101,245,154,0.08)_0%,transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-12 left-8 w-72 h-72 bg-[radial-gradient(circle,rgba(56,217,176,0.05)_0%,transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(160,190,170,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(160,190,170,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="mx-auto w-full max-w-md relative z-10">
          {children}
        </div>
      </div>

      {/* Illustration / Brand Showcase Section (Future OS Dark Obsidian Theme) */}
      <div className="hidden lg:flex lg:flex-1 relative bg-[#0C1210] overflow-hidden items-center justify-center p-12">
        {/* Cybernetic ambient radial glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(101,245,154,0.12)_0%,transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(56,217,176,0.1)_0%,transparent_70%)] rounded-full filter blur-3xl pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(160,190,170,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(160,190,170,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="relative max-w-lg text-[#F2F7F3] z-20 text-center flex flex-col items-center">
          {/* Official 3D Inverted Glowing Emblem */}
          <div className="mb-6 relative group">
            <div className="absolute -inset-4 bg-[radial-gradient(circle,rgba(101,245,154,0.3)_0%,transparent_70%)] rounded-full blur-xl animate-pulse -z-10" />
            <div className="p-4 bg-[#111B17] rounded-3xl border border-[#65F59A]/30 shadow-[0_0_35px_rgba(101,245,154,0.25)] flex items-center justify-center">
              <Image
                src="/official-logo.png"
                alt="QuizDorm Official 3D Emblem"
                width={96}
                height={96}
                className="w-24 h-24 object-contain drop-shadow-[0_0_20px_rgba(101,245,154,0.6)]"
                priority
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111B17] border border-[#65F59A]/30 text-[#65F59A] font-mono text-[10px] font-bold uppercase tracking-widest mb-4 shadow-[0_0_12px_rgba(101,245,154,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-ping" />
            <span>QuizDorm // Study Squad &amp; Arena</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display uppercase tracking-tight text-[#F2F7F3] mb-3">
            Cook Up Quizzes. <br />
            <span className="text-[#65F59A]">Dominate The Arena.</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-md leading-relaxed font-sans">
            Drop your notes, challenge your friends to live speed battles, and track your topic weak spots with QuizDorm AI.
          </p>

          {/* Authentic Student Study Squad Card (Replaces generic Jane Doe) */}
          <div className="mt-8 p-5 bg-[#111B17] rounded-[6px] border border-[rgba(160,190,170,0.16)] text-left max-w-sm shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[rgba(160,190,170,0.1)] font-mono text-[10px]">
              <span className="text-[#65F59A] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A]" />
                Live Squad Feedback
              </span>
              <span className="text-[#69786F]">Batch 2026</span>
            </div>
            <p className="text-xs text-[#E2E8F0] leading-relaxed font-sans italic">
              &ldquo;Our dorm squad went from barely passing physics to locking down top marks in the arena. Cooking up quizzes straight from our PDF notes is pure magic.&rdquo;
            </p>
            <div className="mt-3.5 flex items-center space-x-3">
              <div className="h-8 w-8 rounded-[4px] bg-[#17251E] border border-[#65F59A]/30 flex items-center justify-center font-mono font-bold text-xs text-[#65F59A] shadow-[0_0_8px_rgba(101,245,154,0.2)]">
                AK
              </div>
              <div>
                <p className="text-xs font-semibold text-[#F2F7F3]">Arjun K.</p>
                <p className="text-[10px] text-[#A0AEA5] font-mono">Grade 12 CBSE &amp; NEET Scholar • Chennai</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

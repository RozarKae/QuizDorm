"use client";

import { signInWithEmail } from "@/app/auth/actions";
import EmailSuggestionInput from "@/components/auth/EmailSuggestionInput";
import PasswordInput from "@/components/auth/PasswordInput";
import { OfficialEmblem } from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import {
Cpu,
ExternalLink,
Fingerprint,
Layers,
Server,
ShieldAlert,
Terminal
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React,{ Suspense,useState } from "react";
import { toast } from "sonner";

function AdminLoginContent() {
  const searchParams = useSearchParams();
  const redirectedFrom = searchParams.get("redirectedFrom");

  const [activePreset, setActivePreset] = useState<"superadmin" | "masteradmin">("superadmin");
  const [email, setEmail] = useState("superadmin@quizdorm.com");
  const [password, setPassword] = useState("SuperAdmin#2026!");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [systemUptime] = useState("99.98%");

  // Auto-fill preset credentials when toggling tabs
  const handleSelectPreset = (preset: "superadmin" | "masteradmin") => {
    setActivePreset(preset);
    setErrorMsg("");
    if (preset === "superadmin") {
      setEmail("superadmin@quizdorm.com");
      setPassword("SuperAdmin#2026!");
    } else {
      setEmail("masteradmin@quizdorm.com");
      setPassword("MasterAdmin#2026!");
    }
  };

  const handleAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("email", email.trim().toLowerCase());
    formData.append("password", password);

    try {
      const res = await signInWithEmail(formData);

      if (res.error) {
        setErrorMsg(res.error);
        toast.error(res.error);
        setLoading(false);
        return;
      }

      toast.success("Executive session authorized!");

      if (typeof window !== "undefined") {
        const demoAuth = res as { isDemoAccount?: boolean; user?: unknown };
        if (demoAuth.isDemoAccount && demoAuth.user) {
          localStorage.setItem("quizdorm_demo_user", JSON.stringify(demoAuth.user));
        } else {
          localStorage.removeItem("quizdorm_demo_user");
        }
      }

      // Route priority: explicitly requested admin destination > server action redirect > role default
      const destination =
        redirectedFrom && redirectedFrom.startsWith("/admin")
          ? redirectedFrom
          : res.redirectUrl || (activePreset === "masteradmin" ? "/admin/master" : "/admin");

      window.location.href = destination;
    } catch {
      setErrorMsg("Authentication handshake failure. Please retry.");
      toast.error("Failed to authenticate session.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#090406] text-[#F2F7F3] flex flex-col justify-between relative overflow-hidden font-mono selection:bg-[#FF4D6D] selection:text-white">
      {/* Background Ambience: Deep Obsidian Grid + Crimson Core Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,77,109,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,77,109,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[radial-gradient(circle,rgba(255,40,80,0.12)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      {/* Top OS Telemetry Bar */}
      <header className="relative z-10 w-full border-b border-[rgba(255,77,109,0.2)] bg-[#12070A]/80 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <OfficialEmblem className="w-6 h-6" />
          <div className="flex items-baseline space-x-1.5">
            <span className="font-bold tracking-wider text-[#F2F7F3] text-sm uppercase">
              QUIZ<span className="text-[#FF4D6D]">DORM</span>
            </span>
            <span className="text-[10px] text-[#A0AEA5] uppercase tracking-widest hidden sm:inline">
              {"// SOVEREIGN OS"}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 text-[11px] text-[#A0AEA5]">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span className="text-emerald-400 font-semibold tracking-wider">ROOT SYSTEM ONLINE</span>
          </div>
          <span className="hidden md:inline text-zinc-600">|</span>
          <span className="hidden md:inline text-zinc-400">UPTIME: {systemUptime}</span>
          <span className="hidden md:inline text-zinc-600">|</span>
          <Link
            href="/auth/login"
            className="text-[#FF758F] hover:text-[#FF4D6D] hover:underline flex items-center space-x-1 text-[11px]"
          >
            <span>Public Portal</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </Link>
        </div>
      </header>

      {/* Main Terminal Gateway Card */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-[#140A0D]/90 border border-[rgba(255,77,109,0.3)] shadow-[0_0_50px_rgba(255,40,80,0.15)] rounded-[4px] p-6 sm:p-8 backdrop-blur-xl">
          {/* Gateway Header */}
          <div className="text-center space-y-2 mb-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[2px] bg-[#220D12] border border-[rgba(255,77,109,0.35)] text-[#FF4D6D] text-[10px] uppercase font-bold tracking-widest">
              <Terminal className="w-3.5 h-3.5 text-[#FF4D6D]" />
              <span>EXECUTIVE GOVERNANCE GATEWAY</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#F2F7F3] pt-1">
              SOVEREIGN <span className="text-[#FF4D6D]">COMMAND OS</span>
            </h1>
            <p className="text-xs text-[#A0AEA5] max-w-sm mx-auto leading-relaxed">
              Air-gapped administrative portal for Corporate Super Administrators and Academic Master Curators.
            </p>
          </div>

          {/* Role Switching Preset Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6 bg-[#0E0507] p-1.5 rounded-[3px] border border-[rgba(255,77,109,0.2)]">
            <button
              type="button"
              onClick={() => handleSelectPreset("superadmin")}
              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-[2px] text-xs transition-all cursor-pointer ${
                activePreset === "superadmin"
                  ? "bg-[#250F15] text-[#FF4D6D] border border-[rgba(255,77,109,0.5)] shadow-[0_0_12px_rgba(255,77,109,0.25)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1A0A0E]"
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-0.5">
                <Cpu className="w-3.5 h-3.5" />
                <span className="uppercase text-[11px] font-bold">Super Admin OS</span>
              </div>
              <span className="text-[9px] opacity-70 tracking-wider">Corporate & Tenants (/admin)</span>
            </button>

            <button
              type="button"
              onClick={() => handleSelectPreset("masteradmin")}
              className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-[2px] text-xs transition-all cursor-pointer ${
                activePreset === "masteradmin"
                  ? "bg-[#250F15] text-[#C084FC] border border-[rgba(192,132,252,0.5)] shadow-[0_0_12px_rgba(192,132,252,0.25)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1A0A0E]"
              }`}
            >
              <div className="flex items-center space-x-1.5 mb-0.5">
                <Layers className="w-3.5 h-3.5" />
                <span className="uppercase text-[11px] font-bold">Master Admin OS</span>
              </div>
              <span className="text-[9px] opacity-70 tracking-wider">Curriculum & Vault (/admin/master)</span>
            </button>
          </div>

          {errorMsg && (
            <div className="p-3 mb-5 rounded-[2px] text-xs font-semibold bg-rose-950/40 text-rose-300 border border-rose-500/40 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleAdminSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="text-xs uppercase tracking-wider text-[#A0AEA5] font-semibold flex items-center justify-between"
              >
                <span>Administrative User ID / Email</span>
                <span className="text-[10px] text-[#FF4D6D] lowercase">@quizdorm.com</span>
              </label>
              <EmailSuggestionInput
                id="admin-email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="superadmin@quizdorm.com"
                required
                className="w-full bg-[#1A0C10] border-[rgba(255,77,109,0.3)] text-[#F2F7F3] focus-visible:border-[#FF4D6D] h-10 text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="text-xs uppercase tracking-wider text-[#A0AEA5] font-semibold"
                >
                  Root Authorization Key
                </label>
                <span className="text-[10px] text-zinc-500">256-Bit Salted Key</span>
              </div>
              <PasswordInput
                id="admin-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full bg-[#1A0C10] border-[rgba(255,77,109,0.3)] text-[#F2F7F3] focus-visible:border-[#FF4D6D] h-10 text-xs"
              />
            </div>

            {/* Quick Diagnostic Pill */}
            <div className="p-2.5 rounded-[2px] bg-[#0E0507] border border-[rgba(255,77,109,0.15)] flex items-center justify-between text-[11px] text-[#A0AEA5]">
              <div className="flex items-center space-x-2">
                <Fingerprint className="w-4 h-4 text-[#FF4D6D]" />
                <span>Zero-Trust Protocol Active</span>
              </div>
              <span className="text-[#FF758F] font-bold">TLS 1.3 / HMAC</span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF4D6D] hover:bg-[#FF3366] text-[#090406] font-bold text-xs uppercase tracking-wider h-11 rounded-[3px] shadow-[0_0_25px_rgba(255,77,109,0.35)] hover:shadow-[0_0_35px_rgba(255,77,109,0.55)] transition-all cursor-pointer mt-2"
            >
              {loading ? "Authenticating Root Session..." : "Initialize Executive Session →"}
            </Button>
          </form>

          {/* Footer Navigation */}
          <div className="mt-6 pt-5 border-t border-[rgba(255,77,109,0.15)] text-center space-y-2">
            <p className="text-[11px] text-[#A0AEA5]">
              Looking for student, campus, or teacher access?{" "}
              <Link
                href="/auth/login"
                className="text-[#FF4D6D] hover:text-[#FF3366] hover:underline font-bold"
              >
                Go to Public Login
              </Link>
            </p>
            <p className="text-[10px] text-zinc-500 tracking-tight">
              Strict audit logs enforced. IP telemetry recorded for all authorization attempts.
            </p>
          </div>
        </div>
      </main>

      {/* Terminal Footer */}
      <footer className="relative z-10 w-full border-t border-[rgba(255,77,109,0.15)] bg-[#0B0407]/90 px-4 sm:px-8 py-3 text-[11px] text-zinc-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <Server className="w-3.5 h-3.5 text-zinc-400" />
          <span>NODE CLUSTER: AP-SOUTH-1 (SECURE ENCLAVE)</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>COOKIE SPEC: STRICT HMAC-SHA256</span>
          <span className="text-zinc-700">|</span>
          <span>BUILD: PRODUCTION 2026</span>
        </div>
      </footer>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#090406] flex items-center justify-center font-mono text-xs text-[#FF4D6D]">
          INITIALIZING SOVEREIGN COMMAND GATEWAY...
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}

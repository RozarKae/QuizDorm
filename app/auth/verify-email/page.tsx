"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthFooter from "@/components/auth/AuthFooter";
import { Button } from "@/components/ui/button";
import EmailSuggestionInput from "@/components/auth/EmailSuggestionInput";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { resendVerificationEmail } from "../actions";
import { toast } from "sonner";
import { CheckCircle2, Mail, ArrowRight, Sparkles, ShieldCheck, UserCheck } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, profile, role } = useAuth();

  const isVerifiedParam = searchParams.get("verified") === "true";
  const emailParam = searchParams.get("email") || "";
  const roleParam = searchParams.get("role") || role || "student";

  const [email, setEmail] = useState(emailParam);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(4);
  const [isVerified, setIsVerified] = useState(isVerifiedParam);

  // Check if URL hash contains confirmation access token or if user is logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash.includes("access_token") || hash.includes("type=signup") || hash.includes("type=email") || isVerifiedParam) {
        setIsVerified(true);
      }
    }
  }, [isVerifiedParam]);

  const getWorkspaceUrl = (r: string) => {
    if (r === "admin") return "/admin";
    if (["institution", "school"].includes(r)) return "/school";
    if (["handler", "teacher"].includes(r)) return "/teacher";
    return "/student";
  };

  // If user is verified and logged in, count down and auto-route to workspace
  useEffect(() => {
    if (!isVerified) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const target = getWorkspaceUrl(roleParam);
          window.location.href = target;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isVerified, roleParam]);

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email address to resend verification.");
      return;
    }
    setResending(true);
    const res = await resendVerificationEmail(email);
    setResending(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("Verification email resent successfully!");
    }
  };

  const targetWorkspace = getWorkspaceUrl(roleParam);

  const displayName = profile?.name || user?.user_metadata?.name || "QuizDorm Scholar";
  const displayEmail = profile?.email || user?.email || emailParam;

  return (
    <AuthCard>
      {isVerified ? (
        /* Confirmed / Verified Success Screen */
        <div className="text-center py-6 space-y-6">
          <div className="inline-flex items-center space-x-2 border border-[#FF4D6D]/30 bg-[#1D1013] px-3.5 py-1 rounded-full text-[10px] font-mono shadow-[0_0_15px_rgba(255, 77, 109,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
            <span className="text-[#FF4D6D] font-bold uppercase tracking-wider">
              CREDENTIAL VERIFIED // ACADEMIC OS
            </span>
          </div>

          {/* Animated Celebration Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#1D1013] border-2 border-[#FF4D6D] text-[#FF4D6D] shadow-[0_0_30px_rgba(255, 77, 109,0.3)] animate-in zoom-in-75 duration-300">
            <CheckCircle2 className="h-10 w-10 text-[#FF4D6D]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F2F7F3] tracking-tight">
              Email Verified Successfully!
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#A0AEA5] max-w-sm mx-auto leading-relaxed">
              Your institutional credentials have been verified with Supabase Auth. Your QuizDorm assessment cockpit is ready.
            </p>
          </div>

          {/* Account Snapshot Card */}
          <div className="bg-[#1D1013] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.18)] text-left space-y-2.5 max-w-sm mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                Authenticated User
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-[2px] bg-[#FF4D6D]/15 text-[#FF4D6D] border border-[#FF4D6D]/30 font-bold">
                Active &bull; Verified
              </span>
            </div>

            <div>
              <p className="text-sm font-bold text-[#F2F7F3] font-display">{displayName}</p>
              {displayEmail && (
                <p className="text-xs font-mono text-[#FF4D6D] truncate">{displayEmail}</p>
              )}
            </div>

            <div className="pt-2 border-t border-[rgba(240, 160, 180,0.12)] flex items-center justify-between text-[11px] font-mono text-[#A0AEA5]">
              <span>Assigned Role:</span>
              <span className="font-bold text-[#F2F7F3] uppercase tracking-wider">{roleParam}</span>
            </div>
          </div>

          {/* Countdown & Action */}
          <div className="space-y-3 pt-2 max-w-sm mx-auto">
            <Link href={targetWorkspace} className="w-full block">
              <Button className="w-full h-11 bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] rounded-[4px] font-mono font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(255, 77, 109,0.25)] flex items-center justify-center space-x-2">
                <span>Proceed to Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            <p className="text-[11px] font-mono text-[#69786F]">
              Auto-routing to workspace in <span className="text-[#FF4D6D] font-bold">{countdown}</span> seconds...
            </p>
          </div>
        </div>
      ) : (
        /* Pending Verification Screen */
        <div className="text-center py-6 space-y-6">
          <div className="inline-flex items-center space-x-2 border border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] px-3.5 py-1 rounded-full text-[10px] font-mono text-[#A0AEA5]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-amber-400 font-bold uppercase tracking-wider">
              AWAITING ACTIVATION // STEP 2 OF 2
            </span>
          </div>

          {/* Mail Envelope Icon */}
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#1D1013] border border-[rgba(240, 160, 180,0.25)] text-[#FF4D6D] shadow-lg">
            <Mail className="h-9 w-9 text-[#FF4D6D]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F2F7F3]">
              Check Your Inbox
            </h1>
            <p className="text-xs sm:text-sm font-sans text-[#A0AEA5] max-w-sm mx-auto leading-relaxed">
              We dispatched an activation link to your email. Click <strong className="text-[#F2F7F3]">Confirm your email</strong> in that message to verify your identity.
            </p>
          </div>

          <div className="space-y-3 pt-2 max-w-sm mx-auto">
            <EmailSuggestionInput
              placeholder="you@quizdorm.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 text-center bg-[#2A141A] border-[rgba(240, 160, 180,0.2)] text-[#F2F7F3] placeholder:text-[#69786F] rounded-[4px] font-mono text-xs focus-visible:border-[#FF4D6D]"
            />
            <div className="flex flex-col space-y-2 pt-1">
              <Button
                onClick={handleResend}
                disabled={resending}
                variant="outline"
                className="w-full h-11 border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#2A141A] rounded-[4px] font-mono text-xs"
              >
                {resending ? "Dispatching..." : "Resend Verification Link"}
              </Button>
              <Link href="/auth/login" className="w-full">
                <Button className="w-full h-11 bg-[#2A141A] hover:bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(240, 160, 180,0.14)] rounded-[4px] font-mono text-xs">
                  Return to Login &rarr;
                </Button>
              </Link>
            </div>
          </div>

          <AuthFooter>
            <p className="text-xs font-mono text-[#69786F]">
              Need help? Reach the{" "}
              <Link href="/contact" className="text-[#FF4D6D] hover:underline font-semibold">
                QuizDorm Helpdesk
              </Link>
            </p>
          </AuthFooter>
        </div>
      )}
    </AuthCard>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <AuthCard>
          <div className="text-center py-12 font-mono text-xs text-[#A0AEA5]">
            Loading verification status...
          </div>
        </AuthCard>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}

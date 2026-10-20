"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthFooter from "@/components/auth/AuthFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { resendVerificationEmail } from "../actions";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

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

  return (
    <AuthCard>
      <div className="text-center py-6 space-y-6">
        {/* Success Illustration */}
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#3864F8]/15 border border-[#3864F8]/30 text-[#3864F8]">
          <svg
            className="h-8 w-8 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Verify Your Email</h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Please verify your email address to access your QuizDorm dashboard. Enter your email below if you need to resend the code.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-11 text-center bg-[#161922] border-[#2A303F] text-white placeholder:text-zinc-500 rounded-[4px]"
          />
          <div className="flex flex-col space-y-2 pt-2">
            <Button
              onClick={handleResend}
              disabled={resending}
              variant="outline"
              className="w-full h-11 border-[#2A303F] bg-[#161922] text-zinc-200 hover:text-white hover:bg-[#1E232F] rounded-[4px]"
            >
              {resending ? "Resending..." : "Resend Verification Email"}
            </Button>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full h-11 bg-[#3864F8] hover:bg-[#2c53d6] text-white rounded-[4px] font-semibold text-sm">
                Return to Login →
              </Button>
            </Link>
          </div>
        </div>

        <AuthFooter>
          <p className="text-xs text-zinc-400">
            Need help? Contact our{" "}
            <Link href="/support" className="text-[#3864F8] hover:underline font-semibold">
              Support Center
            </Link>
          </p>
        </AuthFooter>
      </div>
    </AuthCard>
  );
}

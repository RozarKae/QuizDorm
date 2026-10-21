"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { resetPasswordRequest } from "../actions";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const res = await resetPasswordRequest(formData);

    if (res.error) {
      setErrorMsg(res.error);
      toast.error(res.error);
      setLoading(false);
    } else {
      setSubmitted(true);
      toast.success("Password reset email sent!");
    }
  };

  return (
    <AuthCard>
      {!submitted ? (
        <>
          <AuthHeader
            title="Reset Password"
            subtitle="Enter your email address and we'll send you a link to reset your password."
          />
          
          {errorMsg && (
            <div className="p-3 mb-4 rounded-[4px] text-xs font-semibold bg-red-950/50 border border-red-800 text-red-300">
              {errorMsg}
            </div>
          )}

          <AuthForm onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold"
              >
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] placeholder:text-[#69786F] focus:border-[#65F59A] rounded-[3px] font-mono text-xs"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-10 bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] mt-4 font-mono font-bold text-xs uppercase tracking-wider rounded-[3px] shadow-[0_0_20px_rgba(101,245,154,0.3)] hover:shadow-[0_0_25px_rgba(101,245,154,0.45)] transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Sending reset link..." : "Send Reset Link →"}</span>
            </Button>
          </AuthForm>
          <AuthFooter>
            <p className="text-xs font-mono text-[#A0AEA5]">
              Remembered your password?{" "}
              <Link href="/auth/login" className="text-[#65F59A] hover:text-[#52E086] hover:underline font-bold">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </>
      ) : (
        <div className="text-center py-6 space-y-6">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-[#111B17] border border-[#65F59A]/40 text-[#65F59A] shadow-[0_0_15px_rgba(101,245,154,0.2)]">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-[#F2F7F3] font-display">Check Your Email</h2>
            <p className="text-xs text-[#A0AEA5] font-mono">
              We&apos;ve sent a password reset link to <strong className="text-[#65F59A] font-semibold">{email}</strong>.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-10 border-[rgba(160,190,170,0.18)] bg-[#111B17] text-[#F2F7F3] hover:text-white hover:bg-[#17251E] hover:border-[#65F59A]/40 rounded-[3px] font-mono text-xs"
            onClick={() => setSubmitted(false)}
          >
            Re-enter Email
          </Button>
          <AuthFooter>
            <p className="text-xs font-mono text-[#A0AEA5]">
              Back to{" "}
              <Link href="/auth/login" className="text-[#65F59A] hover:text-[#52E086] hover:underline font-bold">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </div>
      )}
    </AuthCard>
  );
}

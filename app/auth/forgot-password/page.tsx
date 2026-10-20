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
                className="text-xs font-semibold tracking-wide uppercase text-zinc-300"
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
                className="w-full h-11 bg-[#161922] border-[#2A303F] text-white placeholder:text-zinc-500 focus:border-[#3864F8] rounded-[4px]"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[#3864F8] hover:bg-[#2c53d6] text-white mt-4 font-semibold text-sm rounded-[4px] shadow-sm transition-all flex items-center justify-center space-x-2"
            >
              <span>{loading ? "Sending reset link..." : "Send Reset Link →"}</span>
            </Button>
          </AuthForm>
          <AuthFooter>
            <p className="text-xs text-zinc-400">
              Remembered your password?{" "}
              <Link href="/auth/login" className="text-[#3864F8] hover:underline font-semibold">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </>
      ) : (
        <div className="text-center py-6 space-y-6">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400">
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
            <h2 className="text-xl font-bold text-white">Check Your Email</h2>
            <p className="text-xs text-zinc-400">
              We&apos;ve sent a password reset link to <strong className="text-white font-medium">{email}</strong>.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-11 border-[#2A303F] bg-[#161922] text-zinc-200 hover:text-white hover:bg-[#1E232F] rounded-[4px]"
            onClick={() => setSubmitted(false)}
          >
            Re-enter Email
          </Button>
          <AuthFooter>
            <p className="text-xs text-zinc-400">
              Back to{" "}
              <Link href="/auth/login" className="text-[#3864F8] hover:underline font-semibold">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </div>
      )}
    </AuthCard>
  );
}

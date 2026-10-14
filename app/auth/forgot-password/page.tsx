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
            <div className="p-3 mb-4 rounded-xl text-xs font-semibold bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400">
              {errorMsg}
            </div>
          )}

          <AuthForm onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
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
                className="w-full font-medium"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white mt-2 font-semibold rounded-xl py-6"
            >
              {loading ? "Sending reset link..." : "Send Reset Link"}
            </Button>
          </AuthForm>
          <AuthFooter>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Remembered your password?{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </>
      ) : (
        <div className="text-center py-6 space-y-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check Your Email</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We&apos;ve sent a password reset link to <strong className="text-gray-800 dark:text-gray-200">{email}</strong>.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-850 py-6 rounded-xl"
            onClick={() => setSubmitted(false)}
          >
            Re-enter Email
          </Button>
          <AuthFooter>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Back to{" "}
              <Link href="/auth/login" className="text-primary hover:underline font-medium">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </div>
      )}
    </AuthCard>
  );
}

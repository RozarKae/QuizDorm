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
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-primary/10 text-primary">
          <svg
            className="h-10 w-10 animate-bounce"
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Verify Your Email</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
            Please verify your email address to access your QuizDorm dashboard. Enter your email below if you need to resend the code.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-center"
          />
          <div className="flex flex-col space-y-2 pt-2">
            <Button
              onClick={handleResend}
              disabled={resending}
              variant="outline"
              className="w-full border-gray-300 dark:border-gray-700 py-6 rounded-xl"
            >
              {resending ? "Resending..." : "Resend Verification Email"}
            </Button>
            <Link href="/auth/login" className="w-full">
              <Button className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl">
                Return to Login
              </Button>
            </Link>
          </div>
        </div>

        <AuthFooter>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Need help? Contact our{" "}
            <Link href="/support" className="text-primary hover:underline font-medium">
              Support Center
            </Link>
          </p>
        </AuthFooter>
      </div>
    </AuthCard>
  );
}

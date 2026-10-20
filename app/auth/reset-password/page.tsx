"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthIndicator, { evaluatePasswordStrength } from "@/components/auth/PasswordStrengthIndicator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { updatePassword } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match");
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    const strength = evaluatePasswordStrength(password);
    if (strength.score < 2) {
      setErrorMsg("Please choose a stronger password (at least 8 characters with numbers & symbols)");
      toast.error("Please choose a stronger password");
      setLoading(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    formData.set("confirmPassword", confirmPassword);

    const res = await updatePassword(formData);

    if (res.error) {
      setErrorMsg(res.error);
      toast.error(res.error);
      setLoading(false);
    } else {
      setSuccess(true);
      toast.success("Password updated successfully!");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    }
  };

  if (success) {
    return (
      <AuthCard>
        <div className="text-center py-6 space-y-6">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-950/60 border border-emerald-700/60 text-emerald-400">
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Password Updated</h2>
            <p className="text-xs text-zinc-400">
              Your password has been successfully reset. Redirecting to login page...
            </p>
          </div>
          <AuthFooter>
            <p className="text-xs text-zinc-400">
              Go to{" "}
              <Link href="/auth/login" className="text-[#3864F8] hover:underline font-semibold">
                Log In
              </Link>
            </p>
          </AuthFooter>
        </div>
      </AuthCard>
    );
  }

  return (
    <AuthCard>
      <AuthHeader
        title="Choose a New Password"
        subtitle="Please enter and confirm your new account password."
      />

      {errorMsg && (
        <div className="p-3 mb-4 rounded-[4px] text-xs font-semibold bg-red-950/50 border border-red-800 text-red-300">
          {errorMsg}
        </div>
      )}

      <AuthForm onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-semibold tracking-wide uppercase text-zinc-300">
              New Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 bg-[#161922] border-[#2A303F] text-white placeholder:text-zinc-500 rounded-[4px]"
            />
            <PasswordStrengthIndicator password={password} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-semibold tracking-wide uppercase text-zinc-300">
              Confirm New Password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-11 bg-[#161922] border-[#2A303F] text-white placeholder:text-zinc-500 rounded-[4px]"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 bg-[#3864F8] hover:bg-[#2c53d6] text-white mt-5 font-semibold text-sm rounded-[4px] shadow-sm flex items-center justify-center space-x-2"
        >
          <span>{loading ? "Updating password..." : "Reset Password →"}</span>
        </Button>
      </AuthForm>

      <AuthFooter />
    </AuthCard>
  );
}

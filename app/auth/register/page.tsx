"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import PasswordInput from "@/components/auth/PasswordInput";
import PasswordStrengthIndicator, { evaluatePasswordStrength } from "@/components/auth/PasswordStrengthIndicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpWithEmail, signInWithGoogle } from "../actions";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

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

    const res = await signUpWithEmail(formData);

    if (res.error) {
      setErrorMsg(res.error);
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success("Account created successfully!");
      router.push(res.redirectUrl || "/dashboard");
    }
  };

  const handleGoogleLogin = async () => {
    const res = await signInWithGoogle();
    if (res.error) {
      toast.error(res.error);
    } else if (res.url) {
      window.location.href = res.url;
    }
  };

  return (
    <AuthCard>
      <AuthHeader
        title="Create an Account"
        subtitle="Start testing and hosting competitive quizzes on QuizDorm."
      />

      {errorMsg && (
        <div className="p-3 mb-4 rounded-[2px] text-xs font-mono font-medium bg-destructive/10 text-destructive border border-destructive/30">
          {errorMsg}
        </div>
      )}

      <AuthForm onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Full Legal Name
            </label>
            <Input id="name" name="name" type="text" placeholder="Jane Doe" required className="w-full font-mono text-xs h-10 rounded-[3px]" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Institutional Email
            </label>
            <Input id="email" name="email" type="email" placeholder="jane@school.edu" required className="w-full font-mono text-xs h-10 rounded-[3px]" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="role" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-10 w-full rounded-[3px] border border-[#2A303F] bg-[#161922] px-3 py-2 text-xs font-mono text-white focus-visible:ring-1 focus-visible:ring-[#3864F8] outline-none cursor-pointer"
            >
              <option value="student" className="bg-[#161922] text-white">Student Account</option>
              <option value="teacher" className="bg-[#161922] text-white">Teacher / Instructor</option>
              <option value="school" className="bg-[#161922] text-white">School / Campus Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full font-mono text-xs h-10 rounded-[3px]"
            />
            <PasswordStrengthIndicator password={password} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full font-mono text-xs h-10 rounded-[3px]"
            />
          </div>

          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-3.5 w-3.5 text-[#3864F8] focus:ring-[#3864F8] border-[#2A303F] bg-[#161922] rounded-[2px]"
              />
            </div>
            <div className="ml-2 text-xs font-mono text-zinc-300 font-medium">
              <label htmlFor="terms" className="cursor-pointer">
                I accept the Terms of Service and Privacy Policy.
              </label>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2855F5] hover:bg-[#1E44D6] text-white mt-5 font-mono text-xs font-bold rounded-[3px] h-10 shadow-md cursor-pointer transition-all"
        >
          {loading ? "Creating Account..." : "Create Account →"}
        </Button>
      </AuthForm>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#262B37]"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
          <span className="bg-[#13161F] px-3 text-zinc-400 font-semibold">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 border-[#262B37] bg-[#161922] text-white hover:bg-[#1E2230] hover:border-[#3864F8]/50 h-10 rounded-[3px] text-xs font-mono font-medium transition-all"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
          </svg>
          <span>Continue with Google</span>
        </Button>
      </div>

      <AuthFooter>
        <p className="text-xs font-mono text-zinc-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#3864F8] hover:text-[#5B82F9] hover:underline font-bold">
            Log In
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
}

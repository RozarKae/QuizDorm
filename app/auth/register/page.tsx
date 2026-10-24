"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import PasswordInput from "@/components/auth/PasswordInput";
import EmailSuggestionInput from "@/components/auth/EmailSuggestionInput";
import PasswordStrengthIndicator, { evaluatePasswordStrength } from "@/components/auth/PasswordStrengthIndicator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signUpWithEmail, signInWithGoogle } from "../actions";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("subscriber");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
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
      if (typeof window !== "undefined") {
        localStorage.removeItem("quizdorm_demo_user");
      }
      if ((res as any).requiresEmailVerification) {
        toast.info("Account created! Please check your email to verify your address.");
        router.push((res as any).redirectUrl || "/auth/login");
      } else {
        toast.success("Account created successfully!");
        window.location.href = res.redirectUrl || "/dashboard";
      }
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      let origin = typeof window !== "undefined" ? window.location.origin : "";
      if (origin.includes("rozarkaes-projects.vercel.app")) {
        origin = "https://quizclassroom.vercel.app";
      }

      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const callbackUrl = `${origin}/auth/callback`;
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: callbackUrl,
            queryParams: {
              access_type: "offline",
              prompt: "consent",
            },
          },
        });

        if (error) {
          toast.error(error.message);
          setGoogleLoading(false);
          return;
        }

        if (data?.url) {
          window.location.href = data.url;
          return;
        }
      }

      // Server action fallback
      const res = await signInWithGoogle(origin);
      if (res.error) {
        toast.error(res.error);
        setGoogleLoading(false);
      } else if (res.url) {
        window.location.href = res.url;
      }
    } catch {
      toast.error("Failed to connect to Google authentication.");
      setGoogleLoading(false);
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
            <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
              Full Legal Name
            </label>
            <Input id="name" name="name" type="text" placeholder="Alex Chen" required className="w-full font-mono text-xs h-10 rounded-[3px]" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
              Email Address / Institutional Email
            </label>
            <EmailSuggestionInput
              id="email"
              name="email"
              placeholder="alex@quizdorm.com"
              required
              className="w-full font-mono text-xs h-10 rounded-[3px]"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="role" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-10 w-full rounded-[3px] border border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] px-3 py-2 text-xs font-mono text-[#F2F7F3] focus-visible:ring-1 focus-visible:ring-[#FF4D6D] focus-visible:border-[#FF4D6D] outline-none cursor-pointer"
            >
              <option value="subscriber" className="bg-[#1D1013] text-[#F2F7F3]">Subscriber (Free & Pro Personal Learner)</option>
              <option value="member" className="bg-[#1D1013] text-[#F2F7F3]">Member (Campus & Dorm Student)</option>
              <option value="handler" className="bg-[#1D1013] text-[#F2F7F3]">Handler (Teacher / Course Faculty)</option>
              <option value="institution" className="bg-[#1D1013] text-[#F2F7F3]">Institution (School / University Admin)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
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
            <label htmlFor="confirmPassword" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
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
                className="h-3.5 w-3.5 accent-[#FF4D6D] text-[#FF4D6D] focus:ring-[#FF4D6D] border-[rgba(240, 160, 180,0.25)] bg-[#1D1013] rounded-[2px]"
              />
            </div>
            <div className="ml-2 text-xs font-mono text-[#A0AEA5] font-medium">
              <label htmlFor="terms" className="cursor-pointer">
                I accept the Terms of Service and Privacy Policy.
              </label>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] mt-5 font-mono text-xs font-bold rounded-[3px] h-10 shadow-[0_0_20px_rgba(255, 77, 109,0.3)] hover:shadow-[0_0_25px_rgba(255, 77, 109,0.45)] cursor-pointer transition-all uppercase tracking-wider"
        >
          {loading ? "Creating Account..." : "Create Account →"}
        </Button>
      </AuthForm>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[rgba(240, 160, 180,0.14)]"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
          <span className="bg-[#140C0E] px-3 text-[#A0AEA5] font-semibold border border-[rgba(240, 160, 180,0.12)] rounded-[3px]">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          variant="outline"
          type="button"
          disabled={googleLoading}
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] text-[#F2F7F3] hover:bg-[#2A141A] hover:border-[#FF4D6D]/40 h-10 rounded-[3px] text-xs font-mono font-medium transition-all cursor-pointer"
        >
          {googleLoading ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-[#FF4D6D] border-t-transparent rounded-full animate-spin" />
              <span>Connecting Google Auth...</span>
            </span>
          ) : (
            <>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </Button>
      </div>

      <AuthFooter>
        <p className="text-xs font-mono text-[#A0AEA5]">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#FF4D6D] hover:text-[#FF3366] hover:underline font-bold">
            Log In
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
}

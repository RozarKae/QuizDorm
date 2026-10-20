"use client";

import { Suspense, useState, useEffect } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import PasswordInput from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signInWithEmail, signInWithGoogle } from "../actions";
import { TEST_ACCOUNTS } from "../constants";
import { toast } from "sonner";
import { Sparkles, GraduationCap, School, UserCheck } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectedFrom = searchParams.get("redirectedFrom");
  const roleParam = searchParams.get("role");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (roleParam === "student") {
      setEmail("student@quizdorm.com");
      setPassword("Password123!");
    } else if (roleParam === "teacher") {
      setEmail("teacher@quizdorm.com");
      setPassword("Password123!");
    } else if (roleParam === "school") {
      setEmail("school@quizdorm.com");
      setPassword("Password123!");
    }
  }, [roleParam]);

  const getRoleDisplayName = () => {
    switch (roleParam) {
      case "student":
        return "Student";
      case "teacher":
        return "Teacher";
      case "school":
        return "School Admin";
      case "admin":
        return "Platform Admin";
      default:
        return "";
    }
  };

  const roleName = getRoleDisplayName();

  const handleQuickFill = (roleKey: "student" | "teacher" | "school") => {
    setErrorMsg("");
    const acc = TEST_ACCOUNTS[`${roleKey}@quizdorm.com`];
    if (acc) {
      setEmail(acc.email);
      setPassword(acc.password);
      toast.info(`Filled ${acc.role.toUpperCase()} credentials: ${acc.email}`);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await signInWithEmail(formData);

    if (res.error) {
      setErrorMsg(res.error);
      toast.error(res.error);
      setLoading(false);
    } else {
      toast.success("Logged in successfully!");
      if (typeof window !== "undefined" && (res as any).user) {
        localStorage.setItem("quizdorm_demo_user", JSON.stringify((res as any).user));
      }
      const target = redirectedFrom || res.redirectUrl || "/dashboard";
      window.location.href = target;
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
    <>
      <AuthHeader
        title={roleName ? `Login as ${roleName}` : "Login to QuizDorm"}
        subtitle="Welcome back! Please enter your credentials to access your account."
      />

      {redirectedFrom && (
        <div className="p-3 mb-4 rounded-[2px] text-xs font-mono font-medium bg-coral/10 text-coral border border-coral/30">
          Authentication required: {redirectedFrom}.
        </div>
      )}

      {errorMsg && (
        <div className="p-3 mb-4 rounded-[2px] text-xs font-mono font-medium bg-destructive/10 text-destructive border border-destructive/30">
          {errorMsg}
        </div>
      )}

      {/* Quick Test Accounts Interactive Panel */}
      <div className="p-3.5 mb-5 rounded-[4px] border border-[#262B37] bg-[#161922] space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] font-bold text-white flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#3864F8]" />
            Quick Presets // Verified Roles
          </span>
          <span className="font-mono text-[10px] text-[#3864F8] font-bold uppercase tracking-wider">Auto-Fill</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleQuickFill("student")}
            className={`p-2 rounded-[3px] border text-left transition-all ${email === "student@quizdorm.com"
                ? "border-[#3864F8] bg-[#1C2233] ring-1 ring-[#3864F8]"
                : "border-[#262B37] bg-[#10131B] hover:border-[#3864F8]/50"
              }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#3864F8] uppercase flex items-center">
              <GraduationCap className="w-3 h-3 mr-1" /> Student
            </div>
            <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">student@...</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("teacher")}
            className={`p-2 rounded-[3px] border text-left transition-all ${email === "teacher@quizdorm.com"
                ? "border-[#3864F8] bg-[#1C2233] ring-1 ring-[#3864F8]"
                : "border-[#262B37] bg-[#10131B] hover:border-[#3864F8]/50"
              }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#3864F8] uppercase flex items-center">
              <UserCheck className="w-3 h-3 mr-1" /> Teacher
            </div>
            <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">teacher@...</div>
          </button>

          <button
            type="button"
            onClick={() => handleQuickFill("school")}
            className={`p-2 rounded-[3px] border text-left transition-all ${email === "school@quizdorm.com"
                ? "border-[#3864F8] bg-[#1C2233] ring-1 ring-[#3864F8]"
                : "border-[#262B37] bg-[#10131B] hover:border-[#3864F8]/50"
              }`}
          >
            <div className="text-[10px] font-mono font-bold text-[#3864F8] uppercase flex items-center">
              <School className="w-3 h-3 mr-1" /> School
            </div>
            <div className="text-[10px] font-mono text-zinc-400 truncate mt-0.5">school@...</div>
          </button>
        </div>
      </div>

      <AuthForm onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Email Address
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full font-mono text-xs h-10 rounded-[3px]"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-[#3864F8] hover:text-[#5B82F9] hover:underline font-mono">
                Forgot Password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full font-mono text-xs h-10 rounded-[3px]"
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              defaultChecked
              className="h-3.5 w-3.5 text-[#3864F8] focus:ring-[#3864F8] border-[#2A303F] bg-[#161922] rounded-[2px]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs font-mono text-zinc-300 font-medium cursor-pointer">
              Remember Active Session
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2855F5] hover:bg-[#1E44D6] text-white mt-5 font-mono text-xs font-bold rounded-[3px] h-10 shadow-md cursor-pointer transition-all"
        >
          {loading ? "Authenticating..." : "Sign In →"}
        </Button>
      </AuthForm>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[#262B37]"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
          <span className="bg-[#13161F] px-3 text-zinc-400 font-semibold">
            Or continue with
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#3864F8] hover:text-[#5B82F9] hover:underline font-bold">
            Sign Up
          </Link>
        </p>
      </AuthFooter>
    </>
  );
}

export default function LoginPage() {
  return (
    <AuthCard>
      <Suspense fallback={<div className="text-center py-4 text-sm text-gray-500">Loading login form...</div>}>
        <LoginContent />
      </Suspense>
    </AuthCard>
  );
}

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
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Lock, Shield, CheckCircle2 } from "lucide-react";

function LoginContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectedFrom = searchParams.get("redirectedFrom");
  const roleParam = searchParams.get("role");
  const isLogout = searchParams.get("logout") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (isLogout && typeof window !== "undefined") {
      localStorage.removeItem("quizdorm_demo_user");
      document.cookie =
        "quizdorm_demo_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    }
  }, [isLogout]);

  const getRoleDisplayName = () => {
    switch (roleParam) {
      case "subscriber":
        return "Subscriber";
      case "member":
      case "student":
        return "Member";
      case "handler":
      case "teacher":
        return "Handler";
      case "institution":
      case "school":
        return "Institution";
      case "admin":
        return "Platform Admin";
      default:
        return "";
    }
  };

  const roleName = getRoleDisplayName();

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
      if (typeof window !== "undefined") {
        if ((res as any).isDemoAccount && (res as any).user) {
          localStorage.setItem("quizdorm_demo_user", JSON.stringify((res as any).user));
        } else {
          // Real Supabase session: remove any stale demo accounts
          localStorage.removeItem("quizdorm_demo_user");
        }
      }
      const target = redirectedFrom || res.redirectUrl || "/dashboard";
      window.location.href = target;
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
    <>
      <AuthHeader
        title={roleName ? `Login as ${roleName}` : "Login to QuizDorm"}
        subtitle="Welcome back! Please enter your credentials to access your account."
      />

      {isLogout && (
        <div className="p-3 mb-4 rounded-[3px] text-xs font-mono font-medium bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D]" />
          <span>You have been signed out successfully.</span>
        </div>
      )}

      {redirectedFrom && (
        <div className="relative mb-5 p-3.5 rounded-[6px] border bg-[#140C0E] animate-constant-glow transition-all">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4D6D] opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF4D6D] shadow-[0_0_8px_#FF4D6D]" />
              </span>
              <div className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#F2F7F3]">
                <Lock className="w-3.5 h-3.5 text-[#FF4D6D]" />
                <span>Login Required</span>
              </div>
            </div>
            <span className="text-[10px] font-mono font-semibold text-[#FF4D6D] bg-[rgba(255, 77, 109,0.12)] px-2.5 py-0.5 rounded-[3px] border border-[#FF4D6D]/30 shrink-0">
              Sign in to continue
            </span>
          </div>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 mb-4 rounded-[2px] text-xs font-mono font-medium bg-destructive/10 text-destructive border border-destructive/30">
          {errorMsg}
        </div>
      )}

      <AuthForm onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
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
              <label htmlFor="password" className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-semibold">
                Password
              </label>
              <Link href="/auth/forgot-password" className="text-xs text-[#FF4D6D] hover:text-[#FF3366] hover:underline font-mono">
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
              className="h-3.5 w-3.5 accent-[#FF4D6D] text-[#FF4D6D] focus:ring-[#FF4D6D] border-[rgba(240, 160, 180,0.25)] bg-[#1D1013] rounded-[2px]"
            />
            <label htmlFor="remember-me" className="ml-2 block text-xs font-mono text-[#A0AEA5] font-medium cursor-pointer">
              Remember Active Session
            </label>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-[#FF4D6D] hover:bg-[#FF3366] text-[#0B0708] mt-5 font-mono text-xs font-bold rounded-[3px] h-10 shadow-[0_0_20px_rgba(255, 77, 109,0.3)] hover:shadow-[0_0_25px_rgba(255, 77, 109,0.45)] cursor-pointer transition-all uppercase tracking-wider"
        >
          {loading ? "Authenticating..." : "Sign In →"}
        </Button>
      </AuthForm>

      <div className="relative my-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-[rgba(240, 160, 180,0.14)]"></div>
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-mono tracking-wider">
          <span className="bg-[#140C0E] px-3 text-[#A0AEA5] font-semibold border border-[rgba(240, 160, 180,0.12)] rounded-[3px]">
            Or continue with
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
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-[#FF4D6D] hover:text-[#FF3366] hover:underline font-bold">
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

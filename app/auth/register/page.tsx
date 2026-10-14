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
        <div className="p-3 mb-4 rounded-xl text-xs font-semibold bg-red-100 dark:bg-red-950/30 text-red-600 dark:text-red-400">
          {errorMsg}
        </div>
      )}

      <AuthForm onSubmit={handleFormSubmit}>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <Input id="name" name="name" type="text" placeholder="Jane Doe" required className="w-full font-medium" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <Input id="email" name="email" type="email" placeholder="jane@school.edu" required className="w-full font-medium" />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="role" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-10 w-full rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-100"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="school">School Admin</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <PasswordInput
              id="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
            <PasswordStrengthIndicator password={password} />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="flex items-start pt-2">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-2 text-xs">
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                I accept the Terms of Service and Privacy Policy.
              </label>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white mt-5 font-semibold rounded-xl py-6"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </AuthForm>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
            Or sign up with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-700 py-5 rounded-xl text-gray-700 dark:text-gray-200"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22-.03-.63z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
          </svg>
          <span>Continue with Google</span>
        </Button>
      </div>

      <AuthFooter>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
            Log In
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
}

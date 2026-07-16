"use client";

import { Suspense } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import PasswordInput from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function LoginContent() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const getRoleDisplayName = () => {
    switch (role) {
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

  return (
    <>
      <AuthHeader
        title={roleName ? `Login as ${roleName}` : "Login to QuizDorm"}
        subtitle="Welcome back! Please enter your details to login."
      />
      
      <AuthForm>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-xs text-primary hover:underline font-medium"
              >
                Forgot Password?
              </Link>
            </div>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-xs text-gray-700 dark:text-gray-300"
            >
              Remember Me
            </label>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
          Login
        </Button>
      </AuthForm>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
        </div>
      </div>

      <SocialLoginButtons />

      <AuthFooter>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/auth/register" className="text-primary hover:underline font-medium">
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
      <Suspense fallback={<div className="text-center py-4 text-sm text-gray-500">Loading form...</div>}>
        <LoginContent />
      </Suspense>
    </AuthCard>
  );
}

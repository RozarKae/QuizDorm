"use client";

import { useState } from "react";
import AuthCard from "@/components/auth/AuthCard";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthForm from "@/components/auth/AuthForm";
import AuthFooter from "@/components/auth/AuthFooter";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import PasswordInput from "@/components/auth/PasswordInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterPage() {
  const [role, setRole] = useState("student");

  return (
    <AuthCard>
      <AuthHeader
        title="Create an Account"
        subtitle="Start learning and testing with QuizDorm today."
      />

      <AuthForm>
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              required
              className="w-full"
            />
          </div>

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
            <label
              htmlFor="role"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="school">School Admin</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <PasswordInput
              id="password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="confirm-password"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Confirm Password
            </label>
            <PasswordInput
              id="confirm-password"
              placeholder="••••••••"
              required
              className="w-full"
            />
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
            </div>
            <div className="ml-2 text-xs">
              <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                I accept the{" "}
                <Link href="/terms" className="text-primary hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
          Create Account
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

      <SocialLoginButtons />

      <AuthFooter>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Log In
          </Link>
        </p>
      </AuthFooter>
    </AuthCard>
  );
}

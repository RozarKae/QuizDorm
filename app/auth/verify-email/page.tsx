import AuthCard from "@/components/auth/AuthCard";
import AuthFooter from "@/components/auth/AuthFooter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailPage() {
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
            We&apos;ve sent a verification link to your registered email address. Please click on the link to confirm your account.
          </p>
        </div>

        <div className="flex flex-col space-y-3 pt-2">
          <Link href="/dashboard" className="w-full">
            <Button className="w-full bg-primary hover:bg-primary/90 text-white">
              Continue to Dashboard
            </Button>
          </Link>
          <Button variant="outline" className="w-full border-gray-300 dark:border-gray-700">
            Resend Email
          </Button>
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

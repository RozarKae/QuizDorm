import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HelpCircle, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 shadow-sm">
        <HelpCircle className="w-10 h-10" />
      </div>

      <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Page Not Found</h2>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
        Sorry, the page you are looking for doesn&apos;t exist or has been moved.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-5 rounded-xl">
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="border-gray-300 dark:border-gray-800 px-6 py-5 rounded-xl">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

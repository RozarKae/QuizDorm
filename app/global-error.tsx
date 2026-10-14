"use client";

import React from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="bg-gray-50 dark:bg-gray-950 flex items-center justify-center min-h-screen p-6 font-sans">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-xl max-w-md text-center space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-950 text-red-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">System Exception Detected</h1>
          <p className="text-xs text-gray-500 leading-relaxed">
            QuizDorm encountered a critical runtime failure. Resetting the session state usually restores normal operation.
          </p>
          <Button onClick={() => reset()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl w-full py-2.5">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Recover Application
          </Button>
        </div>
      </body>
    </html>
  );
}

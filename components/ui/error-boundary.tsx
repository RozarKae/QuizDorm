"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="p-4 rounded-3xl bg-red-100 dark:bg-red-950 text-red-600 mb-4">
            <AlertTriangle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Something went wrong</h2>
          <p className="text-sm text-gray-500 max-w-md mb-6">
            An unexpected application error occurred. Our team has been notified and we are resolving it.
          </p>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => this.setState({ hasError: false })}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
            >
              <RefreshCw className="w-4 h-4 mr-1.5" /> Try Again
            </Button>
            <a href="/dashboard">
              <Button variant="outline" className="text-xs font-semibold rounded-xl">
                <Home className="w-4 h-4 mr-1.5" /> Return to Dashboard
              </Button>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

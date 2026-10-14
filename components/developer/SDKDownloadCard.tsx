"use client";

import React from "react";
import { Download, Code, Terminal, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SDKDownloadCard() {
  const handleDownload = (sdk: string) => {
    toast.success(`Downloading official QuizDorm ${sdk} Client SDK package...`);
  };

  const sdks = [
    { name: "TypeScript / Node.js SDK", lang: "@quizdorm/sdk-js", version: "v1.4.2" },
    { name: "Python Client Library", lang: "pip install quizdorm-python", version: "v1.2.0" },
    { name: "Java Enterprise SDK", lang: "com.quizdorm:quizdorm-sdk", version: "v1.0.8" },
    { name: "C# / .NET Package", lang: "NuGet: QuizDorm.SDK", version: "v1.1.0" },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Terminal className="w-5 h-5 text-indigo-600 mr-2" /> Official QuizDorm Client SDKs
        </h3>
        <span className="text-xs text-gray-400 font-mono">Auto-generated OpenAPI Clients</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
        {sdks.map((s, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-sans">
              <span className="font-bold text-gray-900 dark:text-white">{s.name}</span>
              <span className="text-[10px] text-gray-400">{s.version}</span>
            </div>

            <div className="p-2 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold truncate">
              {s.lang}
            </div>

            <Button onClick={() => handleDownload(s.name)} variant="outline" className="w-full text-xs h-8 rounded-xl font-sans font-bold">
              <Download className="w-3.5 h-3.5 mr-1" /> Download Package
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { WebhookEndpoint } from "@/lib/types/developer";
import { WebhookEngine } from "@/lib/developer/webhookEngine";
import { Globe, Play, CheckCircle2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function WebhookManagerCard() {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>(WebhookEngine.getEndpoints());
  const [testing, setTesting] = useState(false);

  const handleTestWebhook = async () => {
    setTesting(true);
    try {
      const logs = await WebhookEngine.triggerWebhook("quiz.submitted", {
        quizId: "qz-101",
        studentName: "Karthik Rajendran",
        scorePercent: 94,
      });
      toast.success(`Simulated payload delivered to ${logs.length} webhook endpoints (200 OK)!`);
    } catch {
      toast.error("Webhook simulation failed.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Globe className="w-5 h-5 text-indigo-600 mr-2" /> Webhook Engine & Signature Verifier
          </h3>
          <p className="text-xs text-gray-500">
            Real-time event webhooks signed with HMAC SHA-256 (`x-quizdorm-signature`).
          </p>
        </div>

        <Button onClick={handleTestWebhook} disabled={testing} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl">
          {testing ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Play className="w-4 h-4 mr-1" />}
          Test Payload
        </Button>
      </div>

      <div className="space-y-3 text-xs">
        {endpoints.map((ep) => (
          <div key={ep.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs">{ep.url}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold uppercase">
                {ep.enabled ? "ACTIVE" : "DISABLED"}
              </span>
            </div>

            <p className="text-gray-500 text-[11px]">{ep.description}</p>

            <div className="flex flex-wrap items-center justify-between text-[10px] text-gray-400 font-mono pt-1">
              <span>Events: {ep.events.join(", ")}</span>
              <span>Deliveries: {ep.totalDeliveries} | Failures: {ep.failureRatePercent}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

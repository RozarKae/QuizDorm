"use client";

import React, { useState } from "react";
import { ApiKey, ApiPermissionScope } from "@/lib/types/developer";
import { ApiKeyManager } from "@/lib/developer/apiKeyManager";
import { Key, Plus, ShieldCheck, Copy, Eye, Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function ApiKeyManagerCard() {
  const [keys, setKeys] = useState<ApiKey[]>(ApiKeyManager.getApiKeys());
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [keyName, setKeyName] = useState("LMS Roster Sync Key");
  const [environment, setEnvironment] = useState<"production" | "sandbox">("production");
  const [generatedRawKey, setGeneratedRawKey] = useState<string | null>(null);

  const handleCreate = () => {
    const res = ApiKeyManager.createApiKey({
      name: keyName,
      environment,
      scopes: ["read:questions", "write:questions", "manage:certificates"],
    });
    setKeys(ApiKeyManager.getApiKeys());
    setGeneratedRawKey(res.rawKey);
    toast.success(`Generated API Key [${res.apiKey.keyPrefix}...]`);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("API Key copied to clipboard!");
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Key className="w-5 h-5 text-indigo-600 mr-2" /> Scoped API Key Manager
          </h3>
          <p className="text-xs text-gray-500">
            Generate and manage environment-scoped REST API keys (`qd_live_...` & `qd_test_...`).
          </p>
        </div>

        <Button onClick={() => setShowModal(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl">
          <Plus className="w-4 h-4 mr-1" /> Create API Key
        </Button>
      </div>

      {/* Keys List */}
      <div className="space-y-3 text-xs">
        {keys.map((k) => (
          <div key={k.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{k.name}</span>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    k.environment === "production" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {k.environment}
                </span>
                <span className="text-[10px] font-mono text-gray-400">Limit: {k.rateLimitPerMin}/min</span>
              </div>
            </div>

            <div className="flex items-center justify-between font-mono bg-white dark:bg-gray-950 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 text-[11px]">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{k.keyPrefix}••••••••••••••••</span>
              <Button size="sm" variant="ghost" onClick={() => handleCopy(k.keyPrefix)} className="h-6 text-[10px]">
                <Copy className="w-3 h-3 mr-1" /> Copy Prefix
              </Button>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {k.scopes.map((s, idx) => (
                <span key={idx} className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Generator Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
                <Key className="w-5 h-5 text-indigo-600 mr-2" /> Generate New API Key
              </h3>
              <button onClick={() => { setShowModal(false); setGeneratedRawKey(null); }} className="text-gray-400">✕</button>
            </div>

            {!generatedRawKey ? (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Key Name / Description</label>
                  <Input value={keyName} onChange={(e) => setKeyName(e.target.value)} className="text-xs" />
                </div>

                <div>
                  <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Environment</label>
                  <select
                    value={environment}
                    onChange={(e) => setEnvironment(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
                  >
                    <option value="production">Production (`qd_live_`)</option>
                    <option value="sandbox">Sandbox (`qd_test_`)</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" onClick={() => setShowModal(false)} className="text-xs rounded-xl">Cancel</Button>
                  <Button onClick={handleCreate} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">Generate Key</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-2">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Copy API Key Secret</span>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                    Make sure to copy your API key now. You will not be able to see it again!
                  </p>
                  <div className="p-2.5 bg-white dark:bg-gray-950 rounded-xl border font-mono font-bold text-indigo-600 break-all text-[11px] flex justify-between items-center">
                    <span>{generatedRawKey}</span>
                    <Button size="sm" onClick={() => handleCopy(generatedRawKey)} className="h-7 text-xs ml-2 shrink-0">
                      Copy
                    </Button>
                  </div>
                </div>

                <Button onClick={() => { setShowModal(false); setGeneratedRawKey(null); }} className="w-full text-xs rounded-xl">Done</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

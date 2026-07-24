"use client";

import React, { useState, useEffect } from "react";
import { AISettings, AIProviderType } from "@/lib/types/ai";
import { AISettingsManager } from "@/lib/ai/settings/settingsManager";
import { APIKeyManager } from "@/lib/ai/security/apiKeyManager";
import { AIConnectionManager, ConnectionTestResult } from "@/lib/ai/services/connectionManager";
import { AIModelDiscoveryService } from "@/lib/ai/services/modelDiscovery";
import { AIRouterStatusCard } from "@/components/ai/AIRouterStatusCard";
import { AIHealthWidget } from "@/components/ai/AIHealthWidget";
import { AIPlayground } from "@/components/ai/AIPlayground";
import { PromptTemplateManager } from "@/components/ai/PromptTemplateManager";
import { AIUsageDashboard } from "@/components/ai/AIUsageDashboard";
import { AIDiagnosticsPanel } from "@/components/ai/AIDiagnosticsPanel";
import { AILogsViewer } from "@/components/ai/AILogsViewer";
import { ProviderBadge } from "@/components/ai/ProviderBadge";

import {
  Cpu,
  Sparkles,
  Zap,
  Key,
  Sliders,
  Play,
  FileText,
  BarChart3,
  Activity,
  ShieldCheck,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AIAdminWorkspace() {
  const [activeTab, setActiveTab] = useState<
    "settings" | "models" | "playground" | "templates" | "analytics" | "diagnostics" | "logs"
  >("settings");

  const [settings, setSettings] = useState<AISettings>(AISettingsManager.getSettings());
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const keyG = APIKeyManager.getApiKey("gemini");
    if (keyG) setGeminiApiKey(keyG);

    const keyO = APIKeyManager.getApiKey("openai");
    if (keyO) setOpenaiApiKey(keyO);
  }, []);

  const handleSaveSettings = (updates: Partial<AISettings>) => {
    const updated = AISettingsManager.saveSettings(updates);
    setSettings(updated);
    toast.success("AI Router settings updated successfully!");
  };

  const handleSaveApiKeys = () => {
    if (geminiApiKey) APIKeyManager.setApiKey("gemini", geminiApiKey);
    if (openaiApiKey) APIKeyManager.setApiKey("openai", openaiApiKey);
    toast.success("AI Provider credentials saved securely!");
  };

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      const result = await AIConnectionManager.testConnection(settings.defaultProvider);
      setTestResult(result);
      if (result.connected) {
        toast.success(`Connection to ${result.providerName} verified! Latency: ${result.latencyMs}ms`);
      } else {
        toast.error(`Connection test failed: ${result.message}`);
      }
    } catch {
      toast.error("Connection test encountered an error.");
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <Cpu className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.00A & 2.00B AI Layer
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI Foundation & Intelligence Platform Admin
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Centralized AI Router workspace managing Google Gemini API integration, provider routing, model discovery, prompt templates, token analytics, and live diagnostics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleTestConnection}
              disabled={testing}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 rounded-2xl backdrop-blur-md"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 ${testing ? "animate-spin" : ""}`} /> Connection Ping Test
            </Button>

            <Button
              onClick={() => setActiveTab("playground")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30"
            >
              <Play className="w-4 h-4 mr-1.5" /> AI Playground Sandbox
            </Button>
          </div>
        </div>
      </div>

      {/* Router Status Summary */}
      <AIRouterStatusCard settings={settings} />

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto">
        {[
          { id: "settings", label: "Provider Connections & Settings", icon: <Key className="w-4 h-4" /> },
          { id: "playground", label: "AI Playground Sandbox", icon: <Sparkles className="w-4 h-4" /> },
          { id: "templates", label: "Prompt Template Library", icon: <FileText className="w-4 h-4" /> },
          { id: "analytics", label: "Usage & Cost Analytics", icon: <BarChart3 className="w-4 h-4" /> },
          { id: "diagnostics", label: "Diagnostics & Health", icon: <Activity className="w-4 h-4" /> },
          { id: "logs", label: "Searchable Audit Logs", icon: <Sliders className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Provider Connections & Credentials */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              <Key className="w-5 h-5 text-indigo-600 mr-2" /> AI Provider API Credentials & Fallback Policy
            </h3>

            {/* Provider API Keys */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1.5 flex items-center">
                  <ProviderBadge providerId="gemini" size="sm" />
                  <span className="ml-2">Google Gemini API Key</span>
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    placeholder="AIzaSy..."
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1.5 flex items-center">
                  <ProviderBadge providerId="openai" size="sm" />
                  <span className="ml-2">OpenAI API Key (Optional Adapter)</span>
                </label>
                <input
                  type={showKey ? "text" : "password"}
                  placeholder="sk-proj-..."
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-mono"
                />
              </div>
            </div>

            <Button onClick={handleSaveApiKeys} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
              Save API Credentials
            </Button>

            {/* Provider Configuration Settings */}
            <div className="pt-6 border-t border-gray-100 dark:border-gray-800 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Primary Provider</label>
                <select
                  value={settings.defaultProvider}
                  onChange={(e) => handleSaveSettings({ defaultProvider: e.target.value as AIProviderType })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                >
                  <option value="gemini">Google Gemini AI (Default)</option>
                  <option value="openai">OpenAI GPT-4o</option>
                  <option value="anthropic">Anthropic Claude</option>
                  <option value="mock">Simulated Engine (Offline)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Fallback Provider</label>
                <select
                  value={settings.fallbackProvider}
                  onChange={(e) => handleSaveSettings({ fallbackProvider: e.target.value as AIProviderType })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                >
                  <option value="mock">Simulated Engine (Recommended)</option>
                  <option value="gemini">Google Gemini</option>
                  <option value="openai">OpenAI</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-gray-700 dark:text-gray-300 block mb-1">Retry Limit</label>
                <input
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) => handleSaveSettings({ retryAttempts: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold"
                />
              </div>
            </div>
          </div>

          <AIHealthWidget />
        </div>
      )}

      {/* Tab 2: AI Playground */}
      {activeTab === "playground" && <AIPlayground />}

      {/* Tab 3: Prompt Templates */}
      {activeTab === "templates" && <PromptTemplateManager />}

      {/* Tab 4: Usage Analytics */}
      {activeTab === "analytics" && <AIUsageDashboard />}

      {/* Tab 5: Diagnostics */}
      {activeTab === "diagnostics" && <AIDiagnosticsPanel />}

      {/* Tab 6: Audit Logs */}
      {activeTab === "logs" && <AILogsViewer />}
    </div>
  );
}

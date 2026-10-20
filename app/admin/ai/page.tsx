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
    <div className="min-h-screen bg-[#070B0A] text-[#F2F7F3] p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.14)] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-[#65F59A]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-[#17251E] border border-[#65F59A]/20 text-[#65F59A]">
                <Cpu className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#65F59A] bg-[#17251E] px-3 py-1 rounded-full border border-[#65F59A]/20">
                Core AI Orchestrator
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#F2F7F3]">
              AI Foundation & Intelligence Platform Admin
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Centralized AI Router workspace managing Google Gemini API integration, provider routing, model discovery, prompt templates, token analytics, and live diagnostics.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleTestConnection}
              disabled={testing}
              variant="outline"
              className="font-mono text-xs border-[rgba(160,190,170,0.18)] bg-[#111B17] hover:bg-[#17251E] text-[#F2F7F3]"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 text-[#65F59A] ${testing ? "animate-spin" : ""}`} /> Ping Router Test
            </Button>

            <Button
              onClick={() => setActiveTab("playground")}
              className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-bold text-xs shadow-lg shadow-[#65F59A]/10"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> AI Sandbox Playground
            </Button>
          </div>
        </div>
      </div>

      {/* Router Status Summary */}
      <AIRouterStatusCard settings={settings} />

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-[rgba(160,190,170,0.12)] pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: "settings", label: "Provider Connections & Settings", icon: <Key className="w-3.5 h-3.5" /> },
          { id: "playground", label: "AI Playground Sandbox", icon: <Sparkles className="w-3.5 h-3.5" /> },
          { id: "templates", label: "Prompt Template Library", icon: <FileText className="w-3.5 h-3.5" /> },
          { id: "analytics", label: "Usage & Cost Analytics", icon: <BarChart3 className="w-3.5 h-3.5" /> },
          { id: "diagnostics", label: "Diagnostics & Health", icon: <Activity className="w-3.5 h-3.5" /> },
          { id: "logs", label: "Searchable Audit Logs", icon: <Sliders className="w-3.5 h-3.5" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-[#17251E] border-[#65F59A]/40 text-[#65F59A] shadow-sm shadow-[#65F59A]/10"
                  : "bg-transparent border-transparent text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#111B17]"
              }`}
            >
              <span className={isActive ? "text-[#65F59A]" : "text-[#69786F]"}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Provider Connections & Credentials */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.14)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#F2F7F3] flex items-center">
              <Key className="w-4 h-4 text-[#65F59A] mr-2" /> AI Provider API Credentials & Fallback Policy
            </h3>

            {/* Provider API Keys */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#A0AEA5] block mb-2 flex items-center">
                  <ProviderBadge providerId="gemini" size="sm" />
                  <span className="ml-2 font-mono text-xs">Google Gemini API Key</span>
                </label>
                <div className="relative">
                  <input
                    type={showKey ? "text" : "password"}
                    placeholder="AIzaSy..."
                    value={geminiApiKey}
                    onChange={(e) => setGeminiApiKey(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#65F59A]/50 focus:ring-1 focus:ring-[#65F59A]/40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-3 text-[#69786F] hover:text-[#F2F7F3] transition-colors"
                  >
                    {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#A0AEA5] block mb-2 flex items-center">
                  <ProviderBadge providerId="openai" size="sm" />
                  <span className="ml-2 font-mono text-xs">OpenAI API Key (Optional Adapter)</span>
                </label>
                <input
                  type={showKey ? "text" : "password"}
                  placeholder="sk-proj-..."
                  value={openaiApiKey}
                  onChange={(e) => setOpenaiApiKey(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#65F59A]/50 focus:ring-1 focus:ring-[#65F59A]/40 transition-colors"
                />
              </div>
            </div>

            <Button onClick={handleSaveApiKeys} className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-bold text-xs rounded-xl shadow-md shadow-[#65F59A]/15">
              Save API Credentials
            </Button>

            {/* Provider Configuration Settings */}
            <div className="pt-6 border-t border-[rgba(160,190,170,0.12)] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-mono text-[11px] text-[#A0AEA5] uppercase tracking-wider block mb-1.5">Primary Provider</label>
                <select
                  value={settings.defaultProvider}
                  onChange={(e) => handleSaveSettings({ defaultProvider: e.target.value as AIProviderType })}
                  className="w-full p-2.5 rounded-xl border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono text-xs focus:outline-none focus:border-[#65F59A]/50"
                >
                  <option value="gemini">Google Gemini AI (Default)</option>
                  <option value="openai">OpenAI GPT-4o</option>
                  <option value="anthropic">Anthropic Claude</option>
                  <option value="mock">Simulated Engine (Offline)</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-[#A0AEA5] uppercase tracking-wider block mb-1.5">Fallback Provider</label>
                <select
                  value={settings.fallbackProvider}
                  onChange={(e) => handleSaveSettings({ fallbackProvider: e.target.value as AIProviderType })}
                  className="w-full p-2.5 rounded-xl border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono text-xs focus:outline-none focus:border-[#65F59A]/50"
                >
                  <option value="mock">Simulated Engine (Recommended)</option>
                  <option value="gemini">Google Gemini</option>
                  <option value="openai">OpenAI</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-[#A0AEA5] uppercase tracking-wider block mb-1.5">Retry Limit</label>
                <input
                  type="number"
                  value={settings.retryAttempts}
                  onChange={(e) => handleSaveSettings({ retryAttempts: Number(e.target.value) })}
                  className="w-full p-2.5 rounded-xl border border-[rgba(160,190,170,0.15)] bg-[#111B17] text-[#F2F7F3] font-mono text-xs focus:outline-none focus:border-[#65F59A]/50"
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

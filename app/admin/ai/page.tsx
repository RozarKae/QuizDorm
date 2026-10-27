"use client";

import { AIDiagnosticsPanel } from "@/components/ai/AIDiagnosticsPanel";
import { AIHealthWidget } from "@/components/ai/AIHealthWidget";
import { AILogsViewer } from "@/components/ai/AILogsViewer";
import { AIPlayground } from "@/components/ai/AIPlayground";
import { AIRouterStatusCard } from "@/components/ai/AIRouterStatusCard";
import { AIUsageDashboard } from "@/components/ai/AIUsageDashboard";
import { PromptTemplateManager } from "@/components/ai/PromptTemplateManager";
import { ProviderBadge } from "@/components/ai/ProviderBadge";
import { APIKeyManager } from "@/lib/ai/security/apiKeyManager";
import { AIConnectionManager,ConnectionTestResult } from "@/lib/ai/services/connectionManager";
import { AISettingsManager } from "@/lib/ai/settings/settingsManager";
import { AIProviderType,AISettings } from "@/lib/types/ai";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
Activity,
BarChart3,
Cpu,
Eye,
EyeOff,
FileText,
Key,
Play,
RefreshCw,
Sliders,
Sparkles
} from "lucide-react";
import { toast } from "sonner";

type AdminAITab = "settings" | "models" | "playground" | "templates" | "analytics" | "diagnostics" | "logs";

export default function AIAdminWorkspace() {
  const [activeTab, setActiveTab] = useState<AdminAITab>("settings");

  const [settings, setSettings] = useState<AISettings>(AISettingsManager.getSettings());
  const [geminiApiKey, setGeminiApiKey] = useState(() => APIKeyManager.getApiKey("gemini"));
  const [openaiApiKey, setOpenaiApiKey] = useState(() => APIKeyManager.getApiKey("openai"));
  const [showKey, setShowKey] = useState(false);

  const [, setTestResult] = useState<ConnectionTestResult | null>(null);
  const [testing, setTesting] = useState(false);

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
    <div className="min-h-screen bg-[#0B0708] text-[#F2F7F3] p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-32 bg-[#FF4D6D]/5 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-xl bg-[#2A141A] border border-[#FF4D6D]/20 text-[#FF4D6D]">
                <Cpu className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4D6D] bg-[#2A141A] px-3 py-1 rounded-full border border-[#FF4D6D]/20">
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
              className="font-mono text-xs border-[rgba(240, 160, 180,0.18)] bg-[#1D1013] hover:bg-[#2A141A] text-[#F2F7F3]"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 text-[#FF4D6D] ${testing ? "animate-spin" : ""}`} /> Ping Router Test
            </Button>

            <Button
              onClick={() => setActiveTab("playground")}
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-bold text-xs shadow-lg shadow-[#FF4D6D]/10"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> AI Sandbox Playground
            </Button>
          </div>
        </div>
      </div>

      {/* Router Status Summary */}
      <AIRouterStatusCard settings={settings} />

      {/* Tabs Bar */}
      <div className="flex items-center space-x-2 border-b border-[rgba(240, 160, 180,0.12)] pb-2 overflow-x-auto scrollbar-none">
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
              onClick={() => setActiveTab(tab.id as AdminAITab)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium flex items-center space-x-2 transition-all whitespace-nowrap border ${
                isActive
                  ? "bg-[#2A141A] border-[#FF4D6D]/40 text-[#FF4D6D] shadow-sm shadow-[#FF4D6D]/10"
                  : "bg-transparent border-transparent text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1D1013]"
              }`}
            >
              <span className={isActive ? "text-[#FF4D6D]" : "text-[#69786F]"}>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Provider Connections & Credentials */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h3 className="text-sm font-mono uppercase tracking-wider text-[#F2F7F3] flex items-center">
              <Key className="w-4 h-4 text-[#FF4D6D] mr-2" /> AI Provider API Credentials & Fallback Policy
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
                    className="w-full text-xs p-3 rounded-xl border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#FF4D6D]/50 focus:ring-1 focus:ring-[#FF4D6D]/40 transition-colors"
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
                  className="w-full text-xs p-3 rounded-xl border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] placeholder-[#69786F] font-mono focus:outline-none focus:border-[#FF4D6D]/50 focus:ring-1 focus:ring-[#FF4D6D]/40 transition-colors"
                />
              </div>
            </div>

            <Button onClick={handleSaveApiKeys} className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-bold text-xs rounded-xl shadow-md shadow-[#FF4D6D]/15">
              Save API Credentials
            </Button>

            {/* Provider Configuration Settings */}
            <div className="pt-6 border-t border-[rgba(240, 160, 180,0.12)] grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="font-mono text-[11px] text-[#A0AEA5] uppercase tracking-wider block mb-1.5">Primary Provider</label>
                <select
                  value={settings.defaultProvider}
                  onChange={(e) => handleSaveSettings({ defaultProvider: e.target.value as AIProviderType })}
                  className="w-full p-2.5 rounded-xl border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono text-xs focus:outline-none focus:border-[#FF4D6D]/50"
                >
                  <option value="gemini">Google Gemini AI (Default)</option>
                  <option value="openai">OpenAI GPT-4o</option>
                  <option value="anthropic">Anthropic Claude</option>
                  <option value="mock">QuizDorm Local Edge Synthesizer</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[11px] text-[#A0AEA5] uppercase tracking-wider block mb-1.5">Fallback Provider</label>
                <select
                  value={settings.fallbackProvider}
                  onChange={(e) => handleSaveSettings({ fallbackProvider: e.target.value as AIProviderType })}
                  className="w-full p-2.5 rounded-xl border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono text-xs focus:outline-none focus:border-[#FF4D6D]/50"
                >
                  <option value="mock">QuizDorm Local Edge Synthesizer (Recommended)</option>
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
                  className="w-full p-2.5 rounded-xl border border-[rgba(240, 160, 180,0.15)] bg-[#1D1013] text-[#F2F7F3] font-mono text-xs focus:outline-none focus:border-[#FF4D6D]/50"
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

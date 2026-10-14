"use client";

import React from "react";
import { OCRJobSettings, OCRProviderType, OCRRecognitionMode, OCRLanguage } from "@/lib/types/ocr";
import { availableOCRProviders } from "@/lib/ocr/providers";
import { Settings, Cpu, Languages, Sparkles, Check, FileCode2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OCRSettingsProps {
  settings: OCRJobSettings;
  onChange: (newSettings: OCRJobSettings) => void;
}

export function OCRSettings({ settings, onChange }: OCRSettingsProps) {
  const handleProviderChange = (provider: OCRProviderType) => {
    onChange({ ...settings, provider });
  };

  const handleModeChange = (mode: OCRRecognitionMode) => {
    onChange({ ...settings, mode });
  };

  const handleLanguageChange = (language: OCRLanguage) => {
    onChange({ ...settings, language });
  };

  const toggleOption = (key: keyof OCRJobSettings) => {
    if (typeof settings[key] === "boolean") {
      onChange({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950 rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-900 pb-4">
        <CardTitle className="text-base font-bold flex items-center text-gray-900 dark:text-white">
          <Settings className="w-5 h-5 text-indigo-600 mr-2" /> OCR & Intelligence Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Provider Selection */}
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-3">
            <Cpu className="w-4 h-4 text-indigo-500 mr-1.5" /> Select OCR Engine Provider
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableOCRProviders.map((p) => {
              const isSelected = settings.provider === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                      : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-gray-50/30 dark:bg-gray-900/30"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">{p.name}</span>
                    {p.badge && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-indigo-600 text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recognition Mode */}
        <div>
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-3">
            <FileCode2 className="w-4 h-4 text-indigo-500 mr-1.5" /> Recognition Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "printed", label: "Printed Book / Exam", desc: "Standard published text" },
              { id: "handwritten", label: "Handwritten Notes", desc: "Teacher worksheets & scans" },
              { id: "mixed", label: "Mixed Document", desc: "Text, diagrams & scribbles" },
              { id: "math_dense", label: "Math & Equations", desc: "LaTeX, matrices & formulas" },
            ].map((m) => {
              const isSel = settings.mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleModeChange(m.id as OCRRecognitionMode)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSel
                      ? "border-indigo-600 bg-indigo-600 text-white shadow-sm"
                      : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-xs font-bold">{m.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isSel ? "text-indigo-100" : "text-gray-400"}`}>{m.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-2">
              <Languages className="w-4 h-4 text-indigo-500 mr-1.5" /> OCR Target Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleLanguageChange(e.target.value as OCRLanguage)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="auto">Auto-detect Language</option>
              <option value="en">English (US / UK)</option>
              <option value="es">Spanish (Español)</option>
              <option value="fr">French (Français)</option>
              <option value="de">German (Deutsch)</option>
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="zh">Chinese (中文)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center mb-2">
              <Sparkles className="w-4 h-4 text-indigo-500 mr-1.5" /> AI Automation Options
            </label>
            <div className="space-y-2">
              {[
                { key: "autoNumbering", label: "Auto-detect Question Numbers" },
                { key: "autoTopicDetection", label: "Auto-assign Subject & Topic Taxonomy" },
                { key: "autoDifficultyDetection", label: "Auto-estimate Difficulty (Easy/Med/Hard)" },
              ].map((opt) => (
                <label key={opt.key} className="flex items-center space-x-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(settings[opt.key as keyof OCRJobSettings])}
                    onChange={() => toggleOption(opt.key as keyof OCRJobSettings)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

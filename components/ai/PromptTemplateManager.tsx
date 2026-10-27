"use client";

import { PROMPT_TEMPLATE_LIBRARY } from "@/lib/ai/prompts/promptTemplates";
import { PromptTemplate } from "@/lib/types/ai";
import { Copy,FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function PromptTemplateManager() {
  const [selectedTpl, setSelectedTpl] = useState<PromptTemplate>(PROMPT_TEMPLATE_LIBRARY[0]);

  const handleCopyTemplate = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Template copied to clipboard!");
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" /> Centralized Prompt Template Library
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Version-controlled system prompts and variable templates for Question Gen, OCR, Quality Review & AI Tutor.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Templates List */}
        <div className="lg:col-span-5 space-y-2">
          {PROMPT_TEMPLATE_LIBRARY.map((tpl) => {
            const isSel = selectedTpl.id === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => setSelectedTpl(tpl)}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSel
                    ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{tpl.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    v{tpl.version}.0
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{tpl.description}</p>
              </div>
            );
          })}
        </div>

        {/* Template Inspector */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
            <div>
              <h4 className="font-bold text-sm text-gray-900 dark:text-white">{selectedTpl.name}</h4>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold uppercase">Category: {selectedTpl.category}</span>
            </div>
            <button
              onClick={() => handleCopyTemplate(selectedTpl.userPromptTemplate)}
              className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-600 dark:text-gray-300 flex items-center"
            >
              <Copy className="w-3.5 h-3.5 mr-1" /> Copy Template
            </button>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">System Prompt</label>
            <div className="p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-gray-800 dark:text-gray-200">
              {selectedTpl.systemPrompt}
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">User Prompt Template (with variables)</label>
            <div className="p-3 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
              {selectedTpl.userPromptTemplate}
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Required Interpolation Variables</label>
            <div className="flex flex-wrap gap-1.5">
              {selectedTpl.requiredVariables.map((v) => (
                <span key={v} className="px-2.5 py-0.5 rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 font-mono font-semibold text-[11px]">
                  {"{{" + v + "}}"}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

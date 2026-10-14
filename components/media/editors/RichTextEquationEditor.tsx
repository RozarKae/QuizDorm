"use client";

import React, { useState } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Code,
  Table as TableIcon,
  Sigma,
  Image as ImageIcon,
  Music,
  Video,
  Eye,
  Link2,
} from "lucide-react";
import { EquationEditorModal } from "./EquationEditorModal";
import { Button } from "@/components/ui/button";

interface RichTextEquationEditorProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  rows?: number;
  label?: string;
}

export function RichTextEquationEditor({
  value,
  onChange,
  placeholder = "Write question statement, formulas or instructions...",
  rows = 4,
  label = "Question Content & Rich Media Editor",
}: RichTextEquationEditorProps) {
  const [equationModalOpen, setEquationModalOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleApplyFormatting = (wrapper: string) => {
    onChange(`${wrapper}${value}${wrapper}`);
  };

  const handleInsertSnippet = (snippet: string) => {
    onChange(`${value}\n${snippet}`);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</label>
          <button
            type="button"
            onClick={() => setShowPreview(!showPreview)}
            className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
          >
            <Eye className="w-3.5 h-3.5 mr-1" /> {showPreview ? "Switch to Editor" : "Live Rich Preview"}
          </button>
        </div>
      )}

      {/* Editor Toolbar */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex flex-wrap items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
          <button
            type="button"
            onClick={() => handleApplyFormatting("**")}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleApplyFormatting("*")}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleInsertSnippet("- Bullet Item 1\n- Bullet Item 2")}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Unordered List"
          >
            <List className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => handleInsertSnippet("1. Step One\n2. Step Two")}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Ordered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1" />

          {/* Equation Editor Trigger */}
          <button
            type="button"
            onClick={() => setEquationModalOpen(true)}
            className="p-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 flex items-center space-x-1 font-bold text-xs"
            title="Insert Mathematical LaTeX Equation"
          >
            <Sigma className="w-3.5 h-3.5" />
            <span className="text-[10px]">Equation</span>
          </button>

          {/* Table Inserter */}
          <button
            type="button"
            onClick={() =>
              handleInsertSnippet(
                "| Header 1 | Header 2 |\n| --- | --- |\n| Cell 1 | Cell 2 |"
              )
            }
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Insert Table Grid"
          >
            <TableIcon className="w-3.5 h-3.5" />
          </button>

          {/* Code Block Inserter */}
          <button
            type="button"
            onClick={() => handleInsertSnippet("```python\ndef calculate_sum(a, b):\n    return a + b\n```")}
            className="p-1.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Insert Code Snippet Block"
          >
            <Code className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editor vs Preview Display */}
        {showPreview ? (
          <div className="p-3 min-h-[100px] text-xs text-gray-900 dark:text-gray-100 font-sans space-y-2 bg-white dark:bg-gray-950">
            <div className="prose dark:prose-invert max-w-none text-xs">
              {value ? value : <span className="text-gray-400 italic">Empty question statement</span>}
            </div>
          </div>
        ) : (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            rows={rows}
            placeholder={placeholder}
            className="w-full text-xs p-3 bg-transparent text-gray-900 dark:text-gray-100 focus:outline-none font-medium resize-y"
          />
        )}
      </div>

      {/* Equation Modal */}
      <EquationEditorModal
        open={equationModalOpen}
        onOpenChange={setEquationModalOpen}
        onInsertLatex={(latex) => onChange(`${value} ${latex} `)}
      />
    </div>
  );
}

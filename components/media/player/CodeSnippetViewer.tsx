"use client";

import { Button } from "@/components/ui/button";
import { CodeQuestionData } from "@/lib/types/media";
import { Code,Terminal } from "lucide-react";
import { useState } from "react";

interface CodeSnippetViewerProps {
  codeData: CodeQuestionData;
  onSelectBugLine?: (lineNo: number) => void;
}

export function CodeSnippetViewer({
  codeData,
  onSelectBugLine,
}: CodeSnippetViewerProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [showConsoleOutput, setShowConsoleOutput] = useState(false);

  const lines = (codeData.initialCode || "def sum(a, b):\n    return a + b").split("\n");

  const handleLineClick = (lineNo: number) => {
    setSelectedLine(lineNo);
    if (onSelectBugLine) onSelectBugLine(lineNo);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-0 text-xs">
      {/* Code Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-300">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-indigo-400" />
          <span className="font-mono font-bold uppercase">{codeData.language || "python"} Snippet</span>
        </div>

        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowConsoleOutput(!showConsoleOutput)}
          className="h-7 text-[11px] bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700"
        >
          <Terminal className="w-3.5 h-3.5 mr-1 text-rose-400" /> Run Code Output
        </Button>
      </div>

      {/* Code Block */}
      <div className="p-4 overflow-x-auto font-mono text-slate-100 space-y-1">
        {lines.map((line, idx) => {
          const lineNo = idx + 1;
          const isSelected = selectedLine === lineNo;

          return (
            <div
              key={idx}
              onClick={() => handleLineClick(lineNo)}
              className={`flex items-center space-x-3 px-2 py-1 rounded cursor-pointer transition-colors ${
                isSelected
                  ? "bg-indigo-600/40 border-l-4 border-indigo-500 font-bold"
                  : "hover:bg-slate-900/60"
              }`}
            >
              <span className="text-slate-500 select-none w-6 text-right font-mono text-[11px]">{lineNo}</span>
              <span className="text-slate-200 whitespace-pre">{line}</span>
            </div>
          );
        })}
      </div>

      {/* Simulated Console Output */}
      {showConsoleOutput && (
        <div className="p-3 bg-black border-t border-slate-800 text-rose-400 font-mono text-[11px] space-y-1">
          <div className="flex items-center justify-between text-slate-500 text-[10px]">
            <span>Console Execution Result</span>
            <span>Exit Code: 0</span>
          </div>
          <pre className="whitespace-pre-wrap">{codeData.expectedOutput || "Output: 15\nExecution completed in 0.04s."}</pre>
        </div>
      )}
    </div>
  );
}

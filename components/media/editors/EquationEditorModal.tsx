"use client";

import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Sigma } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EquationEditorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInsertLatex: (latex: string) => void;
  initialLatex?: string;
}

const EQUATION_PRESETS = [
  { label: "Fraction", latex: "\\frac{a}{b}" },
  { label: "Square Root", latex: "\\sqrt{x}" },
  { label: "Quadratic Formula", latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
  { label: "Integral", latex: "\\int_{a}^{b} f(x) \\, dx" },
  { label: "Summation", latex: "\\sum_{i=1}^{n} x_i" },
  { label: "Matrix 2x2", latex: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
  { label: "Limit", latex: "\\lim_{x \\to 0} \\frac{\\sin(x)}{x} = 1" },
  { label: "Pythagorean", latex: "a^2 + b^2 = c^2" },
];

const SYMBOL_PALETTE = [
  "\\alpha", "\\beta", "\\gamma", "\\theta", "\\pi", "\\Delta", "\\infty",
  "\\pm", "\\times", "\\div", "\\le", "\\ge", "\\neq", "\\approx", "\\int", "\\sum"
];

export function EquationEditorModal({
  open,
  onOpenChange,
  onInsertLatex,
  initialLatex = "",
}: EquationEditorModalProps) {
  const [latex, setLatex] = useState(initialLatex || "\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}");

  const handleInsertSymbol = (sym: string) => {
    setLatex((prev) => `${prev} ${sym} `);
  };

  const handleInsertPreset = (presetLatex: string) => {
    setLatex(presetLatex);
  };

  const handleConfirm = () => {
    if (!latex.trim()) {
      toast.error("Please enter a LaTeX equation");
      return;
    }
    onInsertLatex(`$${latex.trim()}$`);
    toast.success("LaTeX equation inserted into question text!");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center text-gray-900 dark:text-white">
            <Sigma className="w-5 h-5 text-indigo-600 mr-2" /> Mathematical Equation & Symbol Editor
          </DialogTitle>
          <DialogDescription className="text-xs">
            Construct LaTeX mathematical notation for algebra, calculus, matrices, and scientific formulas.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Quick Presets */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
              Quick Equation Templates
            </label>
            <div className="flex flex-wrap gap-1.5">
              {EQUATION_PRESETS.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => handleInsertPreset(p.latex)}
                  className="px-2.5 py-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-[11px] font-semibold text-gray-800 dark:text-gray-200 hover:border-indigo-500"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Symbol Palette */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
              Symbols & Operators
            </label>
            <div className="grid grid-cols-8 gap-1">
              {SYMBOL_PALETTE.map((sym) => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => handleInsertSymbol(sym)}
                  className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950 text-center"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Raw LaTeX Input */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              Raw LaTeX Code Input
            </label>
            <textarea
              value={latex}
              onChange={(e) => setLatex(e.target.value)}
              rows={3}
              className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Live Rendered LaTeX Preview Box */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">
              Rendered Notation Preview
            </label>
            <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 text-center text-sm font-semibold text-indigo-900 dark:text-indigo-100">
              ${latex}$
            </div>
          </div>
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="rounded-xl text-xs">
            Cancel
          </Button>
          <Button onClick={handleConfirm} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            Insert Equation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { WhiteboardTool, WhiteboardElement } from "@/lib/types/classroom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Pencil, Eraser, Square, Circle, ArrowRight, Type, StickyNote, 
  Sparkles, Download, Trash2, Undo, Grid, Pointer, Sigma, Eye, Save
} from "lucide-react";
import { toast } from "sonner";

const mockInitialElements: WhiteboardElement[] = [
  { id: "el-1", type: "sticky", x: 60, y: 60, width: 220, height: 160, color: "#fef08a", size: 2, text: "📌 Key Theorem:\nState vector collapse occurs upon measurement in Hilbert Space." },
  { id: "el-2", type: "formula", x: 340, y: 80, color: "#3b82f6", size: 2, latex: "i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r},t) = \\hat{H} \\Psi(\\mathbf{r},t)" },
  { id: "el-3", type: "rectangle", x: 320, y: 60, width: 440, height: 110, color: "#6366f1", size: 2 },
  { id: "el-4", type: "sticky", x: 60, y: 260, width: 220, height: 160, color: "#bbf7d0", size: 2, text: "💡 Class Task:\nDerive the expectation value of Hamiltonian H." },
];

export function SmartWhiteboardStudio() {
  const [elements, setElements] = useState<WhiteboardElement[]>(mockInitialElements);
  const [activeTool, setActiveTool] = useState<WhiteboardTool>("pen");
  const [selectedColor, setSelectedColor] = useState("#6366f1");
  const [strokeSize, setStrokeSize] = useState(3);
  const [showGrid, setShowGrid] = useState(true);
  const [savedBoardSnapshots, setSavedBoardSnapshots] = useState<string[]>(["Board 1 - Quantum Basics"]);

  // Modal / Inputs for text & LaTeX insertion
  const [customText, setCustomText] = useState("");
  const [customLatex, setCustomLatex] = useState("");
  const [isInsertingFormula, setIsInsertingFormula] = useState(false);

  const colors = ["#6366f1", "#ef4444", "#10b981", "#f59e0b", "#ec4899", "#000000", "#ffffff"];

  const handleInsertFormula = (latexExpr: string) => {
    const newEl: WhiteboardElement = {
      id: `el-${Date.now()}`,
      type: "formula",
      x: 180 + Math.random() * 200,
      y: 180 + Math.random() * 150,
      color: selectedColor,
      size: strokeSize,
      latex: latexExpr,
    };
    setElements([...elements, newEl]);
    setIsInsertingFormula(false);
    toast.success("Mathematical equation added to whiteboard canvas!");
  };

  const handleAddStickyNote = () => {
    const newEl: WhiteboardElement = {
      id: `el-${Date.now()}`,
      type: "sticky",
      x: 100 + Math.random() * 150,
      y: 100 + Math.random() * 150,
      width: 200,
      height: 150,
      color: "#fef08a",
      size: 2,
      text: "✏️ New Sticky Note:\nDouble click to edit discussion points.",
    };
    setElements([...elements, newEl]);
    toast.success("Sticky note added.");
  };

  const handleClearBoard = () => {
    setElements([]);
    toast.info("Whiteboard canvas cleared.");
  };

  const handleSaveSnapshot = () => {
    const name = `Snapshot - ${new Date().toLocaleTimeString()}`;
    setSavedBoardSnapshots([name, ...savedBoardSnapshots]);
    toast.success(`Whiteboard board saved to history!`);
  };

  const handleExportPNG = () => {
    toast.success("Exporting interactive whiteboard to high-resolution PNG...");
  };

  return (
    <div className="space-y-4">
      {/* Top Toolbar Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-white flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Tools Palette */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTool("pointer")}
            className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              activeTool === "pointer" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
            }`}
            title="Laser Pointer"
          >
            <Pointer className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool("pen")}
            className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              activeTool === "pen" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
            }`}
            title="Pen"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool("eraser")}
            className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              activeTool === "eraser" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
            }`}
            title="Eraser"
          >
            <Eraser className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool("rectangle")}
            className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              activeTool === "rectangle" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
            }`}
            title="Rectangle"
          >
            <Square className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTool("circle")}
            className={`p-2 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              activeTool === "circle" ? "bg-indigo-600 text-white font-bold" : "text-slate-400 hover:bg-slate-800"
            }`}
            title="Circle"
          >
            <Circle className="w-4 h-4" />
          </button>
          <button
            onClick={handleAddStickyNote}
            className="p-2 rounded-lg text-xs flex items-center gap-1 text-slate-400 hover:bg-slate-800"
            title="Add Sticky Note"
          >
            <StickyNote className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => setIsInsertingFormula(true)}
            className="p-2 rounded-lg text-xs flex items-center gap-1 text-slate-400 hover:bg-slate-800"
            title="Insert Math / Science Formula"
          >
            <Sigma className="w-4 h-4 text-indigo-400" />
          </button>
        </div>

        {/* Color & Stroke Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedColor(c)}
                style={{ backgroundColor: c }}
                className={`w-5 h-5 rounded-full border border-slate-700 transition-transform ${
                  selectedColor === c ? "scale-125 ring-2 ring-indigo-500" : ""
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800">
            <span>Stroke:</span>
            <input
              type="range"
              min={1}
              max={10}
              value={strokeSize}
              onChange={(e) => setStrokeSize(Number(e.target.value))}
              className="w-16 h-1 accent-indigo-500"
            />
          </div>
        </div>

        {/* Board Options */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowGrid(!showGrid)}
            className={`text-xs rounded-xl ${showGrid ? "bg-indigo-600/20 text-indigo-400" : "text-slate-400"}`}
          >
            <Grid className="w-3.5 h-3.5 mr-1" /> Grid Background
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleSaveSnapshot}
            className="text-xs rounded-xl border-slate-700 bg-slate-800 text-white"
          >
            <Save className="w-3.5 h-3.5 mr-1 text-amber-400" /> Save History
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleExportPNG}
            className="text-xs rounded-xl border-slate-700 bg-slate-800 text-white"
          >
            <Download className="w-3.5 h-3.5 mr-1 text-rose-400" /> Export PNG
          </Button>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearBoard}
            className="text-xs rounded-xl"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Main Interactive Whiteboard Canvas Area */}
      <div className="relative w-full h-[540px] bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        {/* Grid Background Overlay */}
        {showGrid && (
          <div
            className="absolute inset-0 pointer-events-none opacity-15"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
        )}

        {/* Board Elements Rendering */}
        <div className="w-full h-full p-8 relative">
          {elements.map((el) => {
            if (el.type === "sticky") {
              return (
                <div
                  key={el.id}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    width: `${el.width}px`,
                    height: `${el.height}px`,
                    backgroundColor: el.color,
                  }}
                  className="absolute p-3 rounded-xl shadow-xl border border-amber-300/40 text-slate-900 font-medium text-xs flex flex-col justify-between cursor-move"
                >
                  <pre className="font-sans whitespace-pre-wrap">{el.text}</pre>
                  <span className="text-[10px] text-slate-600 text-right">Sticky Note</span>
                </div>
              );
            }

            if (el.type === "formula") {
              return (
                <div
                  key={el.id}
                  style={{ left: `${el.x}px`, top: `${el.y}px`, color: el.color }}
                  className="absolute p-4 rounded-xl bg-slate-900/90 backdrop-blur-md border border-indigo-500/40 text-white font-mono text-sm shadow-2xl flex items-center gap-3"
                >
                  <Sigma className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="font-bold tracking-wide">{el.latex}</span>
                </div>
              );
            }

            if (el.type === "rectangle") {
              return (
                <div
                  key={el.id}
                  style={{
                    left: `${el.x}px`,
                    top: `${el.y}px`,
                    width: `${el.width}px`,
                    height: `${el.height}px`,
                    borderColor: el.color,
                    borderWidth: `${el.size}px`,
                  }}
                  className="absolute rounded-xl border-dashed bg-indigo-500/5 pointer-events-none"
                />
              );
            }

            return null;
          })}

          {/* Active Tool Pointer Effect */}
          {activeTool === "pointer" && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none animate-pulse">
              <div className="w-5 h-5 rounded-full bg-red-500 shadow-lg shadow-red-500/50 border border-white" />
              <span className="px-2 py-0.5 rounded bg-red-600 text-white text-[10px] font-bold">
                Laser Pointer Mode
              </span>
            </div>
          )}
        </div>

        {/* History Snapshot Sidebar Overlay */}
        <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 text-xs text-white max-w-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-slate-300 border-b border-slate-800 pb-1">
            <span>Board Snapshots</span>
            <span className="text-[10px] text-slate-500">{savedBoardSnapshots.length} saved</span>
          </div>
          <div className="space-y-1">
            {savedBoardSnapshots.map((snap, idx) => (
              <div key={idx} className="flex items-center justify-between text-[11px] text-slate-400 hover:text-white py-1">
                <span>{snap}</span>
                <Eye className="w-3 h-3 text-indigo-400 cursor-pointer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insert Math Equations Modal */}
      {isInsertingFormula && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sigma className="w-5 h-5 text-indigo-600" /> Insert Scientific / Math Equation
              </h3>
              <button onClick={() => setIsInsertingFormula(false)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-slate-500">Select a preset LaTeX equation or enter a custom formula:</p>
              
              <div className="grid grid-cols-1 gap-2">
                {[
                  "i\\hbar \\frac{\\partial}{\\partial t} \\Psi = \\hat{H}\\Psi",
                  "E = m c^2",
                  "\\int_{a}^{b} f(x) dx = F(b) - F(a)",
                  "\\nabla \\times \\mathbf{B} = \\mu_0 \\mathbf{J} + \\mu_0 \\epsilon_0 \\frac{\\partial \\mathbf{E}}{\\partial t}",
                ].map((expr) => (
                  <button
                    key={expr}
                    onClick={() => handleInsertFormula(expr)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs hover:border-indigo-500 transition-colors"
                  >
                    {expr}
                  </button>
                ))}
              </div>

              <div>
                <label className="block font-semibold mb-1">Custom Formula</label>
                <Input
                  value={customLatex}
                  onChange={(e) => setCustomLatex(e.target.value)}
                  placeholder="e.g. \\sum_{i=1}^{n} i = \\frac{n(n+1)}{2}"
                  className="rounded-xl font-mono text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setIsInsertingFormula(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button
                  onClick={() => customLatex && handleInsertFormula(customLatex)}
                  className="bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  Insert Formula
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

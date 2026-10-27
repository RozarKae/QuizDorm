"use client";

import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { OCRJob } from "@/lib/types/ocr";
import { ChevronLeft,ChevronRight,Eye,FileText,Image as ImageIcon,Sigma,Table as TableIcon } from "lucide-react";
import { useState } from "react";

interface OCRPreviewProps {
  job: OCRJob;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OCRPreview({ job, open, onOpenChange }: OCRPreviewProps) {
  const [activeTab, setActiveTab] = useState<"text" | "tables" | "diagrams" | "math">("text");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = job.pageCount || 1;

  const tables = job.extractedQuestions.flatMap((q) => q.tables || []).filter(Boolean);
  const diagrams = job.extractedQuestions.flatMap((q) => q.diagrams || []).filter(Boolean);
  const mathExprs = job.extractedQuestions.flatMap((q) => q.mathExpressions || []).filter(Boolean);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-6 rounded-3xl">
        <DialogHeader className="border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-bold flex items-center text-gray-900 dark:text-white">
              <Eye className="w-5 h-5 text-indigo-600 mr-2" /> OCR Region & Document Preview: {job.fileName}
            </DialogTitle>
            <div className="flex items-center space-x-1.5 text-xs text-gray-500">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-7 w-7 p-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="h-7 w-7 p-0"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <DialogDescription className="text-xs">
            Inspect detected bounding boxes, formatted tables, LaTeX equations, and raw OCR text stream.
          </DialogDescription>
        </DialogHeader>

        {/* View mode selector */}
        <div className="flex items-center space-x-2 border-b border-gray-100 dark:border-gray-800 py-2">
          <button
            onClick={() => setActiveTab("text")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === "text"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Raw OCR Text ({job.extractedQuestions.length} Questions)</span>
          </button>

          <button
            onClick={() => setActiveTab("tables")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === "tables"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Extracted Tables ({tables.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("diagrams")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === "diagrams"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Diagram Placeholders ({diagrams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("math")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              activeTab === "math"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
            }`}
          >
            <Sigma className="w-3.5 h-3.5" />
            <span>Math LaTeX ({mathExprs.length})</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-800 dark:text-gray-200">
          {activeTab === "text" && (
            <div className="space-y-4 font-sans">
              {job.extractedQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    <span>
                      {q.questionNumber || `Question ${idx + 1}`} [{q.type}]
                    </span>
                    <span className="text-[10px] text-gray-400">Confidence: {q.confidence.overall}%</span>
                  </div>
                  <p className="text-xs font-medium text-gray-900 dark:text-white whitespace-pre-wrap">{q.title}</p>
                  {q.options.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1 text-[11px]">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={opt.id}
                          className={`p-2 rounded-lg border ${
                            opt.isCorrect
                              ? "bg-rose-50 dark:bg-rose-950/50 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 font-semibold"
                              : "bg-gray-50 dark:bg-gray-900 border-gray-100 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {String.fromCharCode(65 + oIdx)}. {opt.text} {opt.isCorrect && "✓"}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "tables" && (
            <div className="space-y-4 font-sans">
              {tables.length === 0 ? (
                <p className="text-center py-8 text-gray-400">No tables detected in this document.</p>
              ) : (
                tables.map((t) => (
                  <div key={t.id} className="p-4 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 space-y-2">
                    <h5 className="font-bold text-xs text-gray-900 dark:text-white">{t.caption || "Extracted Table"}</h5>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300">
                            {t.headers.map((h, i) => (
                              <th key={i} className="p-2 border border-gray-200 dark:border-gray-800 font-bold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {t.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="p-2 border border-gray-200 dark:border-gray-800">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "diagrams" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans">
              {diagrams.length === 0 ? (
                <p className="col-span-2 text-center py-8 text-gray-400">No diagrams or charts detected in this document.</p>
              ) : (
                diagrams.map((d) => (
                  <div key={d.id} className="p-4 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 text-center space-y-2">
                    <div className="h-32 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center border border-dashed border-indigo-300 dark:border-indigo-700">
                      <ImageIcon className="w-8 h-8 text-indigo-500 mb-1" />
                    </div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">{d.label}</div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {d.type}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === "math" && (
            <div className="space-y-3">
              {mathExprs.length === 0 ? (
                <p className="text-center py-8 text-gray-400 font-sans">No mathematical formulas detected in this document.</p>
              ) : (
                mathExprs.map((expr, idx) => (
                  <div key={idx} className="p-3 bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between items-center">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">${expr}$</span>
                    <span className="text-[10px] text-gray-400">LaTeX Validated</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

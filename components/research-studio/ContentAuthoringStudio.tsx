"use client";

import React, { useState } from "react";
import { AuthoringDocument } from "@/lib/types/research-studio";
import { Button } from "@/components/ui/button";
import { 
  Edit3, Eye, FileText, Sparkles, Copy, Save, Code, Layers
} from "lucide-react";
import { toast } from "sonner";

const mockDoc: AuthoringDocument = {
  id: "doc-101",
  title: "Chapter 4: Tensor Product Hilbert Spaces & Bell Inequalities",
  category: "Textbook Chapter",
  wordCount: 1420,
  authorName: "Dr. Eleanor Vance",
  hasLaTeXFormulas: true,
  hasDiagrams: true,
  contentMarkdown: `# Chapter 4: Tensor Product Hilbert Spaces

In quantum mechanics, when combining two independent Hilbert spaces H_A and H_B, the total state space is defined via the tensor product:

$$\\mathcal{H}_{total} = \\mathcal{H}_A \\otimes \\mathcal{H}_B$$

### Theorem 4.1 (Tsirelson's Bound)
The maximum violation of the CHSH inequality for any quantum state is bounded by:

$$S_{max} = 2\\sqrt{2} \\approx 2.828$$`,
  lastEdited: "Feb 24, 2026",
};

export function ContentAuthoringStudio() {
  const [doc, setDoc] = useState<AuthoringDocument>(mockDoc);
  const [markdownContent, setMarkdownContent] = useState(mockDoc.contentMarkdown);
  const [isLivePreview, setIsLivePreview] = useState(false);

  const handleSaveDocument = () => {
    setDoc((prev) => ({ ...prev, contentMarkdown: markdownContent, lastEdited: "Just now" }));
    toast.success("Document draft saved to Cloud Vault!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Edit3 className="w-3.5 h-3.5" /> Professional Academic Authoring Studio
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" /> Educational Content Authoring Studio
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Author textbook chapters, lesson notes, and research papers with built-in LaTeX formula blocks, interactive diagrams, and live Markdown preview.
          </p>
        </div>

        <div className="flex gap-2">
          <Button onClick={() => setIsLivePreview(!isLivePreview)} variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
            <Eye className="w-4 h-4 mr-1.5" /> {isLivePreview ? "Edit Mode" : "Live Preview"}
          </Button>
          <Button onClick={handleSaveDocument} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
            <Save className="w-4 h-4 mr-1.5" /> Save Draft
          </Button>
        </div>
      </div>

      {/* Editor & Preview Workspace */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <span className="font-bold text-xs text-indigo-600 dark:text-indigo-400">
            Category: {doc.category} • Author: {doc.authorName}
          </span>
          <span className="font-mono text-xs text-slate-400">{markdownContent.split(/\s+/).length} Words</span>
        </div>

        {isLivePreview ? (
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-sans space-y-3 whitespace-pre-wrap">
            {markdownContent}
          </div>
        ) : (
          <textarea
            value={markdownContent}
            onChange={(e) => setMarkdownContent(e.target.value)}
            rows={14}
            className="w-full p-4 font-mono text-xs text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        )}
      </div>
    </div>
  );
}

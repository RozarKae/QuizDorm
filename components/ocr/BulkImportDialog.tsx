"use client";

import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Layers,Upload,X } from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

interface BulkImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStartBulkImport: (files: File[], subject: string) => void;
}

export function BulkImportDialog({ open, onOpenChange, onStartBulkImport }: BulkImportDialogProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [subject, setSubject] = useState("Physics");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selected]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      toast.error("Please select at least one document for bulk import");
      return;
    }

    onStartBulkImport(files, subject);
    toast.success(`Queued ${files.length} documents for background OCR digitization!`);
    onOpenChange(false);
    setFiles([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center text-gray-900 dark:text-white">
            <Layers className="w-5 h-5 text-indigo-600 mr-2" /> Bulk Document Intelligence Import
          </DialogTitle>
          <DialogDescription className="text-xs">
            Batch import multiple books, scanned papers, or worksheets into background OCR queue.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Target Subject */}
          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Target Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium"
            >
              <option value="Physics">Physics</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Biology">Biology</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
            </select>
          </div>

          {/* Upload Dropzone */}
          <label className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-6 text-center bg-gray-50/50 dark:bg-gray-900/30 hover:border-indigo-400 transition-all cursor-pointer flex flex-col items-center justify-center space-y-2">
            <Upload className="w-8 h-8 text-indigo-500" />
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
              Select multiple files (PDF, DOCX, Images, Scans)
            </span>
            <span className="text-[11px] text-gray-400">Click to browse or drag & drop</span>
            <input
              type="file"
              multiple
              accept=".pdf,.docx,.txt,.md,.jpg,.jpeg,.png,.webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Selected File List */}
          {files.length > 0 && (
            <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              <span className="text-xs font-bold text-gray-600 dark:text-gray-400">Selected Files ({files.length}):</span>
              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs"
                >
                  <span className="truncate max-w-[250px] font-medium text-gray-900 dark:text-white">{file.name}</span>
                  <button
                    onClick={() => handleRemoveFile(idx)}
                    className="text-gray-400 hover:text-rose-600 p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">
            Cancel
          </Button>
          <Button onClick={handleSubmit} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            Start Bulk Import ({files.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

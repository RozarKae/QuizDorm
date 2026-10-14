import React, { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageDropzoneProps {
  value?: string;
  onChange?: (url: string) => void;
  label?: string;
  className?: string;
}

export function ImageDropzone({ value, onChange, label = "Upload Image", className }: ImageDropzoneProps) {
  const [preview, setPreview] = useState<string | undefined>(value);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      if (onChange) onChange(url);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    if (onChange) onChange("");
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">{label}</label>}
      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 group max-h-48 flex items-center justify-center p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Upload preview" className="max-h-44 object-contain rounded-xl" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-600 text-white shadow hover:bg-red-700 transition-all"
            title="Remove Image"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className="border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-2xl p-4 text-center bg-gray-50/50 dark:bg-gray-900/30 hover:border-indigo-400 transition-all cursor-pointer flex flex-col items-center justify-center space-y-1">
          <ImageIcon className="w-6 h-6 text-gray-400" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Click to upload or drag image</span>
          <span className="text-[10px] text-gray-400">PNG, JPG, WEBP up to 5MB</span>
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </label>
      )}
    </div>
  );
}

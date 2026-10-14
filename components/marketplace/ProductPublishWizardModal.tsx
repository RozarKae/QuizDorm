"use client";

import React, { useState } from "react";
import { MarketplaceProductManager } from "@/lib/marketplace/productManager";
import { ProductCategory, LicenseType } from "@/lib/types/marketplace";
import { Plus, Store, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface ProductPublishWizardModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductPublishWizardModal({ open, onOpenChange }: ProductPublishWizardModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<ProductCategory>("question_bank");
  const [priceUSD, setPriceUSD] = useState("19.99");

  if (!open) return null;

  const handlePublish = () => {
    if (!title) {
      toast.error("Please enter a product title!");
      return;
    }

    MarketplaceProductManager.addProduct({
      title,
      description: description || "Curated educational resource for students and educators.",
      category,
      creatorId: "cr-1",
      creatorName: "Dr. Eleanor Vance",
      priceUSD: parseFloat(priceUSD) || 19.99,
      licenseType: "classroom",
      featured: true,
      tags: ["STEM", "Calculus"],
      previewQuestionsCount: 15,
    });

    toast.success(`Published product "${title}" to QuizDorm Marketplace!`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Store className="w-5 h-5 text-indigo-600 mr-2" /> Publish Digital Educational Resource
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Product Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. AP Chemistry Olympiad Mock Set" className="text-xs" />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Resource Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
            >
              <option value="question_bank">Question Bank (400+ Qs)</option>
              <option value="quiz_pack">Quiz Pack</option>
              <option value="exam_paper">Exam Mock Paper</option>
              <option value="ai_prompt_library">AI Prompt Library</option>
              <option value="competition_pack">Competition Kit</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Listing Price (USD)</label>
            <Input value={priceUSD} onChange={(e) => setPriceUSD(e.target.value)} className="text-xs font-mono" />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Resource Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the learning objectives, grade level, and question count..."
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs h-20"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
            <Button onClick={handlePublish} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
              Publish to Marketplace
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

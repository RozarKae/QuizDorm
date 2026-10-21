"use client";

import React, { useState } from "react";
import { DiscussionForumEngine } from "@/lib/community/discussionEngine";
import { DiscussionTag } from "@/lib/types/community";
import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CreateDiscussionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateDiscussionModal({ open, onOpenChange }: CreateDiscussionModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState<DiscussionTag>("question_answer");

  if (!open) return null;

  const handlePost = () => {
    if (!title || !content) {
      toast.error("Please enter both title and question content!");
      return;
    }

    DiscussionForumEngine.addPost({
      authorName: "Karthik Rajendran",
      authorRole: "Student • QuizDorm Member",
      title,
      content,
      tags: [tag],
    });

    toast.success(`Posted discussion "${title}" to Community Forum!`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <MessageSquare className="w-5 h-5 text-indigo-600 mr-2" /> Start Academic Q&A Discussion
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Discussion Title</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. How to differentiate implicit trigonometric functions?" className="text-xs" />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Category Tag</label>
            <select
              value={tag}
              onChange={(e) => setTag(e.target.value as DiscussionTag)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
            >
              <option value="question_answer">Academic Question & Answer</option>
              <option value="study_notes">Shared Study Notes</option>
              <option value="competition_prep">Olympiad & Competition Prep</option>
              <option value="ai_tips">AI Learning Engine Tips</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Question / Note Details</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Explain what concept or problem step you need help with..."
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs h-24"
            />
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
            <Button onClick={handlePost} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
              Post to Community
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

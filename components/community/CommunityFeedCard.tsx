"use client";

import React, { useState } from "react";
import { CommunityPost } from "@/lib/types/community";
import { ThumbsUp, MessageSquare, CheckCircle2, Sparkles, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CommunityFeedCardProps {
  post: CommunityPost;
}

export function CommunityFeedCard({ post }: CommunityFeedCardProps) {
  const [upvotes, setUpvotes] = useState(post.upvotesCount);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  const handleUpvote = () => {
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3">
      {/* Author Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-indigo-600 font-bold text-white flex items-center justify-center text-xs">
            {post.authorName.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-xs text-gray-900 dark:text-white">{post.authorName}</h4>
            <span className="text-[10px] text-gray-400 font-mono">{post.authorRole} • {post.timestamp}</span>
          </div>
        </div>

        {post.acceptedAnswer && (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Answered
          </span>
        )}
      </div>

      {/* Title & Content */}
      <div className="space-y-1">
        <h3 className="font-bold text-sm text-gray-900 dark:text-white">{post.title}</h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 font-sans">{post.content}</p>
      </div>

      {/* AI Summary Box */}
      {post.aiSummary && (
        <div className="p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-300 flex items-start space-x-2">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span className="text-[11px] font-mono"><strong className="font-sans">AI Key Takeaway:</strong> {post.aiSummary}</span>
        </div>
      )}

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-xs font-mono">
        <div className="flex items-center space-x-2">
          <Button
            onClick={handleUpvote}
            size="sm"
            variant={hasUpvoted ? "default" : "outline"}
            className={`h-8 text-xs rounded-xl font-bold ${hasUpvoted ? "bg-indigo-600 text-white" : ""}`}
          >
            <ThumbsUp className="w-3.5 h-3.5 mr-1" /> {upvotes}
          </Button>

          <Button size="sm" variant="ghost" className="h-8 text-xs rounded-xl text-gray-500">
            <MessageSquare className="w-3.5 h-3.5 mr-1" /> {post.commentsCount} Comments
          </Button>
        </div>

        <div className="flex space-x-1">
          {post.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-full text-[9px] bg-gray-100 dark:bg-gray-900 text-gray-500 font-mono">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

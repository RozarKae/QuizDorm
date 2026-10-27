"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
CheckCircle2,
Send,
Users
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

interface ReviewComment {
  id: string;
  author: string;
  commentText: string;
  timestamp: string;
  status: "Open" | "Resolved";
}

const mockComments: ReviewComment[] = [
  { id: "c1", author: "Prof. Alan Turing", commentText: "Please verify equation 4.2 tensor product dimensions for bipartite state |Ψ+⟩.", timestamp: "10 mins ago", status: "Open" },
  { id: "c2", author: "Dr. Eleanor Vance", commentText: "Added derivation for CHSH inequality violation threshold S ≤ 2√2.", timestamp: "1 hour ago", status: "Resolved" },
];

export function CollaborationWorkspaceConsole() {
  const [comments, setComments] = useState<ReviewComment[]>(mockComments);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const item: ReviewComment = {
      id: `c-${Date.now()}`,
      author: "You (Co-Author)",
      commentText: newComment,
      timestamp: "Just now",
      status: "Open",
    };
    setComments([item, ...comments]);
    setNewComment("");
    toast.success("Review comment added to authoring manuscript!");
  };

  const handleResolveComment = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Resolved" as const } : c))
    );
    toast.success("Peer review thread marked as Resolved!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> Multi-Author Collaboration Workspace
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-author editing, peer review comment threads, co-author presence, and review sign-offs.
          </p>
        </div>
      </div>

      {/* Review Comments Thread */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <form onSubmit={handleAddComment} className="flex gap-2 text-xs">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add peer review comment or feedback on draft..."
            className="rounded-xl"
            required
          />
          <Button type="submit" className="bg-indigo-600 text-white font-bold text-xs rounded-xl shrink-0">
            <Send className="w-3.5 h-3.5 mr-1" /> Post Comment
          </Button>
        </form>

        <div className="space-y-3">
          {comments.map((cm) => (
            <div key={cm.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 text-xs flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 dark:text-white">{cm.author}</span>
                  <span className="text-[10px] text-slate-400">{cm.timestamp}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 font-medium">{cm.commentText}</p>
              </div>

              {cm.status === "Open" ? (
                <Button onClick={() => handleResolveComment(cm.id)} size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700 shrink-0">
                  Resolve
                </Button>
              ) : (
                <span className="text-rose-500 font-bold text-[10px] flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Resolved
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

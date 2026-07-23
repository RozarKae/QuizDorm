import React, { useState } from "react";
import { FolderPlus, Plus, Trash2, Edit2, Layers, BookOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CategoryManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CategoryManagerModal({ open, onOpenChange }: CategoryManagerModalProps) {
  const [categories, setCategories] = useState([
    { id: "c1", subject: "Mathematics", category: "Algebra", topicCount: 8 },
    { id: "c2", subject: "Science", category: "Physics Mechanics", topicCount: 5 },
    { id: "c3", subject: "Computer Science", category: "Data Structures", topicCount: 12 },
    { id: "c4", subject: "History", category: "World History 20th Century", topicCount: 6 },
  ]);

  const [newSubject, setNewSubject] = useState("");
  const [newCategory, setNewCategory] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject || !newCategory) {
      toast.error("Subject and Category are required");
      return;
    }
    const newId = `c-${Date.now()}`;
    setCategories([...categories, { id: newId, subject: newSubject, category: newCategory, topicCount: 0 }]);
    setNewSubject("");
    setNewCategory("");
    toast.success("New taxonomy category added!");
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    toast.success("Category removed");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <BookOpen className="w-5 h-5 text-indigo-600 mr-2" /> Taxonomy & Category Manager
          </DialogTitle>
          <DialogDescription>
            Organize question bank content into Subjects, Categories, Topics, and Subtopics.
          </DialogDescription>
        </DialogHeader>

        {/* Add New Category Form */}
        <form onSubmit={handleAdd} className="bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Add Subject / Category Pair</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              placeholder="Subject (e.g. Science)"
              className="text-xs"
            />
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="Category (e.g. Organic Chemistry)"
              className="text-xs"
            />
          </div>
          <Button type="submit" size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold">
            <Plus className="w-3.5 h-3.5 mr-1" /> Add Category
          </Button>
        </form>

        {/* List of Existing Categories */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {categories.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-850 bg-white dark:bg-gray-950 text-xs"
            >
              <div>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 mr-2">{c.subject}</span>
                <span className="text-gray-900 dark:text-white font-medium">{c.category}</span>
                <span className="text-gray-400 ml-2">({c.topicCount} topics)</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(c.id)}
                className="h-7 w-7 text-red-500 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

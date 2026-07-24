"use client";

import React, { useState } from "react";
import { DragDropCategory, DragDropItem } from "@/lib/types/media";
import { Move, Plus, Trash2, Layers, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DragDropBuilderProps {
  categories: DragDropCategory[];
  items: DragDropItem[];
  onChange: (categories: DragDropCategory[], items: DragDropItem[]) => void;
}

export function DragDropBuilder({ categories, items, onChange }: DragDropBuilderProps) {
  const [newCatName, setNewCatName] = useState("");
  const [newItemText, setNewItemText] = useState("");
  const [targetCatId, setTargetCatId] = useState(categories[0]?.id || "");

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    const cat: DragDropCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
    };
    const nextCats = [...categories, cat];
    onChange(nextCats, items);
    setNewCatName("");
    if (!targetCatId) setTargetCatId(cat.id);
  };

  const handleAddItem = () => {
    if (!newItemText.trim() || !targetCatId) return;
    const item: DragDropItem = {
      id: `item-${Date.now()}`,
      text: newItemText.trim(),
      targetCategoryId: targetCatId,
    };
    onChange(categories, [...items, item]);
    setNewItemText("");
  };

  const handleDeleteCategory = (id: string) => {
    onChange(
      categories.filter((c) => c.id !== id),
      items.filter((i) => i.targetCategoryId !== id)
    );
  };

  const handleDeleteItem = (id: string) => {
    onChange(
      categories,
      items.filter((i) => i.id !== id)
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span className="font-bold text-gray-900 dark:text-white flex items-center">
          <Move className="w-4 h-4 text-indigo-600 mr-1.5" /> Interactive Drag & Drop Builder
        </span>
        <span>Configure categories and assign correct drag items</span>
      </div>

      {/* Categories Setup */}
      <div className="p-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">1. Target Categories (Dropzones)</label>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Category Name (e.g. Metals, Acids, Mammals)"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            className="flex-1 text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
          <Button size="sm" onClick={handleAddCategory} className="bg-indigo-600 text-white text-xs rounded-xl">
            <Plus className="w-4 h-4 mr-1" /> Add Category
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((c) => (
            <div key={c.id} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center space-x-2 text-xs font-bold text-gray-900 dark:text-white">
              <span>{c.name}</span>
              <button type="button" onClick={() => handleDeleteCategory(c.id)} className="text-gray-400 hover:text-rose-600">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Items Setup */}
      {categories.length > 0 && (
        <div className="p-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">2. Draggable Items</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              type="text"
              placeholder="Item Label (e.g. Copper, Hydrochloric Acid)"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              className="sm:col-span-2 text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            />
            <select
              value={targetCatId}
              onChange={(e) => setTargetCatId(e.target.value)}
              className="text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  Target: {c.name}
                </option>
              ))}
            </select>
          </div>
          <Button size="sm" onClick={handleAddItem} className="bg-indigo-600 text-white text-xs rounded-xl">
            <Plus className="w-4 h-4 mr-1" /> Add Draggable Item
          </Button>

          <div className="space-y-1.5 pt-2">
            {items.map((item) => {
              const cat = categories.find((c) => c.id === item.targetCategoryId);
              return (
                <div key={item.id} className="p-2 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-900 dark:text-white">{item.text}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      ➔ {cat?.name || "Unassigned"}
                    </span>
                    <button type="button" onClick={() => handleDeleteItem(item.id)} className="text-gray-400 hover:text-rose-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function DragDropViewer({
  categories,
  items,
  onUpdateAnswers,
}: {
  categories: DragDropCategory[];
  items: DragDropItem[];
  onUpdateAnswers?: (placements: Record<string, string[]>) => void;
}) {
  const [placements, setPlacements] = useState<Record<string, string[]>>({});
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);

  const placedItemIds = Object.values(placements).flat();
  const unplacedItems = items.filter((i) => !placedItemIds.includes(i.id));

  const handleDragStart = (id: string) => {
    setDraggedItemId(id);
  };

  const handleDropOnCategory = (catId: string) => {
    if (!draggedItemId) return;
    const next: Record<string, string[]> = { ...placements };
    // Remove item from any existing category
    Object.keys(next).forEach((k) => {
      next[k] = next[k].filter((id) => id !== draggedItemId);
    });

    next[catId] = [...(next[catId] || []), draggedItemId];
    setPlacements(next);
    setDraggedItemId(null);
    if (onUpdateAnswers) onUpdateAnswers(next);
  };

  return (
    <div className="space-y-5">
      {/* Draggable Pool */}
      <div className="p-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-2">
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Draggable Item Pool</label>
        <div className="flex flex-wrap gap-2 min-h-12 items-center p-2 bg-white dark:bg-gray-950 rounded-xl border border-dashed border-gray-300 dark:border-gray-800">
          {unplacedItems.length === 0 ? (
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold italic">
              All items categorized!
            </span>
          ) : (
            unplacedItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(item.id)}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm cursor-grab active:cursor-grabbing hover:scale-105 transition-all select-none"
              >
                {item.text}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Target Dropzones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const catItemIds = placements[cat.id] || [];
          const catItems = items.filter((i) => catItemIds.includes(i.id));

          return (
            <div
              key={cat.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDropOnCategory(cat.id)}
              className="p-4 rounded-2xl bg-white dark:bg-gray-950 border-2 border-indigo-200 dark:border-indigo-900 min-h-36 flex flex-col justify-between space-y-2 shadow-sm"
            >
              <h5 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                Category: {cat.name}
              </h5>

              <div className="flex-1 space-y-1.5 p-2 rounded-xl bg-gray-50/50 dark:bg-gray-900/50 border border-dashed border-gray-200 dark:border-gray-800">
                {catItems.length === 0 ? (
                  <span className="text-[11px] text-gray-400 italic block text-center py-4">Drop items here</span>
                ) : (
                  catItems.map((ci) => (
                    <div key={ci.id} className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-200 text-xs font-bold flex justify-between items-center">
                      <span>{ci.text}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

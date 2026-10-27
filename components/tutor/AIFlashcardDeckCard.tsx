"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AIFlashcardGenerator } from "@/lib/tutor/flashcardGenerator";
import { ChevronRight,RotateCcw } from "lucide-react";
import { useState } from "react";

export function AIFlashcardDeckCard() {
  const cards = AIFlashcardGenerator.getCards();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = cards[currentIndex] || cards[0];

  const handleNext = () => {
    setFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <RotateCcw className="w-5 h-5 text-indigo-600 mr-2" /> AI Spaced Repetition Flashcards ({currentIndex + 1}/{cards.length})
        </h3>
      </div>

      <div
        onClick={() => setFlipped(!flipped)}
        className="p-8 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-gray-900 dark:to-indigo-950 text-center cursor-pointer min-h-[160px] flex flex-col justify-center items-center shadow-inner transition-all hover:scale-[1.01]"
      >
        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase mb-2">
          {flipped ? "BACK (ANSWER)" : "FRONT (QUESTION - CLICK TO FLIP)"}
        </span>

        <p className="text-sm font-extrabold text-gray-900 dark:text-white max-w-md">
          {flipped ? card.backText : card.frontText}
        </p>

        {flipped && card.formula && (
          <span className="font-mono text-indigo-600 dark:text-indigo-300 font-bold text-xs mt-3 p-1.5 rounded-xl bg-white/80 dark:bg-slate-900">
            {card.formula}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center pt-2 text-xs">
        <span className="font-mono text-gray-400">Mastery Level: {card.masteryLevel}/5</span>
        <Button onClick={handleNext} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
          Next Card <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { TournamentEngine } from "@/lib/competition/tournamentEngine";
import { TournamentBracketNode } from "@/lib/types/competition";
import { Swords, Trophy, Play, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function TournamentBracketCard() {
  const [nodes, setNodes] = useState<TournamentBracketNode[]>(TournamentEngine.getBrackets());

  const handleSimulateWinner = (id: string, winner: string) => {
    const updated = nodes.map((n) => (n.id === id ? { ...n, winnerName: winner, status: "completed" as const } : n));
    setNodes(updated);
    toast.success(`Championship match completed! Winner: ${winner}`);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Swords className="w-5 h-5 text-indigo-600 mr-2" /> Interactive Tournament Bracket Generator
        </h3>
        <span className="text-xs font-mono font-bold text-indigo-600">Single Elimination • Swiss Format</span>
      </div>

      <div className="space-y-3 text-xs">
        {nodes.map((n) => (
          <div key={n.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{n.roundName}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  n.status === "completed" ? "bg-emerald-100 text-emerald-800" : "bg-purple-100 text-purple-800"
                }`}
              >
                {n.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-[11px] pt-1">
              <div className={`p-3 rounded-xl border ${n.winnerName === n.player1Name ? "bg-emerald-50 border-emerald-300 font-bold text-emerald-800" : "bg-white dark:bg-gray-950 border-gray-200"}`}>
                <span className="font-sans block text-gray-500 text-[10px]">Player #1</span>
                <span>{n.player1Name}</span>
                {n.score1 > 0 && <span className="float-right text-indigo-600">{n.score1} pts</span>}
              </div>

              <div className={`p-3 rounded-xl border ${n.winnerName === n.player2Name ? "bg-emerald-50 border-emerald-300 font-bold text-emerald-800" : "bg-white dark:bg-gray-950 border-gray-200"}`}>
                <span className="font-sans block text-gray-500 text-[10px]">Player #2</span>
                <span>{n.player2Name}</span>
                {n.score2 > 0 && <span className="float-right text-indigo-600">{n.score2} pts</span>}
              </div>
            </div>

            {n.status === "live" && (
              <div className="pt-2 flex justify-end space-x-2">
                <Button onClick={() => handleSimulateWinner(n.id, n.player1Name)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                  Crown {n.player1Name}
                </Button>
                <Button onClick={() => handleSimulateWinner(n.id, n.player2Name)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                  Crown {n.player2Name}
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

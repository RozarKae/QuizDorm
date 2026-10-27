"use client";

import { Button } from "@/components/ui/button";
import {
CheckCircle2,
Cpu,
ShieldCheck,
Sparkles
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface LedgerBlock {
  blockNumber: number;
  txHash: string;
  credentialId: string;
  timestamp: string;
  status: "Confirmed on Polygon Mainnet" | "Pending";
}

const mockBlocks: LedgerBlock[] = [
  { blockNumber: 4890124, txHash: "0x8a901f442b01e99a4411a004f29011e88a01", credentialId: "CERT-2026-9041", timestamp: "10 mins ago", status: "Confirmed on Polygon Mainnet" },
  { blockNumber: 4890110, txHash: "0x99b11e22f004a88b11c9900d44012f11c00", credentialId: "CERT-2026-9042", timestamp: "1 hour ago", status: "Confirmed on Polygon Mainnet" },
];

export function GlobalCredentialEcosystem() {
  const [blocks, setBlocks] = useState<LedgerBlock[]>(mockBlocks);

  const handleAnchorNewBatch = () => {
    const newBlock: LedgerBlock = {
      blockNumber: 4890130,
      txHash: `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`,
      credentialId: "CERT-2026-NEW",
      timestamp: "Just now",
      status: "Confirmed on Polygon Mainnet",
    };
    setBlocks([newBlock, ...blocks]);
    toast.success("Anchored batch of 42 digital credentials to Polygon Blockchain Ledger!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-3 border border-rose-500/30">
            <Cpu className="w-3.5 h-3.5 text-rose-400" /> Decentralized Credential Registry Engine
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Global Credential Ecosystem & Blockchain Registry</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Immutable blockchain credential anchoring, Open Badges 3.0 standard compliance, multi-country verification gateways, and decentralized identity.
          </p>
        </div>

        <Button onClick={handleAnchorNewBatch} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Anchor Batch to Blockchain
        </Button>
      </div>

      {/* Ledger Block List */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <span className="font-mono text-xs font-bold text-rose-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Polygon Mainnet Immutable Ledger
          </span>
          <span className="text-[10px] text-slate-400">Network Status: 100% Operational</span>
        </div>

        <div className="space-y-3">
          {blocks.map((blk) => (
            <div key={blk.txHash} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400">Block #{blk.blockNumber}</span>
                <span className="text-rose-400 text-[10px] font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {blk.status}
                </span>
              </div>
              <p className="text-slate-300 truncate">Tx Hash: {blk.txHash}</p>
              <div className="flex justify-between text-slate-500 text-[10px]">
                <span>Credential Target: {blk.credentialId}</span>
                <span>{blk.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

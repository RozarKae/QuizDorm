"use client";

import React from "react";
import { Invoice } from "@/lib/types/billing";
import Logo from "@/components/layout/Logo";
import { Printer, Download, CheckCircle2, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoiceViewerModalProps {
  invoice: Invoice | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InvoiceViewerModal({ invoice, open, onOpenChange }: InvoiceViewerModalProps) {
  if (!open || !invoice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
          <Logo />
          <div className="text-right">
            <span className="text-xs font-bold text-gray-500 block">TAX INVOICE</span>
            <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">
              {invoice.invoiceNumber}
            </span>
          </div>
        </div>

        {/* Invoice Info */}
        <div className="grid grid-cols-2 gap-4 text-xs font-medium">
          <div>
            <span className="text-gray-400 block font-semibold text-[10px]">BILLED TO:</span>
            <div className="font-bold text-gray-900 dark:text-white">{invoice.recipientName}</div>
            <div className="text-gray-500">{invoice.recipientOrg}</div>
            <div className="text-gray-500">GSTIN: {invoice.GSTIN}</div>
          </div>
          <div className="text-right">
            <span className="text-gray-400 block font-semibold text-[10px]">INVOICE DETAILS:</span>
            <div>Date: {invoice.issuedDate}</div>
            <div>Status: <span className="font-bold text-rose-600 uppercase">{invoice.paymentStatus}</span></div>
          </div>
        </div>

        {/* Items Table */}
        <div className="border rounded-2xl overflow-hidden border-gray-200 dark:border-gray-800 text-xs">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 font-bold text-gray-600 dark:text-gray-400">
              <tr>
                <th className="p-3">Description</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Amount (USD)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
              {invoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="p-3 font-sans font-medium">{item.description}</td>
                  <td className="p-3 text-center">{item.quantity}</td>
                  <td className="p-3 text-right">${item.totalUSD.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tax Breakdown */}
        <div className="space-y-1 text-xs text-right font-mono max-w-xs ml-auto border-t border-gray-100 dark:border-gray-800 pt-2">
          <div className="flex justify-between">
            <span className="text-gray-400 font-sans">Subtotal:</span>
            <span>${invoice.subtotalUSD.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 font-sans">GST/Tax ({invoice.taxRatePercent}%):</span>
            <span>${invoice.taxAmountUSD.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-indigo-600 dark:text-indigo-400 pt-1 border-t border-gray-200 dark:border-gray-800">
            <span className="font-sans">Total Paid:</span>
            <span>${invoice.totalAmountUSD.toFixed(2)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Close</Button>
          <Button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            <Printer className="w-3.5 h-3.5 mr-1.5" /> Print / Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}

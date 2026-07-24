"use client";

import React, { useState } from "react";
import { PaymentTransaction, Invoice } from "@/lib/types/billing";
import { InvoiceEngine } from "@/lib/billing/invoiceEngine";
import { InvoiceViewerModal } from "./InvoiceViewerModal";
import { FileText, CheckCircle2, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SAMPLE_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "txn-101",
    subscriptionId: "sub-101",
    userId: "usr-teacher-1",
    provider: "razorpay",
    amountUSD: 29,
    amountINR: 2499,
    currency: "USD",
    status: "success",
    paymentMethod: "UPI (Google Pay)",
    timestamp: "2026-01-01T10:30:00Z",
    invoiceNumber: "INV-2026-884920",
    taxAmountUSD: 4.42,
  },
  {
    id: "txn-100",
    subscriptionId: "sub-100",
    userId: "usr-teacher-1",
    provider: "stripe",
    amountUSD: 12,
    amountINR: 999,
    currency: "USD",
    status: "success",
    paymentMethod: "Visa ending in •••• 4242",
    timestamp: "2025-01-01T09:15:00Z",
    invoiceNumber: "INV-2025-110294",
    taxAmountUSD: 1.83,
  },
];

export function PaymentHistoryTable() {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleViewInvoice = (txn: PaymentTransaction) => {
    const inv = InvoiceEngine.generateInvoice(txn);
    setSelectedInvoice(inv);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm space-y-4 p-6">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <FileText className="w-5 h-5 text-indigo-600 mr-2" /> Billing History & Tax Invoices
        </h3>
        <span className="text-xs text-gray-400 font-mono">PCI-DSS Compliant Log</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-3">Date</th>
              <th className="p-3">Invoice #</th>
              <th className="p-3">Gateway</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
            {SAMPLE_TRANSACTIONS.map((txn) => (
              <tr key={txn.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors">
                <td className="p-3 text-gray-400">
                  {new Date(txn.timestamp).toLocaleDateString()}
                </td>
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">
                  {txn.invoiceNumber}
                </td>
                <td className="p-3 font-sans font-semibold uppercase">{txn.provider}</td>
                <td className="p-3 font-sans text-gray-600 dark:text-gray-300">{txn.paymentMethod}</td>
                <td className="p-3 font-bold">${txn.amountUSD.toFixed(2)}</td>
                <td className="p-3 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
                    {txn.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewInvoice(txn)}
                    className="h-7 text-[11px] rounded-lg border-gray-200 dark:border-gray-800"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Tax Invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <InvoiceViewerModal
        invoice={selectedInvoice}
        open={!!selectedInvoice}
        onOpenChange={(open) => !open && setSelectedInvoice(null)}
      />
    </div>
  );
}

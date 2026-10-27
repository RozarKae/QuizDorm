"use client";

import { Button } from "@/components/ui/button";
import { InvoiceEngine } from "@/lib/billing/invoiceEngine";
import { Invoice,PaymentTransaction } from "@/lib/types/billing";
import { FileText } from "lucide-react";
import { useState } from "react";
import { InvoiceViewerModal } from "./InvoiceViewerModal";

export const SAMPLE_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: "txn-101",
    subscriptionId: "sub-101",
    userId: "usr-teacher-1",
    provider: "razorpay",
    amountUSD: 29.99,
    amountINR: 2499,
    currency: "INR",
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
    amountUSD: 11.99,
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
    <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] rounded-[6px] overflow-hidden shadow-sm space-y-4 p-5">
      <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
          <FileText className="w-4 h-4 text-[#FF4D6D] mr-2" />
          Billing History & Tax Invoices
        </h3>
        <span className="text-[10px] text-[#69786F] font-mono uppercase tracking-wider">
          Demonstration Ledger (Sample Data)
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[rgba(240, 160, 180,0.12)] text-[#69786F] font-mono uppercase tracking-wider text-[10px] bg-[#1D1013]">
              <th className="p-3">Date</th>
              <th className="p-3">Invoice #</th>
              <th className="p-3">Gateway</th>
              <th className="p-3">Payment Method</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Invoice</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)] font-mono text-[11px]">
            {SAMPLE_TRANSACTIONS.map((txn) => (
              <tr key={txn.id} className="hover:bg-[#1D1013]/60 transition-colors">
                <td className="p-3 text-[#69786F]">
                  {new Date(txn.timestamp).toLocaleDateString()}
                </td>
                <td className="p-3 font-bold text-[#FF4D6D]">
                  {txn.invoiceNumber}
                </td>
                <td className="p-3 font-sans font-semibold uppercase text-[#F2F7F3]">{txn.provider}</td>
                <td className="p-3 font-sans text-[#A0AEA5]">{txn.paymentMethod}</td>
                <td className="p-3 font-bold text-[#F2F7F3]">
                  {txn.currency === "INR"
                    ? `₹${txn.amountINR.toLocaleString("en-IN")}`
                    : `$${txn.amountUSD.toFixed(2)}`}
                </td>
                <td className="p-3 font-sans">
                  <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.2)] uppercase">
                    {txn.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleViewInvoice(txn)}
                    className="h-7 text-[10px] font-mono uppercase tracking-wider rounded-[3px] border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] hover:border-[#FF4D6D]/50 hover:text-[#FF4D6D]"
                  >
                    <FileText className="w-3 h-3 mr-1 text-[#FF4D6D]" />
                    Tax Invoice
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
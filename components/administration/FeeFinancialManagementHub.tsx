"use client";

import { Button } from "@/components/ui/button";
import { FeeInvoice } from "@/lib/types/administration";
import {
CreditCard,
Download
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockInvoices: FeeInvoice[] = [
  {
    id: "inv-101",
    invoiceNumber: "INV-2026-8801",
    studentId: "sis-101",
    studentName: "Alexander Wright",
    rollNumber: "2026-PHY-01",
    term: "Spring Semester 2026",
    tuitionFee: 4500,
    labFee: 500,
    libraryFee: 150,
    scholarshipDiscount: 1000,
    netPayable: 4150,
    amountPaid: 4150,
    dueDate: "Feb 15, 2026",
    status: "Paid",
  },
  {
    id: "inv-102",
    invoiceNumber: "INV-2026-8802",
    studentId: "sis-102",
    studentName: "Beatriz Morales",
    rollNumber: "2026-PHY-02",
    term: "Spring Semester 2026",
    tuitionFee: 4500,
    labFee: 500,
    libraryFee: 150,
    scholarshipDiscount: 500,
    netPayable: 4650,
    amountPaid: 2000,
    dueDate: "Mar 01, 2026",
    status: "Partial",
  },
];

export function FeeFinancialManagementHub() {
  const [invoices, setInvoices] = useState<FeeInvoice[]>(mockInvoices);

  const handleProcessPayment = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, amountPaid: inv.netPayable, status: "Paid" as const } : inv))
    );
    toast.success("Payment processed via Online Gateway! Receipt generated.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-rose-600" /> Fee Collection & Financial Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Fee structure configuration, online payment gateways, scholarship waivers, receipting, and outstanding ledger tracking.
          </p>
        </div>

        <Button onClick={() => toast.success("Exported Financial Ledger Audit Report (PDF format)!")} className="bg-rose-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Download className="w-4 h-4 mr-1.5" /> Financial Audit Report
        </Button>
      </div>

      {/* Invoices Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Invoice #</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Tuition / Lab Fee</th>
              <th className="p-3">Scholarship Waiver</th>
              <th className="p-3">Net Payable</th>
              <th className="p-3">Amount Paid</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">Payment Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-mono font-bold text-rose-600">{inv.invoiceNumber}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{inv.studentName}</td>
                <td className="p-3 font-mono">${inv.tuitionFee + inv.labFee}</td>
                <td className="p-3 font-mono text-purple-600 font-bold">-${inv.scholarshipDiscount}</td>
                <td className="p-3 font-mono font-bold text-slate-900 dark:text-white">${inv.netPayable}</td>
                <td className="p-3 font-mono font-bold text-rose-600">${inv.amountPaid}</td>
                <td className="p-3">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${inv.status === "Paid" ? "bg-rose-500/10 text-rose-600" : "bg-amber-500/10 text-amber-600"}`}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  {inv.status !== "Paid" && (
                    <Button
                      onClick={() => handleProcessPayment(inv.id)}
                      size="sm"
                      className="bg-rose-600 hover:bg-rose-700 text-white text-[10px] h-7 rounded-lg font-bold"
                    >
                      Process Payment
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { Invoice,PaymentTransaction } from "@/lib/types/billing";

export class InvoiceEngine {
  /**
   * Generate official PDF-printable GST/Tax invoice object
   */
  public static generateInvoice(txn: PaymentTransaction): Invoice {
    const taxRatePercent = 18;
    const subtotalUSD = Number((txn.amountUSD / 1.18).toFixed(2));
    const taxAmountUSD = Number((txn.amountUSD - subtotalUSD).toFixed(2));

    return {
      invoiceNumber: txn.invoiceNumber,
      recipientName: "Karthik Rajendran",
      recipientOrg: "Government Model Higher Secondary School",
      GSTIN: "33AAACQ1234F1Z9",
      billingAddress: "Saidapet High Road, Chennai, Tamil Nadu - 600015",
      items: [
        {
          description: `QuizDorm Pro SaaS Subscription (${txn.subscriptionId})`,
          quantity: 1,
          unitPriceUSD: subtotalUSD,
          totalUSD: subtotalUSD,
        },
      ],
      subtotalUSD,
      taxRatePercent,
      taxAmountUSD,
      totalAmountUSD: txn.amountUSD,
      paymentStatus: txn.status === "success" ? "paid" : "unpaid",
      issuedDate: new Date(txn.timestamp).toISOString().split("T")[0],
      dueDate: new Date(txn.timestamp).toISOString().split("T")[0],
    };
  }
}

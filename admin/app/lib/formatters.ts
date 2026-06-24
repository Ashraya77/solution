import type { PaymentStatus } from "@/types/Student";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDate(value: string) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(value));
}

export function toDateInput(value?: string) {
  if (!value) return "";

  return new Date(value).toISOString().slice(0, 10);
}

export function formatPaymentStatus(status: PaymentStatus) {
  const labels: Record<PaymentStatus, string> = {
    PAID: "Paid",
    PARTIAL: "Partial",
    UNPAID: "Unpaid",
  };

  return labels[status];
}

import type { PaymentStatus } from "@/types/Student";
import { formatPaymentStatus } from "@/app/lib/formatters";

type StudentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusClass: Record<PaymentStatus, string> = {
  PAID: "border-emerald-200 bg-emerald-50 text-emerald-700",
  PARTIAL: "border-amber-200 bg-amber-50 text-amber-700",
  UNPAID: "border-red-200 bg-red-50 text-red-700",
};

export default function StudentStatusBadge({ status }: StudentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex h-7 items-center rounded-full border px-2.5 text-xs font-semibold ${statusClass[status]}`}
    >
      {formatPaymentStatus(status)}
    </span>
  );
}

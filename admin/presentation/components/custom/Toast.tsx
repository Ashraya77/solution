"use client";

import { AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export type ToastTone = "success" | "error" | "info";

type ToastProps = {
  message: string;
  tone?: ToastTone;
  onClose: () => void;
};

const toneStyles: Record<ToastTone, string> = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-purple-200 bg-purple-50 text-purple-900",
};

const icons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

export default function Toast({ message, tone = "info", onClose }: ToastProps) {
  const Icon = icons[tone];

  if (!message) return null;

  return (
    <div
      className={`fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-lg border px-4 py-3 text-sm shadow-lg ${toneStyles[tone]}`}
      role="status"
    >
      <Icon className="h-5 w-5 shrink-0" />
      <p className="min-w-0 flex-1">{message}</p>
      <button
        type="button"
        className="rounded p-1 transition hover:bg-black/5"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

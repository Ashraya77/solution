import React from "react";
import DashboardShell from "@/presentation/components/custom/DashboardShell";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AlertCircle, BadgeCheck, Plus, Users, WalletCards } from "lucide-react";
import { fetchAdminDashboard } from "../lib/api/dashboard";
import { formatCurrency, formatDate } from "../lib/formatters";
import type { Student } from "@/types/Student";
import StudentStatusBadge from "@/presentation/components/custom/StudentStatusBadge";

type DashboardData = Awaited<ReturnType<typeof fetchAdminDashboard>>;

const stats = [
  {
    key: "totalStudents",
    label: "Total Students",
    icon: Users,
    className: "bg-purple-50 text-purple-700",
  },
  {
    key: "paidStudents",
    label: "Paid Students",
    icon: BadgeCheck,
    className: "bg-emerald-50 text-emerald-700",
  },
  {
    key: "partialStudents",
    label: "Partial Payments",
    icon: WalletCards,
    className: "bg-amber-50 text-amber-700",
  },
  {
    key: "unpaidStudents",
    label: "Unpaid Students",
    icon: AlertCircle,
    className: "bg-red-50 text-red-700",
  },
] as const;

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAdminDashboard()
      .then(setData)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className="text-sm text-slate-600">Loading dashboard...</p>;
  }

  if (error || !data) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        {error || "Dashboard unavailable"}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        </div>
        <Link
          href="/dashboard/students/new"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-purple-700 px-3 text-sm font-bold text-white transition hover:bg-purple-800"
        >
          <Plus className="h-4 w-4" />
          Add Student
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.key}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-950">
                    {data[stat.key]}
                  </p>
                </div>
                <div className={`rounded-lg p-3 ${stat.className}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="font-bold text-slate-950">Recent Students</h2>
          <Link
            href="/dashboard/students"
            className="text-sm font-bold text-purple-700 transition hover:text-purple-900"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-bold">Student</th>
                <th className="px-5 py-3 font-bold">Course</th>
                <th className="px-5 py-3 font-bold">Admission</th>
                <th className="px-5 py-3 font-bold">Fee</th>
                <th className="px-5 py-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.recentStudents.length === 0 ? (
                <tr>
                  <td className="px-5 py-6 text-center text-slate-500" colSpan={5}>
                    No students found
                  </td>
                </tr>
              ) : (
                data.recentStudents.map((student: Student) => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-5 py-4">
                      <Link
                        href={`/dashboard/students/${student.id}`}
                        className="font-bold text-slate-950 transition hover:text-purple-700"
                      >
                        {student.fullName}
                      </Link>
                      <p className="mt-1 text-xs text-slate-500">{student.email}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {student.courseName}
                    </td>
                    <td className="px-5 py-4 text-slate-700">
                      {formatDate(student.admissionDate)}
                    </td>
                    <td className="px-5 py-4 font-semibold text-slate-800">
                      {formatCurrency(student.feeAmount)}
                    </td>
                    <td className="px-5 py-4">
                      <StudentStatusBadge status={student.paymentStatus} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

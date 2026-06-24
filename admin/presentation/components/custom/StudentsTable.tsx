"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, Pencil, Plus, Trash2 } from "lucide-react";
import { deleteStudent, getStudents } from "@/app/lib/services/GetStudents";
import { formatCurrency, formatDate } from "@/app/lib/formatters";
import type { Student } from "@/types/Student";
import StudentStatusBadge from "./StudentStatusBadge";
import Toast, { type ToastTone } from "./Toast";

type ToastState = {
  message: string;
  tone: ToastTone;
};

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : "Something went wrong";
};

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await getStudents();
      setStudents(result.data);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = async (student: Student) => {
    const confirmed = window.confirm(
      `Delete ${student.fullName}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      setDeletingId(student.id);
      await deleteStudent(student.id);
      setStudents((current) => current.filter((item) => item.id !== student.id));
      setToast({ message: "Student deleted successfully.", tone: "success" });
    } catch (err) {
      setToast({ message: getErrorMessage(err), tone: "error" });
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-600">Loading students...</p>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {toast && (
        <Toast
          message={toast.message}
          tone={toast.tone}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Students</h1>
        </div>
        <Link
          href="/dashboard/students/new"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-purple-700 px-3 text-sm font-bold text-white transition hover:bg-purple-800"
        >
          <Plus className="h-4 w-4" />
          Add Student
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-5 py-3 font-bold">Student</th>
                <th className="px-5 py-3 font-bold">Phone</th>
                <th className="px-5 py-3 font-bold">Course</th>
                <th className="px-5 py-3 font-bold">Admission</th>
                <th className="px-5 py-3 font-bold">Fee</th>
                <th className="px-5 py-3 font-bold">Status</th>
                <th className="px-5 py-3 text-right font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {students.length === 0 ? (
                <tr>
                  <td className="px-5 py-8 text-center text-slate-500" colSpan={7}>
                    No students found
                  </td>
                </tr>
              ) : (
                students.map((student) => (
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
                    <td className="px-5 py-4 text-slate-700">{student.phone}</td>
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
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/dashboard/students/${student.id}`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-purple-700"
                          aria-label={`View ${student.fullName}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/dashboard/students/${student.id}/edit`}
                          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-purple-700"
                          aria-label={`Edit ${student.fullName}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          className="grid h-9 w-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                          onClick={() => handleDelete(student)}
                          disabled={deletingId === student.id}
                          aria-label={`Delete ${student.fullName}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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

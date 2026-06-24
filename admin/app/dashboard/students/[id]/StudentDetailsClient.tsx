"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { deleteStudent, getStudentById } from "@/app/lib/services/GetStudents";
import { formatCurrency, formatDate } from "@/app/lib/formatters";
import type { Student } from "@/types/Student";
import StudentStatusBadge from "@/presentation/components/custom/StudentStatusBadge";
import Toast, { type ToastTone } from "@/presentation/components/custom/Toast";

type StudentDetailsClientProps = {
  id: number;
};

type ToastState = {
  message: string;
  tone: ToastTone;
};

const detailRows = [
  ["Phone", "phone"],
  ["Email", "email"],
  ["Gender", "gender"],
  ["Address", "address"],
  ["Guardian", "guardianName"],
  ["Guardian Phone", "guardianPhone"],
] as const;

export default function StudentDetailsClient({ id }: StudentDetailsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<ToastState | null>(() => {
    if (searchParams.get("created")) {
      return { message: "Student added successfully.", tone: "success" };
    }

    if (searchParams.get("updated")) {
      return { message: "Student updated successfully.", tone: "success" };
    }

    return null;
  });

  useEffect(() => {
    getStudentById(id)
      .then((response) => setStudent(response.data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load student");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!student) return;

    const confirmed = window.confirm(
      `Delete ${student.fullName}? This action cannot be undone.`
    );

    if (!confirmed) return;

    try {
      await deleteStudent(student.id);
      setToast({ message: "Student deleted successfully.", tone: "success" });
      router.push("/dashboard/students");
    } catch (err) {
      setToast({
        message: err instanceof Error ? err.message : "Failed to delete student",
        tone: "error",
      });
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-600">Loading student...</p>;
  }

  if (error || !student) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        {error || "Student not found"}
      </div>
    );
  }

  return (
    <div className="max-w-5xl space-y-6">
      {toast && (
        <Toast
          message={toast.message}
          tone={toast.tone}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard/students"
            className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-purple-700 transition hover:text-purple-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Students
          </Link>
          <h1 className="text-2xl font-bold text-slate-950">
            {student.fullName}
          </h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/dashboard/students/${student.id}/edit`}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {detailRows.map(([label, key]) => (
            <div key={key}>
              <p className="text-xs font-bold uppercase text-slate-500">{label}</p>
              <p className="mt-1 font-semibold text-slate-900">{student[key]}</p>
            </div>
          ))}
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">
              Date of Birth
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {formatDate(student.dateOfBirth)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">
              Admission Date
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {formatDate(student.admissionDate)}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Course</p>
            <p className="mt-1 font-semibold text-slate-900">
              {student.courseName}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Fee</p>
            <p className="mt-1 font-semibold text-slate-900">
              {formatCurrency(student.feeAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-slate-500">Status</p>
            <div className="mt-1">
              <StudentStatusBadge status={student.paymentStatus} />
            </div>
          </div>
        </div>
      </div>

      {student.remarks && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-bold uppercase text-slate-500">Remarks</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{student.remarks}</p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StudentForm from "@/presentation/components/custom/StudentForm";
import {
  getStudentById,
  updateStudent,
} from "@/app/lib/services/GetStudents";
import type { Student, StudentFormInput } from "@/types/Student";

type EditStudentClientProps = {
  id: number;
};

export default function EditStudentClient({ id }: EditStudentClientProps) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getStudentById(id)
      .then((response) => setStudent(response.data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load student");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: StudentFormInput) => {
    const response = await updateStudent(id, data);
    router.push(`/dashboard/students/${response.data.id}?updated=1`);
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
    <StudentForm
      student={student}
      submitLabel="Update Student"
      submittingLabel="Updating..."
      onSubmit={handleSubmit}
    />
  );
}

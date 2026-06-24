"use client";

import { useRouter } from "next/navigation";
import StudentForm from "@/presentation/components/custom/StudentForm";
import { createStudent } from "@/app/lib/services/GetStudents";
import type { StudentFormInput } from "@/types/Student";

export default function AddStudentPage() {
  const router = useRouter();

  const handleSubmit = async (data: StudentFormInput) => {
    const response = await createStudent(data);
    router.push(`/dashboard/students/${response.data.id}?created=1`);
  };

  return (
    <StudentForm
      submitLabel="Save Student"
      submittingLabel="Saving..."
      onSubmit={handleSubmit}
    />
  );
}

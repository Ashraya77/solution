// components/StudentsTable.tsx
"use client";

import { useState, useEffect } from "react";
import { getStudents, deleteStudent } from "@/app/lib/services/GetStudents";
import StudentModal from "./StudentsModal";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  address: string;
  totalFee: number;
  amountPaid: number;
  amountDue: number;
  paymentStatus: "paid" | "partial" | "unpaid";
  enrollDate: string;
}

export default function StudentsTable() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await getStudents();
      setStudents(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
 
   const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleEdit = (student: Student) => {
    alert("Edit functionality coming soon");
    // You can implement edit logic here
  };
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      await deleteStudent(id);
      setStudents(students.filter((s) => s.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return <div className="p-4">Loading students...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Students</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Student +
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Id
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Total Fee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Amount Due
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {students.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50 text-gray-800" onClick={()=> handleStudentClick(student)}>
                  <td className="px-6 py-4 whitespace-nowrap">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.fullName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rs. {student.totalFee.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    Rs. {student.amountDue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        student.paymentStatus === "paid"
                          ? "bg-green-100 text-green-800"
                          : student.paymentStatus === "partial"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-3"
                      onClick={() => alert("Edit functionality coming soon")}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <StudentModal
        student={selectedStudent}
        isOpen={isModalOpen}
        onClose={closeModal}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

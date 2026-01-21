"use client";

import { Search, MoreVertical } from "lucide-react";
import { studentsAPI } from "@/app/lib/api/students";
import { useEffect, useState } from "react";

type Student = {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message: string;
  createdAt: string;
  updatedAt: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

 useEffect(() => {
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const students = await studentsAPI.getAllStudents({ search });
      setStudents(students);
    } catch (error) {
      console.error("Failed to fetch students", error);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  fetchStudents();
}, [search]);


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>

        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
            size={18}
          />
          <input
            type="text"
            placeholder="Search students..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 text-gray-700 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p className="text-gray-500">Loading students...</p>
      ) : (
        <div className="overflow-x-auto bg-white border rounded-xl shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b text-gray-800">
              <tr>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Phone</th>
                <th className="px-4 py-3 font-medium">Course</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium text-gray-800">
                    {student.fullName}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.email}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.phone}
                  </td>
                  <td className="px-4 py-3 text-gray-600 capitalize">
                    {student.course}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {students.length === 0 && (
            <p className="p-4 text-center text-gray-500">
              No students found
            </p>
          )}
        </div>
      )}
    </div>
  );
}

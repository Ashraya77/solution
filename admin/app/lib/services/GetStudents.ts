// services/student.service.ts
import { mockStudents } from "../mockData";
import type { Student } from "@/types/Student";

// Backend disabled while the API is being rebuilt.
// import axiosInstance from "../api/axiosInstance";

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const getStudents = async () => {
  return {
    message: "Students loaded from dummy data",
    data: mockStudents,
  };

  // try {
  //   const response = await axiosInstance.get<ApiResponse<Student[]>>('/students');
  //   return response.data;
  // } catch (error) {
  //   const message = error.response?.data?.message || 'Failed to fetch students';
  //   throw new Error(message);
  // }
};

export const getStudentById = async (id: number) => {
  const student = mockStudents.find((item) => item.id === id);

  if (!student) {
    throw new Error("Student not found");
  }

  return {
    message: "Student loaded from dummy data",
    data: student,
  };

  // try {
  //   const response = await axiosInstance.get<ApiResponse<Student>>(`/students/${id}`);
  //   return response.data;
  // } catch (error) {
  //   const message = error.response?.data?.message || 'Failed to fetch student';
  //   throw new Error(message);
  // }
};

export type CreateStudentInput = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message?: string;
  totalFee: number;
  amountPaid?: number;
};

export const createStudent = async (studentData: CreateStudentInput) => {
  const amountPaid = studentData.amountPaid ?? 0;
  const now = new Date().toISOString();
  const createdStudent: Student = {
    id: Math.max(0, ...mockStudents.map((student) => student.id)) + 1,
    ...studentData,
    amountPaid,
    amountDue: Math.max(studentData.totalFee - amountPaid, 0),
    paymentStatus:
      amountPaid >= studentData.totalFee ? "paid" : amountPaid > 0 ? "partial" : "unpaid",
    message: studentData.message ?? "",
    enrollDate: now.slice(0, 10),
    createdAt: now,
    updatedAt: now,
  };

  mockStudents.push(createdStudent);

  return {
    message: "Student created in dummy data",
    data: createdStudent,
  };

  // try {
  //   const response = await axiosInstance.post<ApiResponse<Student>>('/students', studentData);
  //   return response.data;
  // } catch (error) {
  //   const message = error.response?.data?.message || 'Failed to create student';
  //   throw new Error(message);
  // }
};

export const updateStudent = async (id: number, studentData: Partial<Student>) => {
  const student = mockStudents.find((item) => item.id === id);

  if (!student) {
    throw new Error("Student not found");
  }

  return {
    message: "Student updated in dummy data",
    data: { ...student, ...studentData, updatedAt: new Date().toISOString() },
  };

  // try {
  //   const response = await axiosInstance.put<ApiResponse<Student>>(`/students/${id}`, studentData);
  //   return response.data;
  // } catch (error) {
  //   const message = error.response?.data?.message || 'Failed to update student';
  //   throw new Error(message);
  // }
};

export const deleteStudent = async (id: number) => {
  return {
    message: `Student ${id} deleted from dummy data`,
    data: null,
  } satisfies ApiResponse<null>;

  // try {
  //   const response = await axiosInstance.delete<ApiResponse<null>>(`/students/${id}`);
  //   return response.data;
  // } catch (error) {
  //   const message = error.response?.data?.message || 'Failed to delete student';
  //   throw new Error(message);
  // }
};

// services/student.service.ts
import axiosInstance from "../api/axiosInstance";

interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message: string;
  enrollDate: string;
  totalFee: number;
  amountPaid: number;
  amountDue: number;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const getStudents = async () => {
  try {
    const response = await axiosInstance.get<ApiResponse<Student[]>>('/students');
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch students';
    throw new Error(message);
  }
};

export const getStudentById = async (id: number) => {
  try {
    const response = await axiosInstance.get<ApiResponse<Student>>(`/students/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to fetch student';
    throw new Error(message);
  }
};

export const createStudent = async (studentData: {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message?: string;
  totalFee: number;
  amountPaid?: number;
}) => {
  try {
    const response = await axiosInstance.post<ApiResponse<Student>>('/students', studentData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to create student';
    throw new Error(message);
  }
};

export const updateStudent = async (id: number, studentData: Partial<Student>) => {
  try {
    const response = await axiosInstance.put<ApiResponse<Student>>(`/students/${id}`, studentData);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to update student';
    throw new Error(message);
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/students/${id}`);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Failed to delete student';
    throw new Error(message);
  }
};
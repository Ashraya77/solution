import type { Student, StudentFormInput } from "@/types/Student";
import axiosInstance, { getApiErrorMessage } from "../api/axiosInstance";

interface ApiResponse<T> {
  message: string;
  data: T;
}

export const getStudents = async () => {
  try {
    const response = await axiosInstance.get<ApiResponse<Student[]>>("/students");
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch students"));
  }
};

export const getStudentById = async (id: number) => {
  try {
    const response = await axiosInstance.get<ApiResponse<Student>>(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to fetch student"));
  }
};

export type CreateStudentInput = StudentFormInput;
export type UpdateStudentInput = Partial<StudentFormInput>;

export const createStudent = async (studentData: CreateStudentInput) => {
  try {
    const response = await axiosInstance.post<ApiResponse<Student>>(
      "/students",
      studentData
    );
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to create student"));
  }
};

export const updateStudent = async (id: number, studentData: UpdateStudentInput) => {
  try {
    const response = await axiosInstance.patch<ApiResponse<Student>>(
      `/students/${id}`,
      studentData
    );
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to update student"));
  }
};

export const deleteStudent = async (id: number) => {
  try {
    const response = await axiosInstance.delete<ApiResponse<null>>(`/students/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to delete student"));
  }
};

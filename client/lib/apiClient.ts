import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface CourseOption {
  id: number;
  name: string;
  description: string | null;
  duration: string | null;
  price: string | null;
}

export interface EnrollmentData {
  name: string;
  father_name?: string;
  email?: string;
  phone: string;
  address?: string;
  date_of_birth?: string;
  course_id: number;
}

export interface EnrollmentResponse {
  message: string;
  data: {
    student_id: number;
    course_id: number;
  };
}

export const getPublicCourses = async (): Promise<CourseOption[]> => {
  const response = await api.get<{ data: CourseOption[] }>("/api/courses");
  return response.data.data;
};

export const submitEnrollment = async (
  data: EnrollmentData,
): Promise<EnrollmentResponse> => {
  const response = await api.post<EnrollmentResponse>("/api/enrollments", data);
  return response.data;
};

export default api;

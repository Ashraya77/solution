// api/students.js
import { mockStudents } from "../mockData";

// Backend disabled while the API is being rebuilt.
// import axiosInstance from "./axiosInstance";

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

export const studentsAPI = {
  getAllStudents: async (): Promise<Student[]> => {
    return mockStudents;

    // const response = await axiosInstance.get("/students", { params });
    // const payload = response.data;
    //
    // if (Array.isArray(payload?.data)) {
    //   return payload.data; // ideal backend
    // }
    //
    // if (payload?.data && typeof payload.data === "object") {
    //   return [payload.data]; // single student -> array
    // }
    //
    // if (payload && typeof payload === "object" && payload.id) {
    //   return [payload]; // backend returned raw object
    // }
    //
    // return []; // fallback safety
  },
};

import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface StudentFormData {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message: string;
}

export interface Student extends StudentFormData {
  id: number;
  createdAt: string;
  updatedAt: string;
}

// Create student
export const createStudent = async (data: StudentFormData) => {
  const response = await api.post('/students', data);
  return response.data;
};

// Get all students
export const getAllStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};

// Get single student
export const getStudent = async (id: number) => {
  const response = await api.get(`/students/${id}`);
  return response.data;
};

// Delete student
export const deleteStudent = async (id: number) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};

export default api;
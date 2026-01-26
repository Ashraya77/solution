import axiosInstance from "../api/axiosInstance";

export const LoginService = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Invalid credentials';
    throw new Error(message);
  }
};
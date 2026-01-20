import axiosInstance from "../api/axiosInstance";

export const LoginService = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post('/login', { email, password });
    // Axios puts the response body in the .data property
    return response.data;
  } catch (error) {
    // Axios throws on non-2xx status codes automatically
    const message = error.response?.data?.message || 'Invalid credentials';
    throw new Error(message);
  }
};
import { mockAdminUser } from "../mockData";

// Backend disabled while the API is being rebuilt.
// import axiosInstance from "../api/axiosInstance";

export const LoginService = async (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Invalid credentials");
  }

  return {
    message: "Logged in with dummy auth",
    data: mockAdminUser,
  };

  // try {
  //   const response = await axiosInstance.post('/login', { email, password });
  //
  //   return response.data;
  // } catch (error) {
  //   const message = error.response?.data?.message || 'Invalid credentials';
  //   throw new Error(message);
  // }
};

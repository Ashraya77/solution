import { mockDashboardStats } from "../mockData";

// Backend disabled while the API is being rebuilt.
// import axiosInstance from "./axiosInstance";

export const fetchAdminDashboard = async () => {
  return mockDashboardStats;

  // const res = await axiosInstance.get('/admin/dashboard');
  // return res.data;
};

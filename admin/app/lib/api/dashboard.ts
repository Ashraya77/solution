import axiosInstance from "./axiosInstance";

export const fetchAdminDashboard = async () => {
  const res = await axiosInstance.get('/admin/dashboard');
  return res.data;
};

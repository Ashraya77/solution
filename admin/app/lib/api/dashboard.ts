import { getStudents } from "../services/GetStudents";

export const fetchAdminDashboard = async () => {
  const response = await getStudents();
  const students = response.data;

  return {
    totalStudents: students.length,
    paidStudents: students.filter((student) => student.paymentStatus === "PAID")
      .length,
    partialStudents: students.filter(
      (student) => student.paymentStatus === "PARTIAL"
    ).length,
    unpaidStudents: students.filter(
      (student) => student.paymentStatus === "UNPAID"
    ).length,
    recentStudents: students.slice(0, 5),
  };
};

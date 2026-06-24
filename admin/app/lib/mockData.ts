import type { Student } from "@/types/Student";

export type DashboardStats = {
  totalStudents: number;
  paidStudents: number;
  partialStudents: number;
  unpaidStudents: number;
};

export const mockStudents: Student[] = [
  {
    id: 1,
    fullName: "Aarav Sharma",
    dateOfBirth: "2002-03-14T00:00:00.000Z",
    gender: "Male",
    phone: "9800000001",
    email: "aarav.sharma@example.com",
    address: "Putalisadak, Kathmandu",
    guardianName: "Sita Sharma",
    guardianPhone: "9800000101",
    courseName: "Web Development",
    admissionDate: "2026-04-12T00:00:00.000Z",
    feeAmount: 45000,
    paymentStatus: "PAID",
    remarks: "Interested in weekend classes.",
    createdAt: "2026-04-12T09:00:00.000Z",
    updatedAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: 2,
    fullName: "Nisha Karki",
    dateOfBirth: "2001-11-22T00:00:00.000Z",
    gender: "Female",
    phone: "9800000002",
    email: "nisha.karki@example.com",
    address: "Lagankhel, Lalitpur",
    guardianName: "Hari Karki",
    guardianPhone: "9800000102",
    courseName: "Graphic Design",
    admissionDate: "2026-04-18T00:00:00.000Z",
    feeAmount: 38000,
    paymentStatus: "PARTIAL",
    remarks: "Needs invoice after admission.",
    createdAt: "2026-04-18T10:30:00.000Z",
    updatedAt: "2026-04-20T12:15:00.000Z",
  },
  {
    id: 3,
    fullName: "Suman Thapa",
    dateOfBirth: "2000-07-08T00:00:00.000Z",
    gender: "Male",
    phone: "9800000003",
    email: "suman.thapa@example.com",
    address: "New Baneshwor, Kathmandu",
    guardianName: "Maya Thapa",
    guardianPhone: "9800000103",
    courseName: "Digital Marketing",
    admissionDate: "2026-05-01T00:00:00.000Z",
    feeAmount: 30000,
    paymentStatus: "UNPAID",
    remarks: "",
    createdAt: "2026-05-01T07:45:00.000Z",
    updatedAt: "2026-05-01T07:45:00.000Z",
  },
  {
    id: 4,
    fullName: "Pratiksha Rai",
    dateOfBirth: "2003-01-19T00:00:00.000Z",
    gender: "Female",
    phone: "9800000004",
    email: "pratiksha.rai@example.com",
    address: "Birtamode, Jhapa",
    guardianName: "Bikash Rai",
    guardianPhone: "9800000104",
    courseName: "Office Package",
    admissionDate: "2026-05-05T00:00:00.000Z",
    feeAmount: 22000,
    paymentStatus: "PAID",
    remarks: "Prefers morning batch.",
    createdAt: "2026-05-05T11:20:00.000Z",
    updatedAt: "2026-05-05T11:20:00.000Z",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: mockStudents.length,
  paidStudents: mockStudents.filter((student) => student.paymentStatus === "PAID")
    .length,
  partialStudents: mockStudents.filter(
    (student) => student.paymentStatus === "PARTIAL"
  ).length,
  unpaidStudents: mockStudents.filter(
    (student) => student.paymentStatus === "UNPAID"
  ).length,
};

export const mockAdminUser = {
  id: 1,
  name: "Admin User",
  username: "admin123",
  token: "mock-admin-token",
};

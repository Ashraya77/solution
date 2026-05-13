import type { Student } from "@/types/Student";

export type DashboardStats = {
  totalStudents: number;
  activeCourses: number;
  revenue: number;
  enrollments: number;
};

export const mockStudents: Student[] = [
  {
    id: 1,
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "9800000001",
    dob: "2002-03-14",
    course: "Web Development",
    address: "Putalisadak, Kathmandu",
    message: "Interested in weekend classes.",
    totalFee: 45000,
    amountPaid: 45000,
    amountDue: 0,
    paymentStatus: "paid",
    enrollDate: "2026-04-12",
    createdAt: "2026-04-12T09:00:00.000Z",
    updatedAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: 2,
    fullName: "Nisha Karki",
    email: "nisha.karki@example.com",
    phone: "9800000002",
    dob: "2001-11-22",
    course: "Graphic Design",
    address: "Lagankhel, Lalitpur",
    message: "Needs invoice after admission.",
    totalFee: 38000,
    amountPaid: 15000,
    amountDue: 23000,
    paymentStatus: "partial",
    enrollDate: "2026-04-18",
    createdAt: "2026-04-18T10:30:00.000Z",
    updatedAt: "2026-04-20T12:15:00.000Z",
  },
  {
    id: 3,
    fullName: "Suman Thapa",
    email: "suman.thapa@example.com",
    phone: "9800000003",
    dob: "2000-07-08",
    course: "Digital Marketing",
    address: "New Baneshwor, Kathmandu",
    message: "",
    totalFee: 30000,
    amountPaid: 0,
    amountDue: 30000,
    paymentStatus: "unpaid",
    enrollDate: "2026-05-01",
    createdAt: "2026-05-01T07:45:00.000Z",
    updatedAt: "2026-05-01T07:45:00.000Z",
  },
  {
    id: 4,
    fullName: "Pratiksha Rai",
    email: "pratiksha.rai@example.com",
    phone: "9800000004",
    dob: "2003-01-19",
    course: "Office Package",
    address: "Birtamode, Jhapa",
    message: "Prefers morning batch.",
    totalFee: 22000,
    amountPaid: 22000,
    amountDue: 0,
    paymentStatus: "paid",
    enrollDate: "2026-05-05",
    createdAt: "2026-05-05T11:20:00.000Z",
    updatedAt: "2026-05-05T11:20:00.000Z",
  },
];

export const mockDashboardStats: DashboardStats = {
  totalStudents: mockStudents.length,
  activeCourses: 6,
  revenue: mockStudents.reduce((total, student) => total + student.amountPaid, 0),
  enrollments: 18,
};

export const mockAdminUser = {
  id: 1,
  name: "Admin User",
  email: "admin@example.com",
  token: "mock-admin-token",
};

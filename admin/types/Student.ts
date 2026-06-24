export type PaymentStatus = "PAID" | "PARTIAL" | "UNPAID";

export interface Student {
  id: number;
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  courseName: string;
  admissionDate: string;
  feeAmount: number;
  paymentStatus: PaymentStatus;
  remarks: string;
  createdAt: string;
  updatedAt: string;
}

export type StudentFormInput = {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  guardianName: string;
  guardianPhone: string;
  courseName: string;
  admissionDate: string;
  feeAmount: number;
  paymentStatus: PaymentStatus;
  remarks?: string;
};

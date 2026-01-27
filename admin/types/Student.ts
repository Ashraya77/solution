// types/student.ts
export interface Student {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message: string;
  totalFee: number;
  amountPaid: number;
  amountDue: number;
  paymentStatus: 'paid' | 'partial' | 'unpaid';
  enrollDate: string;
  createdAt: string;
  updatedAt: string;
}
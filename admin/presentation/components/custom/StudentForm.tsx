"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowLeft, LoaderCircle, Save } from "lucide-react";
import Link from "next/link";
import type { PaymentStatus, Student, StudentFormInput } from "@/types/Student";
import { toDateInput } from "@/app/lib/formatters";

type StudentFormProps = {
  student?: Student;
  submitLabel: string;
  submittingLabel: string;
  onSubmit: (data: StudentFormInput) => Promise<void>;
};

type StudentFormState = Omit<StudentFormInput, "feeAmount"> & {
  feeAmount: string;
};

const emptyForm: StudentFormState = {
  fullName: "",
  dateOfBirth: "",
  gender: "",
  phone: "",
  email: "",
  address: "",
  guardianName: "",
  guardianPhone: "",
  courseName: "",
  admissionDate: new Date().toISOString().slice(0, 10),
  feeAmount: "",
  paymentStatus: "UNPAID",
  remarks: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100";
const textareaClass =
  "min-h-28 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-purple-600 focus:ring-2 focus:ring-purple-100";
const labelClass = "mb-1.5 block text-sm font-semibold text-slate-700";

function toInitialForm(student?: Student): StudentFormState {
  if (!student) return emptyForm;

  return {
    fullName: student.fullName,
    dateOfBirth: toDateInput(student.dateOfBirth),
    gender: student.gender,
    phone: student.phone,
    email: student.email,
    address: student.address,
    guardianName: student.guardianName,
    guardianPhone: student.guardianPhone,
    courseName: student.courseName,
    admissionDate: toDateInput(student.admissionDate),
    feeAmount: String(student.feeAmount),
    paymentStatus: student.paymentStatus,
    remarks: student.remarks ?? "",
  };
}

export default function StudentForm({
  student,
  submitLabel,
  submittingLabel,
  onSubmit,
}: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormState>(() =>
    toInitialForm(student)
  );
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const feeAmount = useMemo(() => Number(formData.feeAmount), [formData.feeAmount]);

  const updateField = <K extends keyof StudentFormState>(
    field: K,
    value: StudentFormState[K]
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validate = () => {
    if (!formData.fullName.trim()) return "Full name is required.";
    if (!formData.dateOfBirth) return "Date of birth is required.";
    if (!formData.gender.trim()) return "Gender is required.";
    if (!formData.phone.trim()) return "Phone is required.";
    if (!formData.email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "Enter a valid email.";
    if (!formData.address.trim()) return "Address is required.";
    if (!formData.guardianName.trim()) return "Guardian name is required.";
    if (!formData.guardianPhone.trim()) return "Guardian phone is required.";
    if (!formData.courseName.trim()) return "Course name is required.";
    if (!formData.admissionDate) return "Admission date is required.";
    if (Number.isNaN(feeAmount) || feeAmount < 0) {
      return "Fee amount must be a valid amount.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const validationError = validate();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        fullName: formData.fullName.trim(),
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: formData.address.trim(),
        guardianName: formData.guardianName.trim(),
        guardianPhone: formData.guardianPhone.trim(),
        courseName: formData.courseName.trim(),
        admissionDate: formData.admissionDate,
        feeAmount,
        paymentStatus: formData.paymentStatus,
        remarks: formData.remarks?.trim(),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save student.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="max-w-5xl" onSubmit={handleSubmit}>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">
            {student ? "Edit Student" : "Add Student"}
          </h1>
        </div>
        <Link
          href="/dashboard/students"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Students
        </Link>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="fullName">
              Full Name
            </label>
            <input
              id="fullName"
              className={inputClass}
              value={formData.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={inputClass}
              value={formData.email}
              onChange={(event) => updateField("email", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              className={inputClass}
              value={formData.phone}
              onChange={(event) => updateField("phone", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="gender">
              Gender
            </label>
            <select
              id="gender"
              className={inputClass}
              value={formData.gender}
              onChange={(event) => updateField("gender", event.target.value)}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="dateOfBirth">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              className={inputClass}
              value={formData.dateOfBirth}
              onChange={(event) => updateField("dateOfBirth", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="admissionDate">
              Admission Date
            </label>
            <input
              id="admissionDate"
              type="date"
              className={inputClass}
              value={formData.admissionDate}
              onChange={(event) =>
                updateField("admissionDate", event.target.value)
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="address">
              Address
            </label>
            <input
              id="address"
              className={inputClass}
              value={formData.address}
              onChange={(event) => updateField("address", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="guardianName">
              Guardian Name
            </label>
            <input
              id="guardianName"
              className={inputClass}
              value={formData.guardianName}
              onChange={(event) =>
                updateField("guardianName", event.target.value)
              }
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="guardianPhone">
              Guardian Phone
            </label>
            <input
              id="guardianPhone"
              className={inputClass}
              value={formData.guardianPhone}
              onChange={(event) =>
                updateField("guardianPhone", event.target.value)
              }
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="courseName">
              Course Name
            </label>
            <input
              id="courseName"
              className={inputClass}
              value={formData.courseName}
              onChange={(event) => updateField("courseName", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="feeAmount">
              Fee Amount
            </label>
            <input
              id="feeAmount"
              type="number"
              min="0"
              className={inputClass}
              value={formData.feeAmount}
              onChange={(event) => updateField("feeAmount", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="paymentStatus">
              Payment Status
            </label>
            <select
              id="paymentStatus"
              className={inputClass}
              value={formData.paymentStatus}
              onChange={(event) =>
                updateField("paymentStatus", event.target.value as PaymentStatus)
              }
            >
              <option value="PAID">Paid</option>
              <option value="PARTIAL">Partial</option>
              <option value="UNPAID">Unpaid</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="remarks">
              Remarks
            </label>
            <textarea
              id="remarks"
              className={textareaClass}
              value={formData.remarks}
              onChange={(event) => updateField("remarks", event.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4">
          <button
            type="submit"
            className="inline-flex h-11 items-center gap-2 rounded-lg bg-purple-700 px-4 text-sm font-bold text-white transition hover:bg-purple-800 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoaderCircle className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isSubmitting ? submittingLabel : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

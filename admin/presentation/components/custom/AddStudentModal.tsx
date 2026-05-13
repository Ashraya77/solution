"use client";

import { FormEvent, useMemo, useState } from "react";
import { X } from "lucide-react";
import type { CreateStudentInput } from "@/app/lib/services/GetStudents";

type AddStudentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (student: CreateStudentInput) => Promise<void>;
};

type StudentFormState = {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  course: string;
  address: string;
  message: string;
  totalFee: string;
  amountPaid: string;
};

const initialFormState: StudentFormState = {
  fullName: "",
  email: "",
  phone: "",
  dob: "",
  course: "",
  address: "",
  message: "",
  totalFee: "",
  amountPaid: "",
};

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

const labelClass = "mb-1 block text-sm font-medium text-gray-700";

export default function AddStudentModal({
  isOpen,
  onClose,
  onSubmit,
}: AddStudentModalProps) {
  const [formData, setFormData] = useState<StudentFormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const amountDue = useMemo(() => {
    const totalFee = Number(formData.totalFee) || 0;
    const amountPaid = Number(formData.amountPaid) || 0;

    return Math.max(totalFee - amountPaid, 0);
  }, [formData.amountPaid, formData.totalFee]);

  if (!isOpen) return null;

  const updateField = (field: keyof StudentFormState, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setFormData(initialFormState);
    setError("");
    onClose();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const totalFee = Number(formData.totalFee);
    const amountPaid = Number(formData.amountPaid || 0);

    if (Number.isNaN(totalFee) || totalFee < 0) {
      setError("Total fee must be a valid amount.");
      return;
    }

    if (Number.isNaN(amountPaid) || amountPaid < 0) {
      setError("Amount paid must be a valid amount.");
      return;
    }

    try {
      setIsSubmitting(true);
      await onSubmit({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dob: formData.dob,
        course: formData.course.trim(),
        address: formData.address.trim(),
        message: formData.message.trim(),
        totalFee,
        amountPaid,
      });

      setFormData(initialFormState);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add student");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-400/50 p-4 backdrop-blur-sm"
      onClick={handleClose}
    >
      <form
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 text-black shadow-xl"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Add Student</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter student and payment details.
            </p>
          </div>
          <button
            type="button"
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
            onClick={handleClose}
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

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
              required
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
              required
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
              required
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="dob">
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              className={inputClass}
              value={formData.dob}
              onChange={(event) => updateField("dob", event.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="course">
              Course
            </label>
            <input
              id="course"
              className={inputClass}
              value={formData.course}
              onChange={(event) => updateField("course", event.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="totalFee">
              Total Fee
            </label>
            <input
              id="totalFee"
              type="number"
              min="0"
              className={inputClass}
              value={formData.totalFee}
              onChange={(event) => updateField("totalFee", event.target.value)}
              required
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="amountPaid">
              Amount Paid
            </label>
            <input
              id="amountPaid"
              type="number"
              min="0"
              className={inputClass}
              value={formData.amountPaid}
              onChange={(event) => updateField("amountPaid", event.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Amount Due</label>
            <div className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-800">
              Rs. {amountDue.toLocaleString()}
            </div>
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
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass} htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              className={`${inputClass} min-h-24 resize-y`}
              value={formData.message}
              onChange={(event) => updateField("message", event.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-4">
          <button
            type="button"
            className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 transition hover:bg-gray-300"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Student"}
          </button>
        </div>
      </form>
    </div>
  );
}

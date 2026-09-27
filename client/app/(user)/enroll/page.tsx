"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { CheckCircle2, Loader2, Send, XCircle } from "lucide-react";
import {
  getPublicCourses,
  submitEnrollment,
  type CourseOption,
} from "@/lib/apiClient";

const formSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(255),
  father_name: z.string().trim().max(255).optional(),
  email: z.string().trim().email("Enter a valid email address.").or(z.literal("")),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(50),
  address: z.string().trim().max(500).optional(),
  date_of_birth: z.string().optional(),
  course_id: z.string().min(1, "Select a course."),
});

type EnrollmentFormValues = z.infer<typeof formSchema>;

type SubmissionStatus = {
  type: "success" | "error" | null;
  message: string;
};

const emptyToUndefined = (value: string | undefined) => value?.trim() || undefined;

export default function EnrollmentPage() {
  const [courses, setCourses] = useState<CourseOption[]>([]);
  const [coursesError, setCoursesError] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<SubmissionStatus>({
    type: null,
    message: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnrollmentFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      father_name: "",
      email: "",
      phone: "",
      address: "",
      date_of_birth: "",
      course_id: "",
    },
  });

  useEffect(() => {
    let active = true;

    void getPublicCourses()
      .then((availableCourses) => {
        if (active) setCourses(availableCourses);
      })
      .catch(() => {
        if (active) {
          setCoursesError("Courses could not be loaded. Please try again shortly.");
        }
      })
      .finally(() => {
        if (active) setLoadingCourses(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const onSubmit = async (data: EnrollmentFormValues) => {
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await submitEnrollment({
        name: data.name.trim(),
        father_name: emptyToUndefined(data.father_name),
        email: emptyToUndefined(data.email),
        phone: data.phone.trim(),
        address: emptyToUndefined(data.address),
        date_of_birth: emptyToUndefined(data.date_of_birth),
        course_id: Number(data.course_id),
      });

      setSubmitStatus({ type: "success", message: response.message });
      reset();
    } catch (error: unknown) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message || "Your enrollment could not be submitted. Please try again."
        : "Your enrollment could not be submitted. Please try again.";

      setSubmitStatus({ type: "error", message });
    }
  };

  const fieldClass = (hasError: boolean) =>
    hasError
      ? "w-full rounded-xl border border-red-500 bg-red-50 px-4 py-3 text-slate-900 outline-none"
      : "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10";

  return (
    <main className="mx-auto my-16 max-w-2xl px-4 sm:px-6">
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-600">Admissions</p>
          <h1 className="mt-2 text-3xl font-black text-slate-900">Enroll in a course</h1>
          <p className="mt-2 text-slate-500">Submit your details and our team will follow up about your enrollment.</p>
        </div>

        {submitStatus.type && (
          <div role="alert" className={submitStatus.type === "success" ? "mb-6 flex gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800" : "mb-6 flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"}>
            {submitStatus.type === "success" ? <CheckCircle2 className="mt-0.5 size-5 shrink-0" /> : <XCircle className="mt-0.5 size-5 shrink-0" />}
            <p className="text-sm font-medium">{submitStatus.message}</p>
          </div>
        )}

        {coursesError && <p role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-800">{coursesError}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-bold text-slate-700">Full name *</label>
            <input id="name" autoComplete="name" {...register("name")} className={fieldClass(Boolean(errors.name))} placeholder="Your full name" />
            {errors.name && <p className="mt-1 text-xs font-medium text-red-600">{errors.name.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-bold text-slate-700">Phone number *</label>
              <input id="phone" autoComplete="tel" inputMode="tel" {...register("phone")} className={fieldClass(Boolean(errors.phone))} placeholder="98XXXXXXXX" />
              {errors.phone && <p className="mt-1 text-xs font-medium text-red-600">{errors.phone.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">Email <span className="font-normal text-slate-400">(optional)</span></label>
              <input id="email" type="email" autoComplete="email" {...register("email")} className={fieldClass(Boolean(errors.email))} placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-xs font-medium text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="course_id" className="mb-2 block text-sm font-bold text-slate-700">Course *</label>
            <select id="course_id" disabled={loadingCourses || courses.length === 0} {...register("course_id")} className={fieldClass(Boolean(errors.course_id))}>
              <option value="">{loadingCourses ? "Loading courses…" : "Select a course"}</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}{course.duration ? " — " + course.duration : ""}
                </option>
              ))}
            </select>
            {errors.course_id && <p className="mt-1 text-xs font-medium text-red-600">{errors.course_id.message}</p>}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="father_name" className="mb-2 block text-sm font-bold text-slate-700">Parent / guardian name <span className="font-normal text-slate-400">(optional)</span></label>
              <input id="father_name" autoComplete="name" {...register("father_name")} className={fieldClass(Boolean(errors.father_name))} placeholder="Parent or guardian name" />
              {errors.father_name && <p className="mt-1 text-xs font-medium text-red-600">{errors.father_name.message}</p>}
            </div>
            <div>
              <label htmlFor="date_of_birth" className="mb-2 block text-sm font-bold text-slate-700">Date of birth <span className="font-normal text-slate-400">(optional)</span></label>
              <input id="date_of_birth" type="date" autoComplete="bday" {...register("date_of_birth")} className={fieldClass(Boolean(errors.date_of_birth))} />
              {errors.date_of_birth && <p className="mt-1 text-xs font-medium text-red-600">{errors.date_of_birth.message}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="address" className="mb-2 block text-sm font-bold text-slate-700">Address <span className="font-normal text-slate-400">(optional)</span></label>
            <textarea id="address" rows={3} autoComplete="street-address" {...register("address")} className={fieldClass(Boolean(errors.address))} placeholder="Your current address" />
            {errors.address && <p className="mt-1 text-xs font-medium text-red-600">{errors.address.message}</p>}
          </div>

          <button disabled={isSubmitting || loadingCourses || courses.length === 0} type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 py-4 font-bold text-white shadow-lg shadow-sky-100 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70">
            {isSubmitting ? <Loader2 className="size-5 animate-spin" /> : <Send className="size-5" />}
            {isSubmitting ? "Submitting…" : "Submit enrollment"}
          </button>
        </form>
      </div>
    </main>
  );
}

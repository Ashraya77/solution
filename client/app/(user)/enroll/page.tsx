"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Send, CheckCircle2, XCircle } from 'lucide-react';
import { createStudent } from '@/lib/apiClient';

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number required"),
  dob: z.string().min(1, "Date of birth is required"),
  course: z.string().min(1, "Please select a course"),
  address: z.string().min(5, "Please enter your full address"),
  message: z.string().min(10, "Please tell us a bit more (min 10 chars)"),
});

type FormData = z.infer<typeof formSchema>;

const Page = () => {
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await createStudent(data);
      
      setSubmitStatus({
        type: 'success',
        message: response.message || 'Application submitted successfully!',
      });
      
      reset();
      
      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 5000);
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      
      const errorMessage = 
        error.response?.data?.message || 
        error.message || 
        'Something went wrong. Please try again.';
      
      setSubmitStatus({
        type: 'error',
        message: errorMessage,
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-3xl shadow-xl border border-slate-100 mt-20 mb-10">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-900">Course Enrollment</h2>
        <p className="text-slate-500">Fill in your details to apply for admission.</p>
      </div>

      {/* Success/Error Message */}
      {submitStatus.type && (
        <div
          className={`mb-6 p-4 rounded-xl flex items-start gap-3 ${
            submitStatus.type === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {submitStatus.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" />
          ) : (
            <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          )}
          <p className="text-sm font-medium">{submitStatus.message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        
        {/* Name Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Full Name</label>
          <input
            {...register("fullName")}
            className={`w-full px-4 py-3 rounded-xl border transition-all text-black outline-none ${
              errors.fullName ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Email Address</label>
            <input
              {...register("email")}
              type="email"
              className={`w-full text-black px-4 py-3 rounded-xl border transition-all outline-none ${
                errors.email ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
              }`}
              placeholder="john@example.com"
            />
            {errors.email && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.email.message}</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Phone Number</label>
            <input
              {...register("phone")}
              className={`w-full text-black px-4 py-3 rounded-xl border transition-all outline-none ${
                errors.phone ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
              }`}
              placeholder="+1 234 567 890"
            />
            {errors.phone && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Date of Birth Field */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Date of Birth</label>
            <input
              type="date"
              {...register("dob")}
              className={`w-full text-black  px-4 py-3 rounded-xl border transition-all outline-none ${
                errors.dob ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
              }`}
            />
            {errors.dob && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.dob.message}</p>}
          </div>

          {/* Course Selection */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Selected Course</label>
            <select
              {...register("course")}
              className={`w-full text-black px-4 py-3 rounded-xl border transition-all outline-none bg-white ${
                errors.course ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
              }`}
            >
              <option value="">Select Course</option>
              <option value="web-dev">Web Development</option>
              <option value="python">Python Data Science</option>
              <option value="cyber-security">Cyber Security</option>
            </select>
            {errors.course && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.course.message}</p>}
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Home Address</label>
          <input
            {...register("address")}
            className={`w-full px-4 text-black py-3 rounded-xl border transition-all outline-none ${
              errors.address ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
            }`}
            placeholder="Street address, City, Zip Code"
          />
          {errors.address && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.address.message}</p>}
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 px-1">Additional Notes</label>
          <textarea
            {...register("message")}
            rows={3}
            className={`w-full px-4 py-3 text-black rounded-xl border transition-all outline-none resize-none ${
              errors.message ? "border-red-500 bg-red-50" : "border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10"
            }`}
            placeholder="Tell us about your background or requirements..."
          />
          {errors.message && <p className="mt-1 text-xs font-medium text-red-500 px-1">{errors.message.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-sky-100"
        >
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Submit Application <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default Page;
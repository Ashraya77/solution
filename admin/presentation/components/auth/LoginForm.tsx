"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { getStoredToken, LoginService } from "@/app/lib/services/LoginService";

type LoginFormValues = {
  username: string;
  password: string;
};

const getErrorMessage = (error: unknown) => {
  return error instanceof Error ? error.message : "Invalid username or password";
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");
  const displayError = apiError || error;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    if (getStoredToken()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const onSubmit = async (data: LoginFormValues) => {
    setApiError("");
    setLoading(true);

    try {
      await LoginService(data.username, data.password);
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setApiError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-purple-700">
            <Lock className="h-7 w-7 text-white" />
          </div>
          <p className="text-xs font-bold uppercase text-yellow-600">
            Solution Computer House
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-950">Admin Login</h1>
        </div>

        {displayError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
            <p className="text-sm text-red-800">{displayError}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Username
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username", {
                  required: "Username is required",
                })}
                className={`block w-full rounded-lg border py-3 pl-10 pr-3 text-slate-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-purple-600 ${
                  errors.username ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="admin123"
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
                className={`block w-full rounded-lg border py-3 pl-10 pr-12 text-slate-700 outline-none transition focus:border-transparent focus:ring-2 focus:ring-purple-600 ${
                  errors.password ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Solution@25"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                ) : (
                  <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-purple-700 px-4 py-3 font-semibold text-white transition hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

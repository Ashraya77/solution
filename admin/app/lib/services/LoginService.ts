import axiosInstance, { getApiErrorMessage } from "../api/axiosInstance";

type LoginResponse = {
  message: string;
  access_token: string;
  admin: {
    id: string;
    username: string;
  };
};

export const LoginService = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post<LoginResponse>("/auth/login", {
      username,
      password,
    });

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("token", response.data.access_token);
      window.sessionStorage.setItem("admin_username", response.data.admin.username);
    }

    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Invalid credentials"));
  }
};

export const LogoutService = async () => {
  try {
    await axiosInstance.post("/auth/logout");
  } finally {
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem("token");
      window.sessionStorage.removeItem("admin_username");
      window.localStorage.removeItem("token");
    }
  }
};

export function getStoredToken() {
  if (typeof window === "undefined") return null;

  return window.sessionStorage.getItem("token") ?? window.localStorage.getItem("token");
}

export function getStoredAdminUsername() {
  if (typeof window === "undefined") return "Admin";

  return window.sessionStorage.getItem("admin_username") ?? "Admin";
};

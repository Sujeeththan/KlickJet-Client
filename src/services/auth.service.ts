import apiClient from "@/lib/apiClient";
import { LoginCredentials, RegisterData, AuthResponse } from "@/types/user";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // Pass role parameter if provided (for admin login)
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },
  register: async (data: RegisterData): Promise<AuthResponse> => {
    // Use the unified registration endpoint that accepts role in body
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  },
  getCurrentUser: async (): Promise<AuthResponse> => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
  logout: async (): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  }
};

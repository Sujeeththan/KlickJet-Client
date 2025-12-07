import apiClient from "@/lib/apiClient";

export const categoryService = {
  getAll: async () => {
    const response = await apiClient.get<{ success: boolean; categories: any[] }>("/categories");
    return response.data;
  },
};

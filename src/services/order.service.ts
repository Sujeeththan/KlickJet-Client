import apiClient from "@/lib/apiClient";
import { Order } from "@/types/order";

export const orderService = {
  getAll: async () => {
    const response = await apiClient.get<{ success: boolean; orders: Order[] }>("/orders");
    return response.data;
  },
  getById: async (id: string) => {
    const response = await apiClient.get<{ success: boolean; order: Order }>(`/orders/${id}`);
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await apiClient.put<{ success: boolean; message: string }>(`/orders/${id}`, { status });
    return response.data;
  },
  create: async (data: any) => {
    const response = await apiClient.post<{ success: boolean; order: Order; message: string }>("/orders", data);
    return response.data;
  }
};

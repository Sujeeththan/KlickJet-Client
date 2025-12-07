import apiClient from "@/lib/apiClient";
import { Cart } from "@/types/cart";

export const cartService = {
  getCart: async () => {
    const response = await apiClient.get<{ success: boolean; cart: Cart }>("/cart");
    return response.data;
  },
  addToCart: async (productId: string, quantity: number = 1) => {
    const response = await apiClient.post<{ success: boolean; message: string; cart: Cart }>("/cart", { productId, quantity });
    return response.data;
  },
  updateItem: async (itemId: string, quantity: number) => {
    const response = await apiClient.put<{ success: boolean; message: string; cart: Cart }>(`/cart/${itemId}`, { quantity });
    return response.data;
  },
  removeItem: async (itemId: string) => {
    const response = await apiClient.delete<{ success: boolean; message: string; cart: Cart }>(`/cart/${itemId}`);
    return response.data;
  },
  clearCart: async () => {
    const response = await apiClient.delete<{ success: boolean; message: string; cart: Cart }>("/cart");
    return response.data;
  }
};

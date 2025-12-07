import apiClient from "@/lib/apiClient";
import { User } from "@/types/user";

export const userService = {
    // Admin: Sellers
    getPendingSellers: async () => {
        const response = await apiClient.get<{ success: boolean, sellers: User[] }>("/admin/sellers/pending");
        return response.data;
    },
    getAllSellers: async () => {
        const response = await apiClient.get<{ success: boolean, sellers: User[] }>("/admin/sellers");
        return response.data;
    },
    approveSeller: async (id: string) => {
        const response = await apiClient.put<{ success: boolean, message: string }>(`/admin/sellers/${id}/approve`);
        return response.data;
    },
    rejectSeller: async (id: string, rejectionReason: string) => {
        const response = await apiClient.put<{ success: boolean, message: string }>(`/admin/sellers/${id}/reject`, { rejectionReason });
        return response.data;
    },
    deleteSeller: async (id: string) => {
        const response = await apiClient.delete<{ success: boolean, message: string }>(`/admin/sellers/${id}`);
        return response.data;
    },

    // Admin: Deliverers
    getPendingDeliverers: async () => {
        const response = await apiClient.get<{ success: boolean, deliverers: User[] }>("/admin/deliverers/pending");
        return response.data;
    },
    getAllDeliverers: async () => {
        const response = await apiClient.get<{ success: boolean, deliverers: User[] }>("/admin/deliverers");
        return response.data;
    },
    approveDeliverer: async (id: string) => {
        const response = await apiClient.put<{ success: boolean, message: string }>(`/admin/deliverers/${id}/approve`);
        return response.data;
    },
    rejectDeliverer: async (id: string, rejectionReason: string) => {
        const response = await apiClient.put<{ success: boolean, message: string }>(`/admin/deliverers/${id}/reject`, { rejectionReason });
        return response.data;
    },
    deleteDeliverer: async (id: string) => {
        const response = await apiClient.delete<{ success: boolean, message: string }>(`/admin/deliverers/${id}`);
        return response.data;
    },

    // Admin: Users
    getAllUsers: async () => {
        const response = await apiClient.get<{ success: boolean, users: User[], count: number }>("/admin/users");
        return response.data;
    },
    deleteUser: async (id: string) => {
        const response = await apiClient.delete<{ success: boolean, message: string }>(`/users/${id}`);
        return response.data;
    }
};

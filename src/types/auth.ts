export type UserRole = 'public' | 'customer' | 'seller' | 'deliverer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone_no?: string;
  address?: string;
  shopName?: string;
  vehicle_no?: string;
  vehicle_type?: string;
  status?: 'pending' | 'approved' | 'rejected';
  isActive?: boolean;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role?: UserRole;
}

export interface RegisterData {
  role: UserRole;
  name: string;
  email: string;
  password: string;
  phone_no?: string;
  address?: string;
  shopName?: string;
  vehicle_no?: string;
  vehicle_type?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

import { create } from 'zustand';
import { Admin, AuthResponse } from '@/types';

interface AuthStore {
  admin: Admin | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setAdmin: (admin: Admin) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  admin: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('authToken') : null,
  isLoading: false,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('authToken') : false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      const { apiClient } = await import('@/lib/api-client');
      const response = await apiClient.login(email, password);
      set({
        admin: response.admin,
        token: response.token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    const { apiClient } = require('@/lib/api-client');
    apiClient.clearToken();
    set({
      admin: null,
      token: null,
      isAuthenticated: false,
    });
  },

  setAdmin: (admin: Admin) => {
    set({ admin });
  },

  setToken: (token: string) => {
    set({ token, isAuthenticated: true });
  },
}));

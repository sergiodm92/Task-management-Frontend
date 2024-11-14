import { create } from 'zustand';
import Cookies from 'js-cookie';
import { User } from '../interfaces';
import { login as loginApi, register as registerApi, getUser as getUserApi } from '../api/auth';
import axiosInstance from '../config/axiosConfig';

type AuthStore = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,

  initializeAuth: async () => {
    const token = Cookies.get('token');
    if (token) {
      try {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const response = await getUserApi();
        const user = response.data;
        set({ user, isAuthenticated: true, loading: false });
      } catch (error) {
        console.error('Error al inicializar la autenticación:', error);
        Cookies.remove('token');
        set({ user: null, isAuthenticated: false, loading: false });
      }
    }
    else {
      set({ isAuthenticated: false, loading: false });
    }

  },

  login: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await loginApi({ email, password });
      Cookies.set('token', response.data.token, {
        sameSite: 'lax',
        secure: true,
      });
      const user = response.data.user;
      set({ user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error('Login failed');
    }
  },

  register: async (email: string, password: string) => {
    set({ loading: true });
    try {
      const response = await registerApi({ email, password });
      return response.statusCode === 201;
    } catch (error) {
      set({ loading: false });
      throw new Error('Registration failed');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, loading: false });
    Cookies.remove('token');
  },
}));

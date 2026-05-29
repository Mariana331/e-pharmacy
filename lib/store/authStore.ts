import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  isAuthReady: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setAuthReady: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthReady: false,

  setUser: (user) => set({ user, isAuthReady: true }),

  clearUser: () => set({ user: null, isAuthReady: true }),

  setAuthReady: () => set({ isAuthReady: true }),

  isAuthenticated: () => get().user !== null,
}));

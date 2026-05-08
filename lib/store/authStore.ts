import { create } from 'zustand';
import { User } from '@/types/user';

type AuthStore = {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  isAuthenticated: () => get().user !== null,
}));

import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { type User } from 'firebase/auth';

interface IAuthStore {
  user: User | null;
  token: string | null;
  setUser: (user: User, token?: string, providerId?: string) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        providerId: null,
        setUser: (user, token) => set({ user, token }),
        setToken: (token) => set({ token }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

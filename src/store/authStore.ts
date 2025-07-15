import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { type User } from 'firebase/auth';
import { type Role } from '@firebase_/role';

interface IAuthStore {
  user: User | null;
  role: Role | null;
  setUser: (user: User | null, role: Role | null) => void;
}

export const useAuthStore = create<IAuthStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        role: null,
        setUser: (user, role) => set({ user, role }),
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  ),
);

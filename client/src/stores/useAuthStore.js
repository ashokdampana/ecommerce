import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      role: null,

      setAuth: ({ user, accessToken, role }) => {
        set({ user, accessToken, role });
      },

      refreshToken: (token) => {
        set({ accessToken: token });
      },

      logout: () => {
        set({ user: null, accessToken: null, role: null });
      },

      isUser: () => {
        const { user, accessToken } = get();
        return !!user && !!accessToken;
      },

      isAdmin: () => {
        const { user, accessToken, role } = get();
        return role === 'admin' && !!user && !!accessToken;
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);
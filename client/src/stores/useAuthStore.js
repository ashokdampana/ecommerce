import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,

  login: (user) => {
    console.log('authstore data ', ...user);
    const {name, email, role, token} = user;
    set({ user: {name, email, role}, token: token });
    localStorage.setItem('user', JSON.stringify({name, email, role}));
    localStorage.setItem('token', token);
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },

  isAuthenticated: () => {
    const { user, token } = useAuthStore.getState();
    return !!user && !!token;
  },
}));

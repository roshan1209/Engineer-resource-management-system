import { create } from 'zustand';

type AuthState = {
  token: string | null;
  role: string | null;
  name: string | null;
  setToken: (token: string | null, role?: string | null, user?: string | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  role: localStorage.getItem('role'),
  name: localStorage.getItem('name'),
  setToken: (token, role = null, name = null) => {
    if (token) {
      localStorage.setItem('token', token);
      if (role) localStorage.setItem('role', role);
      if (name) localStorage.setItem('name',name);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
    }
    set({ token, role, name });
  },
}));

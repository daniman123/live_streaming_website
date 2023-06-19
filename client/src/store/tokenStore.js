import { create } from "zustand";

export const useTokenStore = create((set) => ({
  token: null,
  username: null,
  setToken: (token) => set((state) => ({ token })),
  setUsername: (username) => set((state) => ({ username })),
  removeToken: () => set({ token: null, username: null }),
}));

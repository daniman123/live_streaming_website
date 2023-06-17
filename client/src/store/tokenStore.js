import { create } from "zustand";

export const useTokenStore = create((set) => ({
  token: null,
  setToken: (res) => set((state) => ({ token: (state.token = res) })),
}));

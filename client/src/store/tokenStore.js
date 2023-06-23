import { fetchData } from "../api/utils/fetch";
import { create } from "zustand";

export const useTokenStore = create((set) => ({
  token: null,
  username: null,
  isLoggedIn: false,
  setLogin: () => set((state) => ({ isLoggedIn: (state.isLoggedIn = true) })),
  setToken: async () => {
    const token = await fetchData("/refresh", "get");
    set({ token });
  },
  setUsername: (username) => set({ username }),
  removeToken: () => set({ token: null, username: null, isLoggedIn: false }),
}));

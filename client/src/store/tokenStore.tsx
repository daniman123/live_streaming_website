import { fetchData } from "../api/utils/fetch";
import { create } from "zustand";

interface tokenStore {
  name: string;
  accessToken: string;
}

export interface TokenStoreState {
  token: tokenStore | null;
  username: string | null;
  isLoggedIn: boolean;
  setLogin: () => void;
  setToken: () => Promise<void>;
  setUsername: (username: string) => void;
  removeToken: () => void;
}

export const useTokenStore = create<TokenStoreState>((set) => ({
  token: null,
  username: null,
  isLoggedIn: false,
  setLogin: () => set((state) => ({ ...state, isLoggedIn: true })),
  setToken: async () => {
    const token = await fetchData("/refresh", "get");
    set((state) => ({ ...state, token }));
  },
  setUsername: (username) => set((state) => ({ ...state, username })),
  removeToken: () => set({ token: null, username: null, isLoggedIn: false }),
}));

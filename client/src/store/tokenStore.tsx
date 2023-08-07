import { fetchData } from "../api/utils/fetch";
import { create } from "zustand";

export interface tokenStore {
  name: string;
  accessToken: string;
}

export interface TokenStoreState {
  token: string | null;
  username: string | null;
  isLoggedIn: boolean;
  setLogin: () => void;
  setToken: (token?: string) => Promise<void>;
  setUsername: (username: string) => void;
  removeToken: () => void;
}

export const useTokenStore = create<TokenStoreState>((set) => ({
  token: null,
  username: null,
  isLoggedIn: false,
  setLogin: () => set((state) => ({ ...state, isLoggedIn: true })),
  setToken: async (token?: string) => {
    if (token == null) {
      token = await fetchData("/user/protected", "get");
      console.log("🚀 ~ file: tokenStore copy.tsx:27 ~ setToken: ~ token:", token)
    }
    set((state) => ({ ...state, token }));
  },
  setUsername: (username) => set((state) => ({ ...state, username })),
  removeToken: () => set({ token: null, username: null, isLoggedIn: false }),
}));

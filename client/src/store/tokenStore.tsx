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
  userId: number;
  setLogin: () => void;
  setToken: (token?: string) => Promise<void>;
  setUsername: (username: string) => void;
  setUserId: (userId: number) => void;
  removeToken: () => void;
}

export const useTokenStore = create<TokenStoreState>((set) => ({
  token: null,
  username: null,
  userId: 0,
  isLoggedIn: false,
  setLogin: () => set((state) => ({ ...state, isLoggedIn: true })),
  setToken: async (token?: string) => {
      const response = await fetchData("/user/protected", "get");
    set((state) => ({ ...state, token:response,  userId:response.id, username:response.username }));
  },
  setUsername: (username) => set((state) => ({ ...state, username })),
  setUserId: (userId) => set((state) => ({ ...state, userId})),
  removeToken: () => set({ userId: 0,  username: null, isLoggedIn: false }),
}));

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
  setToken: (token:string) => void;
  // setToken: () => Promise<void>;
  setUsername: (username: string) => void;
  removeToken: () => void;
}

export const useTokenStore = create<TokenStoreState>((set) => ({
  token: null,
  username: null,
  isLoggedIn: false,
  setLogin: () => set((state) => ({ ...state, isLoggedIn: true })),
  // setToken: async () => {
    
  //   set((state) => ({ ...state, token }));
  // },
  setToken: (token:string) => set((state) => ({ ...state, token })),
  setUsername: (username) => set((state) => ({ ...state, username })),
  removeToken: () => set({ token: null, username: null, isLoggedIn: false }),
}));

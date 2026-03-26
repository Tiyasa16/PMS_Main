// store/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  token: null,

  setUser: (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);

    set({ user: userData, token });
  },

  loadUser: () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (storedUser && token) {
      set({ user: storedUser, token });
    }
  },

  logout: () => {
    localStorage.clear();
    set({ user: null, token: null });
  },
}));
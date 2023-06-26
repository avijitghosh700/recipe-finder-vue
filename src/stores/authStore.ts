import { defineStore } from "pinia";

import { type User } from "firebase/auth";

import type { User as UserModel, AuthState } from "@/shared/models/user.mode";

export const useAuthStore = defineStore("auth", {
  state: () => {
    if (localStorage.getItem("auth"))
      return JSON.parse(<string>localStorage.getItem("auth"));

    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isOAuthLoading: false,
    } as AuthState;
  },

  getters: {
    getState: (state: AuthState) => state,

    getIsAuthenticated: (state: AuthState) => state.isAuthenticated,
    getIsLoading: (state: AuthState) => state.isLoading,
    getIsOAuthLoading: (state: AuthState) => state.isOAuthLoading,

    getToken: (state: AuthState) =>
      state.user && (state.user as UserModel).token,
    getAvatar: (state: AuthState) =>
      state.user && (state.user as UserModel).avatar,
    getEmail: (state: AuthState) =>
      state.user && (state.user as UserModel).email,
    getName: (state: AuthState) => state.user && (state.user as UserModel).name,

    getUser: (state: AuthState) => state.user,
  },

  actions: {
    async addUser(user: User) {
      this.user = {
        token: await user.getIdToken(),
        name: user.displayName || "",
        avatar: user.photoURL || "",
        email: user.email || "",
      };

      this.user.token && this.setAuthenticated();
    },

    setLoading(isLoading: boolean) {
      this.isLoading = isLoading;
    },

    setOAuthLoading(isOAuthLoading: boolean) {
      this.isOAuthLoading = isOAuthLoading;
    },

    setAuthenticated() {
      this.isLoading = false;
      this.isOAuthLoading = false;
      this.isAuthenticated = true;
    },

    setUnauthenticated() {
      this.isLoading = false;
      this.isOAuthLoading = false;
      this.isAuthenticated = false;
      this.user = null;
    },
  },
});

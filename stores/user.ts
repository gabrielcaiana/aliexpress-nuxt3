import { defineStore } from "pinia";

interface State {
  isMenuOverlay: boolean;
  isLoading: boolean;
  cart: unknown[];
  checkout: unknown[];
}

export const useUserStore = defineStore("user", {
  state: (): State => ({
    isMenuOverlay: false,
    isLoading: false,
    cart: [],
    checkout: [],
  }),
  persist: true,
});

import { defineStore } from "pinia";
import { Product } from "~/types/product";

interface State {
  isMenuOverlay: boolean;
  isLoading: boolean;
  cart: Product[];
  checkout: any[];
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

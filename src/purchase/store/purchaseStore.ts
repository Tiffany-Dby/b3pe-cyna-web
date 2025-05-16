import { create } from "zustand";
import { Cart, PurchaseState } from "../types/Purchase";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";
import { toast } from "sonner";

const usePurchaseStore = create<PurchaseState>((set) => ({
  cart: null,
  isLoading: false,
  error: null,

  getCart: async () => {
    set({ isLoading: true });

    const { result, error } = await getRequest<Cart>(API_ROUTES.CART_GET);

    set({ isLoading: false, error, cart: error ? null : result });
  },

  addToCart: async (productId, quantity) => {
    set({ isLoading: true });

    const promise = postRequest<Cart, { productId: number; quantity: number }>(
      API_ROUTES.CART_NEW_ITEM,
      {
        productId,
        quantity,
      }
    );

    toast.promise(promise, {
      loading: "Ajout au panier en cours...",
      success: "Produit ajouté au panier !",
      error: () => "Une erreur est survenue",
    });

    const { result, error } = await promise;

    set((state) => ({
      isLoading: false,
      error,
      cart: error ? state.cart : result,
    }));
  },

  updateCartItem: async (productId, quantity) => {
    set({ isLoading: true });

    const { result, error } = await putRequest<
      any,
      { productId: number; quantity: number }
    >(API_ROUTES.CART_UPDATE_ITEM, { productId, quantity });

    set((state) => ({
      isLoading: false,
      error,
      cart: error ? state.cart : result,
    }));
  },

  removeCartItem: async (itemId) => {
    set({ isLoading: true });

    const { error } = await deleteRequest<Cart>(
      `${API_ROUTES.CART_DELETE_ITEM}/${itemId}`
    );

    set((state) => ({
      isLoading: false,
      error,
      cart: error
        ? state.cart
        : state.cart
        ? {
            ...state.cart,
            items: state.cart.items.filter((i) => i.id !== itemId),
          }
        : null,
    }));
  },
}));

export { usePurchaseStore };

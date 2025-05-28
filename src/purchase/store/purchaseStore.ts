import { create } from "zustand";
import {
  Cart,
  CartToUpdate,
  NewCartItem,
  PurchaseState,
  UpdateCartItem,
} from "@/purchase/types/Purchase";
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";
import { toast } from "sonner";
import { TOAST } from "@/shared/constants/toast";

const usePurchaseStore = create<PurchaseState>((set) => ({
  cart: null,
  isLoading: false,
  isUpdating: false,
  error: null,

  getCart: async () => {
    set({ isLoading: true });

    const { result, error } = await getRequest<Cart>(API_ROUTES.CART_GET);

    set({ isLoading: false, error, cart: error ? null : result });
  },

  addToCart: async (newItem, toasMsgs = TOAST.DEFAULT_MSGS) => {
    const { success, loading, error } = toasMsgs;

    set({ isLoading: true });

    const toastId = toast.loading(loading);
    const { result, error: reqError } = await postRequest<Cart, NewCartItem>(
      API_ROUTES.CART_NEW_ITEM,
      {
        productId: newItem.productId,
        quantity: newItem.quantity,
        recurring: newItem.recurring,
      }
    );

    set({ isLoading: false });

    if (reqError) toast.error(error, { id: toastId });
    else toast.success(success, { id: toastId });

    set((state) => ({
      isLoading: false,
      error: reqError,
      cart: reqError ? state.cart : result,
    }));
  },

  updateCart: async (cart) => {
    set({ isLoading: true });

    const { result, error } = await putRequest<Cart, CartToUpdate>(
      API_ROUTES.CART_UPDATE,
      {
        orderId: cart.orderId,
        status: cart.status,
        shippingAddressId: cart.shippingAddressId,
        billingAddressId: cart.billingAddressId,
      }
    );

    set((state) => ({
      isLoading: false,
      error,
      cart: error ? state.cart : result,
    }));
  },

  updateCartItem: async (item) => {
    set({ isUpdating: true });

    const { result, error } = await putRequest<Cart, UpdateCartItem>(
      API_ROUTES.CART_UPDATE_ITEM,
      {
        productId: item.productId,
        quantity: item.quantity,
        recurring: item.recurring,
      }
    );

    set((state) => ({
      isUpdating: false,
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

  emptyCart: () => {
    set((state) => ({
      cart: state.cart ? { ...state.cart, items: [] } : null,
    }));
  },
}));

export { usePurchaseStore };

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  Cart,
  CartToUpdate,
  GuestCartItem,
  NewCartItem,
  OrderStatus,
  PurchaseState,
  UpdateCartItem,
} from "@/purchase/types/Purchase";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";
import { toast } from "sonner";
import { TOAST } from "@/shared/constants/toast";
import { useProductsStore } from "@/products/store/productsStore";
import { mergeCartItems } from "@/purchase/utils/cart";

/*
TODO:
  Handling guest cart + proper updates on the frontend until backend fixes
  ->>
   - Added guest logic
   - Added quantity/item merge in case of subscription type change + remove original item
   - Added quantity merge in case user adds the same product in cart
*/

const usePurchaseStore = create<PurchaseState>()(
  persist(
    (set, get) => ({
      cart: null,
      guestCart: [],
      displayedCart: [],
      isLoading: false,
      isUpdating: false,
      error: null,

      getCart: async () => {
        set({ isLoading: true });

        const { result, error } = await getRequest<Cart>(API_ROUTES.CART_GET);

        set({ isLoading: false, error, cart: error ? null : result });
      },

      addToCart: async (
        newItem,
        isAuthenticated,
        toasMsgs = TOAST.DEFAULT_MSGS
      ) => {
        const { guestCart, cart, updateCartItem } = get();
        const { success, loading, error } = toasMsgs;

        if (!isAuthenticated) {
          const guestItem = { id: crypto.randomUUID(), ...newItem };
          const mergedItems = mergeCartItems(guestCart, guestItem);

          set({ guestCart: mergedItems as GuestCartItem[] });
          toast.success(success);

          return;
        }

        const existingItem = cart?.items.find(
          (item) =>
            item.product.id === newItem.productId &&
            item.recurring === newItem.recurring
        );

        if (existingItem) {
          const newQuantity = existingItem.quantity + newItem.quantity;
          const toastId = toast.loading(loading);

          await updateCartItem(
            {
              id: existingItem.id,
              productId: newItem.productId,
              quantity: newQuantity,
              recurring: newItem.recurring,
            },
            isAuthenticated
          );
          toast.success(success, { id: toastId });

          return;
        }

        set({ isLoading: true });

        const toastId = toast.loading(loading);
        const { result, error: reqError } = await postRequest<
          Cart,
          NewCartItem
        >(API_ROUTES.CART_NEW_ITEM, newItem);

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

      updateCartItem: async (item, isAuthenticated) => {
        const { guestCart, cart } = get();

        if (!isAuthenticated) {
          const originalItem = guestCart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (!originalItem) return;

          const mergeTarget = guestCart.find(
            (cartItem) =>
              cartItem.id !== item.id &&
              cartItem.productId === item.productId &&
              cartItem.recurring === item.recurring
          );

          const updatedCart = guestCart
            .map((cartItem) => {
              if (
                cartItem.id === item.id &&
                originalItem.recurring === item.recurring
              )
                return { ...cartItem, quantity: item.quantity };

              if (
                mergeTarget &&
                cartItem.id === mergeTarget.id &&
                cartItem.productId === item.productId &&
                cartItem.recurring === item.recurring
              )
                return {
                  ...cartItem,
                  quantity: cartItem.quantity + item.quantity,
                };

              if (cartItem.id === item.id)
                return {
                  ...cartItem,
                  quantity: item.quantity,
                  recurring: item.recurring,
                };

              return cartItem;
            })
            .filter((cartItem) => !(mergeTarget && cartItem.id === item.id));

          set({ guestCart: updatedCart });

          return;
        }

        const originalLine = cart?.items.find((ci) => ci.id === item.id);
        if (!originalLine) return;

        set({ isUpdating: true });

        if (originalLine.recurring === item.recurring) {
          await putRequest<Cart, UpdateCartItem>(API_ROUTES.CART_UPDATE_ITEM, {
            id: item.id as number,
            productId: item.productId,
            quantity: item.quantity,
            recurring: item.recurring,
          });
        } else {
          const mergeTargetLine = cart?.items.find(
            (ci) =>
              ci.id !== originalLine.id &&
              ci.product.id === item.productId &&
              ci.recurring === item.recurring
          );

          if (mergeTargetLine) {
            const newQty = mergeTargetLine.quantity + item.quantity;

            await putRequest<Cart, UpdateCartItem>(
              API_ROUTES.CART_UPDATE_ITEM,
              {
                id: mergeTargetLine.id as number,
                productId: item.productId,
                quantity: newQty,
                recurring: item.recurring,
              }
            );
            await deleteRequest<Cart>(
              `${API_ROUTES.CART_DELETE_ITEM}/${originalLine.id}`
            );
          } else {
            await putRequest<Cart, UpdateCartItem>(
              API_ROUTES.CART_UPDATE_ITEM,
              {
                id: item.id as number,
                productId: item.productId,
                quantity: item.quantity,
                recurring: item.recurring,
              }
            );
          }
        }

        const { result, error } = await getRequest<Cart>(API_ROUTES.CART_GET);
        set((state) => ({
          isUpdating: false,
          error,
          cart: error ? state.cart : result,
        }));
      },

      removeCartItem: async (itemId, isAuthenticated) => {
        const { guestCart } = get();

        if (!isAuthenticated) {
          set({
            guestCart: guestCart.filter((item) => item.id !== itemId),
          });

          return;
        }

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

      emptyCart: async (orderId, status) => {
        set({ isLoading: true });

        const { error } = await patchRequest<
          Cart,
          { orderId: number; status: OrderStatus }
        >(API_ROUTES.CART_UPDATE_STATUS, { orderId, status });

        set((state) => ({
          isLoading: false,
          error,
          cart: error && state.cart ? { ...state.cart, items: [] } : null,
        }));
      },

      syncGuestCart: async (isAuthenticated) => {
        const { guestCart, cart, getCart, updateCartItem } = get();
        if (!guestCart) return;

        const serverItems = cart?.items ?? [];

        set({ isLoading: true });
        await Promise.all(
          guestCart.map((item) => {
            const existingItem = serverItems.find(
              (serverItem) =>
                serverItem.product.id === item.productId &&
                serverItem.recurring === item.recurring
            );

            if (existingItem) {
              const newQuantity = existingItem.quantity + item.quantity;

              updateCartItem(
                {
                  productId: item.productId,
                  quantity: newQuantity,
                  recurring: item.recurring,
                },
                isAuthenticated
              );
            } else {
              set({ isLoading: true });
              postRequest<Cart, NewCartItem>(API_ROUTES.CART_NEW_ITEM, item);
            }
          })
        );

        set({ guestCart: [] });
        await getCart();
        set({ isLoading: false });
      },

      getDisplayedCart: (isAuthenticated) => {
        const { cart, guestCart } = get();

        if (isAuthenticated) {
          return cart?.items ?? [];
        }

        const products = useProductsStore.getState().productsLocale;

        return guestCart
          .map(({ id, productId, quantity, recurring }) => {
            const product = products.find(
              (product) => product.id === productId
            );
            if (!product) return null;

            return {
              id,
              quantity,
              recurring,
              product,
            };
          })
          .filter((item) => item !== null);
      },
    }),
    {
      name: "guest-cart",
      partialize: (state) => ({ guestCart: state.guestCart }),
    }
  )
);

export { usePurchaseStore };

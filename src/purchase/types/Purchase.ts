import { Product } from "@/products/types/Products";
import { ToastMsgs } from "@/shared/types/Toast";
import { Address } from "@/users/types/Address";

enum OrderStatus {
  cart = 0,
  pending = 1,
  failed = 2,
  cancelled = 3,
  refunded = 4,
  succeeded = 5,
}

enum Recurring {
  monthly = 1,
  yearly = 2,
}

type CartItem = {
  id: number;
  quantity: number;
  recurring: Recurring;
  product: Omit<Product, "details">;
};

type GuestCartItem = {
  id: string;
  productId: number;
  quantity: number;
  recurring: Recurring;
};

type GuestCartDisplayItem = Omit<CartItem, "id"> & {
  id: string;
};

type NewCartItem = {
  productId: number;
  quantity: number;
  recurring: Recurring;
};

type UpdateCartItem = NewCartItem & { id: number };

type Cart = {
  id: number;
  billingAddress: Address | null;
  shippingAddress: Address | null;
  status: number;
  items: CartItem[];
};

type CartToUpdate = {
  orderId: number;
  status: number;
  shippingAddressId: number;
  billingAddressId: number;
};

type NewIntent = {
  intentId: string;
  clientSecret: string;
};

type PaymentMethod = {
  id: number;
  name: string;
  stripeCode: string;
};

type PurchaseState = {
  cart: Cart | null;
  guestCart: GuestCartItem[];
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  getCart: () => Promise<void>;
  addToCart: (
    newItem: NewCartItem,
    isAuthenticated: boolean,
    toasMsgs?: ToastMsgs
  ) => Promise<void>;
  updateCart: (cart: CartToUpdate) => Promise<void>;
  updateCartItem: (
    item: {
      id?: string | number;
      productId: number;
      quantity: number;
      recurring: Recurring;
    },
    isAuthenticated: boolean
  ) => Promise<void>;
  removeCartItem: (
    itemId: number | string,
    isAuthenticated: boolean
  ) => Promise<void>;
  emptyCart: (orderId: number, status: OrderStatus) => Promise<void>;
  syncGuestCart: (isAuthenticated: boolean) => Promise<void>;
  getDisplayedCart: (
    isAuthenticated: boolean
  ) => (CartItem | GuestCartDisplayItem)[];
};

export type {
  Cart,
  CartItem,
  NewCartItem,
  UpdateCartItem,
  CartToUpdate,
  NewIntent,
  PaymentMethod,
  GuestCartItem,
  GuestCartDisplayItem,
  PurchaseState,
};
export { OrderStatus, Recurring };

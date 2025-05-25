import { Product } from "@/products/types/Products";
import { ToastMsgs } from "@/shared/types/Toast";
import { Address } from "@/users/types/Address";

enum Recurring {
  once = 0,
  monthly = 1,
  yearly = 2,
}

type CartItem = {
  id: number;
  quantity: number;
  recurring: Recurring;
  product: Omit<Product, "details">;
};

type NewCartItem = {
  productId: number;
  quantity: number;
  recurring: Recurring;
};

type UpdateCartItem = NewCartItem;

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

type PurchaseState = {
  cart: Cart | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;
  getCart: () => Promise<void>;
  addToCart: (newItem: NewCartItem, toasMsgs: ToastMsgs) => Promise<void>;
  updateCart: (cart: CartToUpdate) => Promise<void>;
  updateCartItem: (item: UpdateCartItem) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
};

export type {
  Cart,
  CartItem,
  NewCartItem,
  UpdateCartItem,
  CartToUpdate,
  PurchaseState,
};
export { Recurring };

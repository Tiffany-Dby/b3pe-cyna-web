import { Product } from "@/products/types/Products";

type CartItem = {
  id: number;
  quantity: number;
  product: Omit<Product, "details">;
};

type Cart = {
  id: number;
  billingAddress: null;
  shippingAddress: null;
  status: number;
  items: CartItem[];
};

type PurchaseState = {
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;
  getCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (productId: number, quantity: number) => Promise<void>;
  removeCartItem: (itemId: number) => Promise<void>;
};

export type { Cart, CartItem, PurchaseState };

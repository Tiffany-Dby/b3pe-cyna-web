import { NewCartItem } from "@/purchase/types/Purchase";

const mergeCartItems = (cartItems: NewCartItem[], newCartItem: NewCartItem) => {
  const existingItem = cartItems.find(
    (item) =>
      item.productId === newCartItem.productId &&
      item.recurring === newCartItem.recurring
  );

  return existingItem
    ? cartItems.map((item) =>
        item.productId === newCartItem.productId &&
        item.recurring === newCartItem.recurring
          ? { ...item, quantity: item.quantity + newCartItem.quantity }
          : item
      )
    : [...cartItems, newCartItem];
};

export { mergeCartItems };

import { create } from "zustand";
import { Product, ProductsState } from "@/products/types/Products";
import { API_ROUTES } from "@/shared/constants/routes";
import { getRequest } from "@/shared/tools/api";

const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  selected: null,
  isLoading: false,
  error: null,

  getProducts: async () => {
    set({ isLoading: true });

    const { result, error } = await getRequest<Product[]>(
      API_ROUTES.PRODUCT_GET_ALL,
      false
    );

    set({
      isLoading: false,
      error,
      products: result?.map((product) => ({ ...product })) ?? [],
    });
  },

  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),

  addTranslation: (translation) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === translation.productId
          ? {
              ...product,
              details: [...product.details, translation],
            }
          : product
      ),
    })),

  setSelected: (product) => set(() => ({ selected: { ...product } })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id
          ? { ...updatedProduct, details: [...product.details] }
          : product
      ),
    })),

  updateImage: (updatedProduct, slot) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id
          ? {
              ...product,
              slides: product.slides.map((slide, index) =>
                index === slot ? updatedProduct.slides[slot] : slide
              ),
            }
          : product
      ),
    })),

  updateSelected: (updatedProduct) =>
    set(() => ({ selected: { ...updatedProduct } })),
}));

export { useProductsStore };

import { create } from "zustand";
import {
  Product,
  ProductLocale,
  ProductsState,
} from "@/products/types/Products";
import { API_ROUTES } from "@/shared/constants/routes";
import { deleteRequest, getRequest } from "@/shared/tools/api";

const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  productsLocale: [],
  productLocale: null,
  selected: null,
  selectedTranslation: null,
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

  getProductsLocale: async (locale) => {
    set({ isLoading: true });

    const { result, error } = await getRequest<ProductLocale[]>(
      `${API_ROUTES.PRODUCT_GET_ALL}/${locale}`,
      false
    );

    set({
      isLoading: false,
      error,
      productsLocale: result.map((product) => ({ ...product })),
    });
  },

  getProductByIdAndLocale: async (id, locale) => {
    set({ isLoading: true });

    const { result, error } = await getRequest<ProductLocale>(
      `${API_ROUTES.PRODUCT_GET}/${id}/${locale}`,
      false
    );

    console.log("result", result);
    console.log("error", error);

    set({
      isLoading: false,
      error,
      productLocale: result,
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

  setSelectedTranslation: (translation) =>
    set(() => ({ selectedTranslation: { ...translation } })),

  updateProduct: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id
          ? { ...updatedProduct, details: [...product.details] }
          : product
      ),
    })),

  updateProductTranslation: (updatedTranslation) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedTranslation.productId
          ? {
              ...product,
              details: product.details.map((translation) =>
                translation.id === updatedTranslation.id
                  ? { ...updatedTranslation }
                  : translation
              ),
            }
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

  updateSelectedTranslation: (updateTranslation) =>
    set(() => ({ selectedTranslation: { ...updateTranslation } })),

  deleteProduct: async (selected) => {
    set({ isLoading: true });

    const { error } = await deleteRequest<[]>(
      `${API_ROUTES.PRODUCT_DELETE}/${selected.id}`
    );

    set((state) => ({
      isLoading: false,
      error,
      products: error
        ? state.products
        : state.products.filter((product) => product.id !== selected.id),
    }));
  },

  deleteProductTranslation: async (translation) => {
    set({ isLoading: true });

    const { error } = await deleteRequest<[]>(
      `${API_ROUTES.PRODUCT_DELETE_TRANSLATION}/${translation.id}`
    );

    set((state) => ({
      isLoading: false,
      error,
      products: error
        ? state.products
        : state.products.map((product) =>
            product.id === translation.productId
              ? {
                  ...product,
                  details: product.details.filter(
                    (detail) => detail.id !== translation.id
                  ),
                }
              : product
          ),
    }));
  },
}));

export { useProductsStore };

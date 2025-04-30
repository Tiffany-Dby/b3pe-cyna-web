import { create } from "zustand";
import { CategoriesState, CategoryGlobal } from "@/categories/types/Categories";
import { getRequest } from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";

const useCategoriesStore = create<CategoriesState>((set) => ({
  categories: [],
  isLoading: false,
  error: null,

  getCategories: async (token) => {
    set({ isLoading: true });

    const { result, error } = await getRequest<CategoryGlobal[]>(
      API_ROUTES.CATEGORY_GET_ALL,
      token
    );

    set({ isLoading: false, error, categories: result ?? [] });
  },

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),
}));

export { useCategoriesStore };

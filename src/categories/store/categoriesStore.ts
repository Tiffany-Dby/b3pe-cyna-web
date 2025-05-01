import { create } from "zustand";
import {
  ApiCategory,
  CategoriesState,
  NewLocale,
} from "@/categories/types/Categories";
import { getRequest } from "@/shared/tools/api";
import { API_ROUTES } from "@/shared/constants/routes";

const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  getCategories: async (token) => {
    set({ isLoading: true });

    const { result, error } = await getRequest<ApiCategory[]>(
      API_ROUTES.CATEGORY_GET_ALL,
      token
    );

    set({ isLoading: false, error, categories: result ?? [] });
  },

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),

  addLocale: (newLocale: NewLocale) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === newLocale.id
          ? {
              ...category,
              locales: [
                ...category.locales,
                { locale: newLocale.locale, name: newLocale.name },
              ],
            }
          : category
      ),
    })),

  flatCategories: () =>
    get().categories.flatMap((category) =>
      category.locales.map((locale) => ({
        id: category.id,
        globalName: category.global_name,
        locale: locale.locale,
        name: locale.name,
      }))
    ),
}));

export { useCategoriesStore };

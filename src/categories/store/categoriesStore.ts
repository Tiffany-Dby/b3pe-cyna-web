import { create } from "zustand";
import { Category, CategoriesState } from "@/categories/types/Categories";
import { API_ROUTES } from "@/shared/constants/routes";
import { deleteRequest, getRequest } from "@/shared/tools/api";

const useCategoriesStore = create<CategoriesState>((set, get) => ({
  categories: [],
  isLoading: false,
  error: null,

  getCategories: async () => {
    set({ isLoading: true });

    const { result, error } = await getRequest<Category[]>(
      API_ROUTES.CATEGORY_GET_ALL
    );

    set({
      isLoading: false,
      error,
      categories: result?.map((category) => ({ ...category })) ?? [],
    });
  },

  flatCategories: () =>
    get().categories.flatMap((category) =>
      category.locales.map((locale) => ({
        id: locale.id,
        globalId: category.id,
        globalName: category.globalName,
        locale: locale.locale,
        name: locale.name,
      }))
    ),

  addCategory: (category) =>
    set((state) => ({ categories: [...state.categories, category] })),

  addLocale: (newLocale) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === newLocale.id
          ? {
              ...category,
              locales: [
                ...category.locales,
                {
                  id: newLocale.localeId,
                  locale: newLocale.locale,
                  name: newLocale.localeName,
                },
              ],
            }
          : category
      ),
    })),

  updateCategoryLocale: (updatedLocale, globalId) => {
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === globalId
          ? {
              ...category,
              locales: category.locales.map((locale) =>
                locale.id === updatedLocale.id ? updatedLocale : locale
              ),
            }
          : category
      ),
    }));
  },

  deleteCategory: async () => {
    set({ isLoading: true });

    const { result, error } = await deleteRequest<[]>(
      API_ROUTES.CATEGORY_DELETE
    );

    set({ isLoading: false, error, categories: result ?? [] });
  },

  deleteCategoryLocale: async (category) => {
    set({ isLoading: true });

    const { error } = await deleteRequest<[]>(
      `${API_ROUTES.CATEGORY_DELETE_LOCALE}/${category.id}`
    );

    set((state) => ({
      isLoading: false,
      error,
      categories: error
        ? state.categories
        : state.categories.map((cat) =>
            cat.id === category.globalId
              ? {
                  ...cat,
                  locales: cat.locales.filter(
                    (locale) => locale.id !== category.id
                  ),
                }
              : cat
          ),
    }));
  },
}));

export { useCategoriesStore };

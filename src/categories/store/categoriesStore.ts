import { create } from "zustand";
import { Category, CategoriesState } from "@/categories/types/Categories";
import { API_ROUTES } from "@/shared/constants/routes";
import { deleteRequest, getRequest } from "@/shared/tools/api";
import { toast } from "sonner";
import { TOAST } from "@/shared/constants/toast";

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
      categories: error ? [] : result,
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

  deleteCategory: async (toasMsgs) => {
    const { success, loading, error } = toasMsgs;

    set({ isLoading: true });

    const toastId = toast.loading(loading);
    const { result, error: reqError } = await deleteRequest<[]>(
      API_ROUTES.CATEGORY_DELETE
    );

    set({ isLoading: false });

    if (reqError) toast.error(error, { id: toastId });
    else toast.success(success, { id: toastId });

    set({ error: reqError, categories: result ?? [] });
  },

  deleteCategoryLocale: async (category, toasMsgs = TOAST.DEFAULT_MSGS) => {
    const { success, loading, error } = toasMsgs;

    set({ isLoading: true });

    const toastId = toast.loading(loading);
    const { error: reqError } = await deleteRequest<[]>(
      `${API_ROUTES.CATEGORY_DELETE_LOCALE}/${category.id}`
    );

    set({ isLoading: false });

    if (reqError) toast.error(error, { id: toastId });
    else toast.success(success, { id: toastId });

    set((state) => ({
      error: reqError,
      categories: reqError
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

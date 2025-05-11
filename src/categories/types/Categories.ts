type NewCategory = {
  id: number;
  globalName: string;
  localeId: number;
  locale: string;
  localeName: string;
};

type Category = {
  id: number;
  globalName: string;
  locales: Locale[];
};

type Locale = {
  id: number;
  locale: string;
  name: string;
};

type LocaleCategory = {
  id: number;
  globalId: number;
  globalName: string;
  locale: string;
  name: string;
};

type NewLocale = {
  id: number;
  globalName: string;
  localeId: number;
  locale: string;
  localeName: string;
};

type UpdatedLocale = Locale;

type CategoriesState = {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  getCategories: () => Promise<void>;
  flatCategories: () => LocaleCategory[];
  addCategory: (category: Category) => void;
  addLocale: (newLocale: NewLocale) => void;
  updateCategoryLocale: (
    updatedLocale: UpdatedLocale,
    globalId: Category["id"]
  ) => void;
  deleteCategory: () => Promise<void>;
  deleteCategoryLocale: (category: LocaleCategory) => Promise<void>;
};

export type {
  NewCategory,
  Category,
  Locale,
  LocaleCategory,
  NewLocale,
  UpdatedLocale,
  CategoriesState,
};

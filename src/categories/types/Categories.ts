type ApiCategory = {
  id: number;
  global_name: string;
  locales: Locale[];
};

type Locale = {
  locale: string;
  name: string;
};

type LocaleCategory = {
  id: number;
  globalName: string;
  locale: string;
  name: string;
};

type NewLocale = Locale & {
  id: number;
};

type CategoriesState = {
  categories: ApiCategory[];
  isLoading: boolean;
  error: string | null;
  getCategories: (token?: string) => Promise<void>;
  addCategory: (category: ApiCategory) => void;
  addLocale: (newLocale: NewLocale) => void;
  flatCategories: () => LocaleCategory[];
};

export type { ApiCategory, Locale, LocaleCategory, NewLocale, CategoriesState };

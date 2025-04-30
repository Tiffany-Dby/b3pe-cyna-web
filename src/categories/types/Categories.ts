type CategoryGlobal = {
  id: number;
  global_name: string;
};

type CategoriesState = {
  categories: CategoryGlobal[];
  isLoading: boolean;
  error: string | null;
  getCategories: (token?: string) => Promise<void>;
  addCategory: (category: CategoryGlobal) => void;
};

export type { CategoryGlobal, CategoriesState };

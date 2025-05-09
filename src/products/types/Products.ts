import { NewCategory } from "@/categories/types/Categories";
import { ProductType } from "./ProductType";
import { ProductStatus } from "./ProductStatus";

type Product = {
  id: number;
  category: NewCategory;
  name: string;
  type: ProductType;
  price: number;
  status: ProductStatus;
  discountOrder: number;
  discountPercentage: number;
  slides: string[];
  details: Detail[];
};

type Detail = {
  id: number;
  productId: number;
  locale: string;
  descriptionTitle: string;
  descriptionText: string;
  benefits: Benefit[];
  functionalities: Functionality[];
  specifications: Specification[];
};

type Benefit = {
  criteria: string;
  description: string;
};

type Specification = {
  title: string;
  description: string;
};

type Functionality = {
  value: string;
};

type NewDetail = Detail;

type Slot = 1 | 2 | 3;

type ProductsState = {
  products: Product[];
  selected: Product | null;
  isLoading: boolean;
  error: string | null;
  getProducts: (token?: string) => Promise<void>;
  addProduct: (product: Product) => void;
  addTranslation: (translation: NewDetail) => void;
  setSelected: (product: Product) => void;
  updateProduct: (product: Product) => void;
  updateImage: (product: Product, slot: Slot) => void;
  updateSelected: (product: Product) => void;
};

export type { Product, ProductsState, Detail, NewDetail, Slot };

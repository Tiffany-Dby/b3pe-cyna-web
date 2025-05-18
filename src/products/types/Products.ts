import { NewCategory } from "@/categories/types/Categories";
import { ProductType } from "@/products/types/ProductType";
import { ProductStatus } from "@/products/types/ProductStatus";
import { ToastMsgs } from "@/shared/types/Toast";

type Product = {
  id: number;
  category: NewCategory;
  name: string;
  type: ProductType;
  price: number;
  basePrice: number;
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
  title: string;
  description: string;
};

type Specification = {
  criteria: string;
  description: string;
};

type Functionality = {
  value: string;
};

type NewDetail = Detail;
type UpdatedDetail = Detail;

type Slot = 1 | 2 | 3;

type ProductLocale = Omit<Product, "details"> & {
  details: Detail;
};

type ProductsState = {
  products: Product[];
  productsLocale: ProductLocale[];
  productLocale: ProductLocale | null;
  selected: Product | null;
  selectedTranslation: Detail | null;
  isLoading: boolean;
  error: string | null;
  getProducts: () => Promise<void>;
  getProductsLocale: (locale: string) => Promise<void>;
  getProductByIdAndLocale: (id: number, locale: string) => Promise<void>;
  addProduct: (product: Product) => void;
  addTranslation: (translation: NewDetail) => void;
  setSelected: (product: Product) => void;
  setSelectedTranslation: (translation: Detail) => void;
  updateProduct: (product: Product) => void;
  updateProductTranslation: (translation: UpdatedDetail) => void;
  updateImage: (product: Product, slot: Slot) => void;
  updateSelected: (product: Product) => void;
  updateSelectedTranslation: (translation: NewDetail) => void;
  deleteProduct: (product: Product, toastMsgs: ToastMsgs) => Promise<void>;
  deleteProductTranslation: (
    translation: Detail,
    toasMsgs: ToastMsgs
  ) => Promise<void>;
};

export type {
  Product,
  ProductsState,
  Detail,
  NewDetail,
  Slot,
  ProductLocale,
  UpdatedDetail,
};

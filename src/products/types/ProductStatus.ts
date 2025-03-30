import { ProductType } from "@/products/types/ProductType";

enum ProductStatus {
  Unavailable = 0,
  Available = 1,
  Maintenance = 2,
}

type ProductStatusMap = Record<
  ProductStatus,
  { label: (type?: ProductType) => string; color: string }
>;

export type { ProductStatusMap };
export { ProductStatus };

import {
  ProductStatus,
  ProductStatusMap,
} from "@/products/types/ProductStatus";
import { ProductType } from "../types/ProductType";

const PRODUCT_STATUS: ProductStatusMap = {
  [ProductStatus.Unavailable]: {
    label: (type) =>
      type === ProductType.Digital ? "status.unavailable" : "status.outOfStock",
    color: "bg-destructive",
  },
  [ProductStatus.Available]: {
    label: () => "status.available",
    color: "bg-success",
  },
  [ProductStatus.Maintenance]: {
    label: () => "status.maintenance",
    color: "bg-warning",
  },
};

export { PRODUCT_STATUS };

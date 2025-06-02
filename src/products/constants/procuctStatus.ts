import {
  ProductStatus,
  ProductStatusMap,
} from "@/products/types/ProductStatus";
import { ProductType } from "@/products/types/ProductType";

const STATUS: ProductStatusMap = {
  [ProductStatus.Unavailable]: {
    label: (type) =>
      type === ProductType.Digital ? "status.unavailable" : "status.outOfStock",
    color: "bg-danger/5 border-danger text-danger",
  },
  [ProductStatus.Available]: {
    label: () => "status.available",
    color: "bg-success/5 border-success text-success",
  },
  [ProductStatus.Maintenance]: {
    label: () => "status.maintenance",
    color:
      "bg-accent/5 border-accent text-accent dark:bg-warning/5 dark:border-warning dark:text-warning",
  },
};

const PRODUCT = {
  STATUS,
};

export { PRODUCT };

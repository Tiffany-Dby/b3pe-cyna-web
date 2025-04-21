import {
  ProductStatus,
  ProductStatusMap,
} from "@/products/types/ProductStatus";
import { ProductType } from "../types/ProductType";

const PRODUCT_STATUS: ProductStatusMap = {
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
    color: "bg-warning/5 border-warning text-warning",
  },
};

export { PRODUCT_STATUS };

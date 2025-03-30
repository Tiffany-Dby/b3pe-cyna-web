import {
  ProductStatus,
  ProductStatusMap,
} from "@/products/types/ProductStatus";
import { ProductType } from "../types/ProductType";

const PRODUCT_STATUS: ProductStatusMap = {
  [ProductStatus.Unavailable]: {
    label: (type) =>
      type === ProductType.Digital ? "Indisponible" : "Rupture de stock",
    color: "bg-destructive",
  },
  [ProductStatus.Available]: {
    label: () => "Disponible",
    color: "bg-success",
  },
  [ProductStatus.Maintenance]: {
    label: () => "Maintenance",
    color: "bg-warning",
  },
};

export { PRODUCT_STATUS };

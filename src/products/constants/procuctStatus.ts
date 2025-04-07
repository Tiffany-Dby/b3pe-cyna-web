import {
  ProductStatus,
  ProductStatusMap,
} from "@/products/types/ProductStatus";
import { ProductType } from "../types/ProductType";

const PRODUCT_STATUS: ProductStatusMap = {
  [ProductStatus.Unavailable]: {
    label: (type) =>
      type === ProductType.Digital ? "Indisponible" : "Rupture de stock",
    color: "bg-danger/5 border-danger text-danger",
  },
  [ProductStatus.Available]: {
    label: () => "Disponible",
    color: "bg-success/5 border-success text-success",
  },
  [ProductStatus.Maintenance]: {
    label: () => "Maintenance",
    color: "bg-warning/5 border-warning text-warning",
  },
};

export { PRODUCT_STATUS };

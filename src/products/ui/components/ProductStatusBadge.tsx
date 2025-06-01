import { PRODUCT_STATUS } from "@/products/constants/procuctStatus";
import { ProductStatus } from "@/products/types/ProductStatus";
import { ProductType } from "@/products/types/ProductType";
import { useTranslation } from "react-i18next";

type Props = {
  status: ProductStatus;
  type: ProductType;
};

const ProductStatusBadge = ({ status, type }: Props) => {
  const { t } = useTranslation("products");
  const currentStatus = PRODUCT_STATUS[status];

  return (
    <div
      className={`flex-center-center w-fit h-5.5 px-2 border rounded-full font-medium text-size-label ${currentStatus.color}`}
    >
      <p>{t(currentStatus.label(type))}</p>
    </div>
  );
};

export default ProductStatusBadge;

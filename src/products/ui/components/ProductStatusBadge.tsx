import { PRODUCT_STATUS } from "@/products/constants/procuctStatus";
import { ProductStatus } from "@/products/types/ProductStatus";
import { ProductType } from "@/products/types/ProductType";

type ProductStatusBadgeProps = {
  status: ProductStatus;
  type: ProductType;
};

const ProductStatusBadge = ({ status, type }: ProductStatusBadgeProps) => {
  const currentStatus = PRODUCT_STATUS[status];

  return (
    <div
      className={`flex-center-center w-fit h-5.5 px-2 border rounded-full font-light text-size-label ${currentStatus.color}`}
    >
      <p>{currentStatus.label(type)}</p>
    </div>
  );
};

export default ProductStatusBadge;

/*
<div className="flex-center-center gap-2 w-fit">
  <p>{currentStatus.label(type)}</p>
  <span
    className={`block w-2 h-2 rounded-full mt-0.5 ${currentStatus.color}`}
  ></span>
</div>
*/

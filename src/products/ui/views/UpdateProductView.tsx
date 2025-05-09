import UpdateProductCard from "@/products/ui/components/UpdateProductCard";
import { APP_ROUTES } from "@/shared/constants/routes";
import { CornerUpLeftIcon } from "lucide-react";
import { Link } from "react-router";

const UpdateProductView = () => {
  return (
    <div className="flex flex-col gap-8 max-w-xl w-full mx-auto">
      <div className="w-fit hover:underline">
        <Link
          to={APP_ROUTES.ADMIN + "/" + APP_ROUTES.ADMIN_PRODUCTS}
          className="flex-center-center gap-2"
        >
          <CornerUpLeftIcon className="w-4 h-4" /> Revenir aux produits
        </Link>
      </div>
      <UpdateProductCard />
    </div>
  );
};

export default UpdateProductView;

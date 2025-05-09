import { useProductsStore } from "@/products/store/productsStore";
import BaseCard from "@/shared/ui/components/BaseCard";
import DataTable from "@/shared/ui/components/DataTable";
import Columns from "@/products/ui/components/Columns";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/shared/hooks/useDialog";
import { Product } from "@/products/types/Products";
import DeleteProductDialog from "./DeleteProductDialog";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";

const ProductsList = () => {
  const { t, i18n } = useTranslation("products");
  const { products, error, setSelected } = useProductsStore();
  const { dialog, open, close } = useDialog<Product>();
  const navigate = useNavigate();

  const handleNavigate = (item: Product) => {
    setSelected(item);
    navigate(`${APP_ROUTES.ADMIN}/${APP_ROUTES.ADMIN_PRODUCTS}/${item.id}`);
  };

  const columns = useMemo(
    () =>
      Columns(
        (item) => open("delete", item),
        (item) => handleNavigate(item),
        t,
        i18n
      ),
    [t, i18n]
  );

  return (
    <>
      <BaseCard
        className="w-full"
        title={<h2>{t("productList.title")}</h2>}
        description={
          <>
            <p>{t("productList.description")}</p>
            {error && <p className="text-danger">{error}</p>}
          </>
        }
        content={<DataTable columns={columns} data={products} />}
      />

      {dialog.type === "delete" && dialog.item && (
        <DeleteProductDialog
          selected={dialog.item}
          open={true}
          onOpenChange={close}
        />
      )}
    </>
  );
};

export default ProductsList;

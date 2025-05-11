import { useProductsStore } from "@/products/store/productsStore";
import { Product } from "@/products/types/Products";
import BaseDialog from "@/shared/ui/components/BaseDialog";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  selected: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteProductDialog = ({ selected, open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { deleteProduct } = useProductsStore();

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.delete.title")}
      description={t("products:deleteProduct.dialog.description")}
      buttons={[
        {
          children: t("dialog.actions.delete"),
          variant: "destructive",
          onClick: () => deleteProduct(selected),
        },
      ]}
    >
      <div className="py-4">
        <p>
          <Trans
            i18nKey="products:deleteProduct.dialog.message"
            values={{
              name: selected.name,
            }}
            components={[<span key="0" className="font-black" />]}
          />
        </p>
      </div>
    </BaseDialog>
  );
};

export default DeleteProductDialog;

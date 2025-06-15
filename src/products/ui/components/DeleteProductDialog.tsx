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

  const hasTranslations = !!selected.details.length;

  const descKey = hasTranslations
    ? "products:deleteProduct.dialog.descriptionWithTranslations"
    : "products:deleteProduct.dialog.description";

  const msgKey = hasTranslations
    ? "products:deleteProduct.dialog.messageWithTranslations"
    : "products:deleteProduct.dialog.message";

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.delete.title")}
      description={t(descKey)}
      buttons={[
        {
          children: t("dialog.actions.delete"),
          variant: "destructive",
          onClick: () =>
            deleteProduct(selected, {
              loading: t("products:toast.delete.loading"),
              success: t("products:toast.delete.success"),
              error: t("products:toast.error"),
            }),
        },
      ]}
    >
      <div className="py-4">
        <p>
          <Trans
            i18nKey={msgKey}
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

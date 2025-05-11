import { Label } from "@/lib/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { useProductsStore } from "@/products/store/productsStore";
import { Detail, Product } from "@/products/types/Products";
import BaseDialog from "@/shared/ui/components/BaseDialog";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  selected: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteProductTranslationDialog = ({
  selected,
  open,
  onOpenChange,
}: Props) => {
  const { t } = useTranslation();
  const [locale, setLocale] = useState<Detail | undefined>();
  const { deleteProductTranslation } = useProductsStore();

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.delete.title")}
      description={t("products:deleteTranslation.dialog.description")}
      buttons={[
        {
          children: t("dialog.actions.delete"),
          disabled: !locale,
          variant: "destructive",
          onClick: () => deleteProductTranslation(locale!),
        },
      ]}
    >
      <div className="flex flex-col gap-2 py-4">
        <Label htmlFor="translations">
          <Trans
            i18nKey="products:deleteTranslation.dialog.label"
            values={{
              name: selected.name,
            }}
            components={[<span key="0" className="font-black" />]}
          />
        </Label>
        <Select
          value={locale?.locale ?? ""}
          onValueChange={(value) =>
            setLocale(
              selected.details.find((detail) => detail.locale === value)
            )
          }
        >
          <SelectTrigger
            className="w-full border-primary/40"
            id={"translations"}
            name={"translations"}
          >
            <SelectValue placeholder={t("selects.translation.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            {selected.details?.map((option) => (
              <SelectItem key={option.id} value={option.locale}>
                {option.locale}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {locale && (
        <div>
          <Trans
            i18nKey="products:deleteTranslation.dialog.message"
            values={{
              locale: locale.locale,
            }}
            components={[<span key="0" className="font-black" />]}
          />
        </div>
      )}
    </BaseDialog>
  );
};

export default DeleteProductTranslationDialog;

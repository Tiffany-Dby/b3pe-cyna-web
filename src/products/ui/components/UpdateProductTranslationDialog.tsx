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
import { APP_ROUTES } from "@/shared/constants/routes";
import BaseDialog from "@/shared/ui/components/BaseDialog";
import { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

type Props = {
  selected: Product;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const UpdateProductTranslationDialog = ({
  selected,
  open,
  onOpenChange,
}: Props) => {
  const { t } = useTranslation();
  const [locale, setLocale] = useState<Detail | undefined>();
  const { setSelectedTranslation, setSelected } = useProductsStore();
  const navigate = useNavigate();

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.update.title")}
      description={t("products:updateTranslation.dialog.description")}
      buttons={[
        {
          children: t("dialog.actions.confirm"),
          disabled: !locale,
          onClick: () => {
            setSelectedTranslation(locale!);
            setSelected(selected);
            navigate(
              `${APP_ROUTES.ADMIN}/${APP_ROUTES.ADMIN_PRODUCTS}/${selected.id}/translations/${locale?.id}`
            );
          },
        },
      ]}
    >
      <div className="flex flex-col gap-2 py-4">
        <Label htmlFor="translations">
          <Trans
            i18nKey="products:updateTranslation.dialog.message"
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
    </BaseDialog>
  );
};

export default UpdateProductTranslationDialog;

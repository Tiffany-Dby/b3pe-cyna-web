import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { LocaleCategory } from "@/categories/types/Categories";
import BaseDialog from "@/shared/ui/components/BaseDialog";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  selected: LocaleCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DeleteCategoryLocaleDialog = ({
  selected,
  open,
  onOpenChange,
}: Props) => {
  const { t } = useTranslation();
  const { deleteCategoryLocale } = useCategoriesStore();

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.delete.title")}
      srOnlyDescription
      description={t("categories:categoryList.dialog.delete.description")}
      buttons={[
        {
          children: t("dialog.actions.delete"),
          onClick: () =>
            deleteCategoryLocale(selected, {
              loading: t("categories:toast.deleteLocale.loading"),
              success: t("categories:toast.deleteLocale.success"),
              error: t("categories:toast.error"),
            }),
        },
      ]}
    >
      <div className="py-4">
        <p>
          <Trans
            i18nKey="categories:categoryList.dialog.delete.message"
            values={{
              name: selected.name,
              locale: selected.locale,
              category: selected.globalName,
            }}
            components={[<span key="0" className="font-black" />]}
          />
        </p>
      </div>
    </BaseDialog>
  );
};

export default DeleteCategoryLocaleDialog;

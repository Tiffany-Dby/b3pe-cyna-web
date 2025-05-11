import BaseCard from "@/shared/ui/components/BaseCard";
import Columns from "@/categories/ui/components/Columns";
import DataTable from "@/shared/ui/components/DataTable";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { useTranslation } from "react-i18next";
import { LocaleCategory } from "@/categories/types/Categories";
import DeleteCategoryLocaleDialog from "@/categories/ui/components/DeleteCategoryLocaleDialog";
import UpdateCategoryLocaleDialog from "@/categories/ui/components/UpdateCategoryLocaleDialog";
import { useDialog } from "@/shared/hooks/useDialog";
import { useMemo } from "react";

const CategoriesList = () => {
  const { t } = useTranslation();
  const { flatCategories, error } = useCategoriesStore();

  const { dialog, open, close } = useDialog<LocaleCategory>();

  const categories = flatCategories();
  const columns = useMemo(
    () =>
      Columns(
        (item) => open("delete", item),
        (item) => open("update", item),
        t
      ),
    [t]
  );

  return (
    <>
      <BaseCard
        className="w-full"
        title={<h2>{t("categories:categoryList.title")}</h2>}
        description={
          <>
            <p>{t("categories:categoryList.description")}</p>
            {error && <p className="text-danger">{error}</p>}
          </>
        }
        content={<DataTable columns={columns} data={categories} />}
      />

      {dialog.type === "delete" && dialog.item && (
        <DeleteCategoryLocaleDialog
          selected={dialog.item}
          open={true}
          onOpenChange={close}
        />
      )}

      {dialog.type === "update" && dialog.item && (
        <UpdateCategoryLocaleDialog
          selected={dialog.item}
          open={true}
          onOpenChange={close}
        />
      )}
    </>
  );
};

export default CategoriesList;

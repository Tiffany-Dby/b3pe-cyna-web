import BaseCard from "@/shared/ui/components/BaseCard";
import { columns } from "./Columns";
import DataTable from "@/shared/ui/components/DataTable";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { useTranslation } from "react-i18next";

const CategoriesList = () => {
  const { t } = useTranslation("categories");
  const flattenCategories = useCategoriesStore().flatCategories();

  return (
    <BaseCard
      className="w-full"
      title={<h2>{t("categoryList.title")}</h2>}
      description={<p>{t("categoryList.description")}</p>}
      content={<DataTable columns={columns} data={flattenCategories} />}
    />
  );
};

export default CategoriesList;

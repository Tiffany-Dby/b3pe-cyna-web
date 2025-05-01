import BaseCard from "@/shared/ui/components/BaseCard";
import { columns } from "../components/Columns";
import DataTable from "@/shared/ui/components/DataTable";
import { LocaleCategory } from "@/categories/types/Categories";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { useAuth } from "@/users/context/AuthContext";
import { useEffect } from "react";

const CategoriesListView = () => {
  const { token } = useAuth();
  const { categories, getCategories } = useCategoriesStore();

  useEffect(() => {
    getCategories(token);
  }, [getCategories, token]);

  const flattenCategories: LocaleCategory[] = categories.flatMap((category) =>
    category.locales.map((locale) => ({
      id: category.id,
      globalName: category.global_name,
      locale: locale.locale,
      name: locale.name,
    }))
  );

  return (
    <BaseCard
      title={<h2>Catégories de produits</h2>}
      description={<p>Recherchez, mettez à jour ou supprimez des catégories</p>}
      content={<DataTable columns={columns} data={flattenCategories} />}
    />
  );
};

export default CategoriesListView;

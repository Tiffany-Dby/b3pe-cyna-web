import CategoriesList from "@/categories/ui/components/CategoriesList";
import NewCategoryLocaleCard from "@/categories/ui/components/NewCategoryLocaleCard";
import NewCategoryCard from "@/categories/ui/components/NewCategoryCard";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { useEffect } from "react";

const AdminCategoriesView = () => {
  const { getCategories } = useCategoriesStore();

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return (
    <div className="@container flex flex-wrap gap-4">
      <NewCategoryCard />
      <NewCategoryLocaleCard />
      <CategoriesList />
    </div>
  );
};

export default AdminCategoriesView;

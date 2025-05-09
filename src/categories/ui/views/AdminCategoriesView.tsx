import CategoriesList from "@/categories/ui/components/CategoriesList";
import NewCategoryLocaleCard from "@/categories/ui/components/NewCategoryLocaleCard";
import NewCategoryCard from "@/categories/ui/components/NewCategoryCard";
import { useAuth } from "@/users/context/AuthContext";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { useEffect } from "react";

const AdminCategoriesView = () => {
  const { token } = useAuth();
  const { getCategories } = useCategoriesStore();

  useEffect(() => {
    getCategories(token);
  }, []);

  return (
    <div className="@container flex flex-wrap gap-4">
      <NewCategoryCard />
      <NewCategoryLocaleCard />
      <CategoriesList />
    </div>
  );
};

export default AdminCategoriesView;

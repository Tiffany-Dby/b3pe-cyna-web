import NewCategoryLocaleForm from "@/categories/ui/components/NewCategoryLocaleForm";
import NewCategoryForm from "@/categories/ui/components/NewCategoryForm";
import CategoriesList from "@/categories/ui/components/CategoriesList";

const AdminCategoriesView = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <NewCategoryForm />
      <NewCategoryLocaleForm />
      <CategoriesList />
    </div>
  );
};

export default AdminCategoriesView;

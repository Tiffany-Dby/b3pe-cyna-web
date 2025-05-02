import NewCategoryLocaleForm from "../components/NewCategoryLocaleForm";
import NewCategoryForm from "../components/NewCategoryForm";
import CategoriesList from "../components/CategoriesList";

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

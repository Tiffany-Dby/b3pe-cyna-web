import NewCategoryLocaleForm from "../components/NewCategoryLocaleForm";
import NewCategoryForm from "../components/NewCategoryForm";
import CategoriesList from "../components/CategoriesList";

const NewCategoryView = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <NewCategoryForm />
      <NewCategoryLocaleForm />
      <CategoriesList />
    </div>
  );
};

export default NewCategoryView;

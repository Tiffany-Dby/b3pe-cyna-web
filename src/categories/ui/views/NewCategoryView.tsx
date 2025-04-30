import NewCategoryLocaleForm from "../components/NewCategoryLocaleForm";
import NewCategoryForm from "../components/NewCategoryForm";

const NewCategoryView = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <NewCategoryForm />
      <NewCategoryLocaleForm />
    </div>
  );
};

export default NewCategoryView;

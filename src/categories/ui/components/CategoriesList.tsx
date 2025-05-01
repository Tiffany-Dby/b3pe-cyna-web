import BaseCard from "@/shared/ui/components/BaseCard";
import { columns } from "./Columns";
import DataTable from "@/shared/ui/components/DataTable";
import { useCategoriesStore } from "@/categories/store/categoriesStore";

const CategoriesList = () => {
  const flattenCategories = useCategoriesStore().flatCategories();

  return (
    <BaseCard
      className="w-full"
      title={<h2>Catégories de produits</h2>}
      description={<p>Recherchez, mettez à jour ou supprimez des catégories</p>}
      content={<DataTable columns={columns} data={flattenCategories} />}
    />
  );
};

export default CategoriesList;

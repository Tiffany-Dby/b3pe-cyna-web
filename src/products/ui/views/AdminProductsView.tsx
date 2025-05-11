import ProductsList from "@/products/ui/components/ProductsList";
import NewProductCard from "@/products/ui/components/NewProductCard";
import NewProductTranslationCard from "@/products/ui/components/NewProductTranslationCard";
import { useProductsStore } from "@/products/store/productsStore";
import { useEffect } from "react";
import { useCategoriesStore } from "@/categories/store/categoriesStore";

const AdminProductsView = () => {
  const { getProducts } = useProductsStore();
  const { getCategories } = useCategoriesStore();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  return (
    <div className="@container flex flex-wrap gap-4">
      <NewProductCard />
      <NewProductTranslationCard />
      <ProductsList />
    </div>
  );
};

export default AdminProductsView;

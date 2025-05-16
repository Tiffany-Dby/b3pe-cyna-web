import { useTranslation } from "react-i18next";
import ProductCard from "../components/ProductCard";
import { ProductLocale } from "@/products/types/Products";
import { API_ROUTES } from "@/shared/constants/routes";
import useFetch from "@/shared/hooks/useFetch";
import { ProductStatus } from "@/products/types/ProductStatus";
import { useMemo } from "react";

const ProductsView = () => {
  const { t, i18n } = useTranslation("products");
  const locale = i18n.resolvedLanguage;

  const STATUS_PRIORITY: Record<ProductStatus, number> = {
    [ProductStatus.Available]: 0,
    [ProductStatus.Maintenance]: 1,
    [ProductStatus.Unavailable]: 2,
  };

  const {
    data: productsLocale,
    isLoading,
    error,
  } = useFetch<ProductLocale[]>(
    `${API_ROUTES.PRODUCT_GET_ALL}/${locale ?? "en"}`,
    false
  );

  const sortedProducts = useMemo(() => {
    if (!productsLocale) return [];

    return [...productsLocale].sort((a, b) => {
      const productA = STATUS_PRIORITY[a.status] ?? 99;
      const productB = STATUS_PRIORITY[b.status] ?? 99;

      return productA - productB;
    });
  }, [productsLocale]);

  return (
    <section>
      <div className="container mx-auto flex flex-col gap-5 py-10 px-4">
        {isLoading && <p>{t("common:loading")}</p>}
        {error && <p>error</p>}
        {!error && productsLocale && (
          <>
            <h1>{t("productList.title")}</h1>
            <div className="flex flex-col justify-center gap-5 sm:flex-row sm:flex-wrap">
              {sortedProducts.map((product) => (
                <article
                  key={product.id}
                  className="flex-[1_0] sm:min-w-68 sm:max-w-[calc((1/2*100%)-0.625rem)]"
                >
                  <ProductCard product={product} />
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductsView;

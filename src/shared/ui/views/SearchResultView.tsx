import ProductCard from "@/products/ui/components/ProductCard";
import useProductSearch from "@/shared/hooks/useProductSearch";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import Loader from "@/shared/ui/components/Loader";

const SearchResultView = () => {
  const { t } = useTranslation("search");
  const [searchParams] = useSearchParams();
  const { result, isLoading, error } = useProductSearch();

  const q = searchParams.get("q") ?? "";

  return (
    <>
      {isLoading && <Loader />}
      <section>
        <div className="container mx-auto flex flex-col gap-5 pt-10 pb-24 px-4">
          {error && <p className="text-danger">{error}</p>}
          {!error && (
            <>
              <h1>{t("title", { q })}</h1>
              {!!result.length ? (
                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                  {result.map((product) => (
                    <article key={product.id}>
                      <ProductCard product={product} />
                    </article>
                  ))}
                </div>
              ) : (
                <p>{t("noResult")}</p>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultView;

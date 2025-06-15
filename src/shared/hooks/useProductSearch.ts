import { useEffect, useState } from "react";
import { ProductLocale } from "@/products/types/Products";
import { useSearchParams } from "react-router";
import { API_ROUTES } from "@/shared/constants/routes";
import { isStringFilled } from "@/shared/utils/string";
import { buildUrl } from "@/shared/utils/url";
import { getRequest } from "@/shared/tools/api";

const useProductSearch = () => {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<ProductLocale[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetSearch = async (apiUrl: string) => {
    setError(null);

    setIsLoading(true);
    const { result, error: reqError } = await getRequest<ProductLocale[]>(
      apiUrl,
      false
    );
    setIsLoading(false);

    setError(reqError);
    setResult(result ?? []);
  };

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    const categoryId = searchParams.get("category_id") ?? "null";
    const locale = searchParams.get("locale") ?? "en";

    if (!isStringFilled(q)) {
      setResult([]);
      setError(null);
      setIsLoading(false);

      return;
    }

    const fields: Record<string, string | undefined | null> = {
      locale,
      category_id:
        !categoryId ||
        !isStringFilled(categoryId) ||
        categoryId === "null" ||
        categoryId === ""
          ? undefined
          : categoryId,
      q: q.trim(),
    };

    const fullUrl = buildUrl(API_ROUTES.PRODUCT_SEARCH, fields);

    handleGetSearch(fullUrl);
  }, [searchParams]);

  return { result, isLoading, error };
};

export default useProductSearch;

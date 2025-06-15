import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { APP_ROUTES } from "@/shared/constants/routes";
import { buildUrl } from "@/shared/utils/url";
import { isStringFilled } from "@/shared/utils/string";

type UseSearchForm = {
  onSuccess?: () => void;
};

const useSearchForm = ({ onSuccess }: UseSearchForm) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const locale = i18n.resolvedLanguage ?? "en";

  const [q, setQ] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!isStringFilled(q)) return;

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

      const url = buildUrl(APP_ROUTES.SEARCH, fields);

      navigate(url);

      if (onSuccess) onSuccess();
    },
    [q, locale, categoryId, navigate, onSuccess]
  );

  return { q, setQ, categoryId, setCategoryId, handleSubmit };
};

export default useSearchForm;

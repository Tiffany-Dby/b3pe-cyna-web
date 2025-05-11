import BaseCard from "@/shared/ui/components/BaseCard";
import { useState } from "react";
import { useProductsStore } from "@/products/store/productsStore";
import { useTranslation } from "react-i18next";
import UpdateProductTranslationForm from "./UpdateProductTranslationForm";

const UpdateProductTranslationCard = () => {
  const { selectedTranslation, selected } = useProductsStore();
  const [serverError, setServerError] = useState<string | null>(null);
  const { t } = useTranslation("products");

  return (
    <BaseCard
      title={
        <h2>
          {selected?.name} - {selectedTranslation?.locale}
        </h2>
      }
      description={<p>{t("updateTranslation.description")}</p>}
      content={
        <div>
          {selectedTranslation && (
            <div className="@container flex flex-col gap-8">
              {serverError && <p className="text-danger">{serverError}</p>}
              <UpdateProductTranslationForm onError={setServerError} />
            </div>
          )}
        </div>
      }
    />
  );
};

export default UpdateProductTranslationCard;

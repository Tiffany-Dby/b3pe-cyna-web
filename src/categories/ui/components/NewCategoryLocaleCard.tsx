import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import NewCategoryLocaleForm from "@/categories/ui/components/NewCategoryLocaleForm";
import { useState } from "react";

const NewCategoryLocaleCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="newCategoryLocaleForm"
      title="categories:newLocale.title"
      description="categories:newLocale.description"
      serverError={serverError}
    >
      <NewCategoryLocaleForm onError={setServerError} />
    </BaseAccordionCard>
  );
};

export default NewCategoryLocaleCard;

import { useState } from "react";
import NewProductTranslationForm from "@/products/ui/components/NewProductTranslationForm";
import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";

const NewProductTranslationCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="newProductTranslationForm"
      title="products:newTranslation.title"
      description="products:newTranslation.description"
      serverError={serverError}
    >
      <NewProductTranslationForm onError={setServerError} />
    </BaseAccordionCard>
  );
};

export default NewProductTranslationCard;

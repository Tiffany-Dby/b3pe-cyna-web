import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import { useState } from "react";
import NewPromotionsTextForm from "@/home/ui/components/NewPromotionsTextForm";

const NewPromotionsTextCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="newPromotionsTextForm"
      title="contents:newPromotionsText.title"
      description="contents:newPromotionsText.description"
      serverError={serverError}
    >
      <NewPromotionsTextForm onError={setServerError} />
    </BaseAccordionCard>
  );
};

export default NewPromotionsTextCard;

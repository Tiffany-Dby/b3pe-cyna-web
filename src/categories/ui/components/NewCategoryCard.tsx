import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import NewCategoryForm from "@/categories/ui/components/NewCategoryForm";
import { useState } from "react";

const NewCategoryCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="newCategoryForm"
      title="categories:newCategory.title"
      description="categories:newCategory.description"
      serverError={serverError}
    >
      <NewCategoryForm onError={setServerError} />
    </BaseAccordionCard>
  );
};

export default NewCategoryCard;

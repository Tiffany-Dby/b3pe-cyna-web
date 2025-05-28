import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import SignUpForm from "@/users/ui/components/SignUpForm";
import { useState } from "react";
import { API_ROUTES } from "@/shared/constants/routes";

const NewAdminCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="newAdminForm"
      title="users:newAdmin.title"
      description=""
      serverError={serverError}
    >
      <SignUpForm
        url={API_ROUTES.USER_NEW_ADMIN}
        withAuth={true}
        onError={setServerError}
      />
    </BaseAccordionCard>
  );
};

export default NewAdminCard;

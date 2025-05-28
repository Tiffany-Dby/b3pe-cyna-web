import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import { useState } from "react";
import UpdatePersonalInfosForm from "@/users/ui/components/UpdatePersonalInfosForm";

const SettingsPersonalInfosCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="updatePersonalInfosForm"
      title="account:settings.personalInformations.caption"
      serverError={serverError}
    >
      <UpdatePersonalInfosForm onError={setServerError} />
    </BaseAccordionCard>
  );
};

export default SettingsPersonalInfosCard;

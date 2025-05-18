import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import { useState } from "react";
import UpdatePersonalInfosForm from "./UpdatePersonalInfosForm";

const SettingsPersonalInfosCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="updatePersonalInfosForm"
      title="account:settings.personalInformations.caption"
      description=""
    >
      <>
        {serverError && <p className="text-danger">{serverError}</p>}
        <UpdatePersonalInfosForm onError={setServerError} />
      </>
    </BaseAccordionCard>
  );
};

export default SettingsPersonalInfosCard;

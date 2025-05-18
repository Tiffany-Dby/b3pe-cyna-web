import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { useState } from "react";

const SettingsPasswordCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="updatePasswordForm"
      title="account:settings.changePassword.caption"
      description=""
    >
      <>
        {serverError && <p className="text-danger">{serverError}</p>}
        <UpdatePasswordForm onError={setServerError} />
      </>
    </BaseAccordionCard>
  );
};

export default SettingsPasswordCard;

import BaseAccordionCard from "@/shared/ui/components/BaseAccordionCard";
import UpdatePasswordForm from "@/users/ui/components/UpdatePasswordForm";
import { useState } from "react";

const SettingsPasswordCard = () => {
  const [serverError, setServerError] = useState<string | null>(null);

  return (
    <BaseAccordionCard
      accordionValue="updatePasswordForm"
      title="account:settings.changePassword.caption"
      serverError={serverError}
    >
      <UpdatePasswordForm onError={setServerError} />
    </BaseAccordionCard>
  );
};

export default SettingsPasswordCard;

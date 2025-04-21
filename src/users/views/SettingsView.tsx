import BaseCard from "@/shared/ui/components/BaseCard";
import {
  ChangePasswordData,
  ChangePasswordSchema,
} from "@/users/schemas/ChangePasswordSchema";
import {
  PersonalInfoData,
  PersonInfosSchema,
} from "@/users/schemas/PersonalInfosSchema";
import { useAuth } from "@/users/context/AuthContext";
import CollapsibleForm from "@/users/ui/components/CollapsibleForm";
import { Separator } from "@/lib/components/ui/separator";
import { Field } from "@/shared/types/Field";
import { API_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";

type PasswordField = Field & {
  name: keyof ChangePasswordData;
};

type PersonalInfoField = Field & {
  name: keyof PersonalInfoData;
};

const SettingsView = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const passwordDefaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const passwordFields: PasswordField[] = [
    {
      name: "currentPassword",
      label: t("inputs.currentPassword.label"),
      type: "password",
      placeholder: t("inputs.currentPassword.placeholder"),
      autoComplete: "current-password",
    },
    {
      name: "newPassword",
      label: t("inputs.newPassword.label"),
      type: "password",
      placeholder: t("inputs.newPassword.placeholder"),
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: t("inputs.confirmNewPassword.label"),
      type: "password",
      placeholder: t("inputs.confirmNewPassword.placeholder"),
      autoComplete: "new-password",
    },
  ];

  const personalDefaultValues = {
    firstName: user?.firstName ?? "",
    lastName: user?.lastName ?? "",
    email: user?.email ?? "",
  };
  const personalInfoFields: PersonalInfoField[] = [
    {
      name: "lastName",
      label: t("inputs.lastName.label"),
      type: "text",
      placeholder: t("inputs.lastName.placeholder"),
      autoComplete: "family-name",
    },
    {
      name: "firstName",
      label: t("inputs.firstName.label"),
      type: "text",
      placeholder: t("inputs.firstName.placeholder"),
      autoComplete: "name",
    },
    {
      name: "email",
      label: t("inputs.email.label"),
      type: "email",
      placeholder: t("inputs.email.placeholder"),
      autoComplete: "email",
    },
  ];

  return (
    <BaseCard
      title={<h1>{t("account:settings.title")}</h1>}
      content={
        <div className="flex flex-col gap-4">
          {user ? (
            <p>{t("loading")}</p>
          ) : (
            <>
              <CollapsibleForm
                formName={t("account:settings.personalInformations.caption")}
                schema={PersonInfosSchema}
                inputFields={personalInfoFields}
                apiUrl={API_ROUTES.signUp}
                defaultValues={personalDefaultValues}
              />
              <Separator />
              <CollapsibleForm
                formName={t("account:settings.changePassword.caption")}
                schema={ChangePasswordSchema}
                inputFields={passwordFields}
                apiUrl={API_ROUTES.signUp}
                defaultValues={passwordDefaultValues}
              />
            </>
          )}
        </div>
      }
    />
  );
};

export default SettingsView;

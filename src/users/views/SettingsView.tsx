import { ApiRoutes } from "@/shared/types/Routes";
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

type PasswordField = Field & {
  name: keyof ChangePasswordData;
};

type PersonalInfoField = Field & {
  name: keyof PersonalInfoData;
};

const SettingsView = () => {
  const { user } = useAuth();

  const passwordDefaultValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const passwordFields: PasswordField[] = [
    {
      name: "currentPassword",
      label: "Mot de passe actuel",
      type: "password",
      placeholder: "Mot de passe actuel",
      autoComplete: "current-password",
    },
    {
      name: "newPassword",
      label: "Nouveau mot de passe",
      type: "password",
      placeholder: "Nouveau mot de passe",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: "Confirmer nouveau mot de passe",
      type: "password",
      placeholder: "Confirmer nouveau mot de passe",
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
      label: "Nom",
      type: "text",
      placeholder: "Nom",
      autoComplete: "family-name",
    },
    {
      name: "firstName",
      label: "Prénom",
      type: "text",
      placeholder: "Prénom",
      autoComplete: "name",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      autoComplete: "email",
    },
  ];

  return (
    <BaseCard
      title={<h1>Mon compte</h1>}
      content={
        <div className="flex flex-col gap-4">
          {user ? (
            <p>Chargement...</p>
          ) : (
            <>
              <CollapsibleForm
                formName="Informations personnelles"
                schema={PersonInfosSchema}
                inputFields={personalInfoFields}
                apiUrl={ApiRoutes.signUp}
                defaultValues={personalDefaultValues}
              />
              <Separator />
              <CollapsibleForm
                formName="Changer de mot de passe"
                schema={ChangePasswordSchema}
                inputFields={passwordFields}
                apiUrl={ApiRoutes.signUp}
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

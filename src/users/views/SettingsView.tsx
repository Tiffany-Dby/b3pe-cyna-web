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
import { Fragment } from "react";
import { putRequest } from "@/shared/tools/api";
import { RequestFn } from "@/shared/types/Api";

type PasswordField = Field & {
  name: keyof ChangePasswordData;
};

type PersonalInfoField = Field & {
  name: keyof PersonalInfoData;
};

type Form = {
  name: string;
  schema: typeof PersonInfosSchema | typeof ChangePasswordSchema;
  fields: PasswordField[] | PersonalInfoField[];
  url: string;
  defaultValues: Record<string, string>;
  requestFn: RequestFn;
};

const SettingsView = () => {
  const { user, token } = useAuth();

  const forms: Form[] = [
    {
      name: "Informations personnelles",
      schema: PersonInfosSchema,
      fields: [
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
      ],
      url: API_ROUTES.updateInfos,
      defaultValues: {
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
      },
      requestFn: putRequest,
    },
    {
      name: "Changer de mot de passe",
      schema: ChangePasswordSchema,
      fields: [
        {
          name: "previousPassword",
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
          name: "confirmNewPassword",
          label: "Confirmer nouveau mot de passe",
          type: "password",
          placeholder: "Confirmer nouveau mot de passe",
          autoComplete: "new-password",
        },
      ],
      url: API_ROUTES.updatePassword,
      defaultValues: {
        previousPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      requestFn: putRequest,
    },
  ];

  return (
    <BaseCard
      title={<h1>Mon compte</h1>}
      content={
        <div className="flex flex-col gap-4">
          {user ? (
            <>
              {forms.map((form, index) => (
                <Fragment key={index}>
                  <CollapsibleForm
                    formName={form.name}
                    schema={form.schema}
                    inputFields={form.fields}
                    apiUrl={form.url}
                    defaultValues={form.defaultValues}
                    requestFn={form.requestFn}
                    token={token}
                  />
                  {index + 1 < forms.length && <Separator />}
                </Fragment>
              ))}
            </>
          ) : (
            <p>Chargement...</p>
          )}
        </div>
      }
    />
  );
};

export default SettingsView;

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
  const { t } = useTranslation();
  const { user, token } = useAuth();

  const forms: Form[] = [
    {
      name: "account:settings.personalInformations.caption",
      schema: PersonInfosSchema,
      fields: [
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
      name: "account:settings.changePassword.caption",
      schema: ChangePasswordSchema,
      fields: [
        {
          name: "previousPassword",
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
          name: "confirmNewPassword",
          label: t("inputs.confirmNewPassword.label"),
          type: "password",
          placeholder: t("inputs.confirmNewPassword.placeholder"),
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
      title={<h1>{t("account:settings.title")}</h1>}
      content={
        <div className="flex flex-col gap-4">
          {user ? (
            <>
              {forms.map((form, index) => (
                <Fragment key={index}>
                  <CollapsibleForm
                    formName={t(form.name)}
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
            <p>{t("loading")}</p>
          )}
        </div>
      }
    />
  );
};

export default SettingsView;

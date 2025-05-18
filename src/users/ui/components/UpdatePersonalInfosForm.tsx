import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { putRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { useAuth } from "@/users/context/AuthContext";
import {
  UpdatePersonalInfoData,
  UpdatePersonInfosSchema,
} from "@/users/schemas/UpdatePersonalInfosSchema";
import { UserResponse } from "@/users/types/SignIn";
import { SquarePenIcon } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type PersonalInfoField = Field & {
  name: keyof UpdatePersonalInfoData;
};

type Props = {
  onError: (error: string | null) => void;
};

const UpdatePersonalInfosForm = ({ onError }: Props) => {
  const { t } = useTranslation();
  const { user, onUserUpdate } = useAuth();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    UpdatePersonalInfoData,
    UserResponse
  >({
    schema: UpdatePersonInfosSchema,
    apiUrl: API_ROUTES.USER_UPDATE_INFOS,
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName: user?.lastName ?? "",
      email: user?.email ?? "",
    },
    requestFn: putRequest,
    onSuccess: (updated) => onUserUpdate({ ...user, ...updated }),
  });

  const fields: PersonalInfoField[] = [
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

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  useEffect(() => {
    if (user)
      form.reset({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
  }, [user]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {fields.map(
          ({ name, label, type, placeholder, autoComplete }, index) => (
            <FormField
              key={index}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={name}>{label}</FormLabel>
                  <BaseInputGroup
                    {...field}
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    icon={SquarePenIcon}
                  />
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
          )
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? t("account:settings.submit.loading")
            : t("account:settings.submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default UpdatePersonalInfosForm;

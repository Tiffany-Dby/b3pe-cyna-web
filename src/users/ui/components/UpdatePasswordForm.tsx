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
import {
  UpdatePasswordData,
  UpdatePasswordSchema,
} from "@/users/schemas/UpdatePasswordSchema";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type PasswordField = Field & {
  name: keyof UpdatePasswordData;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  toggleType?: () => void;
};

type Props = {
  onError: (error: string | null) => void;
};

const UpdatePasswordForm = ({ onError }: Props) => {
  const { t } = useTranslation();
  const [typePassword, setTypePassword] = useState<"text" | "password">(
    "password"
  );
  const [typePasswordNew, setTypePasswordNew] = useState<"text" | "password">(
    "password"
  );
  const [typePasswordConfirm, setTypePasswordConfirm] = useState<
    "text" | "password"
  >("password");

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: UpdatePasswordSchema,
    apiUrl: API_ROUTES.USER_UPDATE_PASSWORD,
    defaultValues: {
      previousPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    requestFn: putRequest,
  });

  const fields: PasswordField[] = [
    {
      name: "previousPassword",
      label: t("inputs.currentPassword.label"),
      type: typePassword,
      placeholder: t("inputs.currentPassword.placeholder"),
      autoComplete: "current-password",
      icon: typePassword === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypePassword((prev) => (prev === "password" ? "text" : "password")),
    },
    {
      name: "newPassword",
      label: t("inputs.newPassword.label"),
      type: typePasswordNew,
      placeholder: t("inputs.newPassword.placeholder"),
      autoComplete: "new-password",
      icon: typePasswordNew === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypePasswordNew((prev) =>
          prev === "password" ? "text" : "password"
        ),
    },
    {
      name: "confirmNewPassword",
      label: t("inputs.confirmNewPassword.label"),
      type: typePasswordConfirm,
      placeholder: t("inputs.confirmNewPassword.placeholder"),
      autoComplete: "new-password",
      icon: typePasswordConfirm === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypePasswordConfirm((prev) =>
          prev === "password" ? "text" : "password"
        ),
    },
  ];

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {fields.map(
          (
            {
              name,
              label,
              type,
              placeholder,
              autoComplete,
              icon: Icon,
              toggleType,
            },
            index
          ) => (
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
                    value={field.value}
                    type={type}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    icon={Icon}
                    toggleType={toggleType}
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

export default UpdatePasswordForm;

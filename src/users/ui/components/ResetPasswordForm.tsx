import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import useCustomForm from "@/shared/hooks/useCustomForm";
import BaseCard from "@/shared/ui/components/BaseCard";
import { Button } from "@/lib/components/ui/button";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Field } from "@/shared/types/Field";
import { API_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import { postRequest } from "@/shared/tools/api";
import {
  ResetPasswordData,
  ResetPasswordSchema,
} from "@/users/schemas/ResetPasswordSchema";
import { useState } from "react";

type ResetPasswordFields = Field & {
  name: keyof ResetPasswordData;
  icon: React.ComponentType;
  toggleType?: () => void;
};

type Props = {
  token: string;
};

const ResetPasswordForm = ({ token }: Props) => {
  const { t } = useTranslation();
  const [typePasswordNew, setTypePasswordNew] = useState<"text" | "password">(
    "password"
  );
  const [typeConfirmPassword, setTypeConfirmPassword] = useState<
    "text" | "password"
  >("password");

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: ResetPasswordSchema,
    apiUrl: API_ROUTES.RESET_PASSWORD,
    withAuth: false,
    defaultValues: {
      token: token,
      newPassword: "",
      confirmNewPassword: "",
    },
    requestFn: postRequest,
  });

  const fields: ResetPasswordFields[] = [
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
      label: t("inputs.confirmPassword.label"),
      type: typeConfirmPassword,
      placeholder: t("inputs.confirmPassword.placeholder"),
      autoComplete: "new-password",
      icon: typeConfirmPassword === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypeConfirmPassword((prev) =>
          prev === "password" ? "text" : "password"
        ),
    },
  ];

  return (
    <div className="max-w-xl w-full mx-auto py-5 px-4">
      <BaseCard
        title={<h1>{t("resetPassword:title")}</h1>}
        description={
          <>{serverError && <p className="text-danger">{serverError}</p>}</>
        }
        content={
          <Form {...form}>
            <form className="grid gap-5" onSubmit={handleSubmit}>
              {fields.map(
                ({
                  name,
                  label,
                  type,
                  placeholder,
                  autoComplete,
                  icon: Icon,
                  toggleType,
                }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor={name} className="sr-only">
                          {label}
                        </FormLabel>
                        <FormControl>
                          <BaseInputGroup
                            {...field}
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            icon={Icon}
                            autoComplete={autoComplete}
                            toggleType={toggleType}
                          />
                        </FormControl>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />
                )
              )}
              <div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  onClick={() => {
                    console.log(token);
                  }}
                >
                  {isLoading
                    ? t("resetPassword:submit.loading")
                    : t("resetPassword:submit.action")}
                </Button>
              </div>
            </form>
          </Form>
        }
      />
    </div>
  );
};

export default ResetPasswordForm;

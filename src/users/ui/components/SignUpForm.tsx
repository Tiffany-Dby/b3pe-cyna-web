import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import {
  CircleUserRoundIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
} from "lucide-react";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { SignUpSchema } from "@/users/schemas/SignUpSchema";
import { SignUpData } from "@/users/types/SignUp";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ApiRoutes } from "@/shared/types/Routes";

type SignUpField = Field & {
  name: keyof SignUpData;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  toggleType?: () => void;
};

type Props = {
  onError: (error: string | null) => void;
  url?: ApiRoutes;
  withAuth?: boolean;
  onSuccess?: () => void;
};

const SignUpForm = ({ onError, url, withAuth = false, onSuccess }: Props) => {
  const { t } = useTranslation();
  const [typePassword, setTypePassword] = useState<"text" | "password">(
    "password"
  );
  const [typeConfirmPassword, setTypeConfirmPassword] = useState<
    "text" | "password"
  >("password");

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: SignUpSchema,
    apiUrl: url ?? API_ROUTES.SIGN_UP,
    withAuth,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSuccess: onSuccess,
    requestFn: postRequest,
  });

  const fields: SignUpField[] = [
    {
      name: "firstName",
      label: t("inputs.firstName.label"),
      type: "text",
      placeholder: t("inputs.firstName.placeholder"),
      autoComplete: "name",
      icon: CircleUserRoundIcon,
    },
    {
      name: "lastName",
      label: t("inputs.lastName.label"),
      type: "text",
      placeholder: t("inputs.lastName.placeholder"),
      autoComplete: "family-name",
      icon: CircleUserRoundIcon,
    },
    {
      name: "email",
      label: t("inputs.email.label"),
      type: "email",
      placeholder: t("inputs.email.placeholder"),
      autoComplete: "email",
      icon: MailIcon,
    },
    {
      name: "password",
      label: t("inputs.password.label"),
      type: typePassword,
      placeholder: t("inputs.password.placeholder"),
      autoComplete: "new-password",
      icon: typePassword === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypePassword((prev) => (prev === "password" ? "text" : "password")),
    },
    {
      name: "confirmPassword",
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

  useEffect(() => {
    onError(serverError);
  }, [onError, serverError]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("signUp:submit.loading") : t("signUp:submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default SignUpForm;

import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { Separator } from "@/lib/components/ui/separator";
import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import BaseCard from "@/shared/ui/components/BaseCard";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { SignUpData, SignUpSchema } from "@/users/schemas/SignUpSchema";
import {
  CircleUserRoundIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
} from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

type SignUpField = Field & {
  name: keyof SignUpData;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  toggleType?: () => void;
};

const SignUpView = () => {
  const { t } = useTranslation();
  const [typePassword, setTypePassword] = useState<"text" | "password">(
    "password"
  );
  const [typeConfirmPassword, setTypeConfirmPassword] = useState<
    "text" | "password"
  >("password");

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: SignUpSchema,
    apiUrl: API_ROUTES.SIGN_UP,
    withAuth: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
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

  return (
    <div className="max-w-xl w-full mx-auto py-5 px-4">
      <BaseCard
        title={<h1>{t("signUp:title")}</h1>}
        description={
          <>{serverError && <p className="text-danger">{serverError}</p>}</>
        }
        content={
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
                {isLoading
                  ? t("signUp:submit.loading")
                  : t("signUp:submit.action")}
              </Button>
            </form>
          </Form>
        }
        footer={
          <div className="flex flex-col gap-5 w-full">
            <Separator className="max-w-5/6 mx-auto my-2" />
            <div className="flex flex-col gap-1">
              <p>{t("signUp:signedUp")}</p>
              <div className="text-center">
                <Link
                  to={APP_ROUTES.SIGN_IN}
                  className="flex-center-center w-full h-9 border border-primary text-primary text-size-n font-medium bg-background py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 rounded-md dark:text-primary-foreground dark:border-primary-foreground dark:hover:border-transparent"
                >
                  {t("signUp:signIn")}
                </Link>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SignUpView;

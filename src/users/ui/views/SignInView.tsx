import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import BaseCard from "@/shared/ui/components/BaseCard";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { SignInSchema, SignInData } from "@/users/schemas/SignInSchema";
import { MailIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router";
import { useState } from "react";
import { SignInResponse } from "@/users/types/SignIn";
import { Separator } from "@/lib/components/ui/separator";
import { Field } from "@/shared/types/Field";
import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/users/context/useAuth";
import { postRequest } from "@/shared/tools/api";

type SignInField = Field & {
  name: keyof SignInData;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  toggleType?: () => void;
};

const SignInView = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { onSignIn, isAuthenticated } = useAuth();
  const [typePassword, setTypePassword] = useState<"text" | "password">(
    "password"
  );

  const handleSignInSuccess = (userData: SignInResponse) => {
    onSignIn(userData);
    navigate("/" + APP_ROUTES.ACCOUNT);
  };

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: SignInSchema,
    apiUrl: API_ROUTES.SIGN_IN,
    withAuth: false,
    defaultValues: {
      email: "",
      password: "",
    },
    toastMsgs: {
      success: t("signIn:toast.success"),
      loading: t("signIn:toast.loading"),
      error: t("signIn:toast.error"),
    },
    requestFn: postRequest,
    onSuccess: handleSignInSuccess,
  });

  const fields: SignInField[] = [
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
      autoComplete: "current-password",
      icon: typePassword === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypePassword((prev) => (prev === "password" ? "text" : "password")),
    },
  ];

  if (isAuthenticated) {
    return <Navigate to={"/" + APP_ROUTES.ACCOUNT} replace />;
  }

  return (
    <div className="max-w-xl w-full mx-auto pt-10 pb-24 px-4">
      <BaseCard
        title={<h1>{t("signIn:title")}</h1>}
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
                            autoComplete={autoComplete}
                            icon={Icon}
                            toggleType={toggleType}
                          />
                        </FormControl>
                        <FormMessage className="text-danger" />
                      </FormItem>
                    )}
                  />
                )
              )}
              <Link
                to={APP_ROUTES.RESET_PASSWORD}
                className="underline justify-self-end opacity-75 hover:opacity-100 transition-opacity duration-500"
              >
                {t("signIn:forgetPassword")}
              </Link>
              <div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading
                    ? t("signIn:submit.loading")
                    : t("signIn:submit.action")}
                </Button>
              </div>
            </form>
          </Form>
        }
        footer={
          <div className="flex flex-col gap-5 w-full">
            <Separator className="max-w-5/6 mx-auto my-2" />
            <div className="flex flex-col gap-1">
              <p>{t("signIn:notSignedUp")}</p>
              <div className="text-center">
                <Link
                  to={APP_ROUTES.SIGN_UP}
                  className="flex-center-center w-full h-9 border border-primary text-primary text-size-n font-medium bg-background py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 rounded-md dark:text-primary-foreground dark:border-primary-foreground dark:hover:border-transparent"
                >
                  {t("signIn:signUp")}
                </Link>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default SignInView;

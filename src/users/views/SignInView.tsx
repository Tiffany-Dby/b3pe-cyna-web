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
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "@/users/context/AuthContext";
import { SignInResponse } from "@/users/types/SignIn";
import { Separator } from "@/lib/components/ui/separator";
import { Field } from "@/shared/types/Field";
import { API_ROUTES, APP_ROUTES } from "@/shared/constants/routes";
import { postRequest } from "@/shared/tools/api";

type SignInField = Field & {
  name: keyof SignInData;
  icon?: React.ComponentType<{ className?: string; onClick?: () => void }>;
  toggleType?: () => void;
};

const SignInView = () => {
  const navigate = useNavigate();
  const { onSignIn } = useAuth();
  const [typePassword, setTypePassword] = useState<"text" | "password">(
    "password"
  );

  const handleSignInSuccess = (userData: SignInResponse) => {
    onSignIn(userData);
    navigate(APP_ROUTES.accountSettings);
  };

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: SignInSchema,
    apiUrl: API_ROUTES.signIn,
    defaultValues: {
      email: "",
      password: "",
    },
    requestFn: postRequest,
    onSuccess: handleSignInSuccess,
  });

  const fields: SignInField[] = [
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email",
      autoComplete: "email",
      icon: MailIcon,
    },
    {
      name: "password",
      label: "Mot de passe",
      type: typePassword,
      placeholder: "Mot de passe",
      autoComplete: "current-password",
      icon: typePassword === "password" ? EyeIcon : EyeOffIcon,
      toggleType: () =>
        setTypePassword((prev) => (prev === "password" ? "text" : "password")),
    },
  ];

  return (
    <BaseCard
      title={<h1>Connexion</h1>}
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
              to={APP_ROUTES.resetPassword}
              className="underline justify-self-end opacity-75 hover:opacity-100 transition-opacity duration-500"
            >
              Mot de passe oublié ?
            </Link>
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connexion en cours..." : "Je me connecte"}
              </Button>
            </div>
          </form>
        </Form>
      }
      footer={
        <div className="flex flex-col gap-5 w-full">
          <Separator className="max-w-5/6 mx-auto my-2" />
          <div className="flex flex-col gap-1">
            <p>Pas encore inscrit(e) ?</p>
            <div className="text-center">
              <Link
                to={APP_ROUTES.signUp}
                className="flex-center-center w-full h-9 border border-primary text-primary text-size-n font-medium bg-background py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors duration-500 rounded-md dark:text-primary-foreground dark:border-primary-foreground dark:hover:border-transparent"
              >
                Je m'inscris
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default SignInView;

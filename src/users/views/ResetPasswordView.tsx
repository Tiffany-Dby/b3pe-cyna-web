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
import {
  ResetPasswordData,
  ResetPasswordSchema,
} from "@/users/schemas/ResetPasswordSchema";
import { Button } from "@/lib/components/ui/button";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { MailIcon } from "lucide-react";
import { Field } from "@/shared/types/Field";
import { API_ROUTES } from "@/shared/constants/routes";
import { postRequest } from "@/shared/tools/api";

type Input = Field & {
  name: keyof ResetPasswordData;
  icon: React.ComponentType;
};

const ResetPasswordView = () => {
  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: ResetPasswordSchema,
    apiUrl: API_ROUTES.signIn,
    defaultValues: {
      email: "",
    },
    requestFn: postRequest,
  });

  const input: Input = {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    autoComplete: "email",
    icon: MailIcon,
  };

  return (
    <BaseCard
      title={<h1>Réinitialiser mon mot de passe</h1>}
      description={
        <>{serverError && <p className="text-danger">{serverError}</p>}</>
      }
      content={
        <Form {...form}>
          <form className="grid gap-5" onSubmit={handleSubmit}>
            <FormField
              key={input.name}
              control={form.control}
              name={input.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor={input.name} className="sr-only">
                    {input.label}
                  </FormLabel>
                  <FormControl>
                    <BaseInputGroup
                      {...field}
                      id={input.name}
                      type={input.type}
                      placeholder={input.placeholder}
                      autoComplete={input.autoComplete}
                      icon={input.icon}
                    />
                  </FormControl>
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Envoi en cours..." : "Réinitialiser"}
              </Button>
            </div>
          </form>
        </Form>
      }
    />
  );
};

export default ResetPasswordView;

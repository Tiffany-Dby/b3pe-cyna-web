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
import { ApiRoutes } from "@/shared/types/Routes";
import { Button } from "@/lib/components/ui/button";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { MailIcon } from "lucide-react";

const ResetPassword = () => {
  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema: ResetPasswordSchema,
    apiUrl: ApiRoutes.signIn,
    defaultValues: {
      email: "",
    },
  });

  const input: {
    name: keyof ResetPasswordData;
    label: string;
    type: string;
    placeholder: string;
    autocomplete: string;
    icon: React.ComponentType;
  } = {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Email",
    autocomplete: "email",
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
                      autoComplete={input.autocomplete}
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

export default ResetPassword;

import { Button } from "@/lib/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/lib/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import useCustomForm from "@/shared/hooks/useCustomForm";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { ChevronDownIcon, SquarePenIcon } from "lucide-react";
import { useState } from "react";
import { DefaultValues, FieldValues, Path } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

type InputField<T> = {
  name: Path<T>;
  label: string;
  type: string;
  placeholder?: string;
  autoComplete?: string;
  icon?: React.ElementType;
};

type CollapsibleFormProps<T extends FieldValues> = {
  formName: string;
  inputFields: InputField<T>[];
  schema: z.ZodSchema<T>;
  apiUrl: string;
  defaultValues: DefaultValues<T>;
};

const CollapsibleForm = <T extends FieldValues>({
  formName,
  inputFields,
  schema,
  apiUrl,
  defaultValues,
}: CollapsibleFormProps<T>) => {
  const { t } = useTranslation("account");
  const [isOpen, setIsOpen] = useState(false);

  const { form, handleSubmit, isLoading, serverError } = useCustomForm({
    schema,
    apiUrl,
    defaultValues,
  });

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex flex-col gap-2 items-start"
    >
      <CollapsibleTrigger className="h-fit" asChild>
        <Button className="flex justify-between w-full bg-transparent shadow-none text-card-foreground hover:bg-transparent !px-0 text-size-l">
          {formName}
          <ChevronDownIcon
            className={`transition-transform duration-500 ${
              isOpen ? "-rotate-180" : "rotate-0"
            }`}
          />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="flex flex-col gap-2 px-2 pt-1 pb-3 w-full">
        {serverError && <p className="text-danger">{serverError}</p>}
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {inputFields.map(({ name, label, type, autoComplete }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <BaseInputGroup
                        {...field}
                        type={type}
                        icon={SquarePenIcon}
                        autoComplete={autoComplete}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading
                ? t("settings.submit.loading")
                : t("settings.submit.action")}
            </Button>
          </form>
        </Form>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default CollapsibleForm;

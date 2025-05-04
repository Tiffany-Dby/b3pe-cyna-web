import {
  NewCategoryData,
  NewCategorySchema,
} from "@/categories/schemas/NewCategorySchema";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { NewCategory } from "@/categories/types/Categories";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/accordion";
import { Button } from "@/lib/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/lib/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { useAuth } from "@/users/context/AuthContext";
import { ShapesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type NewCategoryField = Field & {
  name: keyof NewCategoryData;
  icon?: React.ComponentType<{ className?: string }>;
};

const NewCategoryForm = () => {
  const { t } = useTranslation();
  const { token } = useAuth();
  const { addCategory } = useCategoriesStore();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    NewCategoryData,
    NewCategory
  >({
    schema: NewCategorySchema,
    apiUrl: API_ROUTES.CATEGORY_NEW,
    defaultValues: {
      globalName: "",
    },
    requestFn: postRequest,
    onSuccess: (created) =>
      addCategory({
        id: created.id,
        globalName: created.globalName,
        locales: [
          {
            id: created.localeId,
            locale: created.locale,
            name: created.localeName,
          },
        ],
      }),
    token,
  });

  const fields: NewCategoryField[] = [
    {
      name: "globalName",
      label: t("inputs.category.label"),
      type: "text",
      placeholder: t("inputs.category.placeholder"),
      autoComplete: "on",
      icon: ShapesIcon,
    },
  ];

  return (
    <Accordion
      type="single"
      collapsible
      className="flex-1 sm:min-w-80 w-full sm:w-auto"
    >
      <AccordionItem className="group h-full" value="newCategoryForm">
        <Card className="grow sm:min-w-80 w-full sm:w-auto group-data-[state=open]:h-full">
          <CardHeader>
            <AccordionTrigger className="items-center cursor-pointer p-0 hover:no-underline">
              <h2>{t("categories:newCategory.title")}</h2>
            </AccordionTrigger>
          </CardHeader>
          <AccordionContent className="flex flex-col gap-4 h-full">
            <CardHeader>
              <CardDescription>
                <p>{t("categories:newCategory.description")}</p>
                {serverError && <p className="text-danger">{serverError}</p>}
              </CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <Form {...form}>
                <form className="grid gap-5 h-full" onSubmit={handleSubmit}>
                  {fields.map(
                    (
                      {
                        name,
                        label,
                        type,
                        placeholder,
                        autoComplete,
                        icon: Icon,
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
                            <FormControl>
                              <BaseInputGroup
                                {...field}
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                autoComplete={autoComplete}
                                icon={Icon}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                    )
                  )}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="self-end"
                  >
                    {isLoading
                      ? t("categories:newCategory.submit.loading")
                      : t("categories:newCategory.submit.action")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
};

export default NewCategoryForm;

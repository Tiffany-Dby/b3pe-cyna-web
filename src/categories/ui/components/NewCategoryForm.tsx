import {
  NewCategoryData,
  NewCategorySchema,
} from "@/categories/schemas/NewCategorySchema";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { NewCategory } from "@/categories/types/Categories";
import { Button } from "@/lib/components/ui/button";
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
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type NewCategoryField = Field & {
  name: keyof NewCategoryData;
  icon?: React.ComponentType<{ className?: string }>;
};

type Props = {
  onError: (error: string | null) => void;
};

const NewCategoryForm = ({ onError }: Props) => {
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

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  return (
    <Form {...form}>
      <form className="grid gap-5 h-full" onSubmit={handleSubmit}>
        {fields.map(
          (
            { name, label, type, placeholder, autoComplete, icon: Icon },
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
        <Button type="submit" disabled={isLoading} className="self-end">
          {isLoading
            ? t("categories:newCategory.submit.loading")
            : t("categories:newCategory.submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default NewCategoryForm;

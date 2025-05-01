import {
  NewLocaleCategoryData,
  NewLocaleCategorySchema,
} from "@/categories/schemas/NewLocaleCategorySchema";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { NewLocale } from "@/categories/types/Categories";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import BaseCard from "@/shared/ui/components/BaseCard";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { useAuth } from "@/users/context/AuthContext";
import { ShapesIcon } from "lucide-react";
import { useEffect, useId } from "react";
import { useTranslation } from "react-i18next";

type NewLocaleCategoryField = Field & {
  name: keyof NewLocaleCategoryData;
  icon?: React.ComponentType<{ className?: string }>;
  options?: Option[];
};

const NewCategoryLocaleForm = () => {
  const id = useId();
  const { t } = useTranslation();
  const { token } = useAuth();
  const { categories, getCategories, addLocale, flatCategories } =
    useCategoriesStore();
  const flat = flatCategories();

  useEffect(() => {
    getCategories(token);
  }, [getCategories, token]);

  useEffect(() => {
    console.log("categories", categories);
  }, [categories]);
  useEffect(() => {
    console.log("flatCategories", flat);
  }, [flat]);

  const parentOptions = categories.map((category) => ({
    label: category.global_name,
    value: String(category.id),
  }));

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    NewLocaleCategoryData,
    NewLocale
  >({
    schema: NewLocaleCategorySchema,
    apiUrl: API_ROUTES.CATEGORY_NEW_LOCALE,
    defaultValues: {
      id: "",
      locale: "",
      name: "",
    },
    requestFn: postRequest,
    token,
    onSuccess: (newLocale) => addLocale(newLocale),
  });

  const fields: NewLocaleCategoryField[] = [
    {
      name: "id",
      label: t("selects.category.label"),
      type: "select",
      placeholder: t("selects.category.placeholder"),
      options: parentOptions,
      autoComplete: "off",
    },
    {
      name: "locale",
      label: t("selects.locale.label"),
      type: "select",
      placeholder: t("selects.locale.placeholder"),
      options: [
        { label: "English", value: "en" },
        { label: "Français", value: "fr" },
      ],
      autoComplete: "off",
    },
    {
      name: "name",
      label: t("inputs.category.label"),
      type: "text",
      placeholder: t("inputs.category.placeholder"),
      autoComplete: "on",
      icon: ShapesIcon,
    },
  ];

  return (
    <BaseCard
      className="grow sm:min-w-80"
      title={<h2>{t("categories:newLocale.title")}</h2>}
      description={
        <>
          <p>{t("categories:newLocale.description")}</p>
          {serverError && <p className="text-danger">{serverError}</p>}
        </>
      }
      content={
        <Form {...form}>
          <form className="grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
            {fields.map(
              (
                {
                  name,
                  label,
                  type,
                  placeholder,
                  options,
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
                    <>
                      {type === "select" ? (
                        <FormItem>
                          <FormLabel htmlFor={name}>{label}</FormLabel>
                          <FormControl>
                            <Select
                              value={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger
                                className="w-full border-primary/40"
                                id={name}
                                name={name}
                              >
                                <SelectValue placeholder={placeholder} />
                              </SelectTrigger>
                              <SelectContent>
                                {options?.map((option) => (
                                  <SelectItem
                                    key={id + "-" + option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-danger" />
                        </FormItem>
                      ) : (
                        <FormItem className="sm:col-span-2">
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
                    </>
                  )}
                />
              )
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="sm:col-span-2"
            >
              {isLoading
                ? t("categories:newLocale.submit.loading")
                : t("categories:newLocale.submit.action")}
            </Button>
          </form>
        </Form>
      }
    />
  );
};
export default NewCategoryLocaleForm;

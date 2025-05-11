import { useCategoriesStore } from "@/categories/store/categoriesStore";
import { LocaleCategory, UpdatedLocale } from "@/categories/types/Categories";
import BaseDialog from "@/shared/ui/components/BaseDialog";
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
import useCustomForm from "@/shared/hooks/useCustomForm";
import { API_ROUTES } from "@/shared/constants/routes";
import { Field } from "@/shared/types/Field";
import {
  UpdateLocaleCategoryData,
  UpdateLocaleCategorySchema,
} from "@/categories/schemas/UpdateLocaleCategorySchema";
import { Option } from "@/shared/types/Option";
import { ShapesIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import { Button } from "@/lib/components/ui/button";
import { useId } from "react";
import { LOCALES } from "@/shared/constants/locales";
import { putRequest } from "@/shared/tools/api";

type Props = {
  selected: LocaleCategory;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type UpdateLocaleCategoryField = Field & {
  name: keyof UpdateLocaleCategoryData;
  icon?: React.ComponentType<{ className?: string }>;
  options?: Option[];
};

const UpdateCategoryLocaleDialog = ({
  selected,
  open,
  onOpenChange,
}: Props) => {
  const id = useId();
  const { t } = useTranslation();
  const { updateCategoryLocale } = useCategoriesStore();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    UpdateLocaleCategoryData,
    UpdatedLocale
  >({
    schema: UpdateLocaleCategorySchema,
    apiUrl: API_ROUTES.CATEGORY_UPDATE_LOCALE,
    defaultValues: {
      localeId: String(selected.id),
      locale: selected.locale,
      name: selected.name,
    },
    requestFn: putRequest,
    onSuccess: (updated) => {
      updateCategoryLocale(updated, selected.globalId);
      onOpenChange(false);
    },
  });

  const fields: UpdateLocaleCategoryField[] = [
    {
      name: "locale",
      label: t("selects.locale.label"),
      type: "select",
      placeholder: t("selects.locale.placeholder"),
      options: LOCALES.OPTIONS,
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
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.update.title")}
      description={t("categories:categoryList.dialog.update.description")}
      showFooter={false}
    >
      <>
        {serverError && <p className="text-danger">{serverError}</p>}
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 pt-2 pb-4">
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
            </div>
            <div className="flex gap-4 justify-end">
              <Button
                variant="outline"
                type="button"
                onClick={() => onOpenChange(false)}
              >
                {t("dialog.actions.cancel")}
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading
                  ? t("dialog.actions.loading")
                  : t("dialog.actions.update")}
              </Button>
            </div>
          </form>
        </Form>
      </>
    </BaseDialog>
  );
};

export default UpdateCategoryLocaleDialog;

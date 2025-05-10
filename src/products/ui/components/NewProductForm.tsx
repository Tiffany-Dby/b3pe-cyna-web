import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { Button } from "@/lib/components/ui/button";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { useCategoriesStore } from "@/categories/store/categoriesStore";
import {
  NewProductData,
  NewProductInput,
  NewProductSchema,
} from "@/products/schemas/NewProductSchema";
import { API_ROUTES } from "@/shared/constants/routes";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import { useEffect, useId } from "react";
import { BoxIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { enumToOptions } from "@/shared/utils/format";
import { ProductStatus } from "@/products/types/ProductStatus";
import BaseMultiInputFile from "@/shared/ui/components/BaseMultiInputFile";
import { useTranslation } from "react-i18next";
import { ProductType } from "@/products/types/ProductType";
import { useProductsStore } from "@/products/store/productsStore";
import { Product } from "@/products/types/Products";
import { postRequest } from "@/shared/tools/api";

type NewProductField = Field & {
  name: keyof NewProductData;
  icon?: React.ComponentType<{ className?: string }>;
  placeholder?: string;
  options?: Option[];
};

type Props = {
  onError: (error: string | null) => void;
};

const NewProductForm = ({ onError }: Props) => {
  const id = useId();
  const { t } = useTranslation();
  const { categories } = useCategoriesStore();
  const { addProduct } = useProductsStore();

  const categoriesOptions = categories.map((category) => ({
    label: category.globalName,
    value: String(category.id),
  }));

  const statusOptions = enumToOptions(ProductStatus).map((status) => ({
    ...status,
    label: t(`products:status.${status.label.toLowerCase()}`),
  }));

  const typeOptions = enumToOptions(ProductType).map((type) => ({
    ...type,
    label: t(`selects.type.options.${type.label.toLowerCase()}`),
  }));

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    NewProductInput,
    Product
  >({
    schema: NewProductSchema,
    apiUrl: API_ROUTES.PRODUCT_NEW,
    defaultValues: {
      categoryId: "",
      name: "",
      status: "",
      type: "",
      price: 0,
      discountOrder: "",
      discountPercentage: 0,
      image1: undefined,
      image2: undefined,
      image3: undefined,
    },
    requestFn: postRequest,
    asFormData: true,
    onSuccess: (product) => addProduct(product),
  });

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  const fields: NewProductField[] = [
    {
      name: "name",
      label: t("inputs.product.label"),
      type: "text",
      placeholder: t("inputs.product.placeholder"),
      autoComplete: "on",
      icon: BoxIcon,
    },
    {
      name: "categoryId",
      label: t("selects.category.label"),
      type: "select",
      placeholder: t("selects.category.placeholder"),
      options: categoriesOptions,
      autoComplete: "on",
    },
    {
      name: "status",
      label: t("selects.status.label"),
      type: "select",
      placeholder: t("selects.status.placeholder"),
      options: statusOptions,
      autoComplete: "on",
    },
    {
      name: "type",
      label: t("selects.type.label"),
      type: "select",
      placeholder: t("selects.type.placeholder"),
      options: typeOptions,
      autoComplete: "on",
    },
    {
      name: "price",
      label: t("inputs.price.label"),
      type: "number",
      placeholder: "",
      autoComplete: "on",
    },
    {
      name: "discountOrder",
      label: t("selects.discountOrder.label"),
      type: "select",
      placeholder: t("selects.discountOrder.placeholder"),
      options: [
        { label: t("selects.discountOrder.options.noDiscount"), value: "0" },
        { label: t("selects.discountOrder.options.first"), value: "1" },
        { label: t("selects.discountOrder.options.second"), value: "2" },
        { label: t("selects.discountOrder.options.third"), value: "3" },
      ],
      autoComplete: "on",
    },
    {
      name: "discountPercentage",
      label: t("inputs.discountPercentage.label"),
      type: "number",
      placeholder: "",
      autoComplete: "on",
    },
  ];

  return (
    <Form {...form}>
      <form
        className="grid gap-5 h-full items-start @md:grid-cols-2"
        onSubmit={handleSubmit}
      >
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
                <FormItem className="@md:has-[input[type=text]]:col-span-2">
                  <FormLabel htmlFor={name}>{label}</FormLabel>

                  {type === "select" && options ? (
                    <Select
                      value={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger
                          className="w-full border-primary/40"
                          id={name}
                          name={name}
                        >
                          <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                      </FormControl>
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
                  ) : (
                    <FormControl>
                      <BaseInputGroup
                        {...field}
                        value={String(field.value)}
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                        icon={Icon}
                      />
                    </FormControl>
                  )}
                  <FormMessage className="text-danger" />
                </FormItem>
              )}
            />
          )
        )}
        <FormItem className="@md:col-span-2 flex flex-col gap-2">
          <FormControl>
            <BaseMultiInputFile
              label={t("inputs.productImage.label")}
              count={3}
              names={["image1", "image2", "image3"]}
            />
          </FormControl>
        </FormItem>
        <Button
          type="submit"
          disabled={isLoading}
          className="@md:col-span-2 self-end"
        >
          {isLoading
            ? t("products:newBase.submit.loading")
            : t("products:newBase.submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default NewProductForm;

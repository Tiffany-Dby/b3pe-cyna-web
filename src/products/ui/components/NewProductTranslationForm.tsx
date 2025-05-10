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
import { API_ROUTES } from "@/shared/constants/routes";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import { useEffect, useId } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { useTranslation } from "react-i18next";
import {
  NewProductTranslationData,
  NewProductTranslationInput,
  NewProductTranslationSchema,
} from "@/products/schemas/NewProductTranslationSchema";
import { LOCALES } from "@/shared/constants/locales";
import { useFieldArray } from "react-hook-form";
import { Input } from "@/lib/components/ui/input";
import { Trash2Icon } from "lucide-react";
import { Textarea } from "@/lib/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/lib/components/ui/accordion";
import { Separator } from "@/lib/components/ui/separator";
import { useProductsStore } from "@/products/store/productsStore";
import { NewDetail } from "@/products/types/Products";
import { postRequest } from "@/shared/tools/api";

type NewProductTranslationField = Field & {
  name: keyof NewProductTranslationData;
  icon?: React.ComponentType<{ className?: string }>;
  options?: Option[];
};

type Props = {
  onError: (error: string | null) => void;
};

const NewProductTranslationForm = ({ onError }: Props) => {
  const id = useId();
  const { t } = useTranslation();
  const { products, addTranslation } = useProductsStore();

  const productsOptions = products.map((product) => ({
    label: product.name,
    value: String(product.id),
  }));

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    NewProductTranslationInput,
    NewDetail
  >({
    schema: NewProductTranslationSchema,
    apiUrl: API_ROUTES.PRODUCT_NEW_TRANSLATION,
    defaultValues: {
      productId: "",
      locale: "",
      descriptionTitle: "",
      descriptionText: "",
      benefits: [{ title: "", description: "" }],
      specifications: [{ criteria: "", description: "" }],
      functionalities: [{ value: "" }],
    },
    requestFn: postRequest,
    onSuccess: (translation) => addTranslation(translation),
  });

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  const fields: NewProductTranslationField[] = [
    {
      name: "productId",
      label: t("selects.product.label"),
      type: "select",
      placeholder: t("selects.product.placeholder"),
      options: productsOptions,
      autoComplete: "on",
    },
    {
      name: "locale",
      label: t("selects.locale.label"),
      type: "select",
      placeholder: t("selects.locale.placeholder"),
      options: LOCALES.OPTIONS,
      autoComplete: "on",
    },
    {
      name: "descriptionTitle",
      label: t("inputs.title.label"),
      type: "text",
      placeholder: t("inputs.title.placeholder"),
      autoComplete: "on",
    },
    {
      name: "descriptionText",
      label: t("inputs.description.label"),
      type: "text",
      placeholder: t("inputs.description.placeholder"),
      autoComplete: "on",
    },
  ];

  const {
    fields: benefits,
    append: appendBenefit,
    remove: removeBenefit,
  } = useFieldArray({ control: form.control, name: "benefits" });

  const {
    fields: specifications,
    append: appendSpecification,
    remove: removeSpecification,
  } = useFieldArray({ control: form.control, name: "specifications" });

  const {
    fields: functionalities,
    append: appendFunctionality,
    remove: removeFunctionality,
  } = useFieldArray({ control: form.control, name: "functionalities" });

  return (
    <Form {...form}>
      <form
        className="grid gap-5 @md:grid-cols-2 h-full"
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
                      {...field}
                      value={String(field.value)}
                      onValueChange={field.onChange}
                      name={name}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full border-primary/40">
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
        <fieldset className="@md:col-span-2">
          <Accordion type="single" collapsible className="h-full">
            <AccordionItem
              value="benefitsFields"
              className="h-full data-[state=closed]:[&_h3]:h-full"
            >
              <AccordionTrigger className="items-center cursor-pointer hover:no-underline">
                <legend>{t("products:newTranslation.benefits.legend")}</legend>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pt-4">
                {benefits.map((benefit, i) => (
                  <div key={benefit.id} className="grid border rounded-md">
                    <div className="flex flex-col gap-4 p-4">
                      <FormField
                        control={form.control}
                        name={`benefits.${i}.title`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={benefit.id + "-title"}>
                              {t("products:newTranslation.benefits.title")}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={benefit.id + "-title"}
                                name={benefit.id + "-title"}
                                placeholder={t(
                                  "products:newTranslation.benefits.title"
                                )}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`benefits.${i}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={benefit.id + "-description"}>
                              {t(
                                "products:newTranslation.benefits.description"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full"
                                {...field}
                                id={benefit.id + "-description"}
                                name={benefit.id + "-description"}
                                placeholder={t(
                                  "products:newTranslation.benefits.description"
                                )}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      {benefits.length > 1 && (
                        <div className="flex justify-end w-full">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeBenefit(i)}
                          >
                            <Trash2Icon />{" "}
                            {t("products:newTranslation.actions.remove")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => appendBenefit({ title: "", description: "" })}
                >
                  {t("products:newTranslation.actions.add")}
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </fieldset>
        <Separator className="@md:col-span-2 self-center" />
        <fieldset className="@md:col-span-2">
          <Accordion type="single" collapsible className="h-full">
            <AccordionItem
              value="specificationsFields"
              className="h-full data-[state=closed]:[&_h3]:h-full"
            >
              <AccordionTrigger className="items-center cursor-pointer hover:no-underline">
                <legend>
                  {t("products:newTranslation.specifications.legend")}
                </legend>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pt-4">
                {specifications.map((specification, i) => (
                  <div
                    key={specification.id}
                    className="grid border rounded-md"
                  >
                    <div className="flex flex-col gap-4 p-4">
                      <FormField
                        control={form.control}
                        name={`specifications.${i}.criteria`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={specification.id + "-criteria"}>
                              {t(
                                "products:newTranslation.specifications.criteria"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={specification.id + "-criteria"}
                                name={specification.id + "-criteria"}
                                placeholder={t(
                                  "products:newTranslation.specifications.criteria"
                                )}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`specifications.${i}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              htmlFor={specification.id + "-description"}
                            >
                              {t(
                                "products:newTranslation.specifications.description"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                className="w-full"
                                {...field}
                                id={specification.id + "-description"}
                                name={specification.id + "-description"}
                                placeholder={t(
                                  "products:newTranslation.specifications.description"
                                )}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      {specifications.length > 1 && (
                        <div className="flex justify-end w-full">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeSpecification(i)}
                          >
                            <Trash2Icon />{" "}
                            {t("products:newTranslation.actions.remove")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    appendSpecification({ criteria: "", description: "" })
                  }
                >
                  {t("products:newTranslation.actions.add")}
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </fieldset>
        <Separator className="@md:col-span-2 self-center" />
        <fieldset className="@md:col-span-2">
          <Accordion type="single" collapsible className="h-full">
            <AccordionItem
              value="specificationsFields"
              className="h-full data-[state=closed]:[&_h3]:h-full"
            >
              <AccordionTrigger className="items-center cursor-pointer hover:no-underline">
                <legend>
                  {t("products:newTranslation.functionalities.legend")}
                </legend>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 pt-4">
                {functionalities.map((functionality, i) => (
                  <div
                    key={functionality.id}
                    className="grid border rounded-md"
                  >
                    <div className="flex flex-col gap-4 p-4">
                      <FormField
                        control={form.control}
                        name={`functionalities.${i}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel htmlFor={functionality.id + "-value"}>
                              {t(
                                "products:newTranslation.functionalities.functionality"
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                id={functionality.id + "-value"}
                                name={functionality.id + "-value"}
                                placeholder={t(
                                  "products:newTranslation.functionalities.functionality"
                                )}
                              />
                            </FormControl>
                            <FormMessage className="text-danger" />
                          </FormItem>
                        )}
                      />
                      {functionalities.length > 1 && (
                        <div className="flex justify-end w-full">
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => removeFunctionality(i)}
                          >
                            <Trash2Icon />{" "}
                            {t("products:newTranslation.actions.remove")}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() => appendFunctionality({ value: "" })}
                >
                  {t("products:newTranslation.actions.add")}
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </fieldset>
        <Button
          type="submit"
          disabled={isLoading}
          className="@md:col-span-2 self-end"
        >
          {isLoading
            ? t("products:newTranslation.submit.loading")
            : t("products:newTranslation.submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default NewProductTranslationForm;

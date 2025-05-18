import {
  NewPromotionsTextData,
  NewPromotionsTextSchema,
} from "@/home/schemas/NewPromotionsTextSchema";
import { usePromotionsTextStore } from "@/home/store/promotionsTextsStore";
import { NewPromotionsText } from "@/home/types/PromotionsCarousel";
import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { Textarea } from "@/lib/components/ui/textarea";
import { LOCALES } from "@/shared/constants/locales";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type NewPromotionsTextField = Field & {
  name: keyof NewPromotionsTextData;
  options?: Option[];
};

type Props = {
  onError: (error: string | null) => void;
};

const NewPromotionsTextForm = ({ onError }: Props) => {
  const { t } = useTranslation();
  const { addPromotionsText } = usePromotionsTextStore();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    NewPromotionsTextData,
    NewPromotionsText
  >({
    schema: NewPromotionsTextSchema,
    apiUrl: API_ROUTES.PROMOTION_CAROUSEL_TEXT_NEW,
    defaultValues: {
      locale: "",
      text: "",
    },
    requestFn: postRequest,
    onSuccess: (newText) => addPromotionsText(newText),
    toastMsgs: {
      loading: t("contents:toast.promotionsText.new.loading"),
      success: t("contents:toast.promotionsText.new.success"),
      error: t("contents:toast.error"),
    },
  });

  const fields: NewPromotionsTextField[] = [
    {
      name: "locale",
      label: t("selects.locale.label"),
      type: "select",
      placeholder: t("selects.locale.placeholder"),
      options: LOCALES.OPTIONS,
      autoComplete: "off",
    },
    {
      name: "text",
      label: t("inputs.promotionsText.label"),
      type: "textarea",
      placeholder: t("inputs.promotionsText.placeholder"),
      autoComplete: "on",
    },
  ];

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  return (
    <Form {...form}>
      <form className="grid gap-5" onSubmit={handleSubmit}>
        {fields.map(
          (
            { name, label, type, placeholder, options, autoComplete },
            index
          ) => (
            <FormField
              key={index}
              control={form.control}
              name={name}
              render={({ field }) => (
                <>
                  {type === "select" && options && (
                    <FormItem>
                      <FormLabel htmlFor={name}>{label}</FormLabel>
                      <BaseSelect
                        control={true}
                        value={field.value}
                        onChange={field.onChange}
                        name={name}
                        placeholder={placeholder}
                        options={options}
                      />
                      <FormMessage className="text-danger" />
                    </FormItem>
                  )}
                  {type === "textarea" && (
                    <FormItem>
                      <FormLabel htmlFor={name}>{label}</FormLabel>
                      <Textarea
                        {...field}
                        id={name}
                        name={name}
                        placeholder={placeholder}
                        autoComplete={autoComplete}
                      />
                      <FormMessage className="text-danger" />
                    </FormItem>
                  )}
                </>
              )}
            />
          )
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? t("contents:newPromotionsText.submit.loading")
            : t("contents:newPromotionsText.submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default NewPromotionsTextForm;

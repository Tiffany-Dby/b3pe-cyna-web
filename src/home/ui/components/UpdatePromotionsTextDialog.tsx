import {
  UpdatePromotionsTextData,
  UpdatePromotionsTextSchema,
} from "@/home/schemas/UpdatePromotionsTextSchema";
import { usePromotionsTextStore } from "@/home/store/promotionsTextsStore";
import {
  PromotionsText,
  UpdatedPromotionsText,
} from "@/home/types/PromotionsCarousel";
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
import { putRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import BaseDialog from "@/shared/ui/components/BaseDialog";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import { useTranslation } from "react-i18next";

type Props = {
  selected: PromotionsText;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type UpdatePromotionsTextField = Field & {
  name: keyof UpdatePromotionsTextData;
  options?: Option[];
};

const UpdatePromotionsTextDialog = ({
  selected,
  open,
  onOpenChange,
}: Props) => {
  const { t } = useTranslation();
  const { updatePromotionsText } = usePromotionsTextStore();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    UpdatePromotionsTextData,
    UpdatedPromotionsText
  >({
    schema: UpdatePromotionsTextSchema,
    apiUrl: API_ROUTES.PROMOTION_CAROUSEL_TEXT_UPDATE,
    defaultValues: {
      locale: selected.locale,
      text: selected.text,
    },
    requestFn: putRequest,
    onSuccess: (updated) => {
      updatePromotionsText(updated);
      onOpenChange(false);
    },
    toastMsgs: {
      loading: t("contents:toast.promotionsText.update.loading"),
      success: t("contents:toast.promotionsText.update.success"),
      error: t("contents:toast.error"),
    },
  });

  const fields: UpdatePromotionsTextField[] = [
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

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.update.title")}
      description={t("contents:promotionsTextList.dialog.update.description")}
      showFooter={false}
    >
      <>
        {serverError && <p className="text-danger">{serverError}</p>}
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                    <FormItem>
                      <FormLabel htmlFor={name}>{label}</FormLabel>
                      {type === "select" && options && (
                        <BaseSelect
                          control
                          name={name}
                          value={field.value}
                          options={options}
                          placeholder={placeholder}
                          onChange={field.onChange}
                          disabled
                        />
                      )}
                      {type === "textarea" && (
                        <Textarea
                          {...field}
                          id={name}
                          name={name}
                          placeholder={placeholder}
                          autoComplete={autoComplete}
                        />
                      )}
                      <FormMessage className="text-danger" />
                    </FormItem>
                  )}
                />
              )
            )}
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

export default UpdatePromotionsTextDialog;

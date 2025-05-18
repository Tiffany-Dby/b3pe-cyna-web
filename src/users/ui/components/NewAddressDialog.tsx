import BaseDialog from "@/shared/ui/components/BaseDialog";
import { Button } from "@/lib/components/ui/button";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import {
  NewAddressData,
  NewAddressInput,
  NewAddressSchema,
} from "@/users/schemas/NewAddressSchema";
import { useAddressesStore } from "@/users/store/addressesStore";
import { Address } from "@/users/types/Address";

type NewAddressField = Field & {
  name: keyof NewAddressData;
  icon?: React.ComponentType<{ className?: string }>;
  options?: Option[];
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NewAddressDialog = ({ open, onOpenChange }: Props) => {
  const { t } = useTranslation();
  const { addUserAddress } = useAddressesStore();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    NewAddressInput,
    Address
  >({
    schema: NewAddressSchema,
    apiUrl: API_ROUTES.USER_ADDRESS_NEW,
    defaultValues: {
      type: "",
      street: "",
      number: "",
      complement: "",
      zipCode: "",
      city: "",
      region: "",
      country: "",
    },
    requestFn: postRequest,
    onSuccess: (newAddress) => {
      addUserAddress(newAddress);
      onOpenChange(false);
    },
    toastMsgs: {
      success: t("account:settings.address.toast.new.success"),
      loading: t("account:settings.address.toast.new.loading"),
      error: t("account:settings.address.toast.error"),
    },
  });

  const fields: NewAddressField[] = [
    {
      name: "type",
      label: t("selects.addressType.label"),
      type: "select",
      placeholder: t("selects.addressType.placeholder"),
      options: [
        { label: t("selects.addressType.options.billing"), value: "0" },
        { label: t("selects.addressType.options.shipping"), value: "1" },
      ],
      autoComplete: "off",
    },
    {
      name: "number",
      label: t("inputs.number.label"),
      type: "input",
      placeholder: t("inputs.number.placeholder"),
      autoComplete: "off",
    },
    {
      name: "street",
      label: t("inputs.street.label"),
      type: "input",
      placeholder: t("inputs.street.placeholder"),
      autoComplete: "street-address",
    },

    {
      name: "complement",
      label: t("inputs.complement.label"),
      type: "input",
      placeholder: t("inputs.complement.placeholder"),
      autoComplete: "off",
    },
    {
      name: "zipCode",
      label: t("inputs.zipCode.label"),
      type: "input",
      placeholder: t("inputs.zipCode.placeholder"),
      autoComplete: "postal-code",
    },
    {
      name: "city",
      label: t("inputs.city.label"),
      type: "input",
      placeholder: t("inputs.city.placeholder"),
      autoComplete: "off",
    },
    {
      name: "region",
      label: t("inputs.region.label"),
      type: "input",
      placeholder: t("inputs.region.placeholder"),
      autoComplete: "off",
    },
    {
      name: "country",
      label: t("inputs.country.label"),
      type: "input",
      placeholder: t("inputs.country.placeholder"),
      autoComplete: "country-name",
    },
  ];

  return (
    <BaseDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("dialog.new.title")}
      description={t("account:settings.address.dialog.new.description")}
      showFooter={false}
    >
      <>
        {serverError && <p className="text-danger">{serverError}</p>}
        <Form {...form}>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                    <FormItem>
                      <FormLabel htmlFor={name}>{label}</FormLabel>
                      {type === "select" && options ? (
                        <BaseSelect
                          control
                          value={String(field.value)}
                          onChange={field.onChange}
                          name={name}
                          placeholder={placeholder}
                          options={options}
                        />
                      ) : (
                        <BaseInputGroup
                          {...field}
                          value={field.value}
                          id={name}
                          type={type}
                          placeholder={placeholder}
                          autoComplete={autoComplete}
                          icon={Icon}
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
                  : t("dialog.actions.confirm")}
              </Button>
            </div>
          </form>
        </Form>
      </>
    </BaseDialog>
  );
};

export default NewAddressDialog;

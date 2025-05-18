import { Button } from "@/lib/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/lib/components/ui/form";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { putRequest } from "@/shared/tools/api";
import { Field } from "@/shared/types/Field";
import { Option } from "@/shared/types/Option";
import BaseInputGroup from "@/shared/ui/components/BaseInputGroup";
import BaseSelect from "@/shared/ui/components/BaseSelect";
import {
  UpdateAddressData,
  UpdateAddressInput,
  UpdateAddressSchema,
} from "@/users/schemas/UpdateAddressSchema";
import { Address } from "@/users/types/Address";
import { SquarePenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

type UpdateAddressField = Field & {
  name: keyof UpdateAddressData;
  icon?: React.ComponentType<{ className?: string }>;
  options?: Option[];
};

type Props = {
  address: Address;
};

const UpdateAddressForm = ({ address }: Props) => {
  const { t } = useTranslation();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    UpdateAddressInput,
    Address
  >({
    schema: UpdateAddressSchema,
    apiUrl: API_ROUTES.USER_ADDRESS_UPDATE,
    defaultValues: {
      id: address.id,
      type: address.type,
      street: address.street,
      number: address.number,
      complement: address.complement,
      zipCode: address.zipCode,
      city: address.city,
      region: address.region,
      country: address.country,
    },
    requestFn: putRequest,
    toastMsgs: {
      success: t("account:settings.address.toast.update.success"),
      loading: t("account:settings.address.toast.update.loading"),
      error: t("account:settings.address.toast.error"),
    },
  });

  const fields: UpdateAddressField[] = [
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
                        icon={SquarePenIcon}
                      />
                    )}

                    <FormMessage className="text-danger" />
                  </FormItem>
                )}
              />
            )
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? t("account:settings.submit.loading")
              : t("account:settings.submit.action")}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UpdateAddressForm;

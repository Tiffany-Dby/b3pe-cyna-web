import { Button } from "@/lib/components/ui/button";
import { Form, FormField, FormItem } from "@/lib/components/ui/form";
import {
  UpdateImageData,
  UpdateImageSchema,
} from "@/products/schemas/UpdateImageSchema";
import { useProductsStore } from "@/products/store/productsStore";
import { Product, Slot } from "@/products/types/Products";
import { API_ROUTES } from "@/shared/constants/routes";
import useCustomForm from "@/shared/hooks/useCustomForm";
import { postRequest } from "@/shared/tools/api";
import BaseMultiInputFile from "@/shared/ui/components/BaseMultiInputFile";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  productId: number;
  slot: Slot;
  onError: (error: string | null) => void;
};

const UpdateImageForm = ({ productId, slot, onError }: Props) => {
  const { t } = useTranslation();
  const { updateSelected, updateImage } = useProductsStore();

  const { form, handleSubmit, isLoading, serverError } = useCustomForm<
    UpdateImageData,
    Product
  >({
    schema: UpdateImageSchema,
    apiUrl: `${API_ROUTES.PRODUCT_UPDATE}/image${slot}`,
    defaultValues: {
      productId: String(productId),
      image: undefined,
    },
    requestFn: postRequest,
    asFormData: true,
    onSuccess: (product) => {
      updateSelected(product);
      updateImage(product, slot);
    },
  });

  useEffect(() => {
    onError(serverError);
  }, [serverError]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <BaseMultiInputFile
                {...field}
                label={t("products:updateProduct.formImage.label")}
                count={1}
                names={["image"]}
              />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? t("products:updateProduct.submit.loading")
            : t("products:updateProduct.submit.action")}
        </Button>
      </form>
    </Form>
  );
};

export default UpdateImageForm;

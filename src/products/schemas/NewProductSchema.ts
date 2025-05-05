import { z } from "zod";
import { FILES } from "@/products/constants/files";

const NewProductSchema = z.object({
  categoryId: z.preprocess((val) => {
    if (val === "" || val == null) return undefined;
    return Number(val);
  }, z.number({ required_error: "common:selects.category.validation.min" }).int()),
  name: z.string().min(2, "common:inputs.product.validation.min"),
  status: z.preprocess((val) => {
    if (val === "" || val == null) return undefined;
    return Number(val);
  }, z.number({ required_error: "common:selects.status.validation.min" }).int()),
  basePrice: z.preprocess(
    (val) => {
      if (val === "" || val == null) return undefined;
      return Number(val);
    },
    z
      .number({ required_error: "common:inputs.basePrice.validation.required" })
      .min(0.01, "common:inputs.basePrice.validation.min")
      .transform((euros) => euros * 100)
  ),
  price: z.preprocess(
    (val) => {
      if (val === "" || val == null) return undefined;
      return Number(val);
    },
    z
      .number({ required_error: "common:inputs.price.validation.required" })
      .min(0.01, "common:inputs.price.validation.min")
      .transform((euros) => euros * 100)
  ),
  discountOrder: z.preprocess((val) => {
    if (val === "" || val == null) return undefined;
    return Number(val);
  }, z.number({ required_error: "common:selects.discountOrder.validation.min" }).int()),
  discountPercentage: z.preprocess((val) => {
    if (val === "" || val == null) return undefined;
    return Number(val);
  }, z.number({ required_error: "common:selects.discountPercentage.validation.required" }).int("common:selects.discountPercentage.validation.int").min(0, "common:selects.discountPercentage.validation.min").max(100, "common:selects.discountPercentage.validation.max")),
  image1: z
    .instanceof(File, { message: "common:inputs.productImage.validation.min" })
    .refine((file) => file.size <= FILES.MAX_IMAGE_SIZE, {
      message: "common:inputs.productImage.validation.maxSize",
    })
    .refine(
      (file) => FILES.ACCEPTED_IMAGE_MIMETYPES.includes(file.type),
      "common:inputs.productImage.validation.mimeTypes"
    ),

  image2: z
    .instanceof(File, { message: "common:inputs.productImage.validation.min" })
    .refine((file) => file.size <= FILES.MAX_IMAGE_SIZE, {
      message: "common:inputs.productImage.validation.maxSize",
    })
    .refine(
      (file) => FILES.ACCEPTED_IMAGE_MIMETYPES.includes(file.type),
      "common:inputs.productImage.validation.mimeTypes"
    ),

  image3: z
    .instanceof(File, { message: "common:inputs.productImage.validation.min" })
    .refine(
      (file) => file.size <= FILES.MAX_IMAGE_SIZE,
      "common:inputs.productImage.validation.maxSize"
    )
    .refine(
      (file) => FILES.ACCEPTED_IMAGE_MIMETYPES.includes(file.type),
      "common:inputs.productImage.validation.mimeTypes"
    ),
});

export { NewProductSchema };
export type NewProductData = z.infer<typeof NewProductSchema>;

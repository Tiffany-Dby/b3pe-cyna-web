import { z } from "zod";
import { FILES } from "@/products/constants/files";

const NewProductSchema = z.object({
  categoryId: z
    .union([
      z.string().min(1, "common:selects.category.validation.min").default(""),
      z.number(),
    ])
    .refine((value) => !isNaN(Number(value)), {
      message: "common:selects.category.validation.min",
    })
    .transform((val) => Number(val)),
  name: z.string().min(2, "common:inputs.product.validation.min"),
  status: z
    .union([
      z.string().min(1, "common:selects.status.validation.min").default(""),
      z.number(),
    ])
    .refine((value) => !isNaN(Number(value)), {
      message: "common:selects.status.validation.min",
    })
    .transform((val) => Number(val)),
  type: z
    .union([
      z.string().min(1, "common:selects.type.validation.min").default(""),
      z.number(),
    ])
    .refine((value) => !isNaN(Number(value)), {
      message: "common:selects.type.validation.min",
    })
    .transform((val) => Number(val)),
  basePrice: z.preprocess(
    (val) => {
      if (val === "" || val == null) return undefined;
      return Number(val);
    },
    z
      .number({ required_error: "common:inputs.price.validation.required" })
      .min(0.01, "common:inputs.price.validation.min")
      .transform((euros) => euros * 100)
  ),
  discountOrder: z
    .union([
      z
        .string()
        .min(1, "common:selects.discountOrder.validation.min")
        .default(""),
      z.number(),
    ])
    .refine((value) => !isNaN(Number(value)), {
      message: "common:selects.discountOrder.validation.min",
    })
    .transform((val) => Number(val)),
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
export type NewProductInput = z.input<typeof NewProductSchema>;
export type NewProductData = z.infer<typeof NewProductSchema>;

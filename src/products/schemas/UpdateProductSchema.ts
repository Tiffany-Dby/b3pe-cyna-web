import { z } from "zod";

const UpdateProductSchema = z.object({
  id: z.number().int("Product id required"),
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
});

export { UpdateProductSchema };
export type UpdateProductInput = z.input<typeof UpdateProductSchema>;
export type UpdateProductData = z.infer<typeof UpdateProductSchema>;

import { z } from "zod";

const Benefit = z.object({
  title: z.string().min(1, "common:inputs.title.validation.min"),
  description: z.string().min(1, "common:inputs.description.validation.min"),
});

const Specification = z.object({
  criteria: z.string().min(1, "common:inputs.criteria.validation.min"),
  description: z.string().min(1, "common:inputs.description.validation.min"),
});

const Functionality = z.object({
  value: z.string().min(1, "common:inputs.functionality.validation.min"),
});

const NewProductTranslationSchema = z.object({
  productId: z
    .union([
      z.string().min(1, "common:selects.product.validation.min").default(""),
      z.number(),
    ])
    .refine((value) => !isNaN(Number(value)), {
      message: "common:selects.product.validation.min",
    })
    .transform((val) => Number(val)),
  locale: z.string().min(2, "common:selects.locale.validation.min"),
  descriptionTitle: z.string().min(2, "common:inputs.title.validation.min"),
  descriptionText: z
    .string()
    .min(2, "common:inputs.description.validation.min"),
  benefits: z.array(Benefit).min(1, "common:inputs.benefits.validation.min"),
  functionalities: z
    .array(Functionality)
    .min(1, "common:inputs.functionalities.validation.min"),
  specifications: z
    .array(Specification)
    .min(1, "common:inputs.specifications.validation.min"),
});

export { NewProductTranslationSchema };
export type NewProductTranslationInput = z.input<
  typeof NewProductTranslationSchema
>;
export type NewProductTranslationData = z.infer<
  typeof NewProductTranslationSchema
>;

import { z } from "zod";

const UpdateLocaleCategorySchema = z.object({
  localeId: z.string().min(1, "common:selects.category.validation.min"),
  locale: z.string().min(2, "common:selects.locale.validation.min"),
  name: z.string().min(2, "common:inputs.category.validation.min"),
});

export { UpdateLocaleCategorySchema };
export type UpdateLocaleCategoryData = z.infer<
  typeof UpdateLocaleCategorySchema
>;

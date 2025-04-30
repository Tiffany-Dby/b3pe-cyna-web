import { z } from "zod";

const NewLocaleCategorySchema = z.object({
  id: z.string().min(1, "common:selects.category.validation.min"),
  locale: z.string().min(2, "common:selects.locale.validation.min"),
  name: z.string().min(2, "common:inputs.category.validation.min"),
});

export { NewLocaleCategorySchema };
export type NewLocaleCategoryData = z.infer<typeof NewLocaleCategorySchema>;

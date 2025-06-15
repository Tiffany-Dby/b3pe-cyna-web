import { z } from "zod";

const NewCategorySchema = z.object({
  globalName: z.string().min(2, "common:inputs.category.validation.min"),
});

export { NewCategorySchema };
export type NewCategoryData = z.infer<typeof NewCategorySchema>;

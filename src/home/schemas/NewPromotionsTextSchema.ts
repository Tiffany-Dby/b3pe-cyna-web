import { z } from "zod";

const NewPromotionsTextSchema = z.object({
  locale: z.string().min(2, "common:selects.locale.validation.min"),
  text: z.string().min(2, "common:inputs.promotionsText.validation.min"),
});

export { NewPromotionsTextSchema };
export type NewPromotionsTextData = z.infer<typeof NewPromotionsTextSchema>;

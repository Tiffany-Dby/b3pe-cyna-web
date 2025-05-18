import { z } from "zod";

const UpdatePromotionsTextSchema = z.object({
  locale: z.string().min(2, "common:selects.locale.validation.min"),
  text: z.string().min(2, "common:inputs.promotionsText.validation.min"),
});

export { UpdatePromotionsTextSchema };
export type UpdatePromotionsTextData = z.infer<
  typeof UpdatePromotionsTextSchema
>;

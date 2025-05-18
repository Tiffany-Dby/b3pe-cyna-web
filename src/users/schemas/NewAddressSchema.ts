import { z } from "zod";

const NewAddressSchema = z.object({
  type: z
    .union([
      z.string().min(1, "common:selects.category.validation.min").default(""),
      z.number(),
    ])
    .refine((value) => !isNaN(Number(value)), {
      message: "common:selects.category.validation.min",
    })
    .transform((val) => Number(val)),
  street: z.string().min(2, "common:selects.street.validation.min"),
  number: z.string().min(1, "common:inputs.number.validation.min"),
  complement: z.string().optional(),
  zipCode: z.string().min(2, "common:inputs.zipCode.validation.min"),
  city: z.string().min(2, "common:inputs.city.validation.min"),
  region: z.string().min(2, "common:inputs.region.validation.min"),
  country: z.string().min(2, "common:inputs.country.validation.min"),
});

export { NewAddressSchema };
export type NewAddressInput = z.input<typeof NewAddressSchema>;
export type NewAddressData = z.infer<typeof NewAddressSchema>;

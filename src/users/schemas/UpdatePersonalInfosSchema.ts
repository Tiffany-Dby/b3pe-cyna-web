import { z } from "zod";

const UpdatePersonInfosSchema = z.object({
  firstName: z.string().min(2, "common:inputs.firstName.validation.min"),
  lastName: z.string().min(2, "common:inputs.lastName.validation.min"),
  email: z.string().email("common:inputs.email.validation.email"),
});

export { UpdatePersonInfosSchema };
export type UpdatePersonalInfoData = z.infer<typeof UpdatePersonInfosSchema>;

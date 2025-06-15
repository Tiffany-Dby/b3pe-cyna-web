import { z } from "zod";

const RequestResetPasswordSchema = z.object({
  email: z.string().email("common:inputs.email.validation.email"),
});

export { RequestResetPasswordSchema };
export type RequestResetPasswordData = z.infer<
  typeof RequestResetPasswordSchema
>;

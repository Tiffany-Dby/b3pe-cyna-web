import { z } from "zod";

const ResetPasswordSchema = z.object({
  email: z.string().email("common:inputs.email.validation.email"),
});

export { ResetPasswordSchema };
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

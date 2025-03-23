import { z } from "zod";

const ResetPasswordSchema = z.object({
  email: z.string().email("L'email est invalide"),
});

export { ResetPasswordSchema };
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

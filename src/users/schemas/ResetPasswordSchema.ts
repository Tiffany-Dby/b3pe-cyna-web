import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    token: z.string().min(1, "common:inputs.validation.token"),
    newPassword: z
      .string()
      .min(8, "common:inputs.password.validation.min")
      .regex(/[A-Z]/, "common:inputs.password.validation.uppercase")
      .regex(/[a-z]/, "common:inputs.password.validation.lowercase")
      .regex(/\d/, "common:inputs.password.validation.number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "common:inputs.password.validation.specialChar"
      ),
    confirmNewPassword: z
      .string()
      .min(8, { message: "common:inputs.confirmPassword.validation.min" }),
  })
  .refine((field) => field.newPassword === field.confirmNewPassword, {
    message: "common:inputs.confirmPassword.validation.match",
    path: ["confirmPassword"],
  });

export { ResetPasswordSchema };
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;

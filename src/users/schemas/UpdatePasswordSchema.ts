import { z } from "zod";

const UpdatePasswordSchema = z
  .object({
    previousPassword: z
      .string()
      .min(8, "common:inputs.currentPassword.validation.min"),
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
      .min(8, "common:inputs.confirmPassword.validation.min"),
  })
  .refine((field) => field.newPassword === field.confirmNewPassword, {
    message: "common:inputs.confirmPassword.validation.match",
    path: ["confirmPassword"],
  });

export { UpdatePasswordSchema };
export type UpdatePasswordData = z.infer<typeof UpdatePasswordSchema>;

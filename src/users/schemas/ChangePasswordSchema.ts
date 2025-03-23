import { z } from "zod";

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, "Le mot de passe est requis"),
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit comporter 8 caractères minimum")
      .regex(/[A-Z]/, "Le mot de passe doit comporter 1 majuscule minimum")
      .regex(/[a-z]/, "Le mot de passe doit comporter 1 une minuscule minimum")
      .regex(/\d/, "Le mot de passe doit comporter 1 un chiffre minimum")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Le mot de passe doit comporter 1 caractère spécial minimum"
      ),
    confirmPassword: z.string(),
  })
  .refine((field) => field.newPassword === field.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export { ChangePasswordSchema };
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;

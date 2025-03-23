import { z } from "zod";

const SignUpSchema = z
  .object({
    firstName: z.string().min(2, "Le prénom est requis"),
    lastName: z.string().min(2, "Le nom est requis"),
    email: z.string().email("L'email est invalide"),
    password: z
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
  .refine((field) => field.password === field.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export { SignUpSchema };
export type SignUpData = z.infer<typeof SignUpSchema>;

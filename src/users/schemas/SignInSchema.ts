import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email("L'email est invalide"),
  password: z.string().min(8, "Le mot de passe est requis"),
});

export { SignInSchema };
export type SignInData = z.infer<typeof SignInSchema>;

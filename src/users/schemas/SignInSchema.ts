import { z } from "zod";

const SignInSchema = z.object({
  email: z.string().email("common:inputs.email.validation.email"),
  password: z.string().min(8, "common:inputs.password.validation.required"),
});

export { SignInSchema };
export type SignInData = z.infer<typeof SignInSchema>;

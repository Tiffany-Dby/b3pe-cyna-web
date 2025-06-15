import { z } from "zod";

const SignUpSchema = z
  .object({
    firstName: z.string().min(2, "common:inputs.firstName.validation.min"),
    lastName: z.string().min(2, "common:inputs.lastName.validation.min"),
    email: z.string().email("common:inputs.email.validation.email"),
    password: z
      .string()
      .min(8, "common:inputs.password.validation.min")
      .regex(/[A-Z]/, "common:inputs.password.validation.uppercase")
      .regex(/[a-z]/, "common:inputs.password.validation.lowercase")
      .regex(/\d/, "common:inputs.password.validation.number")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "common:inputs.password.validation.specialChar"
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "common:inputs.confirmPassword.validation.min" }),
  })
  .refine((field) => field.password === field.confirmPassword, {
    message: "common:inputs.confirmPassword.validation.match",
    path: ["confirmPassword"],
  });

export { SignUpSchema };
export type SignUpData = z.infer<typeof SignUpSchema>;

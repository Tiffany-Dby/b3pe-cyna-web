import { z } from "zod";

const PersonInfosSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom est requis"),
  email: z.string().email("L'email est invalide"),
});

export { PersonInfosSchema };
export type PersonalInfoData = z.infer<typeof PersonInfosSchema>;

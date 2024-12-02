import { z } from "zod";

export const validationSchema = z.strictObject({
  email: z
    .string({ required_error: "Email é obrigatório." })
    .email({ message: "Email inválido." }),
  password: z.string({ required_error: "Senha é obrigatória." }),
});

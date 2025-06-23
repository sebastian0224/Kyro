import { z } from "zod";

export const portfolioSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(60, "Máximo 60 caracteres"),
});

import { z } from "zod";

export const portfolioSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(60, "Maximum 60 characters"),
});

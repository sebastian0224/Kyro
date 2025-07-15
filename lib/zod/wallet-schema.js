import { z } from "zod";

export const walletSchema = z
  .string()
  .trim()
  .refine((val) => val.startsWith("0x"), {
    message: "Solo se aceptan direcciones EVM (0x...)",
  })
  .transform((val) => val.toLowerCase()) //
  .refine((val) => /^0x[a-f0-9]{40}$/.test(val), {
    message: "Invalid wallet format.",
  });

import { z } from "zod";

export const walletSchema = z
  .string()
  .trim()
  .refine((val) => val.startsWith("0x"), {
    message: "Only EVM addresses (0x...) are accepted",
  })
  .transform((val) => val.toLowerCase()) //
  .refine((val) => /^0x[a-f0-9]{40}$/.test(val), {
    message: "Invalid wallet format.",
  });

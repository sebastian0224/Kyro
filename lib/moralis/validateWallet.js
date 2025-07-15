"use server";

import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";
import { initMoralis } from "../moralis";
import { walletSchema } from "@/lib/zod/wallet-schema";

export async function validateWalletAddress(address, existingWallets) {
  const parsed = walletSchema.safeParse(address);
  if (!parsed.success) {
    const customMessage =
      parsed.error.errors?.[0]?.message || "Invalid wallet address.";
    return { success: false, error: customMessage };
  }

  const cleanAddress = parsed.data;

  if (existingWallets.includes(cleanAddress)) {
    return { success: false, error: "Wallet already added." };
  }

  try {
    await initMoralis();

    const result = await Moralis.EvmApi.balance.getNativeBalance({
      address: cleanAddress,
      chain: EvmChain.ETHEREUM,
    });

    const balance = result?.raw?.balance;
    if (balance === undefined) {
      return { success: false, error: "Wallet not found." };
    }

    return { success: true, address: cleanAddress };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Could not verify wallet with Moralis." };
  }
}

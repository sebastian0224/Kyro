const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
import { walletSchema } from "@/lib/zod/wallet-schema";

export async function validateWalletAddressV2(address, existingWallets) {
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

  // Use the newer Portfolio API to validate wallet existence
  try {
    const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

    const requestBody = {
      addresses: [
        {
          address: cleanAddress,
          networks: ["eth-mainnet"],
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    // Check if the response indicates a valid wallet
    // Even if the wallet has no tokens, Alchemy will return a valid response structure
    if (data.data && Array.isArray(data.data.tokens)) {
      return { success: true, address: cleanAddress };
    }

    return { success: false, error: "Wallet not found on blockchain." };
  } catch (error) {
    console.error("Alchemy validation error:", error);
    return {
      success: false,
      error: "Error validating wallet. Please try again.",
    };
  }
}

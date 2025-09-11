"use server";

import { walletSchema } from "@/lib/zod/wallet-schema";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

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

export async function calculateWalletNetWorth(walletAddress) {
  const url = `https://api.g.alchemy.com/data/v1/${ALCHEMY_API_KEY}/assets/tokens/by-address`;

  const networks = [
    "eth-mainnet",
    "polygon-mainnet",
    "bnb-mainnet",
    "base-mainnet",
    "avax-mainnet",
  ];

  const requestBody = {
    includeNativeTokens: true,
    addresses: [
      {
        address: walletAddress,
        networks: networks,
      },
    ],
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!data?.data?.tokens) return 0;

    let totalUSD = 0;

    for (const token of data.data.tokens) {
      const decimals = token.tokenMetadata?.decimals ?? 18;
      const rawBalance = token.tokenBalance || "0";
      const balance = Number(rawBalance) / Math.pow(10, decimals);

      const priceObj = token.tokenPrices?.find((p) => p.currency === "usd");
      const priceUSD = priceObj ? Number(priceObj.value) : 0;

      totalUSD += balance * priceUSD;
    }

    return totalUSD;
  } catch (error) {
    console.error("calculateWalletNetWorth error:", error);
    return 0;
  }
}

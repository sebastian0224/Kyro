"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  readPortfolios,
} from "@/lib/db/portfolios";

import { deleteWalletsByPortfolio, createWalletList } from "@/lib/db/wallets";

import { portfolioSchema } from "@/lib/zod/portfolio-schema";
import { walletSchema } from "@/lib/zod/wallet-schema";

import { validateWalletAddressV2 } from "@/lib/alchemy/wallets";

const MAX_PORTFOLIOS_PER_USER = 5;

async function validateWalletsBackend(wallets) {
  // Validate format and existence with Moralis
  for (const wallet of wallets) {
    walletSchema.parse(wallet);
    const result = await validateWalletAddressV2(wallet, []);
    if (!result.success) {
      throw new Error(
        result.error || "Invalid or not found wallet on blockchain."
      );
    }
  }
  // Validate uniqueness
  const unique = new Set(wallets);
  if (unique.size !== wallets.length) {
    throw new Error("Duplicate wallets are not allowed.");
  }
}

export async function validateWalletAction(address, existingWallets) {
  return await validateWalletAddressV2(address, existingWallets);
}

export async function createPortfolioHandler(prevState, formData) {
  const { userId } = await auth();

  try {
    const portfolios = await readPortfolios(userId);
    if (portfolios.length >= MAX_PORTFOLIOS_PER_USER) {
      return {
        error: `You can only have up to ${MAX_PORTFOLIOS_PER_USER} portfolios.`,
      };
    }

    const name = formData.get("name");
    const walletsRaw = formData.getAll("wallets");

    const errors = {};

    // Basic validation: empty name
    if (!name?.trim()) {
      errors.nameError = "You must enter a name.";
    }

    // Basic validation: empty wallets
    if (!Array.isArray(walletsRaw) || walletsRaw.length === 0) {
      errors.walletError = "You must add at least one valid wallet.";
    }

    // If there are already basic errors, return them without continuing
    if (Object.keys(errors).length > 0) {
      return errors;
    }

    // Zod validation
    let validated;
    try {
      validated = portfolioSchema.omit({ id: true }).parse({ name });
    } catch {
      return { nameError: "The name is not valid." };
    }

    // Advanced wallet validation (Zod + Moralis + duplicates)
    try {
      await validateWalletsBackend(walletsRaw);
    } catch (err) {
      return {
        walletError: err?.message || "The provided wallets are not valid.",
      };
    }

    const newPortfolio = await createPortfolio(validated.name, userId);

    const walletEntries = walletsRaw.map((wallet) => ({
      address: wallet.toLowerCase(),
      chain: "ethereum",
      portfolioId: newPortfolio.id,
    }));

    await createWalletList(walletEntries);
    revalidatePath("/portfolios");
  } catch (err) {
    console.error("[createPortfolioHandler]", err);
    return {
      error:
        err?.message ||
        "An unexpected error occurred while creating the portfolio.",
    };
  }
  redirect("/portfolios");
}

export async function updatePortfolioHandler(prevState, formData) {
  const { userId } = await auth();

  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const walletsRaw = formData.getAll("wallets");

    const errors = {};

    if (!id) {
      return { error: "Missing data." };
    }

    if (!name?.trim()) {
      errors.nameError = "You must enter a name.";
    }

    if (!Array.isArray(walletsRaw) || walletsRaw.length === 0) {
      errors.walletError = "You must add at least one valid wallet.";
    }

    if (Object.keys(errors).length > 0) {
      return errors;
    }

    let validated;
    try {
      validated = portfolioSchema.parse({ id, name });
    } catch {
      return { nameError: "The name is not valid." };
    }

    // Advanced wallet validation (Zod + Moralis + duplicates)
    try {
      await validateWalletsBackend(walletsRaw);
    } catch (err) {
      return {
        walletError: err?.message || "The provided wallets are not valid.",
      };
    }

    await updatePortfolio(validated.id, validated.name, userId);

    // Define walletEntries before the transaction
    const walletEntries = walletsRaw.map((wallet) => ({
      address: wallet.toLowerCase(),
      chain: "ethereum",
      portfolioId: validated.id,
    }));

    // 🔁 Delete old wallets from the portfolio and create new ones in a transaction
    await prisma.$transaction(async (tx) => {
      await deleteWalletsByPortfolio(validated.id, tx);
      await createWalletList(walletEntries, tx);
    });

    revalidatePath("/portfolios");
  } catch (err) {
    console.error("[updatePortfolioHandler]", err);
    return {
      error:
        err?.message ||
        "An unexpected error occurred while updating the portfolio.",
    };
  }
  redirect("/portfolios");
}

export async function deletePortfolioHandler(prevState, formData) {
  const { userId } = await auth();
  const id = formData.get("id");

  try {
    await deletePortfolio(id, userId);

    revalidatePath("/portfolios");
  } catch (err) {
    console.error("[deletePortfolioHandler]", err);
    return {
      error:
        err?.message ||
        "An unexpected error occurred while deleting the portfolio.",
    };
  }
  redirect("/portfolios");
}

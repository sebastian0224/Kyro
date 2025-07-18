"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
  readPortfolios,
} from "@/lib/db/portfolios";

import { deleteWalletsByPortfolio, createWalletList } from "@/lib/db/wallets";

import { portfolioSchema } from "@/lib/zod/portfolio-schema";
import { walletSchema } from "@/lib/zod/wallet-schema";
import { validateWalletAddress } from "@/lib/moralis/validateWallet";

const MAX_PORTFOLIOS_PER_USER = 5;

async function validateWalletsBackend(wallets) {
  // Validar formato y existencia con Moralis
  for (const wallet of wallets) {
    walletSchema.parse(wallet);
    const result = await validateWalletAddress(wallet, []); // [] porque en backend no hay lista previa
    if (!result.success) {
      throw new Error(
        result.error || "Wallet inválida o no encontrada en la blockchain."
      );
    }
  }
  // Validar unicidad
  const unique = new Set(wallets);
  if (unique.size !== wallets.length) {
    throw new Error("No se permiten wallets duplicadas.");
  }
}

export async function createPortfolioHandler(prevState, formData) {
  const { userId } = await auth();

  try {
    const portfolios = await readPortfolios(userId);
    if (portfolios.length >= MAX_PORTFOLIOS_PER_USER) {
      return {
        error: `Solo puedes tener hasta ${MAX_PORTFOLIOS_PER_USER} portfolios.`,
      };
    }

    const name = formData.get("name");
    const walletsRaw = formData.getAll("wallets");

    const errors = {};

    // Validación básica: nombre vacío
    if (!name?.trim()) {
      errors.nameError = "Debes ingresar un nombre.";
    }

    // Validación básica: wallets vacías
    if (!Array.isArray(walletsRaw) || walletsRaw.length === 0) {
      errors.walletError = "Debes agregar al menos una wallet válida.";
    }

    // Si ya hay errores básicos, los retornamos sin seguir
    if (Object.keys(errors).length > 0) {
      return errors;
    }

    // Validación con Zod
    let validated;
    try {
      validated = portfolioSchema.omit({ id: true }).parse({ name });
    } catch {
      return { nameError: "El nombre no es válido." };
    }

    // Validación avanzada de wallets (Zod + Moralis + duplicadas)
    try {
      await validateWalletsBackend(walletsRaw);
    } catch (err) {
      return {
        walletError:
          err?.message || "Las wallets proporcionadas no son válidas.",
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
    return { success: true };
  } catch (err) {
    console.error("[createPortfolioHandler]", err);
    return {
      error:
        err?.message || "Ocurrió un error inesperado al crear el portfolio.",
    };
  }
}

export async function updatePortfolioHandler(formData) {
  const { userId } = await auth();

  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const walletsRaw = formData.getAll("wallets");

    if (!id || !name) {
      return { error: "Faltan datos." };
    }

    if (!Array.isArray(walletsRaw) || walletsRaw.length === 0) {
      return { error: "Debes agregar al menos una wallet." };
    }

    const validated = portfolioSchema.parse({ id, name });

    // Validación de wallets en backend (formato, unicidad y existencia con Moralis)
    await validateWalletsBackend(walletsRaw);

    await updatePortfolio(validated.id, validated.name, userId);

    // Definir walletEntries antes de la transacción
    const walletEntries = walletsRaw.map((wallet) => ({
      address: wallet.toLowerCase(),
      chain: "ethereum",
      portfolioId: validated.id,
    }));

    // 🔁 Eliminar las wallets antiguas del portafolio y crear nuevas en una transacción
    await prisma.$transaction(async (tx) => {
      await deleteWalletsByPortfolio(validated.id, tx);
      await createWalletList(walletEntries, tx);
    });

    revalidatePath("/portfolios");
    return { error: null };
  } catch (err) {
    if (err.name === "ZodError") {
      return { error: "Datos inválidos al actualizar." };
    }
    return { error: err.message || "Ocurrió un error inesperado." };
  }
}

export async function deletePortfolioHandler(formData) {
  const { userId } = await auth();
  try {
    const id = formData.get("id");
    if (!id) return { error: "ID faltante para eliminar." };

    await deletePortfolio(id, userId);

    revalidatePath("/portfolios");
    return { error: null };
  } catch (err) {
    return { error: err.message || "Ocurrió un error inesperado." };
  }
}

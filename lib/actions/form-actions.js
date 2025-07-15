"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@/lib/db/portfolios";

import { createWalletList, deleteWalletsByPortfolio } from "@/lib/db/wallets";

import { portfolioSchema } from "@/lib/zod/portfolio-schema";

function handleErrorRedirect(basePath, message) {
  const msg = encodeURIComponent(message || "Error desconocido.");
  return redirect(`${basePath}?error=${msg}`);
}

export async function createPortfolioHandler(formData) {
  const { userId } = await auth();

  try {
    const name = formData.get("name");
    const walletsRaw = formData.getAll("wallets");

    if (!Array.isArray(walletsRaw) || walletsRaw.length === 0) {
      throw new Error("Debes agregar al menos una wallet.");
    }

    const validated = portfolioSchema.omit({ id: true }).parse({ name });

    const newPortfolio = await createPortfolio(validated.name, userId);

    const walletEntries = walletsRaw.map((wallet) => ({
      address: wallet.toLowerCase(),
      chain: "ethereum", // esto se puede mejorar en el futuro
      portfolioId: newPortfolio.id,
    }));

    await createWalletList(walletEntries);

    revalidatePath("/portfolios");
  } catch (err) {
    if (err.name === "ZodError") {
      return handleErrorRedirect("/portfolios", "Nombre inválido.");
    }

    if (err.message !== "NEXT_REDIRECT") {
      return handleErrorRedirect("/portfolios", err.message);
    }

    throw err;
  }
}

export async function updatePortfolioHandler(formData) {
  const { userId } = await auth();

  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const walletsRaw = formData.getAll("wallets");

    if (!id || !name) {
      throw new Error("Faltan datos.");
    }

    if (!Array.isArray(walletsRaw) || walletsRaw.length === 0) {
      throw new Error("Debes agregar al menos una wallet.");
    }

    const validated = portfolioSchema.parse({ id, name });

    await updatePortfolio(validated.id, validated.name, userId);

    // 🔁 Eliminar las wallets antiguas del portafolio
    await deleteWalletsByPortfolio(validated.id);

    // ✅ Crear nuevas wallets asociadas al portafolio
    const walletEntries = walletsRaw.map((wallet) => ({
      address: wallet.toLowerCase(),
      chain: "ethereum",
      portfolioId: validated.id,
    }));

    await createWalletList(walletEntries);

    revalidatePath("/portfolios");
  } catch (err) {
    if (err.name === "ZodError") {
      return handleErrorRedirect(
        "/portfolios",
        "Datos inválidos al actualizar."
      );
    }

    if (err.message !== "NEXT_REDIRECT") {
      return handleErrorRedirect("/portfolios", err.message);
    }

    throw err;
  }
}

export async function deletePortfolioHandler(formData) {
  try {
    const id = formData.get("id");
    if (!id) throw new Error("ID faltante para eliminar.");

    await deletePortfolio(id);

    revalidatePath("/portfolios");
  } catch (err) {
    if (err.message !== "NEXT_REDIRECT") {
      return handleErrorRedirect("/portfolios", err.message);
    }

    throw err;
  }
}

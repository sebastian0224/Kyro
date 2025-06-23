"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@/lib/portfolios";

import { portfolioSchema } from "@/lib/validations/portfolio-schema";

function handleErrorRedirect(basePath, message) {
  const msg = encodeURIComponent(message || "Error desconocido.");
  return redirect(`${basePath}?error=${msg}`);
}

export async function createPortfolioHandler(formData) {
  const { userId } = await auth();

  try {
    const data = {
      name: formData.get("name"),
    };

    const validated = portfolioSchema.omit({ id: true }).parse(data);

    await createPortfolio(validated.name, userId);

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
  try {
    const data = {
      id: formData.get("id"),
      name: formData.get("name"),
    };

    const validated = portfolioSchema.parse(data);

    await updatePortfolio(validated.id, validated.name);

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

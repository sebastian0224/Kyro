"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "@/lib/portfolios";

export async function createPortfolioHandler(formData) {
  const { userId } = await auth();
  const name = formData.get("name");
  await createPortfolio(name, userId);
  revalidatePath("/portfolios");
  return redirect("/portfolios");
}

export async function updatePortfolioHandler(formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  await updatePortfolio(id, name);
  revalidatePath("/portfolios");
  return redirect("/portfolios");
}

export async function deletePortfolioHandler(formData) {
  const id = formData.get("id");
  await deletePortfolio(id);
  revalidatePath("/portfolios");
  return redirect("/portfolios");
}

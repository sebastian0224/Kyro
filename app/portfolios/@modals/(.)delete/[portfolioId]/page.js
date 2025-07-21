export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPortfolioById } from "@/lib/db/portfolios";

import DeletePortfolioForm from "@/components/portfolios/DeletePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default async function DeleteFormModal({ params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();

  if (!portfolioId || !userId) {
    console.log("1. portafolio o user id no encontrado");
    redirect("/portfolios");
  }

  const portfolio = await getPortfolioById(id, userId);

  if (!portfolio) {
    console.log("3. error al llamar a getportid");
    redirect("/portfolios");
  }

  return (
    <ModalPortfolio title="Eliminar Portfolio">
      <DeletePortfolioForm id={portfolioId} />
    </ModalPortfolio>
  );
}

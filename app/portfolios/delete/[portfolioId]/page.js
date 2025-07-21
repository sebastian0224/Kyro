export const dynamic = "force-dynamic";
export const revalidate = 0;

import { redirect } from "next/navigation";
import { getPortfolioById } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";

import DeletePortfolioForm from "@/components/portfolios/DeletePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default async function DeleteForm({ params }) {
  const { portfolioId } = params;
  const { userId } = await auth();

  try {
    const portfolio = await getPortfolioById(portfolioId, userId);

    if (!portfolio || portfolio.userId !== userId) {
      redirect("/portfolios");
    }

    return (
      <ModalPortfolio title="Eliminar Portfolio">
        <DeletePortfolioForm id={portfolioId} />
      </ModalPortfolio>
    );
  } catch (error) {
    console.error("[DeleteFormModal]", error);
    redirect("/portfolios");
  }
}

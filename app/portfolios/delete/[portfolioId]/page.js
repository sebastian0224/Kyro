import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPortfolioById } from "@/lib/db/portfolios";

import DeletePortfolioForm from "@/components/portfolios/DeletePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default async function DeleteFormModal({ params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();

  if (!portfolioId || !userId) {
    redirect("/portfolios?error=not-authorized");
  }

  const portfolio = await getPortfolioById(portfolioId, userId);

  if (!portfolio) {
    redirect("/portfolios?error=not-authorized");
  }

  return (
    <ModalPortfolio title="Delete Portfolio">
      <DeletePortfolioForm id={portfolioId} />
    </ModalPortfolio>
  );
}

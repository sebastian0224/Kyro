import EditPortfolioForm from "@/components/portfolios/EditPortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

import { readWallets } from "@/lib/db/wallets";
import { getPortfolioById } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditFormModal({ params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();

  if (!portfolioId || !userId) {
    redirect("/portfolios?error=not-authorized");
  }

  const portfolio = await getPortfolioById(portfolioId, userId);

  if (!portfolio) {
    redirect(`/portfolios?error=not-authorized`);
  }

  try {
    const wallets = await readWallets(portfolioId);

    return (
      <ModalPortfolio
        title="Edit Portfolio"
        description="Modify your portfolio configuration"
      >
        <EditPortfolioForm
          id={portfolioId}
          name={portfolio.name}
          wallets={wallets}
        />
      </ModalPortfolio>
    );
  } catch (error) {
    console.error("[EditFormModal]", error);
    redirect(`/portfolios?error=not-authorized`);
  }
}

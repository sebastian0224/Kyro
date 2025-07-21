export const dynamic = "force-dynamic";
export const revalidate = 0;

import EditPortfolioForm from "@/components/portfolios/EditPortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

import { readWallets } from "@/lib/db/wallets";
import { getPortfolioById } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditFormModal({ params }) {
  const { portfolioId } = params;
  const { userId } = await auth();

  try {
    const portfolio = await getPortfolioById(portfolioId, userId);

    if (!portfolio) {
      redirect(`/portfolios`);
    }

    const wallets = await readWallets(portfolioId);

    return (
      <ModalPortfolio
        title="Editar Portfolio"
        description="Modifica la configuración de tu portfolio"
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
    redirect(`/portfolios`);
  }
}

export const dynamic = "force-dynamic";

import EditPortfolioForm from "@/components/portfolios/EditPortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";
import { readWallets } from "@/lib/db/wallets";
import { getPortfolioById } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function EditForm({ searchParams }) {
  const { id } = await searchParams;
  const { userId } = await auth();

  let wallets = [];
  let portfolio = null;
  let error = null;
  try {
    [wallets, portfolio] = await Promise.all([
      readWallets(id),
      getPortfolioById(id, userId),
    ]);
  } catch (e) {
    error = e;
  }

  if (error || !portfolio) {
    redirect(`/portfolios?error=not-authorized`);
  }

  return (
    <ModalPortfolio
      title="Editar Portfolio"
      description="Modifica la configuración de tu portfolio"
    >
      <EditPortfolioForm id={id} name={portfolio.name} wallets={wallets} />
    </ModalPortfolio>
  );
}

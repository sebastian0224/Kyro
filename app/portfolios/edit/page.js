export const dynamic = "force-dynamic";

import EditPortfolioForm from "@/components/portfolios/EditPortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";
import { readWallets } from "@/lib/db/wallets";
import { getPortfolioById } from "@/lib/db/portfolios";

export default async function EditForm({ searchParams }) {
  const { id } = await searchParams;

  const [wallets, portfolio] = await Promise.all([
    readWallets(id),
    getPortfolioById(id),
  ]);

  return (
    <ModalPortfolio>
      <EditPortfolioForm id={id} name={portfolio.name} wallets={wallets} />
    </ModalPortfolio>
  );
}

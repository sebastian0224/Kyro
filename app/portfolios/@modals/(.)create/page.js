export const dynamic = "force-dynamic";

export const revalidate = 0;

import CreatePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";
import { auth } from "@clerk/nextjs/server";
import { readPortfolios } from "@/lib/db/portfolios";

export default async function CreateFormModal() {
  const { userId } = await auth();
  const portfolios = await readPortfolios(userId);
  const userPortfolioCount = portfolios.length;
  return (
    <ModalPortfolio>
      <CreatePortfolioForm userPortfolioCount={userPortfolioCount} />
    </ModalPortfolio>
  );
}

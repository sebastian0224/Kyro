export const dynamic = "force-dynamic";

export const revalidate = 0;

import CreatePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default function CreateFormModal() {
  return (
    <ModalPortfolio>
      <CreatePortfolioForm />
    </ModalPortfolio>
  );
}

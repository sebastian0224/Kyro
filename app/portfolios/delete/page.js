export const dynamic = "force-dynamic";

import DeletePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default function DeleteForm() {
  return (
    <ModalPortfolio>
      <DeletePortfolioForm />
    </ModalPortfolio>
  );
}

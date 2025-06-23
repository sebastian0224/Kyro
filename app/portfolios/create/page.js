export const dynamic = "force-dynamic";

import CreatePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default function CreateForm() {
  return (
    <ModalPortfolio>
      <CreatePortfolioForm />
    </ModalPortfolio>
  );
}

import CreatePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default function CreateFormModal() {
  return (
    <ModalPortfolio>
      <CreatePortfolioForm />
    </ModalPortfolio>
  );
}

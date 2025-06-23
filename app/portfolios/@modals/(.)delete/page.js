import DeletePortfolioForm from "@/components/portfolios/DeletePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default function CreateFormModal() {
  return (
    <ModalPortfolio>
      <DeletePortfolioForm />
    </ModalPortfolio>
  );
}

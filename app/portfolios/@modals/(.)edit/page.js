export const dynamic = "force-dynamic";

export const revalidate = 0;

import EditPortfolioForm from "@/components/portfolios/EditPortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default function EditFormModal() {
  return (
    <ModalPortfolio>
      <EditPortfolioForm />
    </ModalPortfolio>
  );
}

export const dynamic = "force-dynamic";

export const revalidate = 0;

import CreatePortfolioForm from "@/components/portfolios/CreatePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default async function CreateFormModal() {
  return (
    <ModalPortfolio
      title="Crear Portfolio"
      description="Configura un nuevo portfolio para gestionar tus inversiones"
    >
      <CreatePortfolioForm />
    </ModalPortfolio>
  );
}

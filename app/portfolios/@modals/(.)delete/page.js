export const dynamic = "force-dynamic";

export const revalidate = 0;

import DeletePortfolioForm from "@/components/portfolios/DeletePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";

export default async function DeleteFormModal({ searchParams }) {
  const { id } = await searchParams;

  return (
    <ModalPortfolio title="Eliminar Portfolio">
      <DeletePortfolioForm id={id} />
    </ModalPortfolio>
  );
}

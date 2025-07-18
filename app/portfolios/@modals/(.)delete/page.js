export const dynamic = "force-dynamic";

export const revalidate = 0;

import DeletePortfolioForm from "@/components/portfolios/DeletePortfolioForm";
import ModalPortfolio from "@/components/portfolios/ModalPortfolio";
import { getPortfolioById } from "@/lib/db/portfolios";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DeleteFormModal({ searchParams }) {
  const { id } = await searchParams;
  const { userId } = await auth();

  let portfolio = null;
  let error = null;
  try {
    portfolio = await getPortfolioById(id, userId);
  } catch (e) {
    error = e;
  }

  if (error || !portfolio) {
    redirect(`/portfolios?error=not-authorized`);
  }

  return (
    <ModalPortfolio
      title="Eliminar Portfolio"
      // description eliminado para que no se muestre en el delete
    >
      <DeletePortfolioForm />
    </ModalPortfolio>
  );
}

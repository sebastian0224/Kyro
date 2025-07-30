import DashboardLayout from "@/components/dashboard/DashboardLayout";

import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getPortfolioById } from "@/lib/db/portfolios";
import { readWallets } from "@/lib/db/wallets";

export default async function Layout({ children, params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();

  if (!portfolioId || !userId) {
    redirect("/portfolios?error=not-authorized");
  }

  const portfolio = await getPortfolioById(portfolioId, userId);

  if (!portfolio) {
    redirect("/portfolios?error=not-authorized");
  }

  const wallets = await readWallets(portfolioId);
  return (
    <DashboardLayout portfolioId={portfolioId} wallets={wallets}>
      {children}
    </DashboardLayout>
  );
}

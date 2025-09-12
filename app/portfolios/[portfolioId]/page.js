import NetWorthCard from "@/components/dashboard/overview/NetWorthCard";
import TokenDistributionChart from "@/components/dashboard/overview/TokenDistributionChart";
import TopTokensTable from "@/components/dashboard/overview/TopTokensTable";

import { auth } from "@clerk/nextjs/server";

export default async function OverviewPage({ params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Overview</h1>
        <p className="text-muted-foreground">
          Bienvenido a tu dashboard de KYRO
        </p>
      </div>

      {/* Top section - NetWorth and Token Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NetWorthCard portfolioId={portfolioId} userId={userId} />
        <TokenDistributionChart portfolioId={portfolioId} />
      </div>

      {/* Bottom section - Top Tokens Table */}
      <div className="w-full">
        <TopTokensTable portfolioId={portfolioId} />
      </div>
    </div>
  );
}

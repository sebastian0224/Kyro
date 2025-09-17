import ChainAllocationChart from "@/components/dashboard/analytics/ChainAllocationChart";
import HistoricalPerformanceChart from "@/components/dashboard/analytics/HistoricalPerformanceChart";
import TokenAllocationChart from "@/components/dashboard/analytics/TokenAllocationChart";
import WalletContributionChart from "@/components/dashboard/analytics/WalletContributionChart";
import { auth } from "@clerk/nextjs/server";

export default async function AnalyticsPage({ params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          Analytics
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Detailed analysis of your cryptocurrency portfolio
        </p>
      </div>

      {/* Charts Grid Layout */}
      <div className="space-y-6">
        {/* Top Row - Historical Performance */}
        <div className="w-full">
          <HistoricalPerformanceChart
            portfolioId={portfolioId}
            userId={userId}
          />
        </div>

        {/* Middle Row - Token & Chain Allocation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenAllocationChart portfolioId={portfolioId} />
          <ChainAllocationChart portfolioId={portfolioId} />
        </div>

        {/* Bottom Row - Wallet Contribution */}
        <div className="w-full">
          <WalletContributionChart portfolioId={portfolioId} />
        </div>
      </div>
    </div>
  );
}

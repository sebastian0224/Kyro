import NetWorthCard from "@/components/dashboard/overview/NetWorthCard";
import TokenDistributionChart from "@/components/dashboard/overview/TokenDistributionChart";
import TopTokensTable from "@/components/dashboard/overview/TopTokensTable";
import { auth } from "@clerk/nextjs/server";

export default async function OverviewPage({ params }) {
  const { portfolioId } = await params;
  const { userId } = await auth();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Overview</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Welcome to your KYRO dashboard
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

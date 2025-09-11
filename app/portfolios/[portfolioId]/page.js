import NetWorthCard from "@/components/dashboard/overview/NetWorthCard";
import TokenDistributionChart from "@/components/dashboard/overview/TokenDistributionChart";
import TopTokensTable from "@/components/dashboard/overview/TopTokensTable";

export default function OverviewPage() {
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
        <NetWorthCard />
        <TokenDistributionChart />
      </div>

      {/* Bottom section - Top Tokens Table */}
      <div className="w-full">
        <TopTokensTable />
      </div>
    </div>
  );
}
